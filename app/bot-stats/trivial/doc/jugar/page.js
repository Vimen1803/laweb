export const metadata = { title: 'Cómo jugar — Trivial LA Spain' };

const STEPS = [
  { n: '1', title: 'Elige un pack y arranca', html: <>Mira los packs disponibles con <code>,trivial list</code> y empieza una partida en el canal con <code>,trivial &lt;pack&gt;</code>. El bot anuncia el pack y su autor.</> },
  { n: '2', title: 'Llegan las preguntas', html: <>El bot publica las preguntas de una en una («Pregunta número N!»). No hay opciones: la respuesta se escribe directamente en el chat.</> },
  { n: '3', title: 'Responde el primero', html: <>El <strong>primero</strong> que escriba la respuesta correcta se lleva <strong>+1</strong>. No importan mayúsculas ni acentos sueltos: basta con acertar la palabra clave.</> },
  { n: '4', title: 'Llega a la puntuación máxima', html: <>La partida termina cuando alguien alcanza los <strong>10 puntos</strong>, o cuando se acaban las preguntas del pack.</> },
  { n: '5', title: 'Escala en el ranking', html: <>Al cerrar la partida se guardan tus puntos, partidas y victorias. Consulta la clasificación con <code>,trivial lb</code>.</> },
];

const SPECS = [
  { num: '10', lbl: 'Puntos para ganar la partida' },
  { num: '15 s', lbl: 'Para responder cada pregunta' },
  { num: '120 s', lbl: 'Sin respuestas y la partida se cierra sola' },
];

export default function TrivialJugar() {
  return (
    <main className="tv-main tv-fade">
      <span className="tv-eyebrow">▪ Guía</span>
      <h1 className="tv-section-title">Cómo jugar</h1>
      <p className="tv-section-sub">
        El Trivial enfrenta a los miembros del servidor con preguntas por packs temáticos.
        Gana quien antes alcance la puntuación máxima respondiendo correctamente en el chat.
      </p>

      <div className="tv-timeline">
        {STEPS.map(s => (
          <div key={s.n} className="tv-step">
            <span className="tv-step-dot">{s.n}</span>
            <div className="tv-step-card">
              <h3>{s.title}</h3>
              <p>{s.html}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="tv-panel">
        <h3 className="tv-panel-title">⏱️ Tiempos de la partida</h3>
        <div className="tv-specs">
          {SPECS.map((sp, i) => (
            <div key={i} className="tv-spec">
              <div className="tv-spec-num">{sp.num}</div>
              <div className="tv-spec-lbl">{sp.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="tv-panel">
        <h3 className="tv-panel-title">💡 Cómo se aceptan las respuestas</h3>
        <p style={{ color: 'var(--tv-text-2)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
          Las respuestas no distinguen mayúsculas de minúsculas. En respuestas de una sola
          palabra, basta con que escribas esa palabra dentro de tu mensaje; en respuestas de
          varias palabras, el bot busca la frase exacta. Si nadie acierta en 15 segundos, el
          bot revela la solución y pasa a la siguiente pregunta.
        </p>
      </div>
    </main>
  );
}
