'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  StarIcon, 
  CpuChipIcon, 
  TrophyIcon, 
  SparklesIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/solid';

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
      {/* 1. HERO SECTION PREMIUM */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-title-container">
            <h1 style={{ letterSpacing: '-0.03em' }}>LA Spain</h1>
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
              Fundada el <span className="highlight">4 de mayo de 2019</span>, <strong>LA Spain</strong> es la mayor alianza de clubes competitivos de Brawl Stars en la comunidad hispana. 
            </p>
            <p>
              Impulsamos el ecosistema competitivo local y mundial de la mano de organizaciones emblemáticas, creando un espacio único de convivencia, minijuegos y torneos activos.
            </p>
            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>
              Parte de la plataforma internacional{' '}
              <Link href="https://lagaming.com" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>
                LAGaming
              </Link>
            </p>
          </div>

          <div className="hero-buttons">
            <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Únete en Discord
            </a>
            <Link href="/brawlstars" className="btn btn-secondary">
              Ver Clubes
            </Link>
            <Link href="/dc-info" className="btn btn-secondary">
              Info del Servidor
            </Link>
          </div>
        </div>

        {/* Rejilla de Métricas Industrial */}
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

      {/* 2. ECOSISTEMA FEATURES SECTION */}
      <section className="home-features-section">
        <div className="home-section-header">
          <h2 className="home-section-title">El Ecosistema de LA Spain</h2>
          <p className="home-section-subtitle">
            Mucho más que una alianza de clubes. Ofrecemos una experiencia totalmente integrada y conectada para jugadores de todos los niveles.
          </p>
        </div>

        <div className="home-features-grid">
          {/* FEATURE 1: LA BOT */}
          <div className="home-feature-card">
            <div className="home-feature-icon-box">
              <CpuChipIcon style={{ width: 30, height: 30, color: 'var(--gold)' }} />
            </div>
            <h3 className="home-feature-title">LA Bot Avanzado</h3>
            <p className="home-feature-desc">
              Interactúa con nuestra inteligencia artificial personalizada en Discord. Consulta estadísticas de tu perfil de Brawl Stars en tiempo real y juega minijuegos exclusivos como Wordle o Werewolf.
            </p>
            <Link href="/bot-stats" className="home-feature-link">
              Ver Estadísticas <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          {/* FEATURE 2: CLUBES */}
          <div className="home-feature-card">
            <div className="home-feature-icon-box">
              <TrophyIcon style={{ width: 30, height: 30, color: 'var(--gold)' }} />
            </div>
            <h3 className="home-feature-title">Clubes de Élite</h3>
            <p className="home-feature-desc">
              Accede a una red unificada de clubes de primer nivel con rangos internos estructurados, participación coordinada en eventos competitivos y subida colectiva de copas en el top local y global.
            </p>
            <Link href="/brawlstars" className="home-feature-link">
              Explorar Clubes <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          {/* FEATURE 3: COMANDOS */}
          <div className="home-feature-card">
            <div className="home-feature-icon-box">
              <SparklesIcon style={{ width: 30, height: 30, color: 'var(--gold)' }} />
            </div>
            <h3 className="home-feature-title">Comunidad Activa</h3>
            <p className="home-feature-desc">
              Descubre y domina todos los comandos disponibles en nuestro servidor de Discord. Participa de forma directa en torneos, ligas competitivas y sorteos exclusivos organizados periódicamente.
            </p>
            <Link href="/comandos" className="home-feature-link">
              Ver Comandos <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. LEYENDAS Y CLUBES FUNDADORES */}
      <section className="home-clubs-section">
        <div className="home-section-header">
          <h2 className="home-section-title" style={{ fontSize: '2.2rem' }}>Los Pilares de la Alianza</h2>
          <p className="home-section-subtitle">
            Conoce a los clubes históricos y las marcas competitivas de renombre que conforman y fortalecen la identidad de LA Spain.
          </p>
        </div>

        <div className="home-clubs-grid">
          <div className="home-club-card">
            <div className="home-club-logo-box">S</div>
            <h4 className="home-club-name">S7VEN</h4>
            <p className="home-club-desc">Club fundador. Sinónimo de constancia y alto nivel.</p>
          </div>

          <div className="home-club-card">
            <div className="home-club-logo-box">S</div>
            <h4 className="home-club-name">Sanctum</h4>
            <p className="home-club-desc">Cuna de talentos y pilar competitivo fundamental.</p>
          </div>

          <div className="home-club-card">
            <div className="home-club-logo-box">E</div>
            <h4 className="home-club-name">Exenze</h4>
            <p className="home-club-desc">Dedicación y pasión competitiva de élite.</p>
          </div>

          <div className="home-club-card">
            <div className="home-club-logo-box">D</div>
            <h4 className="home-club-name">DeRucula</h4>
            <p className="home-club-desc">Historia pura y fuerza en cada enfrentamiento.</p>
          </div>

          <div className="home-club-card">
            <div className="home-club-logo-box">G</div>
            <h4 className="home-club-name">Gladius</h4>
            <p className="home-club-desc">Dominancia absoluta y espíritu de lucha colectivo.</p>
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="home-cta-section">
        <div className="home-cta-banner">
          <h2 className="home-cta-title">Escribe tu Propia Leyenda</h2>
          <p className="home-cta-desc">
            Únete a la alianza más sólida de la comunidad hispana. Encuentra equipo para copas, participa en torneos exclusivos de Brawl Stars y domina con nosotros.
          </p>
          <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener noreferrer" className="home-cta-btn">
            Únete al Servidor de Discord
          </a>
        </div>
      </section>
    </>
  );
}