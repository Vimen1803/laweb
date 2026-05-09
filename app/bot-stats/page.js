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
  if (error) return <div className="section"><p className="text-center text-danger">⚠️ {error}. Debes iniciar sesión.</p></div>;

  const { wordle, werewolf } = data;

  return (
    <section className="section" style={{ maxWidth: 1200 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <ChartBarIcon style={{ width: 36, height: 36, color: 'var(--gold)' }} /> Mis Estadísticas de Bot
      </h1>
      <p className="section-subtitle">Tu rendimiento en los minijuegos de LA Spain</p>

      <div className="grid-2">
        {/* WORDLE */}
        <div className="card" style={{ borderTop: '4px solid #538d4e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <PuzzlePieceIcon style={{ width: 28, height: 28, color: '#538d4e' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Wordle</h2>
          </div>

          {!wordle ? (
            <p className="text-muted">Aún no has jugado ninguna partida de Wordle.</p>
          ) : (
            <>
              <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{wordle.total_wins || 0}</span>
                  <span className="stat-label">Victorias</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{wordle.streak || 0}</span>
                  <span className="stat-label">Racha Act.</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{wordle.max_streak || 0}</span>
                  <span className="stat-label">Racha Máx.</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{Number(wordle.total_earnings || 0).toFixed(0)}</span>
                  <span className="stat-label">Créditos</span>
                </div>
              </div>

              <h4 style={{ marginBottom: '1rem', color: 'var(--gold)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Distribución de Intentos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(wordle.guess_distribution || {}).sort(([a],[b]) => a-b).map(([guess, count]) => {
                  const max = Math.max(...Object.values(wordle.guess_distribution));
                  const percent = max > 0 ? (count / max) * 100 : 0;
                  return (
                    <div key={guess} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{guess}</span>
                      <div style={{ flex: 1, background: 'var(--bg-body)', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${percent}%`, 
                          height: '100%', 
                          background: count === max ? '#538d4e' : 'var(--gold)', 
                          transition: 'width 1s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: count === max ? '#fff' : '#000'
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

        {/* WEREWOLF */}
        <div className="card" style={{ borderTop: '4px solid #8b0000' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <UserGroupIcon style={{ width: 28, height: 28, color: '#8b0000' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Werewolf</h2>
          </div>

          {!werewolf ? (
            <p className="text-muted">Aún no has participado en ninguna partida de Werewolf.</p>
          ) : (
            <>
              <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{werewolf.games_played || 0}</span>
                  <span className="stat-label">Partidas</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>{werewolf.games_won || 0}</span>
                  <span className="stat-label">Victorias</span>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '10px' }}>
                  <span className="stat-value" style={{ fontSize: '1.2rem' }}>
                    {werewolf.games_played ? ((werewolf.games_won / werewolf.games_played) * 100).toFixed(1) : 0}%
                  </span>
                  <span className="stat-label">Winrate</span>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div>
                  <h4 style={{ marginBottom: '0.8rem', color: '#2ecc71', fontSize: '0.85rem' }}>VILLAGE ({werewolf.village_played || 0})</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wins: {werewolf.village_won || 0}</p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.8rem', color: '#e74c3c', fontSize: '0.85rem' }}>WOLVES ({werewolf.wolf_played || 0})</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wins: {werewolf.wolf_won || 0}</p>
                </div>
              </div>

              <h4 style={{ margin: '1.5rem 0 1rem', color: 'var(--gold)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Roles más Jugados</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(werewolf.roles_played || {})
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([role, count]) => (
                  <span key={role} style={{ 
                    background: 'var(--bg-body)', 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontSize: '0.75rem',
                    border: '1px solid var(--gold-darker)'
                  }}>
                    <strong>{role}:</strong> {count}
                  </span>
                ))}
              </div>
            </>
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
