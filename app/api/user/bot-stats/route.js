import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long } from 'mongodb';
import { getFortuneHolder } from '@/lib/discord-members';

export async function GET() {
  try {
    const session = await auth();
    const discordId = session?.discordId || session?.user?.id;
    const isAuthenticated = !!discordId;

    let labotDb = null;

    try {
      const client = await clientPromise;
      labotDb = client.db(DB_NAME);
    } catch (e) {
      console.warn('DB connection failed:', e.message);
    }

    // LA Spain — centralizado en variable de entorno (con respaldo al ID conocido)
    const GUILD_ID = process.env.DISCORD_GUILD_ID || "460550486257565697";
    const guildIdLong = Long.fromString(GUILD_ID);

    let wordle = null;
    let werewolf = null;
    let trivial = null;

    if (isAuthenticated && labotDb) {
      const memberIdLong = Long.fromString(discordId);
      const userIds = [memberIdLong, discordId, Number(discordId)];

      wordle = await labotDb.collection('wordle').findOne({
        member_id: { $in: userIds },
        guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] }
      }) || await labotDb.collection('wordle').findOne({ member_id: { $in: userIds } });

      // Werewolf unificado: ww_players (guild_id, user_id)
      werewolf = await labotDb.collection('ww_players').findOne({
        guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] },
        user_id: { $in: userIds }
      });

      // Trivial (guild_id, user_id)
      trivial = await labotDb.collection('trivial').findOne({
        guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] },
        user_id: { $in: userIds }
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
      let position = '—';
      try {
        const pts = Number(werewolf.event_points || 0);
        if (pts > 0) {
          const countAbove = await labotDb.collection('ww_players').countDocuments({
            guild_id: { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] },
            event_points: { $gt: pts }
          });
          position = countAbove + 1;
        }
      } catch (err) {
        console.warn('Could not calculate player event rank:', err);
      }

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
        event_points: Number(werewolf.event_points || 0),
        position: position,
        roles_played: werewolf.roles_played || {},
        roles_won: werewolf.roles_won || {}
      };
    }

    // Lotería activa (nuevo esquema: config en `lottery`, intentos en `lottery_entries`).
    // No se expone el número objetivo.
    let lotteryStats = null;
    if (labotDb) {
      const guildMatch = { $in: [guildIdLong, GUILD_ID, Number(GUILD_ID)] };
      // `end` existe solo en el esquema nuevo: así ignoramos docs antiguos.
      const lottery = await labotDb.collection('lottery').findOne({ guild_id: guildMatch, end: { $exists: true } });
      if (lottery) {
        const entryFilter = { guild_id: guildMatch };
        const attempts = await labotDb.collection('lottery_entries').countDocuments(entryFilter);
        const participants = (await labotDb.collection('lottery_entries').distinct('user_id', entryFilter)).length;
        lotteryStats = {
          min: Number(lottery.range_min || 0),
          max: Number(lottery.range_max || 0),
          end: lottery.end != null ? Number(lottery.end) : null,
          maxAttempts: Number(lottery.max_attempts || 0),
          cooldown: Number(lottery.cooldown_s || 0),
          role: lottery.role ? lottery.role.toString() : null,
          rotate: lottery.rotate !== false,
          participants,
          attempts,
          channel: lottery.channel_id ? lottery.channel_id.toString() : null,
        };
      }
    }

    // Si no hay lotería activa, mostramos al último ganador: el miembro que
    // actualmente porta el rol "Portador de la Fortuna".
    let lotteryWinner = null;
    if (!lotteryStats) {
      try {
        lotteryWinner = await getFortuneHolder();
      } catch (e) {
        console.warn('No se pudo obtener el portador de la fortuna:', e?.message);
      }
    }

    // Trivial stats
    let trivialStats = null;
    if (trivial) {
      const games = Number(trivial.games || 0);
      const total = Number(trivial.total_score || 0);
      trivialStats = {
        games,
        wins: Number(trivial.wins || 0),
        total_score: total,
        average: games > 0 ? (total / games).toFixed(1) : '0.0',
      };
    }

    return NextResponse.json({
      isAuthenticated,
      wordle: wordleStats,
      werewolf: werewolfStats,
      lottery: lotteryStats,
      lotteryWinner,
      trivial: trivialStats
    });
  } catch (err) {
    console.error('Error fetching bot stats:', err);
    return NextResponse.json({ error: 'Error al obtener estadísticas.' }, { status: 500 });
  }
}
