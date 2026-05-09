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
            LA Spain ha dejado huella en torneos como la <strong>Gems League Europe</strong> o la <strong>Clash Royale League</strong>, 
            y ha contado entre sus filas a campeones mundiales como <span className="highlight">Mohamed Light</span>.
          </p>
          <p>
            Hoy, LA Spain cuenta con un <strong>bot propio (LA Bot)</strong> con más de 100 comandos, 
            un sistema de economía interactivo, minijuegos exclusivos, un sistema de niveles con recompensas, y un equipo de staff comprometido 
            que trabaja día a día para mantener esta comunidad viva.
          </p>
        </div>
        <div className="hero-buttons">
          <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener" className="btn btn-primary">
            Únete al Discord
          </a>
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
