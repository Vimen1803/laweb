import { NIVELES_DATA } from '../data';
import '../styles/logros.css';

export const metadata = {
  title: 'Niveles — LA Werewolf',
  description: 'Sistema de niveles de XP y rangos por nivel de Discord.',
};

export default function WerewolfNiveles() {
  return (
    <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 className="page-title">🎖️ Rangos por Nivel y XP</h1>
      <p className="page-subtitle">Sube de nivel acumulando XP en tus partidas para obtener rangos exclusivos de Discord en el servidor.</p>

      {/* Info de Fórmula y Reglas */}
      <div className="logros-info card fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>
          💡 Tu nivel se calcula automáticamente a partir del total de XP acumulado. 
          Los roles de nivel superior <strong>reemplazan automáticamente</strong> a los inferiores (es decir, al llegar al Nivel 10 recibirás el nuevo rol y se te retirará el del Nivel 5).
        </p>
        <div style={{ marginTop: '10px', padding: '10px 15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
          <strong>Fórmula de Nivel:</strong> <code>Nivel = 1 + raíz_cuadrada(XP / 20)</code> (redondeado hacia abajo)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Tabla de Rangos */}
        <div className="card fade-in" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏅</span> Rangos Ilustrativos
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {NIVELES_DATA.map((n) => (
              <div key={n.level} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 15px', borderRadius: '8px', border: `1px solid ${n.color}33` }}>
                <span style={{ fontSize: '2rem' }}>{n.emoji}</span>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: n.color }}>{n.name}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', color: 'var(--text-muted)' }}>Lvl {n.level}+</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{n.desc}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, marginTop: '2px' }}>Requisito: {n.xp} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cómo obtener XP */}
        <div className="card fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📈</span> ¿Cómo ganar XP?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            Al finalizar cada partida, el bot calculará la XP obtenida por cada jugador vivo o muerto según sus acciones:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {[
              { act: "Victoria del Equipo", pts: "+15 XP", desc: "Otorgado a todos los ganadores (Aldea o Lobos)." },
              { act: "Victoria Especial", pts: "+40 XP", desc: "Otorgado al ganar como Solitario (Lobo Blanco, Curtidor) o Amantes." },
              { act: "Rondas con Vida", pts: "+2 XP / ronda", desc: "Puntos acumulados por cada ronda que logres aguantar con vida." },
              { act: "Supervivencia Final", pts: "+5 XP", desc: "Bono extra si finalizas la partida con vida." }
            ].map((x, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{x.act}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{x.desc}</div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold)', padding: '4px 10px', background: 'rgba(212,175,55,0.1)', borderRadius: '6px' }}>
                  {x.pts}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: 'auto', padding: '10px', background: 'rgba(231,76,60,0.05)', border: '1px solid rgba(231,76,60,0.15)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            ⚠️ *Nota: Los valores de XP son configurables por el administrador de cada servidor desde su panel web.*
          </div>
        </div>

      </div>
    </main>
  );
}
