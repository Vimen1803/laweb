import Leaderboard from './Leaderboard';

export const metadata = { title: 'Ranking — Trivial LA Spain' };

const CARDS = [
  { ic: '➕', title: 'Puntos', text: 'Cada respuesta correcta suma 1 punto. Los puntos de todas tus partidas se acumulan como puntos totales, el criterio principal del ranking.' },
  { ic: '🏆', title: 'Victorias', text: 'Ganas una partida al ser el primero en alcanzar la puntuación máxima (10). Cada victoria queda registrada en tu historial.' },
  { ic: '🎮', title: 'Partidas', text: 'Se cuenta cada partida en la que participas y puntúas, juegues hasta el final o no. Es la base para calcular tu media.' },
  { ic: '📊', title: 'Media', text: 'Tus puntos totales divididos entre las partidas jugadas. Premia ser constante, no solo jugar mucho.' },
];

export default function TrivialRanking() {
  return (
    <main className="tv-main tv-fade">
      <span className="tv-eyebrow">▪ Clasificación del servidor</span>
      <h1 className="tv-section-title">Ranking</h1>
      <p className="tv-section-sub">
        Clasificación en vivo del Trivial con los datos reales del servidor, ordenada por
        puntos totales. Es la misma que verías con <code style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--tv-violet-l)' }}>,trivial lb</code> en Discord.
      </p>

      <Leaderboard />

      <h2 className="tv-section-title" style={{ fontSize: '1.4rem', marginTop: '3rem' }}>Cómo se calcula</h2>
      <div className="tv-cards" style={{ marginTop: '1.25rem' }}>
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
