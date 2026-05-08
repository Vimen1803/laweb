import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Long } from 'mongodb';

export async function GET() {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    if (!discordId) {
      return NextResponse.json({ loggedIn: false, tag: null });
    }

    const client = await clientPromise;
    const db = client.db('labot');

    let userDoc = null;
    try {
      userDoc = await db.collection('users').findOne({ member_id: Long.fromString(discordId) });
    } catch (e) {}

    if (!userDoc) {
      userDoc = await db.collection('users').findOne({ member_id: Number(discordId) });
    }

    if (!userDoc) {
      userDoc = await db.collection('users').findOne({ member_id: discordId });
    }

    if (!userDoc || !userDoc.bs_tag) {
      return NextResponse.json({ loggedIn: true, tag: null });
    }

    const tag = userDoc.bs_tag.startsWith('#') ? userDoc.bs_tag : `#${userDoc.bs_tag}`;
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
    const db = client.db('labot');

    // Use Long to avoid JS Number precision loss and match Python bot's Int64 format
    const memberId = Long.fromString(discordId);

    await db.collection('users').updateOne(
      { member_id: memberId },
      { $set: { member_id: memberId, bs_tag: tag } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, tag });
  } catch (err) {
    console.error('Error saving tag:', err);
    return NextResponse.json({ error: 'No se pudo guardar la cuenta.' }, { status: 500 });
  }
}
