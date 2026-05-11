const COMMANDS_DATA = [
  // --- PARTIDA ---
  { 
    id: "start",
    name: "start", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Iniciar lobby de Werewolf.",
    long_desc: "Crea una nueva instancia de juego. Los jugadores podrán unirse durante el tiempo configurado. Si se marca como private, las votaciones durante el día serán anónimas.",
    params: [
      { name: "min", desc: "Número mínimo de jugadores para empezar (5-20).", optional: true },
      { name: "tiempo", desc: "Segundos que durará el lobby antes de empezar.", optional: true },
      { name: "private/public", desc: "Si es 'private', los votos del día serán anónimos.", optional: true }
    ],
    examples: [",ww start", ",ww start 10 120 private", ",ww start 8 60 public"]
  },
  { 
    id: "fs",
    name: "forcestart/fs", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Forzar inicio inmediato.",
    long_desc: "Termina el tiempo de espera del lobby e inicia la repartición de roles inmediatamente. Solo puede usarlo el creador de la partida.",
    params: [],
    examples: [",ww forcestart", ",ww fs"]
  },
  { 
    id: "join",
    name: "join", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Unirse a la partida.",
    long_desc: "Te añade a la lista de participantes del lobby actual.",
    params: [],
    examples: [",ww join"]
  },
  { 
    id: "leave",
    name: "leave", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Salir del lobby.",
    long_desc: "Te elimina de la lista de participantes antes de que la partida comience.",
    params: [],
    examples: [",ww leave"]
  },
  { 
    id: "stop",
    name: "stop", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Cancelar partida.",
    long_desc: "Detiene y elimina la partida activa en el canal. Solo disponible para el creador o administradores.",
    params: [],
    examples: [",ww stop"]
  },
  { 
    id: "status",
    name: "status", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Estado actual del juego.",
    long_desc: "Muestra información sobre la fase actual (Día/Noche), el tiempo restante y los jugadores vivos.",
    params: [],
    examples: [",ww status"]
  },
  { 
    id: "myrole",
    name: "myrole", 
    prefix: "/ww ", 
    cat: "partida", 
    desc: "Consultar tu rol en secreto.",
    long_desc: "Envía un mensaje efímero (solo lo ves tú) recordándote tu rol y tus objetivos actuales.",
    params: [],
    examples: ["/ww myrole"]
  },
  { 
    id: "players",
    name: "players", 
    prefix: ",ww ", 
    cat: "partida", 
    desc: "Lista de jugadores.",
    long_desc: "Muestra la lista completa de usuarios que están participando en la partida actual.",
    params: [],
    examples: [",ww players"]
  },

  // --- INFORMACION ---
  { 
    id: "info",
    name: "info", 
    prefix: "/ww ", 
    cat: "info", 
    desc: "Reglas básicas y guía.",
    long_desc: "Muestra un embed detallado con las normas del juego, fases y consejos para nuevos jugadores.",
    params: [],
    examples: ["/ww info"]
  },
  { 
    id: "presets",
    name: "presets", 
    prefix: "/ww ", 
    cat: "info", 
    desc: "Ver tabla de probabilidades.",
    long_desc: "Muestra un enlace directo a la página de presets donde se detallan las probabilidades de aparición de cada rol según el número de jugadores.",
    params: [],
    examples: ["/ww presets", ",ww presets"]
  },
  { 
    id: "role",
    name: "role <nombre_rol>", 
    prefix: "/ww ", 
    cat: "info", 
    desc: "Detalles de un rol específico.",
    long_desc: "Muestra la descripción completa, bando, objetivos y habilidades nocturnas de un rol.",
    params: [
      { name: "nombre_rol", desc: "El nombre del rol a consultar (ej: Vidente, Lobo Blanco).", optional: false }
    ],
    examples: ["/ww role Vidente", "/ww role Saquea Tumbas"]
  },
  { 
    id: "roles",
    name: "roles", 
    prefix: "/ww ", 
    cat: "info", 
    desc: "Lista de todos los roles.",
    long_desc: "Muestra una lista compacta de todos los roles cargados en el sistema.",
    params: [],
    examples: ["/ww roles"]
  },
  { 
    id: "help",
    name: "help", 
    prefix: "/ww ", 
    cat: "info", 
    desc: "Menú de ayuda.",
    long_desc: "Muestra el mensaje de ayuda general con todas las categorías de comandos.",
    params: [],
    examples: ["/ww help"]
  },

  // --- ESTADISTICAS ---
  { 
    id: "stats",
    name: "stats [@usuario]", 
    prefix: "/ww ", 
    cat: "stats", 
    desc: "Estadísticas de jugador.",
    long_desc: "Muestra el historial de partidas, victorias por bando y roles más jugados de un usuario.",
    params: [
      { name: "@usuario", desc: "Mención del usuario a consultar (opcional, por defecto tú).", optional: true }
    ],
    examples: ["/ww stats", "/ww stats @vicktor"]
  },
  { 
    id: "logros",
    name: "logros", 
    prefix: "/ww ", 
    cat: "stats", 
    desc: "Ver logros y rangos.",
    long_desc: "Muestra el progreso de obtención de roles exclusivos y el sistema de rangos de la comunidad.",
    params: [],
    examples: ["/ww logros"]
  },
  { 
    id: "wr",
    name: "wr", 
    prefix: "/ww ", 
    cat: "stats", 
    desc: "Win rates globales.",
    long_desc: "Estadísticas generales de victoria para cada bando (Aldea, Lobos, Solitarios, Amantes).",
    params: [],
    examples: ["/ww wr"]
  },

  // --- COMUNIDAD ---
  { 
    id: "bug",
    name: "bug <descripción>", 
    prefix: ",ww ", 
    cat: "comunidad", 
    desc: "Reportar un bug.",
    long_desc: "Envía un reporte técnico a los desarrolladores sobre un fallo en el bot.",
    params: [
      { name: "descripción", desc: "Detalles del error encontrado.", optional: false }
    ],
    examples: [",ww bug El comando status no carga", ",ww bug No morí al ser atacado"]
  },
  { 
    id: "suggestion",
    name: "suggestion <texto>", 
    prefix: ",ww ", 
    cat: "comunidad", 
    desc: "Enviar una sugerencia.",
    long_desc: "Propón nuevas ideas o mejoras para el bot.",
    params: [
      { name: "texto", desc: "Tu propuesta detallada.", optional: false }
    ],
    examples: [",ww suggestion Añadir el rol de Flautista", ",ww suggestion Mas tiempo de lobby"]
  },
  { 
    id: "report",
    name: "report <@usuario> <motivo>", 
    prefix: ",ww ", 
    cat: "comunidad", 
    desc: "Reportar a un jugador.",
    long_desc: "Notifica a los moderadores sobre el mal comportamiento de un jugador durante una partida.",
    params: [
      { name: "@usuario", desc: "Mención del jugador reportado.", optional: false },
      { name: "motivo", desc: "Razón del reporte.", optional: false }
    ],
    examples: [",ww report @troll Insultos constantes", ",ww report @afk Se queda inactivo a propósito"]
  },

  // --- CONFIGURACION ---
  { 
    id: "mention",
    name: "mention [mensaje]", 
    prefix: ",ww ", 
    cat: "gear", 
    desc: "Mencionar rol de jugadores.",
    long_desc: "Realiza una mención al rol especial de los jugadores actuales con un mensaje personalizado. Solo disponible para usuarios poseedores del rol. Cooldown: 15 minutos.",
    params: [
      { name: "mensaje", desc: "Texto adicional para la mención.", optional: true }
    ],
    examples: [",ww mention la partida va a empezar", ",ww mention ¡Despertad!"]
  },
  { 
    id: "ping",
    name: "ping", 
    prefix: ",ww ", 
    cat: "gear", 
    desc: "Ver latencia del bot.",
    long_desc: "Muestra el tiempo de respuesta del bot y la conexión con la base de datos.",
    params: [],
    examples: [",ww ping"]
  },

  // --- ADMINISTRACION ---
  { 
    id: "bl",
    name: "bl", 
    prefix: ",ww ", 
    cat: "admin", 
    desc: "Ver la blacklist completa.",
    long_desc: "Muestra la lista de todos los usuarios baneados del bot y sus motivos.",
    params: [],
    examples: [",ww bl"]
  },
  { 
    id: "bl_add",
    name: "bl add @usuario [motivo]", 
    prefix: ",ww ", 
    cat: "admin", 
    desc: "Añadir a la blacklist.",
    long_desc: "Prohíbe a un usuario participar en cualquier partida del bot.",
    params: [
      { name: "@usuario", desc: "Mención del usuario a banear.", optional: false },
      { name: "motivo", desc: "Razón del baneo.", optional: true }
    ],
    examples: [",ww bl add @toxico Toxicidad extrema", ",ww bl add @hacker Trampas"]
  },
  { 
    id: "bl_remove",
    name: "bl remove @usuario", 
    prefix: ",ww ", 
    cat: "admin", 
    desc: "Eliminar de la blacklist.",
    long_desc: "Perdona a un usuario y le permite volver a jugar.",
    params: [
      { name: "@usuario", desc: "Mención del usuario a desbanear.", optional: false }
    ],
    examples: [",ww bl remove @ex_toxico"]
  },
  { 
    id: "changelog",
    name: "changelog <enlace>", 
    prefix: ",ww ", 
    cat: "admin", 
    desc: "Enviar un changelog.",
    long_desc: "Envía el anuncio de actualización al canal configurado usando un enlace a la imagen del parche. Sin enlace se manda el changelog de texto.",
    params: [
      { name: "enlace", desc: "URL de la imagen del changelog.", optional: true }
    ],
    examples: [",ww changelog https://imagen.com/patch.png", ",ww changelog"]
  },
  { 
    id: "fixperms",
    name: "fixperms", 
    prefix: ",ww ", 
    cat: "admin", 
    desc: "Limpiar bloqueos de chat.",
    long_desc: "Limpia los permisos de chat de los miembros que se hayan quedado silenciados por error tras una caída del bot o el fin de una partida. Solo disponible para administradores o el creador del bot.",
    params: [],
    examples: [",ww fixperms"]
  }
];

const container = document.getElementById('commands-container');
const searchInput = document.getElementById('command-search');
const sidebarItems = document.querySelectorAll('.sidebar-nav li');

let currentCategory = 'all';
let currentSearch = '';

function renderCommands() {
  container.innerHTML = '';
  const filtered = COMMANDS_DATA.filter(cmd => {
    const matchesCat = currentCategory === 'all' || cmd.cat === currentCategory;
    const matchesSearch = cmd.name.includes(currentSearch) || cmd.desc.toLowerCase().includes(currentSearch);
    return matchesCat && matchesSearch;
  });

  filtered.forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'cmd-card fade-in';
    card.onclick = () => openModal(cmd.id);
    card.innerHTML = `
      <div class="cmd-card-header">
        <div class="cmd-card-title">${cmd.prefix}${cmd.name}</div>
        <div class="cmd-card-tag">${cmd.cat}</div>
      </div>
      <div class="cmd-card-desc">${cmd.desc}</div>
      <div class="cmd-card-footer">
        <div class="cmd-card-usage">Haz clic para ver detalles</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateCounts() {
  document.getElementById('count-all').textContent = COMMANDS_DATA.length;
  ['partida', 'info', 'stats', 'gear', 'admin', 'comunidad'].forEach(cat => {
    const count = COMMANDS_DATA.filter(c => c.cat === cat).length;
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = count;
  });
}

// Modal Logic
function openModal(cmdId) {
  const cmd = COMMANDS_DATA.find(c => c.id === cmdId);
  if (!cmd) return;

  const modal = document.getElementById('command-modal');
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-long-desc');
  const mParams = document.getElementById('modal-params');
  const mExamples = document.getElementById('modal-examples');

  mTitle.textContent = `${cmd.prefix}${cmd.name}`;
  mDesc.textContent = cmd.long_desc;

  mParams.innerHTML = cmd.params.length > 0 
    ? cmd.params.map(p => `<li><strong>${p.name}:</strong> ${p.desc} ${p.optional ? '<em style="opacity:0.6">(Opcional)</em>' : ''}</li>`).join('')
    : '<li>Este comando no requiere parámetros.</li>';

  mExamples.innerHTML = cmd.examples.map(ex => `<code>${ex}</code>`).join('<br>');

  modal.classList.add('visible');
}

function closeModal() {
  document.getElementById('command-modal').classList.remove('visible');
}

// Event Listeners
sidebarItems.forEach(item => {
  item.onclick = () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    currentCategory = item.dataset.category;
    renderCommands();
  };
});

searchInput.oninput = (e) => {
  currentSearch = e.target.value.toLowerCase();
  renderCommands();
};

window.onclick = (e) => {
  if (e.target.id === 'command-modal') closeModal();
};

updateCounts();
renderCommands();
