'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [stats, setStats] = useState({ members: null, bsMembers: null, clubs: null });
  const [rating, setRating] = useState({ average: 0, total: 0 });

  useEffect(() => {
    fetch('/api/discord')
      .then(r => r.json())
      .then(d => {
        setStats({
          members: d.memberCount || null,
          bsMembers: d.bsMembers || null,
          clubs: d.clubCount || null,
        });
      })
      .catch(() => {});

    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => {
        setRating({ average: d.average || 0, total: d.total || 0 });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        {/* Columna Izquierda: Contenido Editorial */}
        <div className="hero-left">
          <div className="hero-title-container">
            <h1>LA Spain</h1>
            {rating.average > 0 && (
              <Link href="/reviews" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '6px 14px', 
                borderRadius: '4px',
                background: 'rgba(214, 175, 55, 0.08)',
                border: '1px solid rgba(214, 175, 55, 0.2)',
                textDecoration: 'none'
              }}>
                <StarIcon style={{ width: 16, height: 16, color: 'var(--gold)' }} />
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.05rem' }}>{rating.average.toFixed(1)}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({rating.total})</span>
              </Link>
            )}
          </div>
          
          <div className="hero-desc">
            <p>
              <strong>LA Spain</strong> nació el <span className="highlight">4 de mayo de 2019</span> de la mano 
              de dos clubes pioneros: <strong>S7VEN</strong> y <strong>Sanctum</strong>, alcanzando 
              orgánicamente la cima del ranking local y mundial.
            </p>
            <p>
              A lo largo del tiempo, grandes organizaciones como <strong>Exenze</strong>, <strong>DeRucula</strong> y <strong>Gladius Legion</strong> se 
              han unido al ecosistema, consolidando a LA Spain como la <span className="highlight">comunidad hispana de clubes más grande de Brawl Stars</span>.
            </p>
            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>
              Visita la plataforma internacional de{' '}
              <Link href="https://lagaming.com" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>
                LAGaming
              </Link>
            </p>
          </div>

          <div className="hero-buttons">
            <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener" className="btn btn-primary">
              Comunidad de Discord
            </a>
            <Link href="/about" className="btn btn-secondary">
              Nosotros
            </Link>
            <Link href="/faq" className="btn btn-secondary">
              Preguntas Frecuentes
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Bloque de Estadísticas en Rejilla Industrial */}
        <div>
          <div className="stat-grid">
            <div className="stat-item">
              <span className="stat-value">{stats.members ? Number(stats.members).toLocaleString() : '6,500+'}</span>
              <span className="stat-label">En Discord</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.bsMembers ? Number(stats.bsMembers).toLocaleString() : '—'}</span>
              <span className="stat-label">Jugadores Activos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.clubs ? stats.clubs : '15+'}</span>
              <span className="stat-label">Clubes Compitiendo</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2019</span>
              <span className="stat-label">Trayectoria</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}