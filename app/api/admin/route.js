import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long, Int32 } from 'mongodb';
import { auth } from '@/lib/auth';

const BLACKLIST_SERVER = '724202847822151680';  // blacklist compartida (servidor fijo)

async function ensureAdmin() {
  const session = await auth();
  return !!session?.isAdmin;
}

function guildQuery(guildId) {
  return { $in: [Long.fromString(guildId), guildId] };
}

export async function GET(request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section') || 'overview';
  const userId = searchParams.get('userId');
  const guildId = process.env.DISCORD_GUILD_ID;

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    if (section === 'modlogs') {
      const logs = await db.collection('mod_cases')
        .find({ guild_id: Long.fromString(guildId) })
        .sort({ time: -1 }).limit(50).toArray();

      for (let log of logs) {
        if (log.member_id) {
          const mName = await db.collection('mod_names').findOne({ guild_id: Long.fromString(guildId), user_id: log.member_id });
          log.memberName = mName?.log_nicks?.length ? mName.log_nicks[mName.log_nicks.length - 1] : 'Usuario';
        }
        if (log.moderator) {
          const modName = await db.collection('mod_names').findOne({ guild_id: Long.fromString(guildId), user_id: log.moderator });
          log.modName = modName?.log_nicks?.length ? modName.log_nicks[modName.log_nicks.length - 1] : 'Moderador';
        }
        for (const k of ['member_id', 'moderator', 'guild_id', '_id']) if (log[k]?.toString) log[k] = log[k].toString();
      }
      return NextResponse.json(logs);
    }

    if (section === 'blacklist') {
      const bl = await db.collection('blacklist')
        .find({ guild_id: Long.fromString(BLACKLIST_SERVER) }).toArray();

      for (let i = 0; i < bl.length; i += 10) {
        await Promise.all(bl.slice(i, i + 10).map(async (b) => {
          b.razon = b.reason;  // compat con la UI
          try {
            const cleanTag = b.tag.replace('#', '').toUpperCase();
            const res = await fetch(`https://api.rnt.dev/profile?tag=${cleanTag}`, { next: { revalidate: 3600 } });
            const data = await res.json();
            b.name = (res.ok && data.result?.name) ? data.result.name : 'Desconocido';
          } catch { b.name = 'Desconocido'; }
        }));
      }
      return NextResponse.json(bl);
    }

    if (section === 'usercheck' && userId) {
      let uidLong;
      try { uidLong = Long.fromString(userId); }
      catch { return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 }); }

      const account = await db.collection('mod_members').findOne({ guild_id: Long.fromString(guildId), user_id: uidLong });
      const history = await db.collection('mod_cases')
        .find({ guild_id: Long.fromString(guildId), member_id: uidLong }).sort({ time: -1 }).toArray();
      for (let h of history) {
        for (const k of ['member_id', 'moderator', 'guild_id', '_id']) if (h[k]?.toString) h[k] = h[k].toString();
      }

      // `users` es ahora un perfil global por usuario (sin guild_id).
      const userInfo = await db.collection('users').findOne({ user_id: uidLong });
      if (userInfo) userInfo.bs_tag = userInfo.brawlstars?.tag || null;

      let discordUser = null;
      try {
        const botToken = process.env.DISCORD_BOT_TOKEN;
        if (botToken) {
          const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { Authorization: `Bot ${botToken}` }, next: { revalidate: 3600 },
          });
          if (res.ok) discordUser = await res.json();
        }
      } catch {}

      return NextResponse.json({ account, history, userInfo, discordUser });
    }

    if (section === 'werewolf') {
      const ww = await db.collection('ww_guilds').findOne({ _id: guildQuery(guildId) }) || {};

      const token = process.env.DISCORD_BOT_TOKEN;
      let channels = [], roles = [];
      if (token) {
        const headers = { Authorization: `Bot ${token}` };
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers, next: { revalidate: 300 } });
          if (r.ok) channels = (await r.json()).filter(c => [0, 5, 15].includes(c.type)).map(c => ({ id: String(c.id), name: c.name }));
        } catch {}
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers, next: { revalidate: 300 } });
          if (r.ok) roles = (await r.json()).filter(x => x.name !== '@everyone').sort((a, b) => (b.position || 0) - (a.position || 0)).map(x => ({ id: String(x.id), name: x.name }));
        } catch {}
      }

      return NextResponse.json({
        allowed_channels: Array.isArray(ww.allowed_channels) ? ww.allowed_channels.map(String) : [],
        mention_role_id: ww.mention_role_id ? String(ww.mention_role_id) : null,
        canal_anuncios: ww.canal_anuncios ? String(ww.canal_anuncios) : null,
        mute_noche: ww.mute_noche ?? true,
        mute_votacion: ww.mute_votacion ?? true,
        mute_muertos: ww.mute_muertos ?? true,
        logros_enabled: ww.logros_enabled ?? true,
        prefix: ww.prefix || 'ww',
        pts_victory: ww.pts_victory ?? 15,
        pts_special_victory: ww.pts_special_victory ?? 50,
        pts_round_alive: ww.pts_round_alive ?? 2,
        pts_survive_end: ww.pts_survive_end ?? 5,
        pts_enabled: ww.pts_enabled ?? true,
        mention_cooldown: ww.mention_cooldown ?? 900,
        channels,
        roles,
      });
    }

    if (section === 'config') {
      // Toda la config vive ahora en la colección unificada `guilds` (anidada).
      const g = await db.collection('guilds').findOne({ _id: guildQuery(guildId) }) || {};
      const ch = g.channels || {};
      const ro = g.roles || {};
      const fl = g.flags || {};

      const token = process.env.DISCORD_BOT_TOKEN;
      let channels = [], roles = [], nickname = null;
      if (token) {
        const headers = { Authorization: `Bot ${token}` };
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers, next: { revalidate: 300 } });
          if (r.ok) channels = (await r.json()).filter(c => [0, 5, 15].includes(c.type)).map(c => ({ id: String(c.id), name: c.name }));
        } catch {}
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers, next: { revalidate: 300 } });
          if (r.ok) roles = (await r.json()).filter(x => x.name !== '@everyone').sort((a, b) => (b.position || 0) - (a.position || 0)).map(x => ({ id: String(x.id), name: x.name }));
        } catch {}
        try {
          const me = await fetch('https://discord.com/api/v10/users/@me', { headers, cache: 'no-store' });
          if (me.ok) {
            const botId = (await me.json()).id;
            const m = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${botId}`, { headers, cache: 'no-store' });
            if (m.ok) { const mem = await m.json(); nickname = mem.nick || mem.user?.global_name || mem.user?.username || null; }
          }
        } catch {}
      }

      const str = v => (v === null || v === undefined) ? null : String(v);
      return NextResponse.json({
        nickname,
        global: fl.global ?? null,
        blchannel: str(ch.blacklist),
        sync: Array.isArray(g.sync) ? g.sync.map(String) : [],
        modlog: str(ch.modlog),
        nick: fl.autonick ?? null,
        whitelist: str(ro.whitelist),
        welcome: str(ch.labotlog),     // canal la-bot-log
        clubsview: str(ch.clubsview),
        punishments: g.punishments || {},
        cumch: str(ch.cumple),
        cumrole: str(ro.cumple),
        eventsrol: str(ro.events),
        channels, roles,
      });
    }

    // Overview
    const userCount = await db.collection('users').countDocuments();
    const clubCount = await db.collection('clubs').countDocuments({ guild_id: Long.fromString(guildId) });
    const modLogCount = await db.collection('mod_cases').countDocuments({ guild_id: Long.fromString(guildId) });
    const blacklistCount = await db.collection('blacklist').countDocuments({ guild_id: Long.fromString(BLACKLIST_SERVER) });

    let discordMemberCount = 0;
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      if (botToken) {
        const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
          headers: { Authorization: `Bot ${botToken}` }, next: { revalidate: 3600 },
        });
        if (res.ok) discordMemberCount = (await res.json()).approximate_member_count || 0;
      }
    } catch {}

    return NextResponse.json({ userCount, clubCount, modLogCount, blacklistCount, discordMemberCount });
  } catch (err) {
    return NextResponse.json({ error: 'DB Error: ' + err.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }
  try {
    const body = await request.json();
    const { action, tag } = body;
    const guildId = process.env.DISCORD_GUILD_ID;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    if (action === 'addClub') {
      const { key } = body;
      if (!tag || !key) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      await db.collection('clubs').updateOne(
        { club_tag: formattedTag, guild_id: Long.fromString(guildId) },
        { $set: { club_tag: formattedTag, club_key: key, club_role: null, club_staff_role: null, guild_id: Long.fromString(guildId) } },
        { upsert: true });
      return NextResponse.json({ success: true });
    }

    if (action === 'removeClub') {
      if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      await db.collection('clubs').deleteOne({ club_tag: formattedTag, guild_id: Long.fromString(guildId) });
      return NextResponse.json({ success: true });
    }

    if (action === 'addBlacklist') {
      const { razon } = body;
      if (!tag || !razon) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      await db.collection('blacklist').updateOne(
        { tag: formattedTag, guild_id: Long.fromString(BLACKLIST_SERVER) },
        { $set: { tag: formattedTag, reason: razon, guild_id: Long.fromString(BLACKLIST_SERVER) } },
        { upsert: true });
      return NextResponse.json({ success: true });
    }

    if (action === 'removeBlacklist') {
      if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      await db.collection('blacklist').deleteOne({ tag: formattedTag, guild_id: Long.fromString(BLACKLIST_SERVER) });
      return NextResponse.json({ success: true });
    }

    if (action === 'setWerewolfConfig') {
      const { werewolfConfig } = body;
      if (!werewolfConfig) return NextResponse.json({ error: 'Configuración faltante' }, { status: 400 });

      let allowed_channels = [];
      if (Array.isArray(werewolfConfig.allowed_channels)) {
        for (const item of werewolfConfig.allowed_channels) {
          if (item) {
            try { allowed_channels.push(Long.fromString(String(item))); } catch {}
          }
        }
      }

      let mention_role_id = null;
      if (werewolfConfig.mention_role_id) {
        try { mention_role_id = Long.fromString(String(werewolfConfig.mention_role_id)); } catch {}
      }

      let canal_anuncios = null;
      if (werewolfConfig.canal_anuncios) {
        try { canal_anuncios = Long.fromString(String(werewolfConfig.canal_anuncios)); } catch {}
      }

      const mute_noche = werewolfConfig.mute_noche === true;
      const mute_votacion = werewolfConfig.mute_votacion === true;
      const mute_muertos = werewolfConfig.mute_muertos === true;
      const logros_enabled = werewolfConfig.logros_enabled === true;
       const pts_enabled = werewolfConfig.pts_enabled === true;
       const prefix = String(werewolfConfig.prefix || 'ww').trim().substring(0, 10);
       const pts_victory = parseInt(werewolfConfig.pts_victory, 10) || 0;
       const pts_special_victory = werewolfConfig.pts_special_victory !== undefined ? (parseInt(werewolfConfig.pts_special_victory, 10) || 0) : 50;
       const pts_round_alive = parseInt(werewolfConfig.pts_round_alive, 10) || 0;
       const pts_survive_end = werewolfConfig.pts_survive_end !== undefined ? (parseInt(werewolfConfig.pts_survive_end, 10) || 0) : 5;
       const mention_cooldown = parseInt(werewolfConfig.mention_cooldown, 10) || 900;

       const res = await db.collection('ww_guilds').updateOne(
         { _id: guildQuery(guildId) },
         {
           $set: {
             allowed_channels,
             mention_role_id,
             canal_anuncios,
             mute_noche,
             mute_votacion,
             mute_muertos,
             logros_enabled,
             prefix,
             pts_victory,
             pts_special_victory,
             pts_round_alive,
             pts_survive_end,
             pts_enabled,
             mention_cooldown,
           }
         },
         { upsert: true }
       );
      return NextResponse.json({ success: res.matchedCount > 0 || res.upsertedCount > 0 });
    }

    // ── Configuración del servidor (colección unificada `guilds`) ───────────
    if (action === 'setServerConfig') {
      const { field, value } = body;
      const PATHS = {
        modlog: 'channels.modlog', welcome: 'channels.labotlog', clubsview: 'channels.clubsview',
        cumch: 'channels.cumple', cumrole: 'roles.cumple', eventsrol: 'roles.events',
      };
      const path = PATHS[field];
      if (!path) return NextResponse.json({ error: 'Campo no editable' }, { status: 400 });
      let newVal = null;
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        try { newVal = Long.fromString(String(value).trim()); }
        catch { return NextResponse.json({ error: 'ID inválido' }, { status: 400 }); }
      }
      const res = await db.collection('guilds').updateOne({ _id: guildQuery(guildId) }, { $set: { [path]: newVal } });
      return NextResponse.json({ success: res.matchedCount > 0 });
    }

    if (action === 'setPunishments') {
      const { punishments } = body;
      const clean = {};
      for (const [k, v] of Object.entries(punishments || {})) {
        const n = parseInt(k, 10);
        if (!Number.isInteger(n) || n < 1) continue;
        if (!v || !['mute', 'ban'].includes(v.type)) continue;
        let dur = v.duration;
        if (dur === '' || dur === undefined) dur = null;
        if (dur !== null) { dur = parseInt(dur, 10); if (Number.isNaN(dur) || dur < 0) dur = null; }
        clean[String(n)] = { type: v.type, duration: dur === null ? null : new Int32(dur) };
      }
      const res = await db.collection('guilds').updateOne({ _id: guildQuery(guildId) }, { $set: { punishments: clean } });
      return NextResponse.json({ success: res.matchedCount > 0 });
    }

    if (action === 'setNickname') {
      const { value } = body;
      const token = process.env.DISCORD_BOT_TOKEN;
      if (!token) return NextResponse.json({ error: 'Falta el token del bot' }, { status: 500 });
      try {
        const me = await fetch('https://discord.com/api/v10/users/@me', { headers: { Authorization: `Bot ${token}` } });
        if (!me.ok) return NextResponse.json({ error: 'No se pudo identificar al bot' }, { status: 502 });
        const botId = (await me.json()).id;
        const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${botId}`, {
          method: 'PATCH',
          headers: { Authorization: `Bot ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ nick: (value && value.trim()) ? value.trim() : null }),
        });
        if (!r.ok) return NextResponse.json({ error: 'Discord rechazó el cambio de apodo (revisa los permisos del bot)' }, { status: 502 });
        return NextResponse.json({ success: true });
      } catch {
        return NextResponse.json({ error: 'Error al cambiar el apodo' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'DB Error: ' + err.message }, { status: 500 });
  }
}
