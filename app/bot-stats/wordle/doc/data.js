// Datos de la documentación de LA Wordle
// Migrado y rediseñado desde public/bot-stats/wordle/doc para vivir dentro de app/

export const WORDLE_MODES = [
  {
    icon: '🟩', name: 'Normal', badge: '1 palabra', color: '#538d4e', cmd: ',wordle',
    desc: 'El modo clásico. Adivina una palabra de 5 letras en 6 intentos. Ideal para empezar y mantener tu racha.',
    stats: [{ v: '1', l: 'Palabra' }, { v: '6', l: 'Intentos' }, { v: '2×', l: 'Pts × Racha' }],
  },
  {
    icon: '🟧', name: 'Doble', badge: '2 palabras', color: '#f39c12', cmd: ',wordle doble',
    desc: 'Dos palabras simultáneas, 6 intentos para ambas. Cada intento se aplica a todos los tableros a la vez.',
    stats: [{ v: '2', l: 'Palabras' }, { v: '6', l: 'Intentos' }, { v: '5×', l: 'Pts × Racha' }],
  },
  {
    icon: '🟥', name: 'Triple', badge: '3 palabras', color: '#e74c3c', cmd: ',wordle triple',
    desc: 'El reto máximo. Tres palabras, 6 intentos compartidos. Solo para los más experimentados.',
    stats: [{ v: '3', l: 'Palabras' }, { v: '6', l: 'Intentos' }, { v: '10×', l: 'Pts × Racha' }],
  },
  {
    icon: '🪜', name: 'Escalera', badge: '∞ palabras', color: 'var(--gold)', cmd: ',wordle escalera',
    desc: 'Modo infinito. Juegas con 2 tableros simultáneos. Cuando resuelves uno, se sustituye por una nueva palabra. El juego termina cuando fallas un tablero.',
    stats: [{ v: '2', l: 'Tableros' }, { v: '6', l: 'Int./Tabla' }, { v: 'N²', l: 'Puntos' }],
  },
];

export const WORDLE_POINTS = [
  { icon: '🟩', name: 'Normal', formula: '2 × Racha', detail: ['Racha 1 → 2 pts', 'Racha 5 → 10 pts', 'Racha 10 → 20 pts'] },
  { icon: '🟧', name: 'Doble', formula: '5 × Racha', detail: ['Racha 1 → 5 pts', 'Racha 5 → 25 pts', 'Racha 10 → 50 pts'] },
  { icon: '🟥', name: 'Triple', formula: '10 × Racha', detail: ['Racha 1 → 10 pts', 'Racha 5 → 50 pts', 'Racha 10 → 100 pts'] },
  { icon: '🪜', name: 'Escalera', formula: 'N × (N+1)', detail: ['N = palabras resueltas', '5 palabras → 30 pts', '10 palabras → 110 pts'] },
];

export const WORDLE_COMMANDS = [
  { id: 'wordle', name: ',wordle', cat: 'juego', desc: 'Inicia una partida Normal (1 palabra, 6 intentos).', long_desc: 'Arranca una partida de Wordle clásico. Tienes 6 intentos para adivinar una palabra de 5 letras. Cada intento debe ser una palabra válida.', params: [], examples: [',wordle', ',w'] },
  { id: 'doble', name: ',wordle doble', cat: 'juego', desc: 'Inicia una partida Doble (2 palabras, 6 intentos).', long_desc: 'Abre dos tableros simultáneos. Cada intento que escribas se aplica a los dos tableros a la vez. Tienes 6 intentos para adivinar ambas palabras.', params: [], examples: [',wordle doble', ',wordle d', ',w d'] },
  { id: 'triple', name: ',wordle triple', cat: 'juego', desc: 'Inicia una partida Triple (3 palabras, 6 intentos).', long_desc: 'El modo más difícil. Tres tableros simultáneos con solo 6 intentos compartidos. Solo para los más valientes.', params: [], examples: [',wordle triple', ',wordle t'] },
  { id: 'escalera', name: ',wordle escalera', cat: 'juego', desc: 'Inicia el modo Escalera (∞ palabras, 2 tableros).', long_desc: 'Modo infinito con 2 tableros activos. Cuando resuelves una palabra, se reemplaza por una nueva. El juego termina cuando fallas. Puntuación: N×(N+1).', params: [], examples: [',wordle escalera', ',wordle e'] },
  { id: 'lb', name: ',wordle lb', cat: 'stats', desc: 'Tabla de clasificación por categoría y modo.', long_desc: 'Muestra el ranking del servidor. Puedes filtrar por categoría (points, wins, streak, max, played, winrate, escalera) y modo (normal, doble, triple).', params: [{ name: 'categoría', desc: 'points, wins, streak, max, played, winrate, escalera', optional: true }, { name: 'modo', desc: 'normal, doble, triple', optional: true }], examples: [',wordle lb', ',wordle lb wins', ',wordle lb streak doble', ',wordle lb escalera'] },
  { id: 'stats', name: ',wordle stats', cat: 'stats', desc: 'Muestra las estadísticas de un jugador.', long_desc: 'Genera una imagen con tus estadísticas (o las de otro usuario): partidas, victorias, racha actual, racha máxima y distribución de intentos, según el modo seleccionado.', params: [{ name: 'modo', desc: 'normal, doble, triple, escalera', optional: true }, { name: '@usuario', desc: 'Mención del usuario a consultar', optional: true }], examples: [',wordle stats', ',wordle stats doble', ',wordle stats @vicktor', ',wordle stats triple @vicktor'] },
  { id: 'tip', name: ',wordle tip', cat: 'stats', desc: 'Muestra el consejo fijado de la CMD Gang.', long_desc: 'Envía el enlace al consejo oficial fijado en el canal de Wordle. Útil cuando no sabes por dónde empezar.', params: [], examples: [',wordle tip'] },
  { id: 'normas', name: ',wordle normas', cat: 'stats', desc: 'Muestra las normas de la CMD Gang.', long_desc: 'Envía un embed con las reglas de comportamiento del canal de Wordle. Léelas si eres nuevo.', params: [], examples: [',wordle normas'] },
  { id: 'xd', name: ',wordle xd', cat: 'xd', desc: 'Muestra la lista de palabras del Wordle XD.', long_desc: 'El Wordle XD es una lista especial de palabras graciosas o temáticas añadidas por la comunidad. Este comando muestra todas las entradas con paginación.', params: [], examples: [',wordle xd'] },
  { id: 'xd_add', name: ',wordle xd add', cat: 'xd', desc: 'Añade una palabra a la lista Wordle XD.', long_desc: 'Permite añadir una palabra a la lista comunitaria del Wordle XD. La palabra quedará registrada con tu nombre y la fecha.', params: [{ name: 'palabra', desc: 'La palabra a añadir', optional: false }, { name: 'enlace', desc: 'URL de referencia (imagen, contexto, etc.)', optional: false }], examples: [',wordle xd add perro https://imagen.com'] },
  { id: 'xd_del', name: ',wordle xd delete', cat: 'xd', desc: 'Elimina una palabra de la lista Wordle XD.', long_desc: 'Borra una entrada existente de la lista del Wordle XD. Solo disponible para administradores.', params: [{ name: 'palabra', desc: 'La palabra a eliminar', optional: false }], examples: [',wordle xd delete perro'] },
  { id: 'recompensa', name: ',wordle recompensa', cat: 'admin', desc: 'Calcula la recompensa (XP) de un usuario. [Admin]', long_desc: 'Muestra cuántos créditos acumulados tiene un usuario pendientes de ser canjeados. Solo disponible para administradores.', params: [{ name: '@usuario', desc: 'Usuario a consultar', optional: false }], examples: [',wordle recompensa @vicktor'] },
  { id: 'done', name: ',wordle done', cat: 'admin', desc: 'Marca a un usuario como recompensado. [Admin]', long_desc: 'Registra que los créditos de un usuario ya han sido canjeados, reseteando su contador. Solo disponible para administradores.', params: [{ name: '@usuario', desc: 'Usuario a marcar', optional: false }], examples: [',wordle done @vicktor'] },
];

export const WORDLE_CMD_CATEGORIES = [
  { id: 'all', label: '🌍 Ver Todos' },
  { id: 'juego', label: '🎮 Juego' },
  { id: 'stats', label: '📊 Estadísticas' },
  { id: 'xd', label: '😂 Wordle XD' },
  { id: 'admin', label: '🔒 Admin' },
];
