'use client';
import { useState } from 'react';
import {
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CommandLineIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const FAQS = [
  {
    q: '¿Qué es LA Spain?',
    a: 'LA Spain es la comunidad hispana de clubes más grande de Brawl Stars. Fue fundada el 4 de mayo de 2019 y cuenta con +6500 miembros en Discord, una red de más de 15 clubes activos, un bot propio con más de 100 comandos, y un sistema de niveles con recompensas.',
    category: 'general',
    icon: UserGroupIcon,
  },
  {
    q: '¿Cómo puedo unirme al servidor?',
    a: 'Puedes unirte a nuestro servidor de Discord a través de nuestra invitación permanente: discord.gg/DbRUker. ¡Solo tienes que aceptar las normas y ya formarás parte de la comunidad!',
    category: 'general',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    q: '¿Cómo guardo mi tag de Brawl Stars?',
    a: 'Usa el comando ,save seguido de tu tag (ejemplo: ,save #8GRCQK). Esto vinculará tu perfil de Brawl Stars a tu cuenta de Discord para poder ver estadísticas y participar en rankings.',
    category: 'commands',
    icon: CommandLineIcon,
  },
  {
    q: '¿Cómo funciona el sistema de niveles?',
    a: 'Ganas experiencia al chatear en los canales de texto y al estar en canales de voz. Cada cierto nivel obtienes un nuevo rol con perks adicionales: desde enviar fotos (Nivel 10) hasta crear tu propio comando personalizado (Nivel 110) o tener un rol con color propio (Nivel 125).',
    category: 'community',
    icon: TrophyIcon,
  },
  {
    q: '¿Qué minijuegos hay disponibles?',
    a: 'LA Spain tiene una colección de minijuegos: Werewolf (Hombre Lobo), Wordle, Monopoly, Battleship (Hundir la Flota), Snake, Ahorcado, Trivial, Party Games y un sistema de mascotas virtuales. Todos se juegan directamente en Discord usando los comandos del bot.',
    category: 'games',
    icon: PuzzlePieceIcon,
  },
  {
    q: '¿Cómo juego al Werewolf?',
    a: 'Usa ,ww start para crear una partida. Se necesita un mínimo de 8 jugadores. Los demás se unen con ,ww join. El juego tiene más de 20 roles distintos con habilidades especiales que se juegan durante fases de noche y día.',
    category: 'games',
    icon: PuzzlePieceIcon,
  },
  {
    q: '¿Qué son los eventos de caramelos?',
    a: 'Son eventos especiales donde aparecen objetos mágicos en un canal específico que los usuarios deben recoger. Cuantos más recojas, más puntos tienes. Los eventos tienen rankings y el ganador recibe premios.',
    category: 'games',
    icon: SparklesIcon,
  },
  {
    q: '¿Cómo puedo ver mi perfil de Brawl Stars?',
    a: 'Después de guardar tu tag con ,save, usa ,profile para ver tus estadísticas. También puedes ver el perfil de otros usuarios con ,profile @usuario.',
    category: 'commands',
    icon: CommandLineIcon,
  },
  {
    q: '¿Qué es la Blacklist?',
    a: 'Es una lista negra de jugadores de Brawl Stars que han sido reportados por comportamientos graves. El bot monitoriza automáticamente si algún jugador de la blacklist entra a un club de LA Spain y avisa al staff.',
    category: 'community',
    icon: ShieldCheckIcon,
  },
  {
    q: '¿Cómo puedo formar parte del Staff?',
    a: 'Los candidatos a Staff son seleccionados por el equipo actual basándose en la actividad, madurez y contribución a la comunidad. No hay formulario público de solicitud; el staff te contactará si consideran que eres apto.',
    category: 'community',
    icon: ShieldCheckIcon,
  },
  {
    q: '¿Puedo tener un rol personalizado?',
    a: 'Sí, al alcanzar el nivel 125 (Dios ☯) desbloqueas la posibilidad de tener un rol con nombre y color totalmente personalizado.',
    category: 'community',
    icon: TrophyIcon,
  },
  {
    q: '¿Hay soporte para Clash Royale?',
    a: 'Sí, LA Bot también tiene comandos de Clash Royale: ,crsave para guardar tu tag, ,crprofile para ver tu perfil, y ,renamecr para cambiar tu apodo al nombre de CR.',
    category: 'commands',
    icon: CommandLineIcon,
  },
  {
    q: '¿Dónde puedo reportar un error del bot?',
    a: 'Puedes reportar errores abriendo un ticket de soporte en el servidor de Discord o contactando directamente a un Manager o Admin.',
    category: 'general',
    icon: ChatBubbleLeftRightIcon,
  },
];

const CATEGORY_LABELS = {
  general: 'General',
  commands: 'Comandos',
  games: 'Minijuegos',
  community: 'Comunidad',
};

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-glow" />
        <div className="faq-hero-inner">
          <h1 className="faq-hero-title">Preguntas Frecuentes</h1>
          <p className="faq-hero-desc">
            Encuentra respuestas rápidas sobre LA Spain, nuestros comandos, minijuegos y comunidad.
          </p>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="faq-content-section">
        <div className="faq-container">

          {/* FAQ Accordion */}
          <div className="faq-accordion">
            {FAQS.map((faq, i) => {
              const isOpen = openId === i;
              const Icon = faq.icon;
              return (
                <div
                  key={i}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <button
                    className="faq-accordion-trigger"
                    onClick={() => setOpenId(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-accordion-left">
                      <div className={`faq-icon-wrapper faq-icon-${faq.category}`}>
                        <Icon style={{ width: 18, height: 18 }} />
                      </div>
                      <div className="faq-question-content">
                        <span className="faq-question-text">{faq.q}</span>
                        <span className={`faq-category-tag faq-tag-${faq.category}`}>
                          {CATEGORY_LABELS[faq.category]}
                        </span>
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                    />
                  </button>
                  <div className={`faq-accordion-panel ${isOpen ? 'expanded' : ''}`}>
                    <div className="faq-accordion-answer">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <div className="faq-cta-banner">
            <div className="faq-cta-glow" />
            <div className="faq-cta-content">
              <div className="faq-cta-icon-wrapper">
                <ChatBubbleLeftRightIcon style={{ width: 28, height: 28, color: 'var(--gold)' }} />
              </div>
              <div className="faq-cta-text">
                <h3>¿No encuentras tu respuesta?</h3>
                <p>Nuestro equipo está disponible en Discord para ayudarte con cualquier duda.</p>
              </div>
              <a
                href="https://discord.gg/DbRUker"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary faq-cta-btn"
              >
                Abrir Discord
                <ArrowTopRightOnSquareIcon style={{ width: 16, height: 16 }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
