import Link from 'next/link';
import './styles/inicio.css';

export const metadata = {
  title: 'LA Werewolf — Documentación',
  description: 'Documentación oficial del bot LA Werewolf para Discord. Juega al Pueblo Duerme con tu comunidad.',
};

export default function WerewolfDocInicio() {
  return (
    <main className="main-content">
      <section className="hero fade-in">
        <div className="hero-badge">
          <Link href="/bot-stats/werewolf/doc/cambios" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className="bolt-icon">⚡</span> ACTUALIZACIÓN JULIO — EVENTOS
          </Link>
        </div>
        <h1 className="hero-title">
          El pueblo <br />
          <span className="orange-text">necesita tu voto</span>
        </h1>
        <p className="hero-subtitle">
          El bot de Pueblo Duerme más completo para Discord. Roles, presets dinámicos, logros evolutivos y mucho más.
        </p>
      </section>

      <section className="stats-bar fade-in">
        <div className="stat-item"><span className="stat-num">27</span><span className="stat-label">Roles</span></div>
        <div className="stat-item"><span className="stat-num">3</span><span className="stat-label">Bandos</span></div>
        <div className="stat-item"><span className="stat-num">5-20</span><span className="stat-label">Jugadores</span></div>
        <div className="stat-item"><span className="stat-num">∞</span><span className="stat-label">Diversión</span></div>
      </section>
    </main>
  );
}
