'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StarIcon, TrophyIcon, ShieldCheckIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

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
      {/* 1. Hero Section principal (Introducción de marca) */}
      <section className="hero" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', padding: '6rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Fila de Título y Valoración */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <h1 className="hero-title" style={{ fontSize: '4.5rem', margin: 0, lineHeight: '1.0' }}>
              LA Spain
            </h1>
            
            {rating.average > 0 && (
              <Link href="/reviews" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 18px', 
                borderRadius: '50px',
                background: 'rgba(214, 175, 55, 0.08)',
                border: '1px solid rgba(214, 175, 55, 0.25)',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}
              className="rating-badge-hover"
              >
                <StarIcon style={{ width: 18, height: 18, color: 'var(--gold)' }} />
                <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem' }}>{rating.average.toFixed(1)}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({rating.total} Valoraciones)</span>
              </Link>
            )}
          </div>
          
          {/* Esencia o Pitch Principal de la marca */}
          <div className="hero-desc" style={{ fontSize: '1.2rem', lineHeight: '1.8', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
            <p>
              Establecida el <span className="highlight">4 de mayo de 2019</span>, LA Spain se ha consolidado orgánicamente como la <span className="highlight">comunidad hispana de clubes más grande y prestigiosa de Brawl Stars</span>, liderando rankings tanto a nivel local como mundial.
            </p>
          </div>

          {/* Botones de acción principales */}
          <div className="hero-buttons" style={{ justifyContent: 'center', gap: '15px' }}>
            <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Comunidad de Discord
            </a>
            <Link href="/about" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
              Nosotros
            </Link>
            <Link href="/faq" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
              FAQ
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Sección de Métricas (Showcase a ancho completo) */}
      <section className="section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.02)', background: 'var(--bg-secondary)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title" style={{ justifyContent: 'center', fontSize: '2rem', fontWeight: 900 }}>
              Nuestro Ecosistema en Números
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Estadísticas activas que demuestran el alcance de nuestra organización
            </p>
          </header>

          <div className="stat-grid" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="stat-item" style={{ padding: '2.5rem 1.5rem' }}>
              <span className="stat-value" style={{ fontSize: '3rem' }}>{stats.members ? Number(stats.members).toLocaleString() : '6,500+'}</span>
              <span className="stat-label">En Discord</span>
            </div>
            <div className="stat-item" style={{ padding: '2.5rem 1.5rem' }}>
              <span className="stat-value" style={{ fontSize: '3rem' }}>{stats.bsMembers ? Number(stats.bsMembers).toLocaleString() : '—'}</span>
              <span className="stat-label">Jugadores Activos</span>
            </div>
            <div className="stat-item" style={{ padding: '2.5rem 1.5rem' }}>
              <span className="stat-value" style={{ fontSize: '3rem' }}>{stats.clubs ? stats.clubs : '15+'}</span>
              <span className="stat-label">Clubes Compitiendo</span>
            </div>
            <div className="stat-item" style={{ padding: '2.5rem 1.5rem' }}>
              <span className="stat-value" style={{ fontSize: '3rem' }}>2019</span>
              <span className="stat-label">Trayectoria</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sección de Historia & Columnas de Legado (Tarjetas estructuradas) */}
      <section className="section" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ justifyContent: 'center', fontSize: '2rem', fontWeight: 900 }}>
              Nuestra Trayectoria
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              La evolución y unión estratégica de clubes pioneros
            </p>
          </header>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* Tarjeta 1: Alianza Fundadora */}
            <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrophyIcon style={{ width: 22, height: 22, color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                  Alianza Fundadora
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                Nuestra historia comenzó con la unión de dos clubes legendarios y pioneros en el panorama hispano de Brawl Stars: <strong>S7VEN</strong> y <strong>Sanctum</strong>, logrando posicionar a la comunidad rápidamente en los puestos más altos de los rankings nacionales y globales.
              </p>
            </div>

            {/* Tarjeta 2: Expansión */}
            <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheckIcon style={{ width: 22, height: 22, color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                  Evolución y Consolidación
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                Con el paso del tiempo, grandes organizaciones de prestigio y peso competitivo como <strong>Exenze</strong>, <strong>DeRucula</strong> y <strong>Gladius Legion</strong> decidieron fusionarse e integrarse a nuestro ecosistema, consolidando así el proyecto definitivo de clubes de la escena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Banner Alianza Internacional (LAGaming Hub) */}
      <section className="section" style={{ padding: '0 2rem 6rem' }}>
        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(214, 175, 55, 0.05) 0%, rgba(11, 12, 16, 0.8) 100%)',
          border: '1px solid rgba(214, 175, 55, 0.15)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}
        className="alliance-banner"
        >
          <div style={{ flex: '1 1 600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <GlobeAltIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#fff', margin: 0 }}>
                Plataforma Internacional
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Formamos parte activa del ecosistema internacional de <strong>LA Gaming</strong>, una prestigiosa organización competitiva transfronteriza guiada bajo el lema <em>&quot;by gamers, for gamers&quot;</em>.
            </p>
          </div>

          <div>
            <Link 
              href="https://lagaming.com" 
              target="_blank" 
              rel="noopener" 
              className="btn btn-primary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', whiteSpace: 'nowrap' }}
            >
              Visitar LAGaming <ArrowTopRightOnSquareIcon style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}