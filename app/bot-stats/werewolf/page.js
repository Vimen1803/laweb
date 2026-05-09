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

  if (error || !data) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <div style={{ background: 'rgba(201,168,76,0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
          <UserIcon style={{ width: 40, height: 40, color: 'var(--gold)' }} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Estadísticas de Werewolf</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Inicia sesión para ver tu rendimiento detallado por bando y rol.
        </p>
        <a href="/api/auth/signin" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '15px 40px', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 700 }}>
          <SparklesIcon style={{ width: 20, height: 20 }} /> Iniciar Sesión con Discord
        </a>
      </div>
    </section>
  );

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
    <section className="section" style={{ maxWidth: 1400, paddingLeft: '1rem', paddingRight: '1rem' }}>
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

      <div className="card" style={{ padding: '3rem 1.5rem', width: '100%', background: 'rgba(255,255,255,0.02)' }}>
        <div className="stat-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)', 
          gap: '3rem 2rem', 
          width: '100%',
          margin: 0
        }}>
          {Object.entries(werewolf.roles_played || {})
            .sort(([, a], [, b]) => b - a)
            .map(([role, played]) => {
              const wins = (werewolf.roles_won || {})[role] || 0;
              const wr = played > 0 ? (wins / played * 100).toFixed(0) : 0;
              return (
                <div key={role} style={{ 
                  textAlign: 'center',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  <div style={{ 
                    display: 'inline-block',
                    margin: '0 auto 10px auto',
                    background: 'var(--gold)', 
                    color: '#000', 
                    padding: '2px 8px', 
                    fontSize: '0.7rem', 
                    fontWeight: 800,
                    borderRadius: '4px'
                  }}>
                    {wr}% WINRATE
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>{role}</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', width: '100%' }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <p style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'var(--gold)', lineHeight: 1 }}>{wins}</p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '5px 0 0 0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>WIN</p>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <p style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#fff', lineHeight: 1 }}>{played}</p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '5px 0 0 0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>PLAYED</p>
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
