import '../styles/logros.css';

export const metadata = {
  title: 'Logros — LA Werewolf',
  description: 'Sistema de logros y roles de Discord exclusivos por victorias.',
};

export default function WerewolfLogros() {
  return (
    <main className="main-content">
      <h1 className="page-title">🏅 Logros y Roles de Discord</h1>
      <p className="page-subtitle">Gana partidas con cada bando para desbloquear roles exclusivos. Se asignan automáticamente al terminar cada partida.</p>

      <div className="logros-info card fade-in">
        <p>💡 Los roles de nivel superior <strong>reemplazan automáticamente</strong> a los inferiores. El progreso se guarda al finalizar cada partida.</p>
      </div>

      <div className="logros-grid">
        <div className="logro-card card fade-in">
          <div className="logro-header village-header">
            <span className="logro-emoji">🏡</span>
            <h3>Aldea</h3>
          </div>
          <div className="logro-desc">Gana partidas con el bando de la Aldea</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">I</span> <span className="level-req">10 victorias</span></li>
            <li><span className="level-badge level-ii">II</span> <span className="level-req">50 victorias</span></li>
            <li><span className="level-badge level-iii">III</span> <span className="level-req">100 victorias</span></li>
          </ul>
        </div>

        <div className="logro-card card fade-in">
          <div className="logro-header wolves-header">
            <span className="logro-emoji">🐺</span>
            <h3>Lobos</h3>
          </div>
          <div className="logro-desc">Gana partidas con el bando de los Lobos</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">I</span> <span className="level-req">10 victorias</span></li>
            <li><span className="level-badge level-ii">II</span> <span className="level-req">50 victorias</span></li>
            <li><span className="level-badge level-iii">III</span> <span className="level-req">100 victorias</span></li>
          </ul>
        </div>

        <div className="logro-card card fade-in">
          <div className="logro-header solo-header">
            <span className="logro-emoji">🪡</span>
            <h3>Curtidor</h3>
          </div>
          <div className="logro-desc">Gana partidas como el Curtidor</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">I</span> <span className="level-req">5 victorias</span></li>
            <li><span className="level-badge level-ii">II</span> <span className="level-req">15 victorias</span></li>
            <li><span className="level-badge level-iii">III</span> <span className="level-req">25 victorias</span></li>
          </ul>
        </div>

        <div className="logro-card card fade-in">
          <div className="logro-header solo-header">
            <span className="logro-emoji">🤍</span>
            <h3>Lobo Blanco</h3>
          </div>
          <div className="logro-desc">Gana partidas como el Lobo Blanco</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">I</span> <span className="level-req">1 victoria</span></li>
            <li><span className="level-badge level-ii">II</span> <span className="level-req">5 victorias</span></li>
            <li><span className="level-badge level-iii">III</span> <span className="level-req">10 victorias</span></li>
          </ul>
        </div>

        <div className="logro-card card fade-in">
          <div className="logro-header lovers-header">
            <span className="logro-emoji">💖</span>
            <h3>Amantes</h3>
          </div>
          <div className="logro-desc">Gana como pareja de amantes</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">✦</span> <span className="level-req">1 victoria como amante</span></li>
          </ul>
        </div>

        <div className="logro-card card fade-in special-card">
          <div className="logro-header total-header">
            <span className="logro-emoji">🏆</span>
            <h3>Generales</h3>
          </div>
          <div className="logro-desc">Tener todos los logros al mismo nivel</div>
          <ul className="logro-levels">
            <li><span className="level-badge level-i">I</span> <span className="level-req">Todos los roles de nivel I</span></li>
            <li><span className="level-badge level-ii">II</span> <span className="level-req">Todos los roles de nivel II</span></li>
            <li><span className="level-badge level-iii">III</span> <span className="level-req">Todos los roles de nivel III</span></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
