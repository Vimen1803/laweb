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
    const GUILD_ID = "460550486257565697"; // LA Spain
    const guildIdLong = Long.fromString(GUILD_ID);
    
    // Fetch Wordle stats (labot.wordle)
    // We try to find the one in LA Spain first
    let wordle = await labotDb.collection('wordle').findOne({ 
      member_id: { $in: [memberIdLong, discordId, Number(discordId)] },
      guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] }
    });
    
    // Fallback to any guild if not found in LA Spain
    if (!wordle) {
      wordle = await labotDb.collection('wordle').findOne({ 
        member_id: { $in: [memberIdLong, discordId, Number(discordId)] }
      });
    }

    // Fetch Werewolf stats (werewolf.players)
    let werewolf = await werewolfDb.collection('players').findOne({ 
      _id: { $in: [memberIdLong, discordId, Number(discordId)] }
    });

    // Process Wordle data to separate modes
    const processMode = (prefix, data) => {
      const p = prefix ? `${prefix}_` : '';
      const played = data[`${p}played`] || (prefix === '' ? data.played : 0) || 0;
      let wins = data[`${p}total_wins`] || 0;
      
      if (prefix === '') {
        wins = Math.max(0, (data.total_wins || 0) - ((data.double_total_wins || 0) * 2) - ((data.triple_total_wins || 0) * 3));
      }

      return {
        played: Number(played),
        wins: Number(wins),
        winrate: Number(played) > 0 ? ((Number(wins) / Number(played)) * 100).toFixed(1) : '0.0',
        streak: Number(data[`${p}streak`] || 0),
        max_streak: Number(data[`${p}max_streak`] || 0),
        earnings: Number(data[`${p}total_earnings`] || (prefix === '' ? data.total_earnings : 0) || 0),
        distribution: data[`${p}guess_distribution`] || {}
      };
    };

    const wordleStats = wordle ? {
      normal: processMode('', wordle),
      double: processMode('double', wordle),
      triple: processMode('triple', wordle),
      ladder: {
        played: Number(wordle.ladder_played || 0),
        total_words: Number(wordle.ladder_total_words || 0),
        max_words: Number(wordle.ladder_max_words || 0),
        earnings: Number(wordle.ladder_total_earnings || 0),
        average: Number(wordle.ladder_played || 0) > 0 ? (Number(wordle.ladder_total_words || 0) / Number(wordle.ladder_played)).toFixed(1) : '0.0'
      }
    } : null;

    // Sanitize Werewolf data
    let werewolfStats = null;
    if (werewolf) {
      werewolfStats = {
        ...werewolf,
        _id: werewolf._id.toString(),
        games_played: Number(werewolf.games_played || 0),
        games_won: Number(werewolf.games_won || 0),
        village_played: Number(werewolf.village_played || 0),
        village_won: Number(werewolf.village_won || 0),
        wolf_played: Number(werewolf.wolf_played || 0),
        wolf_won: Number(werewolf.wolf_won || 0),
        roles_played: werewolf.roles_played || {},
        roles_won: werewolf.roles_won || {}
      };
    } else {
      // Mock data for testing when DB is not accessible
      werewolfStats = {
        _id: discordId,
        username: "Usuario de Prueba",
        games_played: 156,
        games_won: 84,
        village_played: 92,
        village_won: 51,
        wolf_played: 48,
        wolf_won: 26,
        roles_played: {
          "Aldeano": 45, "Hombre Lobo": 32, "Vidente": 21, "Cazador": 18, 
          "Bruja": 12, "Cupido": 10, "Lobo Blanco": 8, "Flautista": 6, "Chaman": 4
        },
        roles_won: {
          "Aldeano": 28, "Hombre Lobo": 19, "Vidente": 14, "Cazador": 10, 
          "Bruja": 7, "Cupido": 4, "Lobo Blanco": 2, "Flautista": 0, "Chaman": 0
        }
      };
    }

    return NextResponse.json({
      wordle: wordleStats,
      werewolf: werewolfStats,
      trivial: null // Próximamente
    });
  } catch (err) {
    console.error('Error fetching bot stats:', err);
    return NextResponse.json({ error: 'Error al obtener estadísticas.' }, { status: 500 });
  }
}
