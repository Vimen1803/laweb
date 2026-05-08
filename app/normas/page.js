import { DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export const metadata = { title: 'Normas - LA Spain' };

const rules = [
  { title: 'Trata a los demás usuarios con respeto', desc: 'Evita comportamientos tóxicos o inapropiados y no acoses o discrimines a los demás por su ideología, etnia, raza o religión.' },
  { title: 'Respeta la finalidad de cada canal y utilízalos correctamente', desc: 'Para saber la finalidad de cada canal, utiliza el panel de información para saber cómo funciona cada uno.' },
  { title: 'No compartas contenido no apto para menores', desc: 'No envíes contenido NSFW de ningún tipo ni utilices un nombre de usuario, apodo, cartel o foto de perfil con contenido inapropiado.' },
  { title: 'No hagas spam ni flood', desc: 'No envíes mensajes no deseados como publicidad, auto-promoción o invitaciones a servidores externos. Tampoco hagas un uso excesivo de emojis, mayúsculas, mensajes repetidos o sin sentido.' },
  { title: 'Comparte información personal bajo tu responsabilidad', desc: 'Si compartes datos personales, ten en cuenta que esa información será pública. No compartas información de otros usuarios ni datos comprometidos.' },
  { title: 'Usa la función de Spoiler de Discord', desc: 'Para compartir spoilers, activa la opción "Marcar como spoiler" al enviar una foto/vídeo, o escribe || al inicio y al final de un texto. Avisa de qué tipo de contenido trata.' },
  { title: 'Evita abrir y compartir enlaces sospechosos', desc: 'Por la seguridad del servidor y de los usuarios, no abras enlaces de dudosa procedencia. Estos mensajes suelen contener publicidad engañosa o intentos de robo de datos.' },
  { title: 'Modera los discursos con carga política', desc: 'No se tolerarán actitudes que incluyan apoyo o bromas relacionadas con ideologías extremistas, apologías a organizaciones terroristas, o mensajes políticos que generen conflicto.' },
  { title: 'Solamente está permitido el español y el inglés', desc: 'Se permitirán cortas conversaciones en otros idiomas siempre y cuando el contexto y contenido sean adecuadas y no interfieran con la armonía del chat.' },
];

export default function NormasPage() {
  return (
    <section className="section" style={{ maxWidth: 900 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <DocumentTextIcon style={{ width: 36, height: 36, color: 'var(--gold)' }} /> Normas del Servidor
      </h1>
      <p className="section-subtitle">
        Estas normas aplican a todos los miembros del servidor. En este servidor también se aplican los{' '}
        <a href="https://discord.com/terms" target="_blank" rel="noopener">Términos de Servicio de Discord</a>.
      </p>

      <div className="rules-list">
        {rules.map((rule, i) => (
          <div key={i} className="rule-item">
            <span className="rule-number">{i + 1}</span>
            <span className="rule-title">{rule.title}</span>
            <p className="rule-desc">{rule.desc}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', borderColor: 'rgba(231,76,60,0.3)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ExclamationTriangleIcon style={{ width: 24, height: 24, color: '#e74c3c' }} /> 
            <span>Ante todo debes tener <strong style={{ color: 'var(--text-primary)' }}>sentido común</strong> y comportarte correctamente.</span>
          </span>
          El Staff del servidor se reserva el derecho a actuar conforme a su buena fe en caso de presentarse conductas punibles
          pero no especificadas en este listado de normas.
        </p>
      </div>
    </section>
  );
}
