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
    
    // Fetch Wordle stats (labot.wordle)
    // We try Long, then Number (if safe), then string
    let wordle = await labotDb.collection('wordle').findOne({ member_id: memberIdLong });
    if (!wordle) wordle = await labotDb.collection('wordle').findOne({ member_id: discordId });
    if (!wordle && Number.isSafeInteger(Number(discordId))) {
      wordle = await labotDb.collection('wordle').findOne({ member_id: Number(discordId) });
    }

    // Fetch Werewolf stats (werewolf.players)
    let werewolf = await werewolfDb.collection('players').findOne({ _id: memberIdLong });
    if (!werewolf) werewolf = await werewolfDb.collection('players').findOne({ _id: discordId });
    if (!werewolf && Number.isSafeInteger(Number(discordId))) {
      werewolf = await werewolfDb.collection('players').findOne({ _id: Number(discordId) });
    }

    // Process Wordle data to separate modes
    const wordleStats = wordle ? {
      normal: {
        played: wordle.played || 0,
        wins: Math.max(0, (wordle.total_wins || 0) - ((wordle.double_total_wins || 0) * 2) - ((wordle.triple_total_wins || 0) * 3)),
        streak: wordle.streak || 0,
        max_streak: wordle.max_streak || 0,
        earnings: wordle.normal_total_earnings || 0, // Fallback if exists
        distribution: wordle.guess_distribution || {}
      },
      double: {
        played: wordle.double_played || 0,
        wins: wordle.double_total_wins || 0,
        streak: wordle.double_streak || 0,
        max_streak: wordle.double_max_streak || 0,
        earnings: wordle.double_total_earnings || 0,
        distribution: wordle.double_guess_distribution || {}
      },
      triple: {
        played: wordle.triple_played || 0,
        wins: wordle.triple_total_wins || 0,
        streak: wordle.triple_streak || 0,
        max_streak: wordle.triple_max_streak || 0,
        earnings: wordle.triple_total_earnings || 0,
        distribution: wordle.triple_guess_distribution || {}
      },
      ladder: {
        played: wordle.ladder_played || 0,
        total_words: wordle.ladder_total_words || 0,
        max_words: wordle.ladder_max_words || 0,
        earnings: wordle.ladder_total_earnings || 0
      }
    } : null;

    return NextResponse.json({
      wordle: wordleStats,
      werewolf: werewolf || null,
      trivial: null // Próximamente
    });
  } catch (err) {
    console.error('Error fetching bot stats:', err);
    return NextResponse.json({ error: 'Error al obtener estadísticas.' }, { status: 500 });
  }
}
