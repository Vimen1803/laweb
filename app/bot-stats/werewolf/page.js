'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  ArrowLeftIcon,
  TrophyIcon,
  ShieldCheckIcon,
  BoltIcon,
  HeartIcon,
  UserIcon,
  SparklesIcon
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
        setData(d.werewolf);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando estadísticas de Werewolf...</p></div>;
  if (error || !data) return <div className="section"><p className="text-center text-danger">⚠️ {error || 'Error al cargar datos'}.</p></div>;

  const werewolf = data;

  const BandoCard = ({ title, icon: Icon, color, played, won }) => (
    <div className="card" style={{ borderLeft: `4px solid ${color}`, background: 'var(--bg-body)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <Icon style={{ width: 24, height: 24, color }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Partidas</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{played}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Victorias</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color }}>{won}</p>
        </div>
      </div>
      <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
        <div style={{ 
          width: `${played > 0 ? (won/played*100) : 0}%`, 
          height: '100%', 
          background: color,
          borderRadius: '2px'
        }} />
      </div>
    </div>
  );

  return (
    <section className="section" style={{ maxWidth: 1200 }}>
      <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '8px 15px' }}>
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
        <UserGroupIcon style={{ width: 40, height: 40, color: '#8b0000' }} />
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', margin: 0 }}>Rendimiento por Rol</h1>
          <p className="text-muted">Análisis detallado de victorias y partidas con cada rol</p>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem 1rem', width: '100%' }}>
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem', width: '100%' }}>
          {Object.entries(werewolf.roles_played || {})
            .sort(([, a], [, b]) => b - a)
            .map(([role, played]) => {
              const wins = (werewolf.roles_won || {})[role] || 0;
              const wr = played > 0 ? (wins / played * 100).toFixed(0) : 0;
              return (
                <div key={role} style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  padding: '20px 10px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '120px'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    background: 'var(--gold)', 
                    color: '#000', 
                    padding: '2px 6px', 
                    fontSize: '0.7rem', 
                    fontWeight: 800,
                    borderBottomLeftRadius: '8px'
                  }}>
                    {wr}%
                  </div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '15px', fontWeight: 700, color: '#fff' }}>{role}</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: 'var(--gold)' }}>{wins}</p>
                      <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>W</p>
                    </div>
                    <div style={{ width: '1px', height: '25px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#fff' }}>{played}</p>
                      <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>P</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
