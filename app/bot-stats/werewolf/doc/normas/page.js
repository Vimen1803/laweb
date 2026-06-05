import '../styles/normas.css';

export const metadata = {
  title: 'Normas — LA Werewolf',
  description: 'Reglas oficiales del juego Pueblo Duerme (Werewolf) en Discord.',
};

export default function WerewolfNormas() {
  return (
    <main className="main-content">
      <h1 className="page-title">📏 Normas del Juego</h1>
      <p className="page-subtitle">Reglas oficiales de Pueblo Duerme — LA Werewolf</p>

      <div className="rule-section card fade-in">
        <div className="section-header">
          <div className="dot dot-village"></div>
          <h2>🎯 Objetivo según bando</h2>
        </div>
        <div className="bando-grid">
          <div className="bando-card bando-village">
            <span className="bando-emoji">🏡</span>
            <h3>La Aldea</h3>
            <p>Eliminar a todos los Hombres Lobo mediante votaciones durante el día.</p>
          </div>
          <div className="bando-card bando-wolves">
            <span className="bando-emoji">🐺</span>
            <h3>Los Lobos</h3>
            <p>Igualar o superar en número a los aldeanos eliminándolos cada noche.</p>
          </div>
          <div className="bando-card bando-solo">
            <span className="bando-emoji">🎭</span>
            <h3>Solitarios</h3>
            <p>Cada rol solitario tiene su propia condición de victoria única.</p>
          </div>
        </div>
      </div>

      <div className="rule-section card fade-in">
        <div className="section-header">
          <div className="dot dot-wolves"></div>
          <h2>📏 Reglas Sagradas</h2>
        </div>
        <ol className="rules-list">
          <li><strong>No hablar</strong> si no estás vivo o si no estás jugando la partida.</li>
          <li><strong>Prohibido comunicarse por MD</strong> a no ser que algún rol te lo permita.</li>
          <li><strong>No votar sin sentido</strong> ya que pierde la gracia del juego.</li>
          <li><strong>No usar comandos</strong> en medio de las partidas, puede molestar a los usuarios.</li>
          <li>Si encuentras algún <strong>bug</strong> importante, repórtalo usando: <code>,ww bug (mensaje)</code></li>
          <li>En caso de ser una <strong>sugerencia</strong>: <code>,ww suggestion (sugerencia)</code></li>
          <li>Para <strong>reportar a un jugador</strong> por mal comportamiento: <code>,ww report @usuario (motivo)</code></li>
          <li>Sobre todo, <strong>respeto ante todo</strong>. Si no quieres irte baneado del canal para siempre.</li>
        </ol>
      </div>
    </main>
  );
}
