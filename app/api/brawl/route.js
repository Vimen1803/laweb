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

  // ExpPoints from the API - approximate XP level (officially each level ~1000 xp avg)
  const famePoints = getStat('FamePoints');
  const legacyExp = getStat('LegacyExpPoints');
  const expLevel = Math.max(1, Math.floor((famePoints + legacyExp) / 1000));

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
    '3vs3Victories': getStat('3v3Victories'),
    soloVictories: getStat('SoloVictories'),
    duoVictories: getStat('DuoVictories'),
    accountCreationYear: getStat('AccountCreationYear') || null,
    totalPrestigeLevel: (r.brawlers || []).reduce((sum, b) => sum + Math.floor(b.trophies / 1000), 0),
    maxWinStreak: r.max_winstreak || 0,
    rankedRank: currentRanked || null,
    rankedRankName: rankedTierName(currentRanked),
    highestAllTimeRankedRank: highestRanked || null,
    highestAllTimeRankedRankName: rankedTierName(highestRanked),
    club: r.is_in_alliance && r.alliance ? { name: r.alliance.name, tag: r.alliance.id.tag } : null,
    brawlers: r.brawlers?.map(b => {
      // Rank calculation from trophies (official breakpoints)
      const t = b.trophies || 0;
      let rank = 1;
      const thresholds = [0,10,20,30,40,60,80,100,130,160,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1600,1700,1800];
      for (let i = 0; i < thresholds.length; i++) { if (t >= thresholds[i]) rank = i + 1; }
      const prestige = Math.max(0, Math.floor((rank - 30) / 5));

      return {
        id: b.brawler_id,
        name: brawlerNames[b.brawler_id] || `#${b.brawler_id}`,
        power: b.power_level,
        rank,
        prestige,
        trophies: b.trophies,
        highestTrophies: b.highest_trophies,
        mastery: b.mastery_points || null,
        starPowers: (b.star_powers || b.starPowers || []).map(sp => ({ id: sp.id || sp.star_power_id, name: sp.name })),
        gadgets: (b.gadgets || []).map(g => ({ id: g.id || g.gadget_id, name: g.name })),
        gears: (b.gears || []).map(g => ({ id: g.id || g.gear_id, name: g.name, level: g.level })),
        hyperCharge: b.hyper_charge || b.hyperCharge || null,
      };
    }) || []
  };
}

function mapClub(c) {
  if (!c) return null;
  // role: 1=president, 2=vicePresident, 3=senior, 4=member
  const roleMap = { 1: 'member', 2: 'president', 3: 'senior', 4: 'vicePresident' };
  const typeMap = { 1: 'ABIERTO', 2: 'INVITACIÓN', 3: 'CERRADO' };
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
