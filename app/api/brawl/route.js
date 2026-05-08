import { NextResponse } from 'next/server';

const API_BASE_OFFICIAL = 'https://api.brawlstars.com/v1';
const API_BASE_RNT = 'https://api.rnt.dev';
const TOKEN = process.env.BRAWL_API_TOKEN;

// Brawler ID → Name map (source: official IDs)
const BRAWLER_NAMES = {
  16000000: 'Shelly', 16000001: 'Colt', 16000002: 'Bull', 16000003: 'Brock',
  16000004: 'Rico', 16000005: 'Spike', 16000006: 'Barley', 16000007: 'Jessie',
  16000008: 'Nita', 16000009: 'Dynamike', 16000010: 'El Primo', 16000011: 'Mortis',
  16000012: 'Crow', 16000013: 'Poco', 16000014: 'Bo', 16000015: 'Piper',
  16000016: 'Pam', 16000017: 'Tara', 16000018: 'Darryl', 16000019: 'Penny',
  16000020: 'Frank', 16000021: 'Gene', 16000022: 'Tick', 16000023: '8-Bit',
  16000024: 'Leon', 16000025: 'Rosa', 16000026: 'Carl', 16000027: 'Bibi',
  16000028: 'Sandy', 16000029: 'Bea', 16000030: 'Emz', 16000031: 'Mr. P',
  16000032: 'Max', 16000033: 'Jacky', 16000034: 'Gale', 16000035: 'Nani',
  16000036: 'Sprout', 16000037: 'Surge', 16000038: 'Colette', 16000039: 'Amber',
  16000040: 'Lou', 16000041: 'Byron', 16000042: 'Squeak', 16000043: 'Lola',
  16000044: 'Ruffs', 16000045: 'Stu', 16000046: 'Belle', 16000047: 'Edgar',
  16000048: 'Griff', 16000049: 'Grom', 16000050: 'Bonnie', 16000051: 'Fang',
  16000052: 'Eve', 16000053: 'Janet', 16000054: 'Otis', 16000055: 'Sam',
  16000056: 'Buster', 16000057: 'Chester', 16000058: 'Gray', 16000059: 'Mandy',
  16000060: 'R-T', 16000061: 'Maisie', 16000062: 'Hank', 16000063: 'Pearl',
  16000064: 'Larry & Lawrie', 16000065: 'Buzz', 16000066: 'Angelo', 16000067: 'Cordelius',
  16000068: 'Doug', 16000069: 'Chuck', 16000070: 'Charlie', 16000071: 'Lily',
  16000072: 'Berry', 16000073: 'Draco', 16000074: 'Clancy', 16000075: 'Meeple',
  16000076: 'Melodie', 16000077: 'Kenji', 16000078: 'Juju', 16000079: 'Shade',
  16000080: 'Finx', 16000081: 'Kit', 16000082: 'Meg', 16000083: 'Ash',
  16000084: 'Lumi', 16000085: 'Kaze', 16000086: 'Surf', 16000087: 'Larry',
  16000088: 'Willow', 16000089: 'Ollie', 16000090: 'Gunter', 16000091: 'Buzz Lightyear',
  16000092: 'Mico', 16000093: 'Lily', 16000094: 'Spen', 16000095: 'Gus',
  16000096: 'Buster', 16000097: 'Cactus', 16000098: 'Rico', 16000099: 'Hank',
  16000100: 'Rex', 16000101: 'Amp', 16000102: 'Buster', 16000103: 'Unknown',
  16000104: 'Unknown',
};

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

function mapPlayer(r) {
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
    totalPrestigeLevel: getStat('Prestige'),
    maxWinStreak: r.max_winstreak || 0,
    rankedRank: currentRanked || null,
    rankedRankName: rankedTierName(currentRanked),
    highestAllTimeRankedRank: highestRanked || null,
    highestAllTimeRankedRankName: rankedTierName(highestRanked),
    club: r.is_in_alliance && r.alliance ? { name: r.alliance.name, tag: r.alliance.id.tag } : null,
    brawlers: r.brawlers?.map(b => ({
      id: b.brawler_id,
      name: BRAWLER_NAMES[b.brawler_id] || `Brawler ${b.brawler_id}`,
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
  const typeMap = { 2: 'ABIERTO', 3: 'CON INVITACIÓN', 1: 'CERRADO' };
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
