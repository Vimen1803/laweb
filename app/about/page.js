'use client';
import { useState, useEffect } from 'react';
import { 
  BookOpenIcon, SparklesIcon, PuzzlePieceIcon, GlobeAltIcon, 
  MoonIcon, BanknotesIcon, CurrencyDollarIcon, PaperAirplaneIcon, 
  QuestionMarkCircleIcon, ChartBarIcon, CpuChipIcon, GiftIcon 
} from '@heroicons/react/24/solid';

// No metadata in client components, so we rely on layout or let it just be.
// But Next.js doesn't allow metadata in 'use client'. We should remove it or separate it.

const DiscordIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
);
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
);
const WikiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.407 0 .2.11.565.328 1.093l3.253 7.672 1.833-3.832-1.726-3.75c-.372-.82-.598-1.306-.679-1.457-.105-.195-.376-.312-.813-.351l-.292-.024c-.15 0-.225-.066-.225-.197v-.424l.071-.055h4.495l.052.055v.424c0 .131-.075.197-.225.197l-.349.024c-.493.034-.639.14-.434.583l1.065 2.385 1.141-2.291c.26-.552.176-.753-.252-.792l-.375-.024c-.15 0-.225-.066-.225-.197v-.424l.051-.055h3.452l.051.055v.424c0 .131-.075.197-.225.197l-.251.024c-.521.038-.863.282-1.028.731L11.92 9.903l1.837 3.823c.21-.453 2.023-4.182 2.738-5.755.245-.544.334-.915.334-1.113 0-.379-.258-.58-.773-.604l-.438-.024c-.15 0-.225-.066-.225-.197v-.424l.051-.055h3.738l.051.055v.424c0 .131-.075.197-.225.197l-.166.024c-.732.052-1.201.626-1.787 1.848-.904 1.852-2.564 5.233-3.471 7.12z"/></svg>
);

const minigames = [
  {
    name: 'Werewolf',
    emoji: <MoonIcon style={{ width: 24, height: 24 }} />,
    desc: 'El clásico juego del Hombre Lobo adaptado a Discord. Partidas de 5 a 20 jugadores con más de 20 roles únicos, fases de noche y día, votaciones y habilidades especiales. ¡Engaña, deduce y sobrevive!',
    color: '#e74c3c',
    link: 'https://lawerewolfdoc.vercel.app/',
  },
  {
    name: 'Wordle',
    emoji: <PuzzlePieceIcon style={{ width: 24, height: 24 }} />,
    desc: 'Adivina la palabra secreta en 6 intentos. Basado en el famoso juego de palabras, con estadísticas, rachas y un ranking para competir con tus amigos.',
    color: '#2ecc71',
  },
  {
    name: 'Economía & Eventos',
    emoji: <BanknotesIcon style={{ width: 24, height: 24 }} />,
    desc: 'Participa en eventos de UnbelievaBoat, reclama recompensas con el sistema de caramelos, gana experiencia y sube de nivel para desbloquear perks exclusivos.',
    color: '#f1c40f',
  },
  {
    name: 'Monopoly',
    emoji: <CurrencyDollarIcon style={{ width: 24, height: 24 }} />,
    desc: 'Partidas de Monopoly completas para 2-8 jugadores directamente en Discord. Compra propiedades, construye, y arruina a tus amigos.',
    color: '#3498db',
  },
  {
    name: 'Battleship',
    emoji: <PaperAirplaneIcon style={{ width: 24, height: 24 }} />,
    desc: 'Hundir la Flota contra otro jugador. Estrategia pura en tableros generados por imagen.',
    color: '#9b59b6',
  },
  {
    name: 'Trivial',
    emoji: <QuestionMarkCircleIcon style={{ width: 24, height: 24 }} />,
    desc: 'Pon a prueba tus conocimientos con preguntas de todo tipo. Compite contra otros jugadores y demuestra quién sabe más en el servidor.',
    color: '#e67e22',
  },
];

const social = [
  { name: 'Discord', url: 'https://discord.gg/DbRUker', Icon: DiscordIcon, desc: 'Únete a nuestro servidor principal' },
  { name: 'Twitter / X', url: 'https://x.com/LASpain_', Icon: XIcon, desc: 'Síguenos en X para novedades' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@laspain_', Icon: TikTokIcon, desc: 'Contenido y clips de la comunidad' },
  { name: 'Wiki', url: 'https://brawl-stars-club.fandom.com/wiki/LA_Spain_(Club_Family)', Icon: WikiIcon, desc: 'Nuestra página en Fandom' },
];

export default function AboutPage() {
  const [stats, setStats] = useState({ members: null, clubs: null });

  useEffect(() => {
    fetch('/api/discord')
      .then(r => r.json())
      .then(d => {
        setStats({
          members: d.memberCount || null,
          clubs: d.clubCount || null,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <h1 className="section-title">Sobre Nosotros</h1>
      <p className="section-subtitle">Conoce la historia, el contenido y las redes de LA Spain</p>

      {/* History */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpenIcon style={{ width: 24, height: 24 }} /> Nuestra Historia
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>LA Spain</strong> nació el <strong style={{ color: 'var(--gold)' }}>4 de mayo de 2019</strong> de la mano 
            de dos clubes pioneros: <strong style={{ color: 'var(--text-primary)' }}>S7VEN</strong> y <strong style={{ color: 'var(--text-primary)' }}>Sanctum</strong>, y 
            rápidamente alcanzó la cima del ranking local y mundial.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            A lo largo del tiempo, grandes organizaciones como <strong style={{ color: 'var(--text-primary)' }}>Exenze</strong>, <strong style={{ color: 'var(--text-primary)' }}>DeRucula</strong> y <strong style={{ color: 'var(--text-primary)' }}>Gladius Legion</strong> se 
            han unido a la familia, consolidando a LA Spain como la <strong style={{ color: 'var(--gold)' }}>comunidad hispana de clubes más grande de Brawl Stars</strong>, 
            con más de {stats.members ? stats.members.toLocaleString() : '6500'} miembros en Discord y una red de más de {stats.clubs ? stats.clubs : '15'} clubes activos que compiten al más alto nivel.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            LA Spain ha dejado huella en torneos como la <strong style={{ color: 'var(--text-primary)' }}>Gems League Europe</strong> o la <strong style={{ color: 'var(--text-primary)' }}>Clash Royale League</strong>, 
            y ha contado entre sus filas a campeones mundiales como <strong style={{ color: 'var(--gold)' }}>Mohamed Light</strong>.
          </p>
          <p>
            Hoy, LA Spain cuenta con un <strong style={{ color: 'var(--text-primary)' }}>bot propio (LA Bot)</strong> con más de 100 comandos, 
            un sistema de economía interactivo, minijuegos exclusivos, un sistema de niveles con recompensas, y un equipo de staff comprometido 
            que trabaja día a día para mantener esta comunidad viva.
          </p>
        </div>
      </div>

      {/* What you'll find */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> ¿Qué encontrarás?
        </h2>
        <div className="grid-2">
          {[
            { icon: <SparklesIcon style={{ width: 32, height: 32 }} />, title: 'Brawl Stars', desc: 'Canales dedicados a compartir jugadas, ver estadísticas y participar en torneos.' },
            { icon: <ChartBarIcon style={{ width: 32, height: 32 }} />, title: 'Sistema de Niveles', desc: 'Sube de nivel chateando y en canales de voz. Desbloquea roles con perks exclusivos.' },
            { icon: <CpuChipIcon style={{ width: 32, height: 32 }} />, title: 'Bot Propio', desc: 'LA Bot: más de 100 comandos, moderación, estadísticas y minijuegos.' },
            { icon: <GiftIcon style={{ width: 32, height: 32 }} />, title: 'Eventos', desc: 'Torneos, concursos de memes, quinielas, y eventos estacionales con premios.' },
          ].map((item, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minigames */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PuzzlePieceIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> Minijuegos
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          LA Spain tiene una colección de minijuegos jugables directamente en Discord
        </p>
        <div className="grid-2">
          {minigames.map((game, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${game.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem', color: game.color }}>
                {game.emoji}
                <h4 style={{ color: game.color, fontWeight: 700 }}>{game.name}</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {game.desc}
              </p>
              {game.link && (
                <a href={game.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '0.8rem', marginTop: '1rem', background: game.color, borderColor: game.color, color: '#000', fontWeight: 700 }}>
                  Ver Documentación
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GlobeAltIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> Redes Sociales
        </h2>
        <div className="grid-2">
          {social.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener" className="card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <s.Icon />
                </div>
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '2px' }}>{s.name}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
