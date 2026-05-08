'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CommandLineIcon, SparklesIcon, BookOpenIcon, StarIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [stats, setStats] = useState({ members: null, bsMembers: null, clubs: null });

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
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">LA Spain</h1>
        <p className="hero-desc">
          La comunidad hispana de clubes más grande de Brawl Stars. Competitividad, pasión y una red de más de {stats.clubs ? stats.clubs : '15'} clubes que dominan los rankings.
        </p>
        <div className="hero-buttons">
          <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener" className="btn btn-primary">
            Únete al Discord
          </a>
          <Link href="/comandos" className="btn btn-outline">
            Ver Comandos
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

      {/* Features grid */}
      <section className="section">
        <h2 className="section-title">Qué encontrarás aquí</h2>
        <p className="section-subtitle">Tu portal completo para la comunidad LA Spain</p>
        <div className="grid-3">
          <Link href="/comandos" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><CommandLineIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Comandos</h3>
            <p>Todos los comandos del bot categorizados</p>
          </Link>
          <Link href="/brawlstars" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><SparklesIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Brawl Stars</h3>
            <p>Perfiles, clubes y estadísticas en vivo</p>
          </Link>
          <Link href="/about" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><BookOpenIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Nuestra Historia</h3>
            <p>Conoce la historia de LA Spain</p>
          </Link>
          <Link href="/roles" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><StarIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Roles</h3>
            <p>Sistema de niveles y recompensas</p>
          </Link>
          <Link href="/normas" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><DocumentTextIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Normas</h3>
            <p>Reglas de convivencia del servidor</p>
          </Link>
          <Link href="/staff" className="feature-card">
            <div className="feature-icon" style={{ display: 'flex', justifyContent: 'center' }}><ShieldCheckIcon style={{ width: 40, height: 40 }} /></div>
            <h3>Staff</h3>
            <p>Conoce al equipo que nos cuida</p>
          </Link>
        </div>
      </section>
    </>
  );
}
