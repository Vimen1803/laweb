export const metadata = {
  title: 'Modos — LA Wordle',
  description: 'Los 4 modos de juego del Wordle de LA Spain: Normal, Doble, Triple y Escalera.',
};

const MODES = [
  { name: 'Normal', boards: 1, accent: '#538d4e', chip: '1 palabra', mult: '2×', desc: 'El modo clásico. Adivina una palabra de 5 letras en 6 intentos. Ideal para empezar y mantener tu racha.', cmd: ',wordle' },
  { name: 'Doble', boards: 2, accent: '#b59f3b', chip: '2 palabras', mult: '5×', desc: 'Dos palabras simultáneas, 6 intentos para ambas. Cada intento se aplica a todos los tableros a la vez.', cmd: ',wordle doble' },
  { name: 'Triple', boards: 3, accent: '#c1502e', chip: '3 palabras', mult: '10×', desc: 'El reto máximo. Tres palabras y 6 intentos compartidos. Solo para los más experimentados.', cmd: ',wordle triple' },
  { name: 'Escalera', boards: 2, accent: '#6aaa64', chip: '∞ palabras', mult: 'N·(N+1)', desc: 'Modo infinito con 2 tableros. Cuando resuelves uno, llega una palabra nueva. Termina cuando fallas un tablero.', cmd: ',wordle escalera' },
];

// patrón de relleno para los mini-tableros (g = verde, y = amarillo, k = gris)
const PATTERN = ['k', 'y', 'k', 'g', 'k', 'g', 'g', 'y', 'g', 'k', 'g', 'g', 'g', 'g', 'g'];
const COLORS = { g: '#538d4e', y: '#b59f3b', k: '#3a3c42' };

function MiniBoard() {
  return (
    <div className="wd-mini-board">
      {[0, 1, 2].map(r => (
        <div className="wd-mini-row" key={r}>
          {[0, 1, 2, 3, 4].map(c => (
            <span className="wd-mini-tile" key={c} style={{ background: COLORS[PATTERN[r * 5 + c]] }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const LEGEND = [
  { c: '#538d4e', l: 'G', title: 'Verde — letra correcta y en su sitio', desc: 'La letra existe y está exactamente en esa posición. ¡Bien hecho!' },
  { c: '#b59f3b', l: 'A', title: 'Amarillo — letra correcta, mal colocada', desc: 'La letra está en la palabra, pero en otra posición. Pruébala en otro hueco.' },
  { c: '#3a3c42', l: 'N', title: 'Gris — la letra no está', desc: 'Esa letra no aparece en la palabra oculta. Descártala en tu siguiente intento.' },
];

export default function WordleModos() {
  return (
    <main className="wd-main wd-fade">
      <span className="wd-eyebrow">▪ Cómo se juega</span>
      <h1 className="wd-section-title">Modos de juego</h1>
      <p className="wd-section-sub">Desde el clásico de una palabra hasta el modo escalera sin fin. Cada modo cuenta para su propio ranking.</p>

      <div className="wd-modes">
        {MODES.map(m => (
          <article className="wd-mode" key={m.name}>
            <div className="wd-mode-top">
              <span className="wd-mode-name">{m.name}</span>
              <span className="wd-mode-chip" style={{ background: `${m.accent}22`, color: m.accent }}>{m.chip}</span>
            </div>
            <div className="wd-mini">
              {Array.from({ length: m.boards }).map((_, i) => <MiniBoard key={i} />)}
            </div>
            <p className="wd-mode-desc">{m.desc}</p>
            <div className="wd-mode-foot">
              <span className="wd-mode-mult" style={{ color: m.accent }}>{m.mult}<small>Puntos × racha</small></span>
              <code className="wd-code">{m.cmd}</code>
            </div>
          </article>
        ))}
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">🎨 El sistema de colores</h3>
        <div className="wd-legend">
          {LEGEND.map(x => (
            <div className="wd-legend-row" key={x.l}>
              <div className="wd-legend-tile" style={{ background: x.c }}>{x.l}</div>
              <div>
                <h4>{x.title}</h4>
                <p>{x.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">⏱️ Tiempo de espera</h3>
        <p style={{ color: 'var(--wd-text-2)', lineHeight: 1.7, margin: 0 }}>
          Tienes <strong style={{ color: 'var(--wd-text)' }}>30 segundos</strong> para cada intento. Si se agota, recibes un aviso con
          <strong style={{ color: 'var(--wd-text)' }}> 10 segundos</strong> de gracia; si tampoco respondes, la partida termina sola.
          También puedes escribir <code className="wd-code">stop</code> en cualquier momento para abandonar.
        </p>
      </div>
    </main>
  );
}
