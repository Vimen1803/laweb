'use client';
import { useState } from 'react';

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      q: '¿Qué es LA Spain?',
      a: 'LA Spain es la comunidad hispana de clubes más grande de Brawl Stars. Fue fundada el 4 de mayo de 2019 y cuenta con +6500 miembros en Discord, una red de más de 15 clubes activos, un bot propio con más de 100 comandos, y un sistema de niveles con recompensas.',
    },
    {
      q: '¿Cómo puedo unirme al servidor?',
      a: 'Puedes unirte a nuestro servidor de Discord a través de nuestra invitación permanente: discord.gg/DbRUker. ¡Solo tienes que aceptar las normas y ya formarás parte de la comunidad!',
    },
    {
      q: '¿Cómo guardo mi tag de Brawl Stars?',
      a: 'Usa el comando ,save seguido de tu tag (ejemplo: ,save #8GRCQK). Esto vinculará tu perfil de Brawl Stars a tu cuenta de Discord para poder ver estadísticas y participar en rankings.',
    },
    {
      q: '¿Cómo funciona el sistema de niveles?',
      a: 'Ganas experiencia al chatear en los canales de texto y al estar en canales de voz. Cada cierto nivel obtienes un nuevo rol con perks adicionales: desde enviar fotos (Nivel 10) hasta crear tu propio comando personalizado (Nivel 110) o tener un rol con color propio (Nivel 125).',
    },
    {
      q: '¿Qué minijuegos hay disponibles?',
      a: 'LA Spain tiene una colección de minijuegos: Werewolf (Hombre Lobo), Wordle, Monopoly, Battleship (Hundir la Flota), Snake, Ahorcado, Trivial, Party Games y un sistema de mascotas virtuales. Todos se juegan directamente en Discord usando los comandos del bot.',
    },
    {
      q: '¿Cómo juego al Werewolf?',
      a: 'Usa ,ww start para crear una partida. Se necesita un mínimo de 8 jugadores. Los demás se unen con ,ww join. El juego tiene más de 20 roles distintos con habilidades especiales que se juegan durante fases de noche y día.',
    },
    {
      q: '¿Qué son los eventos de caramelos?',
      a: 'Son eventos especiales donde aparecen objetos mágicos en un canal específico que los usuarios deben recoger. Cuantos más recojas, más puntos tienes. Los eventos tienen rankings y el ganador recibe premios.',
    },
    {
      q: '¿Cómo funcionan las mascotas?',
      a: 'Puedes adoptar una mascota virtual con otro usuario usando ,pet adopt @usuario animal nombre. Las mascotas tienen estadísticas de hambre, sueño y humor que decaen con el tiempo. ¡Cuídalas usando ,pet feed, ,pet sleep y ,pet play!',
    },
    {
      q: '¿Cómo puedo ver mi perfil de Brawl Stars?',
      a: 'Después de guardar tu tag con ,save, usa ,profile para ver tus estadísticas. También puedes ver el perfil de otros usuarios con ,profile @usuario.',
    },
    {
      q: '¿Qué es la Blacklist?',
      a: 'Es una lista negra de jugadores de Brawl Stars que han sido reportados por comportamientos graves. El bot monitoriza automáticamente si algún jugador de la blacklist entra a un club de LA Spain y avisa al staff.',
    },
    {
      q: '¿Cómo puedo formar parte del Staff?',
      a: 'Los candidatos a Staff son seleccionados por el equipo actual basándose en la actividad, madurez y contribución a la comunidad. No hay formulario público de solicitud; el staff te contactará si consideran que eres apto.',
    },
    {
      q: '¿Puedo tener un rol personalizado?',
      a: 'Sí, al alcanzar el nivel 125 (Dios ☯) desbloqueas la posibilidad de tener un rol con nombre y color totalmente personalizado.',
    },
    {
      q: '¿Hay soporte para Clash Royale?',
      a: 'Sí, LA Bot también tiene comandos de Clash Royale: ,crsave para guardar tu tag, ,crprofile para ver tu perfil, y ,renamecr para cambiar tu apodo al nombre de CR.',
    },
    {
      q: '¿Dónde puedo reportar un error del bot?',
      a: 'Puedes reportar errores abriendo un ticket de soporte en el servidor de Discord o contactando directamente a un Manager o Admin.',
    },
  ];

  return (
    <section className="section" style={{ maxWidth: 900 }}>
      <h1 className="section-title">Preguntas Frecuentes</h1>
      <p className="section-subtitle">Todo lo que necesitas saber sobre LA Spain</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item" onClick={() => setOpenId(openId === i ? null : i)}>
            <div className="faq-header">
              <span style={{ color: openId === i ? 'var(--gold)' : 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                {faq.q}
              </span>
              <span style={{
                color: 'var(--gold)',
                fontSize: '1.2rem',
                transition: 'transform 0.3s',
                transform: openId === i ? 'rotate(180deg)' : 'rotate(0deg)',
                flexShrink: 0,
              }}>
                ▾
              </span>
            </div>
            <div className="faq-body" style={{
              maxHeight: openId === i ? '300px' : '0',
              opacity: openId === i ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, paddingTop: '0.75rem' }}>
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          ¿No encuentras tu pregunta? Abre un <strong style={{ color: 'var(--gold)' }}>ticket de soporte</strong> en el servidor de Discord.
        </p>
        <a href="https://discord.gg/DbRUker" target="_blank" rel="noopener"
          className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Ir a Discord
        </a>
      </div>
    </section>
  );
}
