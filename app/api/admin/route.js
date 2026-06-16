import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Long } from 'mongodb';
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
      const config = await db.collection('mod_config').findOne({
        guild_id: parseInt(guildId) || guildId,
      }) || {};

      // Resolvemos los IDs a nombres legibles vía la API de Discord.
      const token = process.env.DISCORD_BOT_TOKEN;
      let modlogName = null;
      let muteroleName = null;
      if (token) {
        if (config.modlog) {
          try {
            const r = await fetch(`https://discord.com/api/v10/channels/${config.modlog}`, {
              headers: { Authorization: `Bot ${token}` },
              next: { revalidate: 600 },
            });
            if (r.ok) modlogName = (await r.json()).name || null;
          } catch {}
        }
        if (config.muterole) {
          try {
            const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
              headers: { Authorization: `Bot ${token}` },
              next: { revalidate: 600 },
            });
            if (r.ok) {
              const roles = await r.json();
              const role = (roles || []).find(x => String(x.id) === String(config.muterole));
              if (role) muteroleName = role.name;
            }
          } catch {}
        }
      }

      return NextResponse.json({
        modlog: config.modlog ? String(config.modlog) : null,
        muterole: config.muterole ? String(config.muterole) : null,
        punishments: config.punishments || {},
        modlogName,
        muteroleName,
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

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'DB Error: ' + err.message }, { status: 500 });
  }
}
