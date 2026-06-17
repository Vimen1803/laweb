import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long } from 'mongodb';

// El tag de Brawl Stars vive en el perfil GLOBAL del usuario:
// colección `users`, clave user_id, campo brawlstars.tag.
export async function GET() {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    if (!discordId) {
      return NextResponse.json({ loggedIn: false, tag: null });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    let userDoc = null;
    try {
      userDoc = await db.collection('users').findOne({ user_id: Long.fromString(discordId) });
    } catch (e) {}
    if (!userDoc) userDoc = await db.collection('users').findOne({ user_id: Number(discordId) });
    if (!userDoc) userDoc = await db.collection('users').findOne({ user_id: discordId });

    const savedTag = userDoc?.brawlstars?.tag || null;
    if (!savedTag) {
      return NextResponse.json({ loggedIn: true, tag: null });
    }

    const tag = savedTag.startsWith('#') ? savedTag : `#${savedTag}`;
    const cleanTag = tag.replace('#', '').toUpperCase();

    // Fetch BS profile to get club info using rnt.dev
    try {
      const res = await fetch(`https://api.rnt.dev/profile?tag=${cleanTag}`, {
        next: { revalidate: 60 }
      });
      const data = await res.json();
      if (res.ok && data.ok && data.result) {
        return NextResponse.json({
          loggedIn: true,
          tag: data.result.account_tag?.tag || tag,
          name: data.result.name,
          club: data.result.is_in_alliance && data.result.alliance ? { tag: data.result.alliance.id.tag, name: data.result.alliance.name } : null
        });
      }
    } catch (e) {}

    return NextResponse.json({ loggedIn: true, tag, name: 'Mi Perfil', club: null });
  } catch (err) {
    console.error('Error fetching user brawl info:', err);
    return NextResponse.json({ loggedIn: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    if (!discordId) {
      return NextResponse.json({ error: 'Debes iniciar sesión primero.' }, { status: 401 });
    }

    const body = await req.json();
    let { tag } = body;
    if (!tag) return NextResponse.json({ error: 'Tag inválido.' }, { status: 400 });

    tag = tag.toUpperCase();
    if (!tag.startsWith('#')) tag = '#' + tag;

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Use Long to avoid JS Number precision loss and match Python bot's Int64 format
    const memberId = Long.fromString(discordId);

    await db.collection('users').updateOne(
      { user_id: memberId },
      { $set: { user_id: memberId, 'brawlstars.tag': tag } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, tag });
  } catch (err) {
    console.error('Error saving tag:', err);
    return NextResponse.json({ error: 'No se pudo guardar la cuenta.' }, { status: 500 });
  }
}
