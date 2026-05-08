import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Long } from 'mongodb';

export async function GET() {
  try {
    let clubs = [];

    // Fetch from DB
    try {
      const client = await clientPromise;
      const db = client.db('labot');
      const guildId = process.env.DISCORD_GUILD_ID;
      
      const dbClubs = await db.collection('clubes').find({ guild_id: Long.fromString(guildId) }).toArray();

      if (dbClubs.length > 0) {
        // Deduplicate by tag
        const uniqueClubs = {};
        dbClubs.forEach(c => {
          if (!uniqueClubs[c.club_tag]) {
            uniqueClubs[c.club_tag] = { tag: c.club_tag, key: c.club_key };
          }
        });
        clubs = Object.values(uniqueClubs);
      }
    } catch (e) {
      console.error('DB fetch error:', e);
    }

    if (clubs.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch live data from BS API for each club using rnt.dev
    const results = await Promise.allSettled(
      clubs.map(async (c) => {
        const cleanTag = c.tag.replace('#', '').toUpperCase();
        try {
          const res = await fetch(`https://api.rnt.dev/alliances/get?tag=${cleanTag}`, {
            next: { revalidate: 300 } // Cache for 5 minutes
          });
          const data = await res.json();
          if (res.ok && data.result) {
            const r = data.result;
            return {
              tag: r.id?.tag,
              name: r.name,
              badgeId: r.badge,
              trophies: r.trophies,
              requiredTrophies: r.minimum_trophies,
              members: r.members?.map(m => ({ tag: m.tag.tag, name: m.name })) || [],
              key: c.key
            };
          }
        } catch (e) {}
        return null;
      })
    );

    const liveClubs = results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value)
      .sort((a, b) => (b.trophies || 0) - (a.trophies || 0));

    if (liveClubs.length > 0) {
      return NextResponse.json(liveClubs);
    }

    return NextResponse.json(clubs);
  } catch (err) {
    console.error('Clubs API error:', err);
    return NextResponse.json([], { status: 500 });
  }
}
