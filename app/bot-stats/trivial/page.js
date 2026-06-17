'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon, QuestionMarkCircleIcon, TrophyIcon, ChartBarIcon, BoltIcon
} from '@heroicons/react/24/solid';

export default function TrivialStatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos');
        return res.json();
      })
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando estadísticas de Trivial...</p></div>;

  if (error || (data && !data.isAuthenticated)) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Trivial Stats</h2>
        <p className="text-muted">Inicia sesión para ver tu rendimiento detallado en Trivial.</p>
        <a href="/api/auth/signin?callbackUrl=/bot-stats/trivial" className="btn btn-primary" style={{ marginTop: '2rem' }}>Iniciar Sesión</a>
      </div>
    </section>
  );

  const trivial = data?.trivial || null;

  if (!trivial || trivial.games === 0) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Trivial Stats</h2>
        <p className="text-muted">Aún no has jugado ninguna partida de Trivial.</p>
        <a href="https://discord.gg/DbRUker" target="_blank" className="btn btn-primary" style={{ marginTop: '2rem' }}>¡Empieza a jugar en Discord!</a>
      </div>
    </section>
  );

  const winrate = trivial.games > 0 ? ((trivial.wins / trivial.games) * 100).toFixed(1) : '0.0';
  const cards = [
    { icon: <ChartBarIcon style={{ width: 26, height: 26 }} />, label: 'Partidas', value: trivial.games },
    { icon: <TrophyIcon style={{ width: 26, height: 26 }} />, label: 'Victorias', value: trivial.wins },
    { icon: <BoltIcon style={{ width: 26, height: 26 }} />, label: 'Puntos totales', value: trivial.total_score },
    { icon: <QuestionMarkCircleIcon style={{ width: 26, height: 26 }} />, label: 'Media por partida', value: trivial.average },
  ];

  return (
    <section className="section" style={{ maxWidth: 900 }}>
      <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '8px 15px' }}>
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
      </Link>

      <div className="card" style={{ borderTop: '4px solid #3498db', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
          <QuestionMarkCircleIcon style={{ width: 40, height: 40, color: '#3498db' }} />
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Tus Estadísticas de Trivial</h1>
            <p className="text-muted">Rendimiento en las partidas de trivia de LA Spain</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: '#3498db', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>{c.icon}</div>
              <p style={{ fontSize: '1.8rem', fontWeight: 800 }}>{c.value}</p>
              <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(52,152,219,0.08)', border: '1px solid rgba(52,152,219,0.2)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Ratio de victorias</p>
          <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#3498db' }}>{winrate}%</p>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/bot-stats/trivial/doc" className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 700 }}>Ver Documentación</Link>
        </div>
      </div>
    </section>
  );
}
