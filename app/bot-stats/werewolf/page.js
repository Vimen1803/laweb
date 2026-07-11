'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  ArrowLeftIcon,
  HomeModernIcon,
  MoonIcon,
  HeartIcon,
  SparklesIcon,
  BookOpenIcon
} from '@heroicons/react/24/solid';

export default function WerewolfStatsPage() {
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

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando estadísticas de Werewolf...</p></div>;

  if (error || (data && !data.isAuthenticated)) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Estadísticas de Werewolf</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Inicia sesión para ver tu rendimiento detallado por bando y rol.
        </p>
        <a href="/api/auth/signin?callbackUrl=/bot-stats/werewolf" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '15px 40px', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 700 }}>
          Iniciar Sesión con Discord
        </a>
      </div>
    </section>
  );

  const werewolf = data?.werewolf || null;

  if (!werewolf || werewolf.games_played === 0) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Estadísticas de Werewolf</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Aún no has participado en ninguna partida de Werewolf.
        </p>
        <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '15px 40px', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 700 }}>
          ¡Únete a una partida en Discord!
        </a>
      </div>
    </section>
  );

  const pct = (won, played) => (played > 0 ? Math.round((won / played) * 100) : 0);
  const overallWinrate = pct(werewolf.games_won || 0, werewolf.games_played || 0);

  const bandos = [
    { title: 'Aldea', icon: HomeModernIcon, color: '#20e070', won: werewolf.village_won || 0, played: werewolf.village_played || 0 },
    { title: 'Lobos', icon: MoonIcon, color: '#ff4d4d', won: werewolf.wolf_won || 0, played: werewolf.wolf_played || 0 },
    { title: 'Solitario', icon: SparklesIcon, color: '#9b59b6', won: (werewolf.tanner_won || 0) + (werewolf.white_wolf_won || 0), played: (werewolf.tanner_played || 0) + (werewolf.white_wolf_played || 0) },
    { title: 'Amantes', icon: HeartIcon, color: '#ff7eb6', won: werewolf.lovers_won || 0, played: werewolf.lovers_played || 0 },
  ];

  const roles = Object.entries(werewolf.roles_played || {})
    .sort(([, a], [, b]) => b - a)
    .map(([role, played]) => ({ role, played, wins: (werewolf.roles_won || {})[role] || 0 }));

  const BandoCard = ({ title, icon: Icon, color, played, won }) => (
    <div className="card" style={{ borderTop: `3px solid ${color}`, padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <Icon style={{ width: 22, height: 22, color }} />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Partidas</p>
          <p style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{played}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Winrate</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 800, color }}>{pct(won, played)}%</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Victorias</p>
          <p style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', lineHeight: 1, color }}>{won}</p>
        </div>
      </div>
      <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct(won, played)}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );

  return (
    <section className="section" style={{ maxWidth: 1200, paddingLeft: '1rem', paddingRight: '1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 15px' }}>
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
        </Link>
        <Link href="/bot-stats/werewolf/doc" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 15px', background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', fontWeight: 700 }}>
          <BookOpenIcon style={{ width: 16, height: 16 }} /> Ver Documentación
        </Link>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
        <UserGroupIcon style={{ width: 40, height: 40, color: '#8b0000', flexShrink: 0 }} />
        <div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', margin: 0 }}>Estadísticas de Werewolf</h1>
          <p className="text-muted">Tu rendimiento global, por bando y por rol</p>
        </div>
      </div>

      {/* Resumen global */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1rem' }}>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--text-primary)' }}>{werewolf.games_played || 0}</span>
          <span className="stat-label">Partidas jugadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--gold)' }}>{werewolf.games_won || 0}</span>
          <span className="stat-label">Victorias</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: overallWinrate >= 50 ? 'var(--accent-green)' : 'var(--text-primary)' }}>{overallWinrate}%</span>
          <span className="stat-label">Winrate global</span>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '2rem' }}>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--text-primary)' }}>{werewolf.level || 1}</span>
          <span className="stat-label">Nivel</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--gold)' }}>{werewolf.event_points || 0}</span>
          <span className="stat-label">Puntos</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--text-primary)' }}>{werewolf.position !== '—' ? `#${werewolf.position}` : '—'}</span>
          <span className="stat-label">Posición</span>
        </div>
      </div>

      {/* Rendimiento por bando */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        Rendimiento por Bando
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {bandos.map(b => <BandoCard key={b.title} {...b} />)}
      </div>

      {/* Rendimiento por rol */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        Rendimiento por Rol
      </h2>
      <p className="text-muted" style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>Victorias y partidas con cada rol que has jugado.</p>

      {roles.length === 0 ? (
        <div className="card"><p className="text-muted text-center">Todavía no hay datos de roles individuales.</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '1rem' }}>
          {roles.map(({ role, played, wins }) => {
            const wr = pct(wins, played);
            return (
              <div key={role} className="card" style={{ padding: '1.1rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'var(--gold)', color: '#000', padding: '2px 10px', fontSize: '0.68rem', fontWeight: 800, borderRadius: '4px', letterSpacing: '0.02em' }}>
                  {wr}% WINRATE
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0', wordBreak: 'break-word' }}>{role}</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', alignItems: 'center', width: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: 'var(--gold)', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>{wins}</p>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '4px 0 0 0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>Win</p>
                  </div>
                  <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>{played}</p>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: '4px 0 0 0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>Played</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
