import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Long } from 'mongodb';

export async function GET() {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    if (!discordId) {
      return NextResponse.json({ error: 'Debes iniciar sesión primero.' }, { status: 401 });
    }

    const client = await clientPromise;
    const labotDb = client.db('labot');
    const werewolfDb = client.db('werewolf');

    const memberIdLong = Long.fromString(discordId);
    const memberIdInt = parseInt(discordId);

    // Fetch Wordle stats (labot.wordle)
    // member_id is stored as int or long in wordle? 
    // From cogs/wordle/wordle.py: dB.WORDLE.find_one({"guild_id": ctx.guild.id, "member_id": ctx.author.id})
    // Python usually stores discord IDs as Int64 (Long).
    let wordle = await labotDb.collection('wordle').findOne({ member_id: memberIdLong });
    if (!wordle) {
        wordle = await labotDb.collection('wordle').findOne({ member_id: memberIdInt });
    }

    // Fetch Werewolf stats (werewolf.players)
    // From cogs/werewolf/database.py: "_id": <discord_user_id int>
    let werewolf = await werewolfDb.collection('players').findOne({ _id: memberIdLong });
    if (!werewolf) {
        werewolf = await werewolfDb.collection('players').findOne({ _id: memberIdInt });
    }

    return NextResponse.json({
      wordle: wordle || null,
      werewolf: werewolf || null,
      trivial: null // Próximamente
    });
  } catch (err) {
    console.error('Error fetching bot stats:', err);
    return NextResponse.json({ error: 'Error al obtener estadísticas.' }, { status: 500 });
  }
}
