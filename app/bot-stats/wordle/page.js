'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PuzzlePieceIcon,
  TrophyIcon,
  FireIcon,
  BoltIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

export default function WordleStatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('normal');

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos');
        return res.json();
      })
      .then(d => {
        setData(d.wordle);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando estadísticas de Wordle...</p></div>;

  if (error || !data) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Wordle Stats</h2>
        <p className="text-muted">Inicia sesión para ver tu rendimiento detallado en Wordle.</p>
        <a href="/api/auth/signin?callbackUrl=/bot-stats" className="btn btn-primary" style={{ marginTop: '2rem' }}>Iniciar Sesión</a>
      </div>
    </section>
  );

  const stats = data[mode];
  const isLadder = mode === 'ladder';

  const renderDistribution = (dist) => {
    if (!dist || Object.keys(dist).length === 0) return null;
    const max = Math.max(...Object.values(dist));
    return (
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: 'var(--gold)', fontSize: '1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Distribución de Intentos</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(dist).sort(([a],[b]) => a-b).map(([guess, count]) => {
            const percent = max > 0 ? (count / max) * 100 : 0;
            return (
              <div key={guess} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700 }}>{guess}</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', height: '24px', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${Math.max(10, percent)}%`, 
                    height: '100%', 
                    background: count === max ? '#538d4e' : 'var(--gold-dark)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '10px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#fff',
                    transition: 'width 1s ease-in-out'
                  }}>
                    {count > 0 && count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 15px' }}>
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
        </Link>
        <Link href="/bot-stats/wordle/doc" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 15px', background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', fontWeight: 700 }}>
          Ver Documentación
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <PuzzlePieceIcon style={{ width: 40, height: 40, color: '#538d4e' }} />
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', margin: 0 }}>Análisis de Wordle</h1>
            <p className="text-muted">Estadísticas detalladas por modo de juego</p>
          </div>
        </div>
        
        <div className="wordle-mode-buttons" style={{ display: 'flex', gap: '10px' }}>
          {['normal', 'double', 'triple', 'ladder'].map(m => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`btn ${mode === m ? 'btn-primary' : ''}`}
              style={{ padding: '10px 20px', textTransform: 'capitalize', fontWeight: 700 }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '2.5rem' }}>
        {!stats || stats.played === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="text-muted" style={{ fontSize: '1.2rem' }}>Aún no has participado en el modo <strong style={{ color: 'var(--gold)' }}>{mode}</strong>.</p>
          </div>
        ) : (
          <div className="fade-in">
            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              {!isLadder ? (
                <>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>{stats.wins}</span>
                    <span className="stat-label">Victorias</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem' }}>{stats.played}</span>
                    <span className="stat-label">Partidas</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem', color: '#538d4e' }}>{stats.winrate}%</span>
                    <span className="stat-label">WinRate</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem' }}>{stats.streak}</span>
                    <span className="stat-label">Racha Actual</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem' }}>{stats.max_streak}</span>
                    <span className="stat-label">Racha Máxima</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>{Number(stats.earnings || 0).toFixed(0)}</span>
                    <span className="stat-label">Créditos</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem' }}>{stats.played}</span>
                    <span className="stat-label">Jugadas</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>{stats.max_words}</span>
                    <span className="stat-label">Récord</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>{Number(stats.earnings || 0).toFixed(0)}</span>
                    <span className="stat-label">Créditos</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '20px' }}>
                    <span className="stat-value" style={{ fontSize: '1.8rem' }}>{stats.average}</span>
                    <span className="stat-label">Media</span>
                  </div>
                </>
              )}
            </div>

            {!isLadder && renderDistribution(stats.distribution)}
          </div>
        )}
      </div>
    </section>
  );
}
