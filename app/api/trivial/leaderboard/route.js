import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long } from 'mongodb';
import { getGuildMembersDisplay } from '@/lib/discord-members';

// Clasificación del Trivial con datos reales de la BD (colección `trivial`).
// Ordena por puntos totales y resuelve nombres/avatares desde Discord.
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const GUILD_ID = process.env.DISCORD_GUILD_ID || '460550486257565697';
    const guildIdLong = Long.fromString(GUILD_ID);

    const docs = await db.collection('trivial')
      .find({ guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] } })
      .sort({ total_score: -1 })
      .limit(10)
      .toArray();

    const ids = docs.map(d => String(d.user_id));
    const displays = await getGuildMembersDisplay(ids);

    const players = docs.map((d, i) => {
      const uid = String(d.user_id);
      const disp = displays?.[uid] || null;
      const games = Number(d.games || 0);
      const total = Number(d.total_score || 0);
      return {
        rank: i + 1,
        user_id: uid,
        name: disp?.name || 'Jugador',
        avatar: disp?.avatar || null,
        wins: Number(d.wins || 0),
        games,
        total_score: total,
        average: games > 0 ? (total / games).toFixed(2) : '0.00',
      };
    });

    return NextResponse.json({ players });
  } catch (err) {
    console.error('Error fetching trivial leaderboard:', err);
    return NextResponse.json({ error: 'Error al cargar la clasificación', players: [] }, { status: 500 });
  }
}
