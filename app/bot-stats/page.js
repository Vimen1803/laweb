'use client';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  FireIcon, 
  ClockIcon, 
  PuzzlePieceIcon, 
  BoltIcon, 
  UserGroupIcon, 
  SparklesIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';

export default function BotStatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordleMode, setWordleMode] = useState('normal');

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando tus estadísticas...</p></div>;
  if (error || !data) return <div className="section"><p className="text-center text-danger">⚠️ {error || 'Error desconocido'}. Debes iniciar sesión.</p></div>;

  const wordle = data.wordle || null;
  const werewolf = data.werewolf || null;

  const renderWordleStats = (mode, stats) => {
    if (!stats || stats.played === 0) return <p className="text-muted" style={{ padding: '20px 0' }}>Aún no has jugado este modo.</p>;

    const isLadder = mode === 'ladder';

    return (
      <div className="fade-in">
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
            <span className="stat-value" style={{ fontSize: '1.2rem' }}>{isLadder ? stats.total_words : stats.wins}</span>
            <span className="stat-label">{isLadder ? 'Total Palabras' : 'Victorias'}</span>
          </div>
          {!isLadder && (
            <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
              <span className="stat-value" style={{ fontSize: '1.2rem' }}>{stats.winrate}%</span>
              <span className="stat-label">Winrate</span>
            </div>
          )}
          {!isLadder && (
            <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
              <span className="stat-value" style={{ fontSize: '1.2rem' }}>{stats.streak}</span>
              <span className="stat-label">Racha Act.</span>
            </div>
          )}
          <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
            <span className="stat-value" style={{ fontSize: '1.2rem' }}>{isLadder ? stats.max_words : stats.max_streak}</span>
            <span className="stat-label">{isLadder ? 'Máx. Escalera' : 'Racha Máx.'}</span>
          </div>
          <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
            <span className="stat-value" style={{ fontSize: '1.2rem' }}>{Number(stats.earnings || 0).toFixed(0)}</span>
            <span className="stat-label">Créditos</span>
          </div>
        </div>

        {!isLadder && stats.distribution && Object.keys(stats.distribution).length > 0 && (
          <>
            <h4 style={{ marginBottom: '1rem', color: 'var(--gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Distribución de Intentos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(stats.distribution).sort(([a],[b]) => a-b).map(([guess, count]) => {
                const max = Math.max(...Object.values(stats.distribution));
                const percent = max > 0 ? (count / max) * 100 : 0;
                return (
                  <div key={guess} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{guess}</span>
                    <div style={{ flex: 1, background: 'var(--bg-body)', height: '18px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${Math.max(8, percent)}%`, 
                        height: '100%', 
                        background: count === max ? '#538d4e' : 'var(--gold-dark)', 
                        transition: 'width 1s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#fff'
                      }}>
                        {count > 0 && count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className="section" style={{ maxWidth: 1200 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <ChartBarIcon style={{ width: 36, height: 36, color: 'var(--gold)' }} /> Mis Estadísticas de Bot
      </h1>
      <p className="section-subtitle">Tu rendimiento en los minijuegos de LA Spain</p>

      <div className="grid-2">
        {/* WORDLE */}
        <div className="card" style={{ borderTop: '4px solid #538d4e', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PuzzlePieceIcon style={{ width: 28, height: 28, color: '#538d4e' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Wordle</h2>
            </div>
            <div className="hero-buttons" style={{ gap: '5px' }}>
              {['normal', 'double', 'triple', 'ladder'].map(m => (
                <button 
                  key={m}
                  onClick={() => setWordleMode(m)}
                  className={`btn ${wordleMode === m ? 'btn-primary' : ''}`}
                  style={{ padding: '4px 10px', fontSize: '0.7rem', textTransform: 'capitalize' }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {!wordle ? (
            <p className="text-muted">Aún no has jugado ninguna partida de Wordle.</p>
          ) : renderWordleStats(wordleMode, wordle[wordleMode])}
        </div>

        {/* WEREWOLF */}
        <div className="card" style={{ borderTop: '4px solid #8b0000', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <UserGroupIcon style={{ width: 28, height: 28, color: '#8b0000' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Werewolf</h2>
          </div>

          {!werewolf ? (
            <p className="text-muted" style={{ padding: '20px 0' }}>Aún no has participado en ninguna partida de Werewolf.</p>
          ) : (
            <div className="fade-in">
              <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{werewolf.games_played || 0}</span>
                  <span className="stat-label">Partidas</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{werewolf.games_won || 0}</span>
                  <span className="stat-label">Victorias</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '12px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>
                    {werewolf.games_played ? ((werewolf.games_won / werewolf.games_played) * 100).toFixed(1) : 0}%
                  </span>
                  <span className="stat-label">Winrate</span>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(46,204,113,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(46,204,113,0.2)' }}>
                  <h4 style={{ color: '#2ecc71', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>Aldea</h4>
                  <p style={{ fontSize: '1rem', fontWeight: 700 }}>{werewolf.village_won || 0} / {werewolf.village_played || 0} <small style={{ fontWeight: 400, fontSize: '0.7rem', opacity: 0.7 }}>W/P</small></p>
                </div>
                <div style={{ background: 'rgba(231,76,60,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(231,76,60,0.2)' }}>
                  <h4 style={{ color: '#e74c3c', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>Lobos</h4>
                  <p style={{ fontSize: '1rem', fontWeight: 700 }}>{werewolf.wolf_won || 0} / {werewolf.wolf_played || 0} <small style={{ fontWeight: 400, fontSize: '0.7rem', opacity: 0.7 }}>W/P</small></p>
                </div>
              </div>

              <h4 style={{ marginBottom: '1rem', color: 'var(--gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Roles más Jugados</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(werewolf.roles_played || {})
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([role, count]) => (
                  <span key={role} style={{ 
                    background: 'var(--bg-body)', 
                    padding: '5px 12px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem',
                    border: '1px solid var(--gold-darker)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ color: 'var(--gold)' }}>{count}</span> {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TRIVIAL */}
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.7 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
          <QuestionMarkCircleIcon style={{ width: 28, height: 28, color: 'var(--gold)' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Trivial</h2>
        </div>
        <p className="highlight" style={{ fontSize: '1.1rem', fontWeight: 700 }}>PRÓXIMAMENTE</p>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Estamos integrando el sistema de Trivial con la web. ¡Estad atentos!</p>
      </div>

      <div className="card" style={{ marginTop: '2rem', background: 'rgba(201,168,76,0.05)', borderColor: 'rgba(201,168,76,0.2)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon style={{ width: 16, height: 16, color: 'var(--gold)' }} />
          Estas estadísticas se sincronizan en tiempo real con LA Bot. Juega en los canales correspondientes de Discord para subir tus puestos en el ranking.
        </p>
      </div>
    </section>
  );
}
