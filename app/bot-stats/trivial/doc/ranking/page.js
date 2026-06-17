export const metadata = { title: 'Ranking — Trivial LA Spain' };

const PODIUM = [
  { cls: 'second', rank: '2', name: 'Lucía', pts: '152 pts' },
  { cls: 'first', rank: '1', name: 'Víctor', pts: '184 pts' },
  { cls: 'third', rank: '3', name: 'Mario', pts: '128 pts' },
];

const ROWS = [
  { rk: '🥇', name: 'Víctor', w: 8, g: 24, p: 184, m: '7.67' },
  { rk: '🥈', name: 'Lucía', w: 6, g: 21, p: 152, m: '7.24' },
  { rk: '🥉', name: 'Mario', w: 4, g: 19, p: 128, m: '6.74' },
  { rk: '#4', name: 'Sara', w: 3, g: 17, p: 96, m: '5.65' },
  { rk: '#5', name: 'Iker', w: 2, g: 14, p: 78, m: '5.57' },
];

const CARDS = [
  { ic: '➕', title: 'Puntos', text: 'Cada respuesta correcta suma 1 punto. Los puntos de todas tus partidas se acumulan como puntos totales, el criterio principal del ranking.' },
  { ic: '🏆', title: 'Victorias', text: 'Ganas una partida al ser el primero en alcanzar la puntuación máxima (10). Cada victoria queda registrada en tu historial.' },
  { ic: '🎮', title: 'Partidas', text: 'Se cuenta cada partida en la que participas y puntúas, juegues hasta el final o no. Es la base para calcular tu media.' },
  { ic: '📊', title: 'Media', text: 'Tus puntos totales divididos entre las partidas jugadas. Premia ser constante, no solo jugar mucho.' },
];

export default function TrivialRanking() {
  return (
    <main className="tv-main tv-fade">
      <span className="tv-eyebrow">▪ Sistema de puntos</span>
      <h1 className="tv-section-title">Ranking</h1>
      <p className="tv-section-sub">
        Así se calcula la clasificación del Trivial. Tus estadísticas se guardan por servidor
        y puedes consultarlas en cualquier momento con <code style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--tv-violet-l)' }}>,trivial lb</code>.
      </p>

      <div className="tv-podium">
        {PODIUM.map((p, i) => (
          <div key={i} className={`tv-pod ${p.cls}`}>
            <div className="tv-pod-rank">{p.rank}</div>
            <div className="tv-pod-name">{p.name}</div>
            <div className="tv-pod-pts">{p.pts}</div>
          </div>
        ))}
      </div>

      <div className="tv-lb-wrap">
        <table className="tv-lb">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th className="r">Victorias</th>
              <th className="r">Partidas</th>
              <th className="r">Puntos</th>
              <th className="r">Media</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td className="rk">{r.rk}</td>
                <td>{r.name}</td>
                <td className="r">{r.w}</td>
                <td className="r">{r.g}</td>
                <td className="r pts">{r.p}</td>
                <td className="r">{r.m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tv-cards">
        {CARDS.map((c, i) => (
          <div key={i} className="tv-card2">
            <h4><span className="ic">{c.ic}</span> {c.title}</h4>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
