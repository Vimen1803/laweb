import { Fragment } from 'react';

export const metadata = {
  title: 'Puntuación — LA Wordle',
  description: 'Cómo se calculan los puntos, las rachas y el ranking del Wordle de LA Spain.',
};

const POINTS = [
  { name: 'Normal', formula: '2 × Racha', detail: ['Racha 1 → 2 pts', 'Racha 5 → 10 pts', 'Racha 10 → 20 pts'] },
  { name: 'Doble', formula: '5 × Racha', detail: ['Racha 1 → 5 pts', 'Racha 5 → 25 pts', 'Racha 10 → 50 pts'] },
  { name: 'Triple', formula: '10 × Racha', detail: ['Racha 1 → 10 pts', 'Racha 5 → 50 pts', 'Racha 10 → 100 pts'] },
  { name: 'Escalera', formula: 'N × (N+1)', detail: ['N = palabras', '5 → 30 pts', '10 → 110 pts'] },
];

const STREAK = [
  { n: 1, pts: 2, h: 44 },
  { n: 2, pts: 4, h: 56 },
  { n: 3, pts: 6, h: 68 },
  { n: 5, pts: 10, h: 84 },
  { n: 10, pts: 20, h: 104 },
];

const ESCALERA = [
  ['1 palabra resuelta', '1 × 2 = 2 pts'],
  ['3 palabras resueltas', '3 × 4 = 12 pts'],
  ['5 palabras resueltas', '5 × 6 = 30 pts'],
  ['10 palabras resueltas', '10 × 11 = 110 pts'],
];

export default function WordlePuntuacion() {
  return (
    <main className="wd-main wd-fade">
      <span className="wd-eyebrow">▪ Cómo se suman los puntos</span>
      <h1 className="wd-section-title">Sistema de puntuación</h1>
      <p className="wd-section-sub">Los créditos se acumulan en el ranking global. Cuanto más difícil el modo y mayor tu racha, más ganas.</p>

      <div className="wd-points">
        {POINTS.map(p => (
          <div className="wd-point" key={p.name}>
            <div className="wd-point-name">{p.name}</div>
            <div className="wd-point-formula">{p.formula}</div>
            <div className="wd-point-detail">{p.detail.map((d, i) => <div key={i}>{d}</div>)}</div>
          </div>
        ))}
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">🔥 La racha</h3>
        <p style={{ color: 'var(--wd-text-2)', lineHeight: 1.7, marginTop: 0, marginBottom: '1.75rem' }}>
          La racha es el número de partidas consecutivas ganadas en un mismo modo. <strong style={{ color: 'var(--wd-text)' }}>Si pierdes, vuelve a 0.</strong> Mantenerla alta es la clave para acumular puntos rápido.
        </p>
        <div className="wd-streak">
          {STREAK.map((s, i) => (
            <Fragment key={s.n}>
              <div className="wd-streak-step">
                <div className="wd-streak-tile" style={{ height: s.h }}>{s.n}</div>
                <span className="wd-streak-pts">{s.pts} pts</span>
              </div>
              {i < STREAK.length - 1 && <span className="wd-streak-arrow">→</span>}
            </Fragment>
          ))}
        </div>
        <p style={{ color: 'var(--wd-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>Ejemplo con el modo Normal (2 pts × racha).</p>
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">🪜 Puntuación Escalera</h3>
        <p style={{ color: 'var(--wd-text-2)', lineHeight: 1.7, marginTop: 0, marginBottom: '0.5rem' }}>
          En Escalera los puntos dependen del número de palabras resueltas en la sesión: <strong style={{ color: 'var(--wd-text)' }}>N × (N+1)</strong>.
        </p>
        <table className="wd-table">
          <tbody>
            {ESCALERA.map(([a, b], i) => (
              <tr key={i}><td>{a}</td><td>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">🏆 Ranking</h3>
        <p style={{ color: 'var(--wd-text-2)', lineHeight: 1.7, margin: 0 }}>
          Usa <code className="wd-code">,wordle lb</code> para ver el ranking global de puntos. También puedes ordenar por
          victorias, racha, winrate o el récord de escalera con <code className="wd-code">,wordle lb escalera</code>.
        </p>
      </div>
    </main>
  );
}
