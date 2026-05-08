import { NextResponse } from 'next/server';

const API_BASE_OFFICIAL = 'https://api.brawlstars.com/v1';
const API_BASE_RNT = 'https://api.rnt.dev';
const TOKEN = process.env.BRAWL_API_TOKEN;

function mapPlayer(r) {
  if (!r) return null;
  const getStat = (name) => r.stats?.find(s => s.name === name)?.value || 0;
  return {
    tag: r.account_tag?.tag,
    name: r.name,
    nameColor: '0xff' + (r.name_color?.toString(16) || '000000'),
    icon: { id: r.profile_avatar },
    trophies: getStat('Trophies'),
    highestTrophies: getStat('HighestTrophies'),
    expLevel: 100, // default fallback
    '3v3Victories': getStat('3v3Victories'),
    soloVictories: getStat('SoloVictories'),
    duoVictories: getStat('DuoVictories'),
    club: r.is_in_alliance && r.alliance ? { name: r.alliance.name, tag: r.alliance.id.tag } : null,
    brawlers: r.brawlers?.map(b => ({
      id: b.brawler_id,
      name: "Brawler", // API does not provide names
      power: b.power_level,
      rank: b.trophies >= 1000 ? 30 : b.trophies >= 750 ? 25 : b.trophies >= 500 ? 20 : 10,
      trophies: b.trophies,
      highestTrophies: b.highest_trophies,
      starPowers: [],
      gadgets: []
    })) || []
  };
}

function mapClub(c) {
  if (!c) return null;
  const roleMap = { 1: 'president', 2: 'vicePresident', 3: 'senior', 4: 'member' };
  return {
    tag: c.id?.tag,
    name: c.name,
    description: c.description,
    type: c.type === 2 ? 'open' : c.type === 3 ? 'inviteOnly' : 'closed',
    badgeId: c.badge,
    requiredTrophies: c.minimum_trophies,
    trophies: c.trophies,
    members: c.members?.map(m => ({
      tag: m.tag.tag,
      name: m.name,
      role: roleMap[m.role] || 'member',
      trophies: m.trophies,
      nameColor: '0xff' + (m.name_color?.toString(16) || '000000'),
      icon: { id: m.profile_avatar }
    })) || []
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  let tag = searchParams.get('tag');
  const country = searchParams.get('country');

  if (type === 'clubRanking') {
    try {
      const countryCode = country === 'global' ? 'global' : (country || 'ES');
      const endpoint = `${API_BASE_OFFICIAL}/rankings/${countryCode}/clubs`;
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 600 },
      });
      if (!res.ok) return NextResponse.json({ items: [] });
      const data = await res.json();
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ items: [] });
    }
  }

  if (!tag || !type) {
    return NextResponse.json({ error: 'Missing tag or type' }, { status: 400 });
  }

  tag = tag.replace('#', '').toUpperCase();
  
  try {
    const endpoint = type === 'player'
      ? `${API_BASE_RNT}/profile?tag=${tag}`
      : `${API_BASE_RNT}/alliances/get?tag=${tag}`;

    const res = await fetch(endpoint, { next: { revalidate: 120 } });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const mappedData = type === 'player' ? mapPlayer(data.result) : mapClub(data.result);
    return NextResponse.json(mappedData);
  } catch (err) {
    return NextResponse.json({ error: 'API Error' }, { status: 500 });
  }
}
