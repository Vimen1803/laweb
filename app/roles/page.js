import { StarIcon, ChartBarIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

export const metadata = { title: 'Roles - LA Spain' };

const levelRoles = [
  { level: 10, name: '✠ Común', perk: 'Enviar fotos y videos' },
  { level: 20, name: '✵ Especial', perk: 'Usar emojis y pegatinas externos al servidor' },
  { level: 30, name: '᪥ Experto', perk: 'Cambiar tu apodo y crear actividades de voz' },
  { level: 40, name: '℘ Épico', perk: 'Enviar audios y añadir reacciones' },
  { level: 50, name: '𖤍 Maestro', perk: 'Poder crear encuestas' },
  { level: 60, name: '𖤝 Élite', perk: 'Poder sugerir emojis' },
  { level: 70, name: '⚚ Mítico', perk: 'Acceso al canal de nitro-staff' },
  { level: 80, name: '𖣘 Leyenda', perk: 'Crear hilos públicos' },
  { level: 90, name: '𖣂 Eterno', perk: 'Ganas un 20% adicional de experiencia en eventos y torneos' },
  { level: 100, name: '𖣐 Supremo', perk: 'Acceso al canal VIP' },
  { level: 105, name: '♛ Legendario', perk: 'Foto de perfil personalizada' },
  { level: 110, name: '×͜× Divino', perk: 'Crea tu comando personalizado (LA Bot)' },
  { level: 115, name: '⚜ Celestial', perk: 'Reacción personalizada a una palabra a elegir' },
  { level: 120, name: '♰ Inmortal', perk: 'Rol de DJ' },
  { level: 125, name: '☯ Dios', perk: 'Rol y color personalizado' },
];

const specialRoles = [
  { name: 'Nitro Booster', desc: 'Obtenido al mejorar el servidor con Discord Nitro, consulta las ventajas en info-boosters.', color: '#f47fff' },
  { name: 'Tier 1 / Tier 2 / Tier 3', desc: 'Obtenidos al apoyar monetariamente al servidor, consulta las ventajas en abonos.', color: '#2ecc71' },
  { name: 'Buscar Brawl', desc: 'Recibe pings de otros miembros cuando busquen equipo para Brawl Stars.', color: '#e67e22' },
  { name: 'Cumpleañero', desc: 'Obtén ventajas especiales durante el día de tu cumpleaños. Usa: !remember-birthday Año-Mes-Día', color: '#e74c3c' },
];

const staffRoles = [
  { name: 'Ayudante', desc: 'Encargados de ayudar a mantener la actividad, reportar comportamientos inadecuados y resolver dudas de los miembros.', color: '#3498db' },
  { name: 'Moderador', desc: 'Encargados de imponer sanciones a los miembros que incumplan las normas y resolver conflictos.', color: '#9b59b6' },
  { name: 'Manager', desc: 'Encargados de la gestión del servidor: toma de decisiones importantes, implementación de sugerencias y administración interna.', color: '#e67e22' },
  { name: 'Admin', desc: 'Encargados de la representación del servidor. Cumplen funciones similares a los Managers siendo la cara más visible del Staff.', color: '#e74c3c' },
];

export default function RolesPage() {
  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <StarIcon style={{ width: 36, height: 36, color: 'var(--gold)' }} /> Roles del Servidor
      </h1>
      <p className="section-subtitle">Sistema de progresión, roles especiales y equipo de staff</p>

      {/* Level roles */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChartBarIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> Roles por Nivel
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Consigue un rol en cada hito de nivel y obtén diversas ventajas. Para subir de nivel, interactúa con otros usuarios
          en general o en los canales de voz. Usa <code style={{ color: 'var(--gold)', background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px' }}>:?rank</code> para ver tu nivel.
        </p>
        <div className="role-tier">
          {levelRoles.map((r, i) => (
            <div key={i} className="role-row">
              <span className="role-level">Lvl {r.level}</span>
              <span className="role-name">{r.name}</span>
              <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>→</span>
              <span className="role-perk">{r.perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special roles */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> Roles Especiales
        </h2>
        <div className="grid-2">
          {specialRoles.map((r, i) => (
            <div key={i} className="card">
              <h4 style={{ color: r.color, marginBottom: '0.5rem' }}>{r.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Staff roles */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheckIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} /> Roles de Staff
        </h2>
        <div className="grid-2">
          {staffRoles.map((r, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${r.color}` }}>
              <h4 style={{ color: r.color, marginBottom: '0.5rem' }}>{r.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
