export const metadata = { title: 'Cómo jugar — Trivial LA Spain' };

const STEPS = [
  { n: '1', title: 'Elige un pack', text: 'Mira los packs disponibles con ,trivial list y arranca una partida con ,trivial <pack>.' },
  { n: '2', title: 'Responde rápido', text: 'El bot lanza preguntas en el canal. El primero en escribir la respuesta correcta se lleva el punto.' },
  { n: '3', title: 'Suma puntos', text: 'Cada acierto suma. La partida termina cuando alguien llega a la puntuación máxima (10 por defecto).' },
  { n: '4', title: 'Escala en el ranking', text: 'Tus victorias, partidas y puntos totales quedan guardados. Consulta el ranking con ,trivial lb.' },
];

export default function TrivialJugar() {
  return (
    <main className="wd-main wd-fade">
      <span className="wd-eyebrow">▪ Guía</span>
      <h1 className="wd-section-title">Cómo jugar</h1>
      <p className="wd-section-sub">El Trivial enfrenta a los miembros del servidor con preguntas por packs temáticos. Gana quien antes alcance la puntuación máxima.</p>

      <div className="wd-links" style={{ marginTop: '1.5rem' }}>
        {STEPS.map(s => (
          <div key={s.n} className="wd-link-card" style={{ cursor: 'default' }}>
            <div className="wd-link-tiles">
              <span style={{ background: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>{s.n}</span>
            </div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
