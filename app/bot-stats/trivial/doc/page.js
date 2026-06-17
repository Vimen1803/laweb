import Link from 'next/link';

export const metadata = {
  title: 'LA Trivial — Documentación',
  description: 'Documentación oficial del Trivial de LA Spain: cómo jugar, comandos y ranking.',
};

const LINKS = [
  { href: '/bot-stats/trivial/doc/jugar', title: 'Cómo jugar', desc: 'Reglas, packs y puntuación.', tiles: ['#3498db', '#2980b9', '#3a3c42'] },
  { href: '/bot-stats/trivial/doc/comandos', title: 'Comandos', desc: 'Todos los comandos explicados.', tiles: ['#3a3c42', '#3498db', '#3498db'] },
  { href: '/bot-stats/trivial/doc/ranking', title: 'Ranking', desc: 'Puntos, victorias y clasificación.', tiles: ['#2980b9', '#3a3c42', '#3498db'] },
];

export default function TrivialDocInicio() {
  return (
    <main className="wd-main wd-fade">
      <Link href="/bot-stats" className="wd-back">← Volver al Dashboard</Link>

      <section className="wd-hero">
        <div>
          <span className="wd-eyebrow">▪ El Trivial de LA Spain</span>
          <h1 className="wd-h1">Pon a prueba<br /><em>lo que sabes</em></h1>
          <p className="wd-lead">
            Partidas de preguntas por packs temáticos. Responde el primero, suma puntos,
            encadena victorias y escala en el ranking del servidor.
          </p>
        </div>
        <div className="wd-hero-board">
          <div className="wd-board">
            <div className="wd-row">
              <div className="wd-tile green" style={{ animationDelay: '0s' }}>?</div>
              <div className="wd-tile gray" style={{ animationDelay: '0.1s' }}>A</div>
              <div className="wd-tile yellow" style={{ animationDelay: '0.2s' }}>B</div>
              <div className="wd-tile gray" style={{ animationDelay: '0.3s' }}>C</div>
            </div>
            <div className="wd-row">
              <div className="wd-tile gray" style={{ animationDelay: '0.2s' }}>1</div>
              <div className="wd-tile green" style={{ animationDelay: '0.3s' }}>0</div>
              <div className="wd-tile green" style={{ animationDelay: '0.4s' }}>p</div>
              <div className="wd-tile green" style={{ animationDelay: '0.5s' }}>t</div>
            </div>
          </div>
        </div>
      </section>

      <div className="wd-statline">
        <div className="wd-stat"><span className="wd-stat-num">10</span><span className="wd-stat-lbl">Puntos p/ ganar</span></div>
        <div className="wd-stat"><span className="wd-stat-num">∞</span><span className="wd-stat-lbl">Packs</span></div>
        <div className="wd-stat"><span className="wd-stat-num">1º</span><span className="wd-stat-lbl">Gana el más rápido</span></div>
        <div className="wd-stat"><span className="wd-stat-num">🏆</span><span className="wd-stat-lbl">Ranking</span></div>
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
