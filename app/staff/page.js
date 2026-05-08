import { StarIcon, CogIcon, ShieldCheckIcon, HeartIcon, SparklesIcon, UsersIcon } from '@heroicons/react/24/solid';

export const metadata = { title: 'Staff - LA Spain' };

const staffData = [
  {
    role: 'Admin', color: '#ffffff', icon: <StarIcon style={{ width: 24, height: 24 }} />,
    desc: 'Es el rango máximo. Son los creadores y/o personas que representan LA Spain.',
    members: ['Amaroyusi ☀️ #LA2026', 'Srta.Vocales'],
  },
  {
    role: 'Manager', color: '#9b59b6', icon: <CogIcon style={{ width: 24, height: 24 }} />,
    desc: 'Encargados de prácticamente todas las tareas más importantes del servidor, su palabra es ley y orden.',
    members: ['David_01', 'Prince Senju', 'DrakuL'],
  },
  {
    role: 'Moderador', color: '#5865f2', icon: <ShieldCheckIcon style={{ width: 24, height: 24 }} />,
    desc: 'Encargados de todo el apartado de moderación del servidor. Pueden banear, dar strikes, mutear y resolver conflictos.',
    members: ['b r i a m', 'Dani El Rolo'],
  },
  {
    role: 'Ayudante', color: '#00bcd4', icon: <HeartIcon style={{ width: 24, height: 24 }} />,
    desc: 'Encargados de ayudar en los tickets de soporte, resolviendo dudas y aprendiendo del resto del staff.',
    members: ['victor', 'p a t a t a', 'Oscucar', 'Sebas 🐳🩵'],
  },
  {
    role: 'Staff en pruebas', color: '#8e8e93', icon: <SparklesIcon style={{ width: 24, height: 24 }} />,
    desc: 'Personas que están pasando por un periodo de pruebas para ver si son aptos para formar parte del staff.',
    members: ['Random💫🌹'],
  },
];

export default function StaffPage() {
  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <UsersIcon style={{ width: 32, height: 32 }} /> Conoce al Staff
      </h1>
      <p className="section-subtitle">El equipo que mantiene viva la comunidad</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {staffData.map((group, i) => (
          <div key={i} className="card" style={{ borderLeft: `4px solid ${group.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <span style={{ color: group.color, display: 'flex', alignItems: 'center' }}>{group.icon}</span>
              <div>
                <h3 style={{ color: group.color, fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                  {group.role}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{group.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.members.map((m, j) => (
                <span key={j} style={{
                  background: `${group.color}15`, color: group.color,
                  padding: '6px 16px', borderRadius: '100px',
                  fontSize: '0.85rem', fontWeight: 600,
                  border: `1px solid ${group.color}30`,
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          💡 El rol <strong style={{ color: 'var(--gold)' }}>@Staff</strong> engloba a todos los miembros mencionados.
          El rol <strong style={{ color: 'var(--gold)' }}>@Soporte</strong> engloba al staff que responde tickets.
        </p>
      </div>
    </section>
  );
}
