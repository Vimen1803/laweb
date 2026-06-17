import Link from 'next/link';

export const metadata = {
  title: 'LA Trivial — Documentación',
  description: 'Documentación oficial del Trivial de LA Spain: cómo jugar, comandos y ranking.',
};

const LINKS = [
  { href: '/bot-stats/trivial/doc/jugar', icon: '🎯', title: 'Cómo jugar', desc: 'Reglas, packs, tiempos y el flujo completo de una partida.' },
  { href: '/bot-stats/trivial/doc/comandos', icon: '⌨️', title: 'Comandos', desc: 'Todos los comandos del Trivial explicados con ejemplos.' },
  { href: '/bot-stats/trivial/doc/ranking', icon: '🏆', title: 'Ranking', desc: 'Cómo se cuentan puntos, victorias, partidas y la media.' },
];

const FACTS = [
  { num: '10', lbl: 'Puntos para ganar' },
  { num: '15s', lbl: 'Por pregunta' },
  { num: '1º', lbl: 'Gana el más rápido' },
  { num: '∞', lbl: 'Packs temáticos' },
];

export default function TrivialDocInicio() {
  return (
    <main className="tv-main tv-fade">
      <Link href="/bot-stats" className="tv-back">← Volver al Dashboard</Link>

      <section className="tv-hero">
        <div>
          <span className="tv-eyebrow">▪ El Trivial de LA Spain</span>
          <h1 className="tv-h1">Pon a prueba<br /><em>lo que sabes</em></h1>
          <p className="tv-lead">
            El bot lanza preguntas de packs temáticos en el canal. El primero en escribir la
            respuesta correcta se lleva el punto. Encadena aciertos, llega a la puntuación
            máxima y escala en el ranking del servidor.
          </p>
        </div>

        <div className="tv-chat" aria-hidden="true">
          <div className="tv-chat-row">
            <div className="tv-chat-av bot">LA</div>
            <div className="tv-chat-body">
              <div className="tv-chat-name bot">LABot <span className="botbadge">BOT</span></div>
              <div className="tv-chat-msg">Pregunta número 3!</div>
              <div className="tv-chat-msg tv-chat-q">¿Cuál es la capital de Francia?</div>
            </div>
          </div>
          <div className="tv-chat-row">
            <div className="tv-chat-av user">V</div>
            <div className="tv-chat-body">
              <div className="tv-chat-name">Víctor</div>
              <div className="tv-chat-msg">París</div>
            </div>
          </div>
          <div className="tv-chat-row">
            <div className="tv-chat-av bot">LA</div>
            <div className="tv-chat-body">
              <div className="tv-chat-name bot">LABot <span className="botbadge">BOT</span></div>
              <div className="tv-chat-msg">¡Lo tienes, Víctor! <span className="tv-plus">+1</span> para ti</div>
            </div>
          </div>
        </div>
      </section>

      <div className="tv-facts">
        {FACTS.map((f, i) => (
          <div key={i} className="tv-fact">
            <span className="tv-fact-num">{f.num}</span>
            <span className="tv-fact-lbl">{f.lbl}</span>
          </div>
        ))}
      </div>

      <div className="tv-links">
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className="tv-link">
            <span className="tv-link-ic">{l.icon}</span>
            <h3>{l.title}</h3>
            <p>{l.desc}</p>
            <span className="tv-link-go">Ver más →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
