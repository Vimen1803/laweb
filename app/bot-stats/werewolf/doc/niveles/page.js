import clientPromise, { DB_NAME } from '@/lib/mongodb';
import { Long } from 'mongodb';
import '../styles/logros.css';

export const metadata = {
  title: 'Niveles — LA Werewolf',
  description: 'Sistema de niveles de XP y rangos por nivel de Discord.',
};

export const dynamic = 'force-dynamic';

export default async function WerewolfNiveles() {
  const guildId = '460550486257565697';
  let levelRoles = {};
  let discordRoles = [];
  let xpConfig = {
    victory: 15,
    special_victory: 40,
    round_alive: 2,
    survive_end: 5
  };

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const guildQuery = { $in: [Long.fromString(guildId), guildId] };
    const guildConfig = await db.collection('ww_guilds').findOne({ _id: guildQuery });
    if (guildConfig) {
      if (guildConfig.level_roles) {
        levelRoles = guildConfig.level_roles;
      }
      if (guildConfig.pts_victory !== undefined) xpConfig.victory = guildConfig.pts_victory;
      if (guildConfig.pts_special_victory !== undefined) xpConfig.special_victory = guildConfig.pts_special_victory;
      if (guildConfig.pts_round_alive !== undefined) xpConfig.round_alive = guildConfig.pts_round_alive;
      if (guildConfig.pts_survive_end !== undefined) xpConfig.survive_end = guildConfig.pts_survive_end;
    }
  } catch (err) {
    console.error("Error loading level roles from DB:", err);
  }

  // Fetch role names from Discord API if possible
  const token = process.env.DISCORD_BOT_TOKEN;
  if (token) {
    try {
      const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
        headers: { Authorization: `Bot ${token}` },
        next: { revalidate: 300 }
      });
      if (r.ok) {
        discordRoles = await r.json();
      }
    } catch (err) {
      console.error("Error fetching roles from Discord:", err);
    }
  }

  // Create role map (id -> name)
  const roleMap = {};
  discordRoles.forEach(role => {
    roleMap[String(role.id)] = role.name;
  });

  // Convert levelRoles object to sorted list
  const rolesList = Object.entries(levelRoles)
    .map(([lvl, roleId]) => {
      const level = parseInt(lvl, 10);
      const roleName = roleMap[String(roleId)] ? `@${roleMap[String(roleId)]}` : `@Rol-${roleId}`;
      const xpRequired = Math.pow(level - 1, 2) * 20;

      let emoji = '🎖️';
      let color = '#3498db';
      let desc = 'Rango obtenido por nivel.';

      if (level >= 20) {
        emoji = '👑';
        color = '#f1c40f';
        desc = 'Rango legendario. ¡Lidera el pueblo con distinción!';
      } else if (level >= 15) {
        emoji = '🔥';
        color = '#e74c3c';
        desc = 'Rango épico. Temido por los lobos, respetado por la aldea.';
      } else if (level >= 10) {
        emoji = '🛡️';
        color = '#9b59b6';
        desc = 'Rango veterano. Has demostrado tu valía en múltiples partidas.';
      } else if (level >= 5) {
        emoji = '⚔️';
        color = '#2ecc71';
        desc = 'Rango iniciado. Empiezas a dominar el arte del engaño.';
      }

      return {
        level,
        roleId,
        name: roleName,
        xp: xpRequired,
        emoji,
        color,
        desc
      };
    })
    .sort((a, b) => a.level - b.level);

  return (
    <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 className="page-title">🎖️ Rangos por Nivel y XP</h1>
      <p className="page-subtitle">Sube de nivel acumulando XP en tus partidas para obtener rangos exclusivos de Discord en el servidor.</p>

      {/* Info de Fórmula y Reglas */}
      <div className="logros-info card fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>
          💡 Tu nivel se calcula automáticamente a partir del total de XP acumulado. 
          Los roles de nivel superior <strong>reemplazan automáticamente</strong> a los inferiores (es decir, al llegar al nivel de un nuevo rango, recibirás el nuevo rol y se te retirará el anterior).
        </p>
        <div style={{ marginTop: '10px', padding: '10px 15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
          <strong>Fórmula de Nivel:</strong> <code>Nivel = 1 + raíz_cuadrada(XP / 20)</code> (redondeado hacia abajo)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Tabla de Rangos */}
        <div className="card fade-in" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏅</span> Rangos Configurados
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rolesList.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                No hay roles configurados por nivel en este servidor actualmente.
              </div>
            ) : (
              rolesList.map((n) => (
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
              ))
            )}
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
              { act: "Victoria del Equipo", pts: `+${xpConfig.victory} XP`, desc: "Otorgado a todos los ganadores (Aldea o Lobos)." },
              { act: "Victoria Especial", pts: `+${xpConfig.special_victory} XP`, desc: "Otorgado al ganar como Solitario (Lobo Blanco, Curtidor) o Amantes." },
              { act: "Rondas con Vida", pts: `+${xpConfig.round_alive} XP / ronda`, desc: "XP acumulada por cada ronda que logres aguantar con vida." },
              { act: "Supervivencia Final", pts: `+${xpConfig.survive_end} XP`, desc: "Bono extra si finalizas la partida con vida." }
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
            ⚠️ *Nota: Los valores de XP mostrados corresponden a la configuración activa del servidor principal.*
          </div>
        </div>

      </div>
    </main>
  );
}
