export const metadata = { title: 'Ranking — Trivial LA Spain' };

const ITEMS = [
  { title: 'Puntos', text: 'Cada respuesta correcta suma 1 punto en la partida. Tus puntos de todas las partidas se acumulan como puntos totales.' },
  { title: 'Victorias', text: 'Ganas una partida al ser el primero en alcanzar la puntuación máxima (10 por defecto). Cada victoria cuenta en tu historial.' },
  { title: 'Partidas y media', text: 'Se registra el número de partidas jugadas y tu media de puntos por partida (puntos totales ÷ partidas).' },
  { title: 'Clasificación', text: 'El ranking del servidor (,trivial lb) ordena a los jugadores por puntos totales, mostrando victorias, partidas y media.' },
];

export default function TrivialRanking() {
  return (
    <main className="wd-main wd-fade">
      <span className="wd-eyebrow">▪ Sistema de puntos</span>
      <h1 className="wd-section-title">Ranking</h1>
      <p className="wd-section-sub">Así se calculan los puntos y la clasificación del Trivial. Tus estadísticas se guardan por servidor.</p>

      <div className="wd-links" style={{ marginTop: '1.5rem' }}>
        {ITEMS.map((it, i) => (
          <div key={i} className="wd-link-card" style={{ cursor: 'default' }}>
            <div className="wd-link-tiles">
              <span style={{ background: '#3498db' }} />
              <span style={{ background: '#2980b9' }} />
              <span style={{ background: '#3a3c42' }} />
            </div>
            <div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
