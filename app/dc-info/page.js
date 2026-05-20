'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function DCInfoPage() {
  return (
    <>
      {/* Hero Section Premium */}
      <header className="dc-info-hero" style={{ paddingTop: '8rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3.6rem', marginBottom: '1.2rem', lineHeight: '1.1' }}>
          Discord Info Hub
        </h1>
        <p className="hero-desc text-secondary" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.7' }}>
          La central neurálgica de la comunidad de <span className="highlight">LA Spain</span>. Accede de forma directa a las guías, reglamentos oficiales y soporte del servidor.
        </p>
      </header>

      {/* Main Container */}
      <main className="dc-info-container">
        
        {/* Grid de Secciones Core */}
        <section className="dc-info-grid">
          
          {/* NORMAS */}
          <div className="dc-card-wrapper fade-in">
            <div className="dc-card-custom gold">
              <h2 className="dc-title-custom">Normas de Convivencia</h2>
              <p className="dc-desc-custom">
                Mantener un ambiente sano, competitivo y de mutuo respeto es la máxima prioridad de LA Spain. Consulta el reglamento oficial de conducta de la comunidad para evitar sanciones y contribuir al buen rollo.
              </p>
              <Link href="/normas" className="dc-btn-custom">
                Ver Normas <ArrowRightIcon style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>

          {/* ROLES */}
          <div className="dc-card-wrapper fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="dc-card-custom blue">
              <h2 className="dc-title-custom">Jerarquía y Roles</h2>
              <p className="dc-desc-custom">
                Descubre cómo funciona el sistema de roles automáticos, medallas de antigüedad y rangos especiales para miembros competitivos de Brawl Stars dentro de nuestro servidor de Discord.
              </p>
              <Link href="/roles" className="dc-btn-custom">
                Ver Roles <ArrowRightIcon style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>

          {/* ABOUT US */}
          <div className="dc-card-wrapper fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="dc-card-custom red">
              <h2 className="dc-title-custom">Sobre Nosotros</h2>
              <p className="dc-desc-custom">
                Conoce la trayectoria de LA Spain. Desde nuestra fundación el 4 de mayo de 2019, nos hemos consolidado como la mayor estructura organizada de clubes eSports de la comunidad hispana.
              </p>
              <Link href="/about" className="dc-btn-custom">
                Nuestra Historia <ArrowRightIcon style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="dc-card-wrapper fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="dc-card-custom green">
              <h2 className="dc-title-custom">Preguntas Frecuentes</h2>
              <p className="dc-desc-custom">
                ¿Cómo unirse a los clubes de Brawl Stars? ¿Cómo registrarse en los torneos? ¿Cómo usar LA Bot? Resolvemos todas las dudas más frecuentes de los nuevos miembros de la comunidad.
              </p>
              <Link href="/faq" className="dc-btn-custom">
                Centro de Ayuda <ArrowRightIcon style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>

        </section>

        {/* Blueprint del Servidor (Server Map) */}
        <section className="dc-blueprint-card fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="dc-blueprint-title">Mapa de Canales Clave</h2>
          <p className="dc-blueprint-desc">
            Para facilitar tu navegación dentro del servidor, te presentamos los canales esenciales a los que debes prestar atención. ¡Sácale el máximo provecho a la comunidad!
          </p>
          
          <div className="dc-blueprint-channels">
            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">📢-anuncios</span>
              <span className="dc-channel-desc">Noticias importantes, comunicados oficiales de clubes, torneos y sorteos de la comunidad.</span>
            </div>
            
            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">💬-general</span>
              <span className="dc-channel-desc">El chat principal del servidor. Un espacio de encuentro para conversar de Brawl Stars y pasar el rato.</span>
            </div>
            
            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">🤖-comandos</span>
              <span className="dc-channel-desc">Canal habilitado para interactuar con LA Bot. Consulta tus estadísticas de Brawl Stars, juega a Wordle o Werewolf.</span>
            </div>

            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">⚔️-torneos</span>
              <span className="dc-channel-desc">Información, inscripciones abiertas y avisos de competiciones competitivas y amistosas.</span>
            </div>

            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">👥-busco-equipo</span>
              <span className="dc-channel-desc">¿No tienes equipo con quien jugar o competir? Anúnciate aquí y encuentra compañeros en tu rango de copas.</span>
            </div>

            <div className="dc-channel-item">
              <span className="dc-channel-tag">#</span>
              <span className="dc-channel-name">🎫-soporte</span>
              <span className="dc-channel-desc">Abre un ticket para recibir atención personalizada por parte del staff ante cualquier duda o problema.</span>
            </div>
          </div>
        </section>

        {/* Discord CTA Banner */}
        <section className="dc-cta-banner fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="dc-cta-title">¿Aún no estás en nuestro Discord?</h2>
          <p className="dc-cta-desc">
            Únete a la mayor comunidad de Brawl Stars hispanohablante. Copas, torneos activos, minijuegos y gente genial con quien jugar te están esperando.
          </p>
          <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener noreferrer" className="dc-cta-btn">
            Unirse al Servidor <ArrowRightIcon style={{ width: 18, height: 18 }} />
          </a>
        </section>

      </main>
    </>
  );
}
