import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Long, Int32 } from 'mongodb';
import { auth } from '@/lib/auth';

// Verifica que quien llama es administrador. El panel /admin comprueba esto en
// el cliente, pero la API DEBE protegerse también en el servidor.
async function ensureAdmin() {
  const session = await auth();
  return !!session?.isAdmin;
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
    const db = client.db('labot');

    if (section === 'modlogs') {
      const logs = await db.collection('mod_log')
        .find({ guild_id: Long.fromString(guildId) })
        .sort({ time: -1 })
        .limit(50)
        .toArray();
      
      for (let log of logs) {
        if (log.member_id) {
          const mName = await db.collection('mod_names').findOne({ guild_id: Long.fromString(guildId), user_id: log.member_id });
          log.memberName = mName && mName.log_nicks && mName.log_nicks.length > 0 ? mName.log_nicks[mName.log_nicks.length - 1] : 'Usuario';
        }
        if (log.moderator) {
          const modName = await db.collection('mod_names').findOne({ guild_id: Long.fromString(guildId), user_id: log.moderator });
          log.modName = modName && modName.log_nicks && modName.log_nicks.length > 0 ? modName.log_nicks[modName.log_nicks.length - 1] : 'Moderador';
        }
        if (log.member_id?.toString) log.member_id = log.member_id.toString();
        if (log.moderator?.toString) log.moderator = log.moderator.toString();
        if (log.guild_id?.toString) log.guild_id = log.guild_id.toString();
        if (log._id?.toString) log._id = log._id.toString();
      }
      return NextResponse.json(logs);
    }

    if (section === 'blacklist') {
      // NOTA: la blacklist usa intencionadamente este server_id fijo (servidor
      // distinto al principal); no debe sustituirse por DISCORD_GUILD_ID.
      const bl = await db.collection('blacklist')
        .find({ server_id: Long.fromString('724202847822151680') })
        .toArray();
      
      for (let i = 0; i < bl.length; i += 10) {
          const chunk = bl.slice(i, i + 10);
          await Promise.all(chunk.map(async (b) => {
            try {
              const cleanTag = b.tag.replace('#', '').toUpperCase();
              const res = await fetch(`https://api.rnt.dev/profile?tag=${cleanTag}`, {
                next: { revalidate: 3600 }
              });
              const data = await res.json();
              if (res.ok && data.result && data.result.name) {
                b.name = data.result.name;
              } else {
                b.name = 'Desconocido';
              }
            } catch {
              b.name = 'Desconocido';
            }
          }));
        }

      return NextResponse.json(bl);
    }

    if (section === 'usercheck' && userId) {
      let uidLong;
      try {
        uidLong = Long.fromString(userId);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
      }
      
      const account = await db.collection('mod_accounts').findOne({
        guild_id: Long.fromString(guildId),
        user_id: uidLong,
      });
      const history = await db.collection('mod_log')
        .find({ guild_id: Long.fromString(guildId), member_id: uidLong })
        .sort({ time: -1 })
        .toArray();
      
      for (let h of history) {
        if (h.member_id?.toString) h.member_id = h.member_id.toString();
        if (h.moderator?.toString) h.moderator = h.moderator.toString();
        if (h.guild_id?.toString) h.guild_id = h.guild_id.toString();
        if (h._id?.toString) h._id = h._id.toString();
      }

      const userInfo = await db.collection('users').findOne({ member_id: uidLong });

      let discordUser = null;
      try {
        const botToken = process.env.DISCORD_BOT_TOKEN;
        if (botToken) {
          const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { Authorization: `Bot ${botToken}` },
            next: { revalidate: 3600 }
          });
          if (res.ok) {
            discordUser = await res.json();
          }
        }
      } catch (e) {}

      return NextResponse.json({ account, history, userInfo, discordUser });
    }

    if (section === 'config') {
      // La mayoría de ajustes viven en `servers`, pero `modlog` y `punishments`
      // los lee el bot de `mod_config`.
      const server = await db.collection('servers').findOne({
        guild_id: { $in: [Long.fromString(guildId), guildId] },
      }) || {};
      const modConfig = await db.collection('mod_config').findOne({
        guild_id: { $in: [Long.fromString(guildId), guildId] },
      }) || {};

      const token = process.env.DISCORD_BOT_TOKEN;
      let channels = [];
      let roles = [];
      let nickname = null;

      if (token) {
        const headers = { Authorization: `Bot ${token}` };
        // Canales de texto/anuncios/foro para los desplegables.
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers, next: { revalidate: 300 } });
          if (r.ok) {
            channels = (await r.json())
              .filter(c => [0, 5, 15].includes(c.type))
              .map(c => ({ id: String(c.id), name: c.name }));
          }
        } catch {}
        // Roles para los desplegables (de mayor a menor jerarquía, sin @everyone).
        try {
          const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers, next: { revalidate: 300 } });
          if (r.ok) {
            roles = (await r.json())
              .filter(x => x.name !== '@everyone')
              .sort((a, b) => (b.position || 0) - (a.position || 0))
              .map(x => ({ id: String(x.id), name: x.name }));
          }
        } catch {}
        // Apodo actual del bot en el servidor.
        try {
          const me = await fetch('https://discord.com/api/v10/users/@me', { headers, cache: 'no-store' });
          if (me.ok) {
            const botId = (await me.json()).id;
            const m = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${botId}`, { headers, cache: 'no-store' });
            if (m.ok) {
              const member = await m.json();
              nickname = member.nick || member.user?.global_name || member.user?.username || null;
            }
          }
        } catch {}
      }

      const str = v => (v === null || v === undefined) ? null : String(v);
      return NextResponse.json({
        nickname,
        global: server.global ?? null,
        blchannel: str(server.blchannel),
        sync: Array.isArray(server.sync) ? server.sync.map(String) : (server.sync != null ? [String(server.sync)] : []),
        modlog: str(modConfig.modlog),
        nick: server.nick ?? null,
        whitelist: str(server.whitelist),
        welcome: str(server.welcome),
        clubsview: str(server.clubsview),
        punishments: modConfig.punishments || {},
        cumch: str(server.cumch),
        cumrole: str(server.cumrole),
        eventsrol: str(server.eventsrol),
        channels,
        roles,
      });
    }

    if (section === 'users') {
      const users = await db.collection('users')
        .find({})
        .limit(100)
        .toArray();
      return NextResponse.json(users);
    }

    // Overview
    const userCount = await db.collection('users').countDocuments();
    const clubCount = await db.collection('clubes').countDocuments({
      guild_id: Long.fromString(guildId)
    });
    const modLogCount = await db.collection('mod_log').countDocuments({
      guild_id: Long.fromString(guildId),
    });
    const blacklistCount = await db.collection('blacklist').countDocuments({
      server_id: Long.fromString('724202847822151680')
    });
    
    let discordMemberCount = 0;
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      if (botToken) {
        const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
          headers: { Authorization: `Bot ${botToken}` },
          next: { revalidate: 3600 }
        });
        if (res.ok) {
          const d = await res.json();
          discordMemberCount = d.approximate_member_count || 0;
        }
      }
    } catch {}

    return NextResponse.json({
      userCount, clubCount, modLogCount, blacklistCount, discordMemberCount
    });
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
    const { action, tag, key } = body;
    const client = await clientPromise;
    const db = client.db('labot');

    if (action === 'addClub') {
      if (!tag || !key) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      const guildId = process.env.DISCORD_GUILD_ID;
      
      await db.collection('clubes').updateOne(
        { club_tag: formattedTag, guild_id: Long.fromString(guildId) },
        { 
          $set: { 
            club_tag: formattedTag, 
            club_key: key, 
            club_role: null,
            club_staff_role: null,
            guild_id: Long.fromString(guildId),
          } 
        },
        { upsert: true }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'removeClub') {
      if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      const guildId = process.env.DISCORD_GUILD_ID;
      
      await db.collection('clubes').deleteOne({ club_tag: formattedTag, guild_id: Long.fromString(guildId) });
      return NextResponse.json({ success: true });
    }

    if (action === 'addBlacklist') {
      const { tag, razon } = body;
      if (!tag || !razon) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      const serverIdStr = '724202847822151680';
      
      await db.collection('blacklist').updateOne(
        { tag: formattedTag, server_id: Long.fromString(serverIdStr) },
        { $set: { tag: formattedTag, razon, server_id: Long.fromString(serverIdStr) } },
        { upsert: true }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'removeBlacklist') {
      if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });
      let formattedTag = tag.toUpperCase();
      if (!formattedTag.startsWith('#')) formattedTag = '#' + formattedTag;
      const serverIdStr = '724202847822151680';
      
      await db.collection('blacklist').deleteOne({ tag: formattedTag, server_id: Long.fromString(serverIdStr) });
      return NextResponse.json({ success: true });
    }

    // ── Configuración del servidor (colección `servers`) ───────────────────
    if (action === 'setServerConfig') {
      const { field, value } = body;
      const editable = ['modlog', 'welcome', 'clubsview', 'cumch', 'cumrole', 'eventsrol'];
      if (!editable.includes(field)) {
        return NextResponse.json({ error: 'Campo no editable' }, { status: 400 });
      }
      const guildId = process.env.DISCORD_GUILD_ID;
      let newVal = null;
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        try {
          newVal = Long.fromString(String(value).trim());
        } catch {
          return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }
      }
      // `modlog` vive en mod_config; el resto en servers.
      const collection = field === 'modlog' ? 'mod_config' : 'servers';
      const res = await db.collection(collection).updateOne(
        { guild_id: { $in: [Long.fromString(guildId), guildId] } },
        { $set: { [field]: newVal } }
      );
      return NextResponse.json({ success: res.matchedCount > 0 });
    }

    if (action === 'setPunishments') {
      const { punishments } = body;
      const guildId = process.env.DISCORD_GUILD_ID;
      const clean = {};
      for (const [k, v] of Object.entries(punishments || {})) {
        const n = parseInt(k, 10);
        if (!Number.isInteger(n) || n < 1) continue;
        if (!v || !['mute', 'ban'].includes(v.type)) continue;
        let dur = v.duration;
        if (dur === '' || dur === undefined) dur = null;
        if (dur !== null) {
          dur = parseInt(dur, 10);
          if (Number.isNaN(dur) || dur < 0) dur = null;
        }
        clean[String(n)] = { type: v.type, duration: dur === null ? null : new Int32(dur) };
      }
      // Las sanciones por strike las lee el bot de mod_config.
      const res = await db.collection('mod_config').updateOne(
        { guild_id: { $in: [Long.fromString(guildId), guildId] } },
        { $set: { punishments: clean } }
      );
      return NextResponse.json({ success: res.matchedCount > 0 });
    }

    if (action === 'setNickname') {
      const { value } = body;
      const token = process.env.DISCORD_BOT_TOKEN;
      const guildId = process.env.DISCORD_GUILD_ID;
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
