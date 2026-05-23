'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StarIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

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
      {/* 1. Hero Section principal (Introducción de marca y legacy) */}
      <section className="hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          
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
          
          {/* Esencia e Historia Original */}
          <div className="hero-desc" style={{ fontSize: '1.05rem', lineHeight: '1.8', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1.2rem' }}>
              <strong>LA Spain</strong> nació el <span className="highlight">4 de mayo de 2019</span> de la mano 
              de dos clubes pioneros: <strong>S7VEN</strong> y <strong>Sanctum</strong>, alcanzando 
              orgánicamente la cima del ranking local y mundial.
            </p>
            <p>
              A lo largo del tiempo, grandes organizaciones como <strong>Exenze</strong>, <strong>DeRucula</strong> y <strong>Gladius Legion</strong> se 
              han unido al ecosistema, consolidando a LA Spain como la <span className="highlight">comunidad hispana de clubes más grande de Brawl Stars</span>.
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

      {/* 2. Sección de Estadísticas (Sin container, en una sola fila) */}
      <section className="section" style={{ padding: '0rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2.5rem', 
          maxWidth: '1000px', 
          margin: '0 auto' 
        }}>
          {/* Stat 1 */}
          <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
            <span style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--gold)', fontFamily: 'Outfit, sans-serif', display: 'block', lineHeight: 1, marginBottom: '8px' }}>
              {stats.members ? Number(stats.members).toLocaleString() : '6,500+'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              En Discord
            </span>
          </div>

          {/* Stat 2 */}
          <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
            <span style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', display: 'block', lineHeight: 1, marginBottom: '8px' }}>
              {stats.bsMembers ? Number(stats.bsMembers).toLocaleString() : '—'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Jugadores Activos
            </span>
          </div>

          {/* Stat 3 */}
          <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
            <span style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', display: 'block', lineHeight: 1, marginBottom: '8px' }}>
              {stats.clubs ? stats.clubs : '15+'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Clubes Compitiendo
            </span>
          </div>

          {/* Stat 4 */}
          <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
            <span style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--gold)', fontFamily: 'Outfit, sans-serif', display: 'block', lineHeight: 1, marginBottom: '8px' }}>
              2019
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Trayectoria
            </span>
          </div>
        </div>
      </section>

      {/* 3. Banner Alianza Internacional (Sin borde ni color de fondo) */}
      <section className="section" style={{ padding: '5rem 1.5rem 6rem' }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
              <GlobeAltIcon style={{ width: 22, height: 22, color: 'var(--gold)' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', margin: 0 }}>
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
