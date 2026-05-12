'use client';
import { useState, useEffect } from 'react';
import { UsersIcon, StarIcon, BuildingLibraryIcon, ClipboardDocumentListIcon, ClockIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function roleName(r) {
  const m = { president: 'Presidente', vicePresident: 'Vicepresidente', senior: 'Veterano', member: 'Miembro' };
  return m[r] || r;
}
function roleColor(r) {
  const m = { president: '#c9a84c', vicePresident: '#e67e22', senior: '#3498db' };
  return m[r] || 'var(--text-muted)';
}
function trophyColor(t) {
  if (t >= 50000) return '#e74c3c';
  if (t >= 30000) return '#c9a84c';
  if (t >= 15000) return '#9b59b6';
  if (t >= 5000) return '#3498db';
  return 'var(--text-secondary)';
}

function brawlerIcon(brawler) {
  const id = brawler.id;
  return `https://cdn.brawlify.com/brawlers/borderless/${id}.png`;
}

function clubBadgeUrl(badgeId) {
  if (!badgeId) return null;
  return `https://cdn.brawlify.com/club-badges/regular/${badgeId}.png`;
}

export default function BrawlStarsPage() {
  const [tab, setTab] = useState('profile');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [clubsData, setClubsData] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);
  const [rankings, setRankings] = useState({ es: {}, global: {} });
  const [myBrawlInfo, setMyBrawlInfo] = useState(null);
  const [saveTagInput, setSaveTagInput] = useState('');
  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    fetch('/api/user/brawl')
      .then(res => res.json())
      .then(data => {
        if (data) setMyBrawlInfo(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (tab === 'clubs') loadClubs();
  }, [tab]);

  async function loadClubs() {
    setLoadingClubs(true);
    try {
      const res = await fetch('/api/clubs');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Clubs already come with full BS API data from the clubs route
        const clubs = data.filter(c => c.trophies).sort((a, b) => (b.trophies || 0) - (a.trophies || 0));
        setClubsData(clubs);
        
        // Fetch rankings
        try {
          const [esRes, glRes] = await Promise.all([
            fetch('/api/brawl?type=clubRanking&country=ES'),
            fetch('/api/brawl?type=clubRanking&country=global'),
          ]);
          const esRank = {};
          const glRank = {};
          if (esRes.ok) {
            const esData = await esRes.json();
            (esData.items || []).forEach((c, i) => { esRank[c.tag] = i + 1; });
          }
          if (glRes.ok) {
            const glData = await glRes.json();
            (glData.items || []).forEach((c, i) => { glRank[c.tag] = i + 1; });
          }
          setRankings({ es: esRank, global: glRank });
        } catch {}
      }
    } catch {}
    setLoadingClubs(false);
  }

  async function performSearch(type, searchTag) {
    if (!searchTag.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`/api/brawl?type=${type}&tag=${encodeURIComponent(searchTag)}`);
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { 
        setResult(data); 
        
        if (type === 'player' && data.club?.tag) {
          fetch(`/api/brawl?type=club&tag=${encodeURIComponent(data.club.tag)}`)
            .then(r => r.json())
            .then(cData => {
              if (cData && !cData.error && cData.badgeId) {
                setResult(prev => {
                  if (prev && prev.tag === data.tag && prev.club) {
                    return { ...prev, club: { ...prev.club, badgeId: cData.badgeId } };
                  }
                  return prev;
                });
              }
            }).catch(() => {});
        }

        if (type === 'club') {
          // Use in-memory rankings first (loaded when browsing LA Spain clubs tab)
          const memES = rankings.es[data.tag] || null;
          const memGL = rankings.global[data.tag] || null;
          if (memES || memGL) {
            setResult(prev => ({ ...prev, rankingES: memES, rankingGlobal: memGL }));
          } else {
            // Fallback: try fetching from official API (may fail if token/IP mismatch)
            Promise.all([
              fetch('/api/brawl?type=clubRanking&country=ES'),
              fetch('/api/brawl?type=clubRanking&country=global')
            ]).then(async ([esRes, glRes]) => {
              const esR = esRes.ok ? await esRes.json() : {};
              const glR = glRes.ok ? await glRes.json() : {};
              const esIdx = (esR.items || []).findIndex(c => c.tag === data.tag);
              const glIdx = (glR.items || []).findIndex(c => c.tag === data.tag);
              if (esIdx !== -1 || glIdx !== -1) {
                setResult(prev => ({
                  ...prev,
                  rankingES: esIdx !== -1 ? esIdx + 1 : null,
                  rankingGlobal: glIdx !== -1 ? glIdx + 1 : null
                }));
              }
            }).catch(() => {});
          }
        }
      }
    } catch { setError('Error al buscar. Verifica el tag.'); }
    setLoading(false);
  }

  async function handleSearch(e) {
    e.preventDefault();
    const type = tab === 'profile' ? 'player' : 'club';
    await performSearch(type, tag);
  }

  async function handleSaveAccount(e) {
    e.preventDefault();
    if (!saveTagInput.trim()) return;
    setSavingAccount(true);
    try {
      const res = await fetch('/api/user/brawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: saveTagInput })
      });
      const data = await res.json();
      if (data.success) {
        // Reload info
        const infoRes = await fetch('/api/user/brawl');
        const infoData = await infoRes.json();
        setMyBrawlInfo(infoData);
        setTag(data.tag);
        setTab('profile');
        performSearch('player', data.tag);
      } else {
        setError(data.error || 'Error al guardar la cuenta');
      }
    } catch {
      setError('Error de conexión');
    }
    setSavingAccount(false);
  }

  const totalPrestiges = result?.brawlers?.reduce((sum, b) => {
    // Prestige = stars above rank 35 (each prestige is rank 35+)
    const starPowers = b.starPowers?.length || 0;
    return sum + (b.rank >= 35 ? Math.floor((b.rank - 30) / 5) : 0);
  }, 0) || 0;

  return (
    <section className="section">
      <h1 className="section-title">Brawl Stars</h1>
      <p className="section-subtitle">Busca perfiles de jugadores, información de clubes y más</p>

      <div className="brawl-tabs">
        {[
          { id: 'profile', label: <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><UsersIcon style={{ width: 18, height: 18 }} /> Buscar Perfil</span> },
          { id: 'club', label: <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BuildingLibraryIcon style={{ width: 18, height: 18 }} /> Buscar Club</span> },
          { id: 'clubs', label: <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ClipboardDocumentListIcon style={{ width: 18, height: 18 }} /> Clubes LA Spain</span> },
        ].map(t => (
          <button key={t.id} className={`brawl-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => { setTab(t.id); setResult(null); setError(''); setTag(''); }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      {(tab === 'profile' || tab === 'club') && (
        <>
          {myBrawlInfo && myBrawlInfo.loggedIn && myBrawlInfo.tag && tab !== 'clubs' && (
            <div className="bs-quick-buttons" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => {
                setTab('profile');
                setTag(myBrawlInfo.tag);
                performSearch('player', myBrawlInfo.tag);
              }} style={{ background: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', minWidth: '200px' }}>
                <UsersIcon style={{ width: 18, height: 18 }} /> Ver Mi Perfil
              </button>
              {myBrawlInfo.club && (
                <button className="btn-secondary" onClick={() => {
                  setTab('club');
                  setTag(myBrawlInfo.club.tag);
                  performSearch('club', myBrawlInfo.club.tag);
                }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', minWidth: '200px' }}>
                  <BuildingLibraryIcon style={{ width: 18, height: 18 }} /> Ver Mi Club
                </button>
              )}
            </div>
          )}

          {myBrawlInfo && myBrawlInfo.loggedIn && !myBrawlInfo.tag && tab !== 'clubs' && (
            <div className="card" style={{ marginBottom: '20px', padding: '1.5rem', textAlign: 'center', background: 'var(--bg-card-hover)' }}>
              <h3 style={{ marginBottom: '10px', color: 'var(--accent-orange)' }}>Aún no tienes cuenta guardada</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Guarda tu Player Tag para acceder rápidamente a tu perfil y club en el futuro.
              </p>
              <form onSubmit={handleSaveAccount} className="search-box" style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', alignItems: 'stretch' }}>
                <input type="text" value={saveTagInput} onChange={e => setSaveTagInput(e.target.value)}
                  placeholder="Tu Tag (ej: #8GRCQK)" style={{ flex: 1, padding: '12px', borderRadius: '12px', margin: 0 }} />
                <button type="submit" className="btn-primary" disabled={savingAccount} style={{ padding: '12px 30px', borderRadius: '12px', minWidth: '150px', margin: 0 }}>
                  {savingAccount ? 'Guardando...' : 'Guardar'}
                </button>
              </form>
            </div>
          )}

          {(!myBrawlInfo || !myBrawlInfo.loggedIn) && tab !== 'clubs' && (
            <div className="card" style={{ marginBottom: '20px', padding: '1.5rem', textAlign: 'center', background: 'var(--bg-card-hover)' }}>
              <h3 style={{ marginBottom: '10px', color: 'var(--accent-orange)' }}>Inicia sesión para guardar tu cuenta</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Vincula tu cuenta de Discord para guardar tu Player Tag y acceder rápidamente a tu perfil.
              </p>
              <a href="/api/auth/signin?callbackUrl=/brawlstars" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 32px', borderRadius: '12px', minWidth: '250px', fontSize: '1.05rem', fontWeight: 'bold' }}>
                Iniciar Sesión con Discord
              </a>
            </div>
          )}

          {tab !== 'clubs' && (
            <form onSubmit={handleSearch} className="search-box" style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
              <input type="text" value={tag} onChange={e => setTag(e.target.value)}
                placeholder={tab === 'profile' ? 'Introduce un tag de jugador (ej: #8GRCQK)' : 'Introduce un tag de club (ej: #2YGR8C9)'} style={{ flex: 1, padding: '12px', borderRadius: '12px', margin: 0 }} />
              <button type="submit" disabled={loading} style={{ padding: '0 30px', borderRadius: '12px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--gold)', color: 'var(--bg-primary)', fontWeight: 'bold' }}>
                {loading ? <ClockIcon style={{ width: 16, height: 16, animation: 'pulse 1.5s infinite' }} /> : <MagnifyingGlassIcon style={{ width: 16, height: 16 }} />}
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </form>
          )}
          {error && <div className="card" style={{ borderColor: 'var(--accent-red)', textAlign: 'center', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><ExclamationTriangleIcon style={{ width: 24, height: 24, color: 'var(--accent-red)' }} /><p style={{ color: 'var(--accent-red)' }}>{error}</p></div>}

          {/* Player result */}
          {result && tab === 'profile' && (
            <div className="bs-profile">
              <div className="bs-profile-header">
                <div className="bs-profile-icon">
                  {result.icon?.id ? (
                    <img src={`https://cdn.brawlify.com/profile-icons/regular/${result.icon.id}.png`}
                      alt="" style={{ width: 72, height: 72, borderRadius: '50%' }}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StarIcon style={{ width: 40, height: 40, color: 'white' }} /></div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 className="bs-profile-name">{result.name}</h2>
                  <span className="bs-profile-tag">{result.tag}</span>
                  {result.club && (
                    <div className="bs-profile-club" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px', cursor: 'pointer' }}
                      onClick={() => { setTab('club'); setTag(result.club.tag); performSearch('club', result.club.tag); setResult(null); }}>
                      {result.club.badgeId ? (
                        <img src={`https://cdn.brawlify.com/club-badges/regular/${result.club.badgeId}.png`} alt="Club" style={{ width: 20, height: 20, objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                      ) : (
                        <BuildingLibraryIcon style={{ width: 20, height: 20, color: 'var(--gold)' }} />
                      )}
                      <span style={{ color: 'var(--gold)', fontSize: '0.85rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{result.club.name}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold)' }}>
                    {result.trophies?.toLocaleString()}
                    <img src="https://beta.brawlstats.com/dist/trophy.96ebb0874d0e7e7a7c235bfbb751f2cf.png" alt="" style={{ height: '38px', objectFit: 'contain' }} />
                  </div>
                </div>
              </div>

              <div className="bs-stats-grid">
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://beta.brawlstats.com/dist/trophy.96ebb0874d0e7e7a7c235bfbb751f2cf.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.highestTrophies?.toLocaleString()}</div>
                  <div className="bs-stat-label">Máx. Trofeos</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9xcGNqOVdrSzlidlZRR1p2VzlmWS5wbmcifQ:supercell:1t_0zjd7hU3YHfzVTP3icr6elnaeVy221hrk5NY8jyk?width=2400" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.expLevel}</div>
                  <div className="bs-stat-label">Nivel</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://beta.brawlstats.com/dist/3vs3.44a7c5cbb968e04bd46b5db0a98a3af7.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{(result['3vs3Victories'] || 0).toLocaleString()}</div>
                  <div className="bs-stat-label">Victorias 3v3</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://beta.brawlstats.com/dist/event_mode_showdown.6645d79502821e2d681b6f819a28eb12.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{(result.soloVictories || 0).toLocaleString()}</div>
                  <div className="bs-stat-label">Solo SD</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://beta.brawlstats.com/dist/event_mode_duo_showdown.e9ddf754c048aa63d14de7ccfd8b6ec7.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{(result.duoVictories || 0).toLocaleString()}</div>
                  <div className="bs-stat-label">Dúo SD</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://corestats.pro/static/assets/prestige_icons/totalprestige.png?v=8f12fccf" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.totalPrestigeLevel || 0}</div>
                  <div className="bs-stat-label">Prestigios</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://brawlinsights.com/static//images/ui/win_streak.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.maxWinStreak || 0}</div>
                  <div className="bs-stat-label">Racha Máx. Victorias</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src={`https://cdn.brawlify.com/ranked/tiered/${result.rankedRank ? 58000000 + result.rankedRank - 1 : 58000000}.png`} alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.rankedRankName ? result.rankedRankName.replace(' ', ' ') : 'Ninguno'}</div>
                  <div className="bs-stat-label">Ranked Actual</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src={`https://cdn.brawlify.com/ranked/tiered/${result.highestAllTimeRankedRank ? 58000000 + result.highestAllTimeRankedRank - 1 : 58000000}.png`} alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.highestAllTimeRankedRankName ? result.highestAllTimeRankedRankName.replace(' ', ' ') : 'Ninguno'}</div>
                  <div className="bs-stat-label">Ranked Máximo</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '32px', height: '32px', color: 'var(--gold)' }}>
                      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bs-stat-number">{result.accountCreationYear || '—'}</div>
                  <div className="bs-stat-label">Año de Creación</div>
                </div>
              </div>

              {/* Brawlers */}
              {result.brawlers && (
                <div className="bs-brawlers-section">
                  <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="https://cdn.brawlify.com/icon/Brawler.png" alt="" style={{ height: '24px', objectFit: 'contain' }} /> Brawlers ({result.brawlers.length})
                  </h3>
                  <div className="bs-brawlers-grid">
                    {result.brawlers.sort((a, b) => b.trophies - a.trophies).map((b, i) => (
                      <div key={i} className="bs-brawler-chip">
                        <img src={brawlerIcon(b)} alt={b.name}
                          style={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }} />
                        <span className="bs-brawler-name">{b.name}</span>
                        <span className="bs-brawler-trophies" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          {b.trophies} <img src="https://cdn.brawlify.com/icon/trophy.png" alt="" style={{ height: '12px' }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Club result */}
          {result && tab === 'club' && (
            <div className="bs-profile">
              <div className="bs-profile-header">
                {result.badgeId ? (
                  <img src={clubBadgeUrl(result.badgeId)} alt="" 
                    style={{ width: 64, height: 64, objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={{ width: 64, height: 64, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, #2ecc71, #27ae60)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BuildingLibraryIcon style={{ width: 36, height: 36, color: 'white' }} /></div>
                )}
                <div>
                  <h2 className="bs-profile-name">{result.name}</h2>
                  <span className="bs-profile-tag">{result.tag}</span>
                  {result.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px', maxWidth: 500 }}>{result.description}</p>}
                </div>
              </div>
              <div className={`bs-stats-grid ${result.rankingES && result.rankingGlobal ? 'bs-stats-grid-6' : (!result.rankingES && !result.rankingGlobal ? 'bs-stats-grid-4' : '')}`}>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/trophy.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number" style={{ color: 'var(--gold)' }}>{result.trophies?.toLocaleString()}</div>
                  <div className="bs-stat-label">Trofeos Totales</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/Info.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.members?.length || 0}<span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/30</span></div>
                  <div className="bs-stat-label">Miembros</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/Ranking.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.requiredTrophies?.toLocaleString()}</div>
                  <div className="bs-stat-label">Trofeos Requeridos</div>
                </div>
                <div className="bs-stat-card">
                  <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/Club-League.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                  <div className="bs-stat-number">{result.type}</div>
                  <div className="bs-stat-label">Estado</div>
                </div>
                {result.rankingES && (
                  <div className="bs-stat-card">
                    <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/Club.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                    <div className="bs-stat-number" style={{ color: '#e74c3c' }}>#{result.rankingES}</div>
                    <div className="bs-stat-label">Ranking España</div>
                  </div>
                )}
                {result.rankingGlobal && (
                  <div className="bs-stat-card">
                    <div className="bs-stat-icon"><img src="https://cdn.brawlify.com/icon/Fame.png" alt="" style={{ height: '32px', objectFit: 'contain' }} /></div>
                    <div className="bs-stat-number" style={{ color: '#f1c40f' }}>#{result.rankingGlobal}</div>
                    <div className="bs-stat-label">Ranking Mundial</div>
                  </div>
                )}
              </div>
              {result.members && (
                <div className="bs-members-section">
                  <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><UsersIcon style={{ width: 24, height: 24 }} /> Miembros ({result.members.length})</h3>
                  <div className="bs-members-list">
                    {result.members.map((m, i) => (
                      <div key={i} className="bs-member-row" style={{ cursor: 'pointer' }}
                        onClick={() => { setTab('profile'); setTag(m.tag); setResult(null); performSearch('player', m.tag); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="bs-member-rank" style={{ minWidth: '35px' }}>#{i + 1}</span>
                          {m.icon?.id ? (
                            <img src={`https://cdn.brawlify.com/profile-icons/regular/${m.icon.id}.png`} alt="" 
                              style={{ width: 32, height: 32, borderRadius: '50%' }} 
                              onError={(e) => { e.target.style.display = 'none'; }} />
                          ) : (
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--border)' }}></div>
                          )}
                          <div className="bs-member-info-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="bs-member-name" style={{ fontSize: '1rem', lineHeight: '1.2' }}>{m.name}</span>
                            <span className="bs-member-role-mobile" style={{ color: roleColor(m.role), fontSize: '0.75rem', fontWeight: 600 }}>{roleName(m.role)}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span className="bs-member-role-desktop" style={{ color: roleColor(m.role), fontWeight: 600, fontSize: '0.8rem' }}>{roleName(m.role)}</span>
                          <span className="bs-member-trophies" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '5px' }}>{m.trophies?.toLocaleString()}<img src="https://beta.brawlstats.com/dist/trophy.96ebb0874d0e7e7a7c235bfbb751f2cf.png" alt="" style={{ height: '18px', objectFit: 'contain' }} /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Clubs LA Spain */}
      {tab === 'clubs' && (
        <div>
          {loadingClubs ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>⏳</div>
              <p>Cargando clubes de LA Spain...</p>
            </div>
          ) : clubsData.length > 0 ? (
            <div className="bs-clubs-grid">
              {clubsData.map((c, i) => (
                <div key={i} className="bs-club-card" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '15px' }}
                  onClick={() => {
                    setTab('club');
                    setTag(c.tag);
                    performSearch('club', c.tag);
                  }}>
                  <div className="bs-club-rank" style={{ marginRight: '10px' }}>#{i + 1}</div>
                  {c.badgeId && (
                    <img src={clubBadgeUrl(c.badgeId)} alt="" style={{ width: 42, height: 42, objectFit: 'contain', marginRight: '15px' }}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <h4 className="bs-club-name" style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.2' }}>{c.name}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', minWidth: '100px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}><img src="https://beta.brawlstats.com/dist/trophy.96ebb0874d0e7e7a7c235bfbb751f2cf.png" alt="" style={{ height: '18px' }} /> {c.trophies?.toLocaleString()}</div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><UsersIcon style={{ width: 16, height: 16 }} /> {c.members?.length || 0}/30</span>
                      {rankings.es[c.tag] && rankings.es[c.tag] <= 200 && <span style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '4px' }}><img src="https://cdn.brawlify.com/icon/Club.png" alt="" style={{ height: '14px' }} /> #{rankings.es[c.tag]}</span>}
                      {rankings.global[c.tag] && rankings.global[c.tag] <= 200 && <span style={{ color: '#f1c40f', display: 'flex', alignItems: 'center', gap: '4px' }}><img src="https://cdn.brawlify.com/icon/Fame.png" alt="" style={{ height: '14px' }} /> #{rankings.global[c.tag]}</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Total: {clubsData.reduce((a, c) => a + (c.members?.length || 0), 0)} miembros en {clubsData.length} clubes
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p>No se encontraron clubes</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
