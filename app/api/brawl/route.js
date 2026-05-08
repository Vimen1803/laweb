import { NextResponse } from 'next/server';

const API_BASE_OFFICIAL = 'https://api.brawlstars.com/v1';
const API_BASE_RNT = 'https://api.rnt.dev';
const TOKEN = process.env.BRAWL_API_TOKEN;

// Dynamic brawler names fetched from Brawlify (cached per process lifecycle)
let _brawlerNamesCache = null;
async function getBrawlerNames() {
  if (_brawlerNamesCache) return _brawlerNamesCache;
  try {
    const res = await fetch('https://api.brawlify.com/v1/brawlers', { next: { revalidate: 86400 } });
    if (res.ok) {
      const data = await res.json();
      const map = {};
      (data.list || []).forEach(b => { map[b.id] = b.name; });
      _brawlerNamesCache = map;
      return map;
    }
  } catch {}
  return {};
}

// Ranked tier names
function rankedTierName(rank) {
  if (!rank) return null;
  const tiers = ['Bronce', 'Plata', 'Oro', 'Diamante', 'Mítico', 'Legendario', 'Pro'];
  const subTiers = ['I', 'II', 'III'];
  const tierIndex = Math.floor((rank - 1) / 3);
  const subIndex = (rank - 1) % 3;
  if (tierIndex >= tiers.length) return tiers[tiers.length - 1];
  return `${tiers[tierIndex]} ${subTiers[subIndex]}`;
}

function mapPlayer(r, brawlerNames = {}) {
  if (!r) return null;
  const getStat = (name) => r.stats?.find(s => s.name === name)?.value || 0;

  const expLevel = getStat('ExpLevel') || Math.max(1, Math.floor((getStat('FamePoints') + getStat('LegacyExpPoints') + getStat('ExpPoints')) / 1000));
  const wins3v3 = getStat('3v3Victories') || getStat('3vs3Victories');
  const currentRanked = getStat('CurrentRanked');
  const highestRanked = getStat('HighestRanked');

  return {
    tag: r.account_tag?.tag,
    name: r.name,
    nameColor: '0xff' + (r.name_color?.toString(16) || '000000'),
    icon: { id: r.profile_avatar },
    trophies: getStat('Trophies'),
    highestTrophies: getStat('HighestTrophies'),
    expLevel,
    '3vs3Victories': wins3v3,
    soloVictories: getStat('SoloVictories'),
    duoVictories: getStat('DuoVictories'),
    accountCreationYear: getStat('AccountCreationYear') || null,
    totalPrestigeLevel: (r.brawlers || []).reduce((sum, b) => sum + Math.floor((b.trophies || 0) / 1000), 0),
    maxWinStreak: r.max_winstreak || 0,
    rankedRank: currentRanked || null,
    rankedRankName: rankedTierName(currentRanked),
    highestAllTimeRankedRank: highestRanked || null,
    highestAllTimeRankedRankName: rankedTierName(highestRanked),
    club: r.is_in_alliance && r.alliance ? { name: r.alliance.name, tag: r.alliance.id.tag } : null,
    brawlers: r.brawlers?.map(b => ({
      id: b.brawler_id,
      name: brawlerNames[b.brawler_id] || `#${b.brawler_id}`,
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
  // role: 1=president, 2=vicePresident, 3=senior, 4=member
  const roleMap = { 1: 'member', 2: 'president', 3: 'senior', 4: 'vicePresident' };
  const typeMap = { 1: 'ABIERTO', 2: 'CON INVITACIÓN', 3: 'CERRADO' };
  return {
    tag: c.id?.tag,
    name: c.name,
    description: c.description,
    type: typeMap[c.type] || 'CERRADO',
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

    const [res, brawlerNames] = await Promise.all([
      fetch(endpoint, { next: { revalidate: 120 } }),
      type === 'player' ? getBrawlerNames() : Promise.resolve({})
    ]);
    const data = await res.json();

    if (!res.ok || !data.result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const mappedData = type === 'player' ? mapPlayer(data.result, brawlerNames) : mapClub(data.result);
    return NextResponse.json(mappedData);
  } catch (err) {
    return NextResponse.json({ error: 'API Error' }, { status: 500 });
  }
}
