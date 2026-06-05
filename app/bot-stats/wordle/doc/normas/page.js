export const metadata = {
  title: 'Normas — LA Wordle',
  description: 'Reglas de la CMD Gang y consejos para empezar a jugar al Wordle de LA Spain.',
};

const RULES = [
  { e: '🎮', t: 'Juega al Wordle', d: 'El canal existe para jugar al Wordle. Si no vas a jugar, no queremos saber nada de ti por aquí. Gracias. 😄' },
  { e: '🫂', t: 'Ayuda a quien lo necesite', d: 'Si alguien te menciona para que le eches una mano con una palabra y estás conectado, ayúdale. El espíritu de la CMD Gang es colaborativo.' },
  { e: '🤝', t: 'Respeta a los demás', d: 'Lo más importante: respeto con el resto de miembros del canal. Somos una comunidad y eso se nota.' },
];

export default function WordleNormas() {
  return (
    <main className="wd-main wd-fade">
      <span className="wd-eyebrow">▪ La comunidad</span>
      <h1 className="wd-section-title">Normas de la CMD Gang</h1>
      <p className="wd-section-sub">Como en todos los canales del servidor, hay unas reglas básicas que se deben respetar.</p>

      <div className="wd-rules">
        {RULES.map(r => (
          <div className="wd-rule" key={r.t}>
            <span className="wd-rule-emoji">{r.e}</span>
            <div>
              <h4>{r.t}</h4>
              <p>{r.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="wd-gang">
        <h3>🤖 ¿Qué es la CMD Gang?</h3>
        <p>
          La CMD Gang es la comunidad de jugadores del Wordle de LA Spain. Para unirte, usa el comando <code>,cmdgang</code> en
          el servidor: dará la vuelta a tu nombre de usuario y te otorgará el rol de la CMD Gang. Sus miembros son los jugadores
          más activos y comprometidos con el Wordle, y el ranking de puntos (<code>,wordle lb</code>) es su tabla de honor.
        </p>
      </div>

      <div className="wd-panel">
        <h3 className="wd-panel-title">💡 Consejos para empezar</h3>
        <ol className="wd-tips">
          <li>Empieza con palabras de letras muy comunes en español: <strong>A, E, O, S, R, N, T</strong>.</li>
          <li>Usa <code>,wordle tip</code> para ver el consejo oficial fijado en el canal.</li>
          <li>No repitas letras que ya sabes que están en gris: es un intento desperdiciado.</li>
          <li>Cuida tu racha: un solo fallo la rompe y pierdes los puntos acumulados de esa cadena.</li>
          <li>¿Quieres puntos rápidos? Prueba el modo <strong>Escalera</strong> cuando ya domines el Normal.</li>
        </ol>
      </div>
    </main>
  );
}
