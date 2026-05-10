import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise, { werewolfClientPromise } from '@/lib/mongodb';
import { Long } from 'mongodb';

export async function GET() {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    const isAuthenticated = !!discordId;

    const client = await clientPromise;
    const werewolfClient = await werewolfClientPromise;
    
    const labotDb = client.db('labot');
    const werewolfDb = werewolfClient.db('werewolf');

    const GUILD_ID = "460550486257565697"; // LA Spain
    const guildIdLong = Long.fromString(GUILD_ID);

    let wordle = null;
    let werewolf = null;

    if (isAuthenticated) {
      const memberIdLong = Long.fromString(discordId);
      
      // Fetch Wordle stats (labot.wordle)
      // We try to find the one in LA Spain first
      wordle = await labotDb.collection('wordle').findOne({ 
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
      werewolf = await werewolfDb.collection('players').findOne({ 
        _id: { $in: [memberIdLong, discordId, Number(discordId)] }
      });
    }

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
        tanner_played: Number(werewolf.tanner_played || 0),
        tanner_won: Number(werewolf.tanner_won || 0),
        white_wolf_played: Number(werewolf.white_wolf_played || 0),
        white_wolf_won: Number(werewolf.white_wolf_won || 0),
        lovers_played: Number(werewolf.lovers_played || 0),
        lovers_won: Number(werewolf.lovers_won || 0),
        roles_played: werewolf.roles_played || {},
        roles_won: werewolf.roles_won || {}
      };
    }

    // Fetch Lottery stats (labot.lottery)
    const lottery = await labotDb.collection('lottery').findOne({
      guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] },
      user_id: null // Active lottery
    });

    const lotteryStats = lottery ? {
      min: Number(lottery.range_min || 0),
      max: Number(lottery.range_max || 0),
      timeout: Number(lottery.timeout || 0),
      role: lottery.role ? lottery.role.toString() : null,
      guessed: Array.isArray(lottery.numeros) ? lottery.numeros.length : 0,
      numbers: Array.isArray(lottery.numeros) ? lottery.numeros : [],
      channel: lottery.channel_id ? lottery.channel_id.toString() : null
    } : null;

    return NextResponse.json({
      isAuthenticated,
      wordle: wordleStats,
      werewolf: werewolfStats,
      lottery: lotteryStats,
      trivial: null // Próximamente
    });
  } catch (err) {
    console.error('Error fetching bot stats:', err);
    return NextResponse.json({ error: 'Error al obtener estadísticas.' }, { status: 500 });
  }
}
