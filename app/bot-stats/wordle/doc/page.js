import Link from 'next/link';

export const metadata = {
  title: 'LA Wordle — Documentación',
  description: 'Documentación oficial del Wordle de LA Spain: modos, puntuación, comandos y normas de la CMD Gang.',
};

const HERO_BOARD = [
  [['R', 'gray'], ['O', 'gray'], ['S', 'yellow'], ['A', 'gray'], ['S', 'gray']],
  [['P', 'gray'], ['L', 'green'], ['A', 'green'], ['T', 'green'], ['O', 'green']],
  [['G', 'green'], ['L', 'green'], ['A', 'green'], ['T', 'green'], ['O', 'green']],
];

const LINKS = [
  { href: '/bot-stats/wordle/doc/modos', title: 'Modos', desc: 'Normal, Doble, Triple y Escalera.', tiles: ['#538d4e', '#b59f3b', '#3a3c42'] },
  { href: '/bot-stats/wordle/doc/puntuacion', title: 'Puntuación', desc: 'Puntos, rachas y ranking global.', tiles: ['#538d4e', '#538d4e', '#b59f3b'] },
  { href: '/bot-stats/wordle/doc/comandos', title: 'Comandos', desc: 'Todos los comandos explicados.', tiles: ['#3a3c42', '#538d4e', '#538d4e'] },
  { href: '/bot-stats/wordle/doc/normas', title: 'Normas', desc: 'Reglas de la CMD Gang y consejos.', tiles: ['#b59f3b', '#3a3c42', '#538d4e'] },
];

export default function WordleDocInicio() {
  return (
    <main className="wd-main wd-fade">
      <Link href="/bot-stats" className="wd-back">← Volver al Dashboard</Link>

      <section className="wd-hero">
        <div>
          <span className="wd-eyebrow">▪ CMD Gang · El Wordle de LA Spain</span>
          <h1 className="wd-h1">Adivina la<br /><em>palabra oculta</em></h1>
          <p className="wd-lead">
            Seis intentos. Cinco letras. Cuatro modos de juego, un sistema de puntos con rachas
            y un ranking comunitario para demostrar quién manda. ¿Estás a la altura?
          </p>
        </div>
        <div className="wd-hero-board">
          <div className="wd-board">
            {HERO_BOARD.map((row, r) => (
              <div className="wd-row" key={r}>
                {row.map(([ch, c], i) => (
                  <div key={i} className={`wd-tile ${c}`} style={{ animationDelay: `${r * 0.18 + i * 0.06}s` }}>{ch}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wd-statline">
        <div className="wd-stat"><span className="wd-stat-num">4</span><span className="wd-stat-lbl">Modos</span></div>
        <div className="wd-stat"><span className="wd-stat-num">6</span><span className="wd-stat-lbl">Intentos</span></div>
        <div className="wd-stat"><span className="wd-stat-num">5</span><span className="wd-stat-lbl">Letras</span></div>
        <div className="wd-stat"><span className="wd-stat-num">∞</span><span className="wd-stat-lbl">Palabras</span></div>
      </div>

      <div className="wd-links">
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className="wd-link-card">
            <div className="wd-link-tiles">
              {l.tiles.map((bg, i) => <span key={i} style={{ background: bg }} />)}
            </div>
            <div>
              <h3>{l.title}</h3>
              <p>{l.desc}</p>
            </div>
            <span className="wd-link-arrow">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
