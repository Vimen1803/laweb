import { NextResponse } from 'next/server';

const API_BASE = 'https://api.brawlstars.com/v1';
const TOKEN = process.env.BRAWL_API_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  let tag = searchParams.get('tag');
  const country = searchParams.get('country');

  if (type === 'clubRanking') {
    // Club rankings endpoint
    try {
      const countryCode = country === 'global' ? 'global' : (country || 'ES');
      const endpoint = `${API_BASE}/rankings/${countryCode}/clubs`;
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
  const encodedTag = encodeURIComponent(`#${tag}`);

  try {
    const endpoint = type === 'player'
      ? `${API_BASE}/players/${encodedTag}`
      : `${API_BASE}/clubs/${encodedTag}`;

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.message || 'Not found' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'API Error' }, { status: 500 });
  }
}
