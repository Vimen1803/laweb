import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long } from 'mongodb';
import { auth } from '@/lib/auth';

// Obtiene el nombre y avatar ACTUALES de un usuario desde la API de Discord.
// Devuelve null si no se puede (entonces se usan los datos guardados en la DB).
async function fetchDiscordUser(userId) {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token || !userId) return null;
  try {
    const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: { Authorization: `Bot ${token}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const u = await res.json();
    const name = u.global_name || u.username || null;
    const image = u.avatar
      ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`
      : null;
    return { name, image };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const reviews = await db.collection('reviews').find({}).sort({ timestamp: -1 }).toArray();

    let average = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, rev) => acc + (rev.stars || 0), 0);
      average = sum / reviews.length;
    }

    // Nombre y foto se sacan en vivo de la API de Discord usando el user_id;
    // si la API falla, se muestra un nombre genérico (ya no se cachean en la DB).
    const enriched = await Promise.all(reviews.map(async (rev) => {
      const uid = rev.user_id != null ? String(rev.user_id) : null;
      const live = await fetchDiscordUser(uid);
      return {
        _id: rev._id?.toString?.() || rev._id,
        user_id: uid,
        stars: rev.stars,
        message: rev.message,
        timestamp: rev.timestamp,
        userName: live?.name || rev.userName || 'Usuario',
        userImage: live?.image || rev.userImage || null,
      };
    }));

    return NextResponse.json({ reviews: enriched, average, total: enriched.length });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return NextResponse.json({ error: 'Error al cargar las reseñas' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para dejar una reseña' }, { status: 401 });
    }

    const { stars, message } = await req.json();

    if (!stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'La valoración debe ser entre 1 y 5 estrellas' }, { status: 400 });
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json({ error: 'El mensaje debe tener al menos 5 caracteres' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'El mensaje no puede superar los 500 caracteres' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const discordId = String(session.discordId || session.user.id);
    const userKey = Long.fromString(discordId);

    await db.collection('reviews').updateOne(
      { user_id: userKey },
      { $set: { user_id: userKey, stars, message: message.trim(), timestamp: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Reseña guardada correctamente' }, { status: 201 });
  } catch (err) {
    console.error('Error saving review:', err);
    return NextResponse.json({ error: 'Error al guardar la reseña' }, { status: 500 });
  }
}
