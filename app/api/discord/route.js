import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const guildId = process.env.DISCORD_GUILD_ID || '460550486257565697';
    const token = process.env.DISCORD_BOT_TOKEN;
    const baseUrl = new URL(request.url).origin;

    let memberCount = null;

    // Strategy 1: Bot token
    if (token && guildId) {
      try {
        const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
          headers: { Authorization: `Bot ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          memberCount = data.approximate_member_count || data.member_count || null;
        }
      } catch {}
    }

    // Strategy 2: Public invite
    if (!memberCount) {
      try {
        const inviteRes = await fetch('https://discord.com/api/v10/invites/DbRUker?with_counts=true');
        if (inviteRes.ok) {
          const inviteData = await inviteRes.json();
          memberCount = inviteData.approximate_member_count || null;
        }
      } catch {}
    }

    // Get BS members from clubs API
    let bsMembers = 0;
    let clubCount = 0;
    try {
      const clubsRes = await fetch(`${baseUrl}/api/clubs`);
      if (clubsRes.ok) {
        const clubsData = await clubsRes.json();
        if (Array.isArray(clubsData)) {
          clubCount = clubsData.filter(c => c.members).length || clubsData.length;
          bsMembers = clubsData.reduce((sum, c) => sum + (c.members?.length || 0), 0);
        }
      }
    } catch {}

    return NextResponse.json({
      memberCount,
      bsMembers,
      clubCount,
    });
  } catch {
    return NextResponse.json({ memberCount: null, bsMembers: 0, clubCount: 0 });
  }
}
