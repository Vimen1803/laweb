'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CommandLineIcon, SparklesIcon, BookOpenIcon, StarIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

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
      {/* Hero */}
      <section className="hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <h1 className="hero-title" style={{ margin: 0 }}>LA Spain</h1>
          {rating.average > 0 && (
            <Link href="/reviews" className="fade-in" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 15px', 
              borderRadius: '50px', 
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <StarIcon style={{ width: 20, height: 20, color: 'var(--gold)' }} />
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem' }}>{rating.average.toFixed(1)}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>({rating.total})</span>
            </Link>
          )}
        </div>
        <div className="hero-desc">
           <p>
            <strong>LA Spain</strong> nació el <span className="highlight">4 de mayo de 2019</span> de la mano 
            de dos clubes pioneros: <strong>S7VEN</strong> y <strong>Sanctum</strong>, y 
            rápidamente alcanzó la cima del ranking local y mundial.
          </p>
          <p>
            A lo largo del tiempo, grandes organizaciones como <strong>Exenze</strong>, <strong>DeRucula</strong> y <strong>Gladius Legion</strong> se 
            han unido a la familia, consolidando a LA Spain como la <span className="highlight">comunidad hispana de clubes más grande de Brawl Stars</span>, 
            con más de {stats.members ? stats.members.toLocaleString() : '6500'} miembros en Discord y una red de más de {stats.clubs ? stats.clubs : '15'} clubes activos que compiten al más alto nivel.
          </p>
          <p>
            Ir a la página global de 
            <Link href="https://lagaming.com" target="_blank" rel="noopener" style={{color: 'var(--gold)', fontWeight: 700}}>
              LA Gaming
            </Link>
          </p>
        </div>
        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener" className="btn btn-primary">
            Únete al Discord
          </a>
          <Link href="/about" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontWeight: 700 }}>
            About Us
          </Link>
          <Link href="/faq" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontWeight: 700 }}>
            FAQ
          </Link>
        </div>

        {/* Dynamic stats */}
        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-value">{stats.members ? Number(stats.members).toLocaleString() : '—'}</span>
            <span className="stat-label">Miembros Discord</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.bsMembers ? Number(stats.bsMembers).toLocaleString() : '—'}</span>
            <span className="stat-label">Miembros BS</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.clubs ? stats.clubs : '—'}</span>
            <span className="stat-label">Clubes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">2019</span>
            <span className="stat-label">Fundación</span>
          </div>
        </div>
      </section>
    </>
  );
}
