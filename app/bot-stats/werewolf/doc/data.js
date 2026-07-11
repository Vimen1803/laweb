// Datos de la documentación de LA Werewolf (Pueblo Duerme)
// Migrado desde public/bot-stats/werewolf/doc para vivir dentro de app/

export const ROLES_DATA = {
  village: [
    { name: "Aldeano", emoji: "👨‍🌾", night: false, desc: "Eres un Aldeano inocente. Tu objetivo es eliminar a todos los Hombres Lobo durante el día mediante votaciones. No tienes habilidades especiales, pero tu voto cuenta.\n\n🎯 Objetivo: Eliminar a todos los lobos." },
    { name: "Vidente", emoji: "🔮", night: true, desc: "Eres el Vidente. Cada noche puedes investigar a un jugador y descubriré si es un Hombre Lobo o no.\n\n🎯 Objetivo: Ayudar a los aldeanos a identificar y eliminar a todos los lobos." },
    { name: "Bruja", emoji: "🧙‍♀️", night: true, desc: "Eres la Bruja. Tienes 2 pociones de uso único:\n• Poción de Vida: Salva a la víctima de los lobos esa noche.\n• Poción de Muerte: Mata a un jugador durante la noche.\nCada noche te mostraré quién fue atacado por los lobos y podrás decidir si usar tus pociones.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Cazador", emoji: "🏹", night: false, desc: "Eres el Cazador. Cuando mueras (ya sea de día o de noche), podrás llevarte a un jugador contigo disparándole.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Curandera", emoji: "💊", night: true, desc: "Eres la Curandera. Cada noche puedes proteger a un jugador del ataque de los lobos. No puedes proteger al mismo jugador dos noches consecutivas.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Caballero", emoji: "⚔️", night: false, desc: "Eres el Caballero. Si mueres por los lobos, el lobo que te mató se enfermará por tu espada oxidada y morirá la noche siguiente.\n\n🎯 Objetivo: Proteger a los aldeanos y eliminar a todos los lobos." },
    { name: "El Anciano", emoji: "👴", night: false, desc: "Eres El Anciano. Los lobos te han atacado durante años y has desarrollado resistencia. Puedes sobrevivir a UN ataque de los lobos. Sin embargo, si mueres por el voto del pueblo, la Bruja o el Cazador, TODOS los aldeanos perderán sus poderes especiales.\n\n🎯 Objetivo: Sobrevivir y ayudar a eliminar a los lobos." },
    { name: "Ramera", emoji: "💋", night: true, desc: "Eres la Ramera. Cada noche, eliges a un jugador para visitarlo. Tu visita BLOQUEA su acción nocturna.\n\n• Hombres Lobo: Sobrevivirás. ¡Si te acuestas con el lobo decisor, el ataque de los lobos FALLA esa noche!\n• Hechicera: Sobrevivirás y ella no podrá actuar, pero los lobos atacarán normalmente.\n• Restricción: No puedes visitar al mismo jugador dos noches seguidas.\n• Especial: Pierden su acción esa noche (Vidente, Bruja, etc.).\n\n⚠️ Riesgo: Si visitas a alguien que no es lobo y esa persona es asesinada por los lobos esa noche, mueres tú también.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Zorro", emoji: "🦊", night: true, desc: "Eres el Zorro. Cada noche, eliges a un jugador para olfatear su zona. El bot escanea un trío circular: tu objetivo y sus dos vecinos vivos.\n\n• Si al menos uno del trío es lobo: 'Percibes el olor de la bestia en este grupo.'\n• Si los tres son inocentes: 'No hueles nada extraño aquí.'\n\n⚠️ Un solo uso: Tras olfatear a un trío, pierdes tu poder para siempre y te conviertes en un Aldeano simple.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Cazador de Bestias", emoji: "🐾", night: true, desc: "Eres el Cazador de Bestias. Cada noche, colocas una Trampa de Osos en la casa de un jugador (puedes ser tú mismo). Si los lobos atacan al jugador con la trampa:\n• El ataque se CANCELA (la víctima sobrevive).\n• La trampa MATA automáticamente al lobo de menor rango del ataque.\n\nNo puedes poner la trampa al mismo jugador dos noches seguidas.\n\nJerarquía de muerte (muere el de menor rango primero):\n1. Hombre Lobo\n2. Gran Lobo Feroz\n3. Padre de los Lobos\n4. Lobo Blanco (inmune si va acompañado)\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Cupido", emoji: "💘", night: true, desc: "Eres Cupido. Al inicio del juego, elegirás a dos jugadores para que sean amantes. Se amarán tanto que si uno muere, el otro morirá de tristeza inmediatamente.\n\n💡 Tip: Si los dos amantes llegan vivos al final de la partida, ¡obtendrán una victoria secreta exclusiva!\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Panadero", emoji: "🍞", night: true, desc: "Eres el Panadero. Cada noche, eliges a un jugador vivo (no a ti mismo) para entregarle una hogaza fresca. Al amanecer, el pueblo sabrá quién recibió el pan. Ese jugador tendrá +1 voto extra durante la votación del día.\n\nSi mueres, la panadería cierra y nadie recibe pan.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Niño Salvaje", emoji: "🌿", night: true, desc: "Eres el Niño Salvaje. Al inicio del juego elegirás un ídolo. Mientras viva, eres un aldeano normal. Pero si tu ídolo muere, te convertirás en un HOMBRE LOBO.\n\n🎯 Objetivo inicial: Ayudar a los aldeanos. (Cambia si tu ídolo muere)" },
    { name: "Alma Pura", emoji: "✨", night: false, desc: "Eres un Alma Pura. Todos saben que NO eres un Hombre Lobo. Tu identidad será revelada públicamente al inicio del juego. Tu voz será escuchada con confianza.\n\n🎯 Objetivo: Mantener al pueblo seguro y eliminar a todos los lobos." },
    { name: "Infiel", emoji: "🏠", night: true, desc: "Eres el Infiel. Cada noche debes elegir a un jugador para dormir en su casa. Si los lobos atacan TU casa, sobrevivirás porque no estás allí.\n\n⚠️ Peligros:\n• Si los lobos atacan a la persona con quien duermes, ¡ambos moriréis!\n• Si decides dormir con un Hombre Lobo, ¡te comerá y morirás automáticamente!\n\n🎯 Objetivo: Ayudar a los aldeanos." },
    { name: "Licántropo", emoji: "🌕", night: false, desc: "Eres el Licántropo. Eres un ALDEANO inocente, pero tienes una maldición: si el Vidente te investiga, aparecerás como un HOMBRE LOBO. Esto puede causar confusión y desconfianza. Deberás convencer a los demás de tu inocencia.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos verdaderos." },
    { name: "2x Hermana", emoji: "👯", night: false, desc: "Eres una de las dos Hermanas. Conocen la identidad de la otra hermana. Juntas pueden ayudar a la comunidad a encontrar a los lobos.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Ladrón", emoji: "🎭", night: true, desc: "Eres el Ladrón. En la primera noche, podrás ver las cartas sobrantes en el centro (pueden ser 2, 3 o 4 según la cantidad de jugadores). Te intercambiarás por uno de los roles disponibles.\n\n🎯 Objetivo: Dependerá del rol que elijas." },
    { name: "Saquea Tumbas", emoji: "⚰️", night: true, desc: "Eres el Saquea Tumbas. Tu especialidad es buscar entre las pertenencias de los difuntos. Si un miembro de la Aldea muere durante el día o la noche, puedes elegir saquear su tumba y heredar su rol y habilidades.\n\nSolo puedes hacer esto UNA vez por partida. Solo puedes elegir entre los muertos de la última tanda de fallecimientos.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Juez", emoji: "⚖️", night: false, desc: "Eres el Juez. Una vez por partida, después de la votación del día, puedes convocar un segundo juicio inmediato sin debate previo.\n\nTras la primera votación, recibirás un mensaje privado con dos opciones:\n• ✅ Sí — Se abre una segunda ronda de votaciones ahora mismo.\n• ❌ No — El día termina y cae la noche.\n\n⚠️ Este poder solo puede usarse UNA vez en toda la partida.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
    { name: "Miron", emoji: "👁️", night: false, desc: "Eres el Miron. Cada noche, memorizas en secreto todo lo que ocurre en la aldea. Al final de cada noche recibirás un resumen privado de todas las acciones realizadas por cada rol.\n\n⚠️ Condición especial: Si eres linchado por la aldea o disparado por el Cazador, ¡los Hombres Lobo ganan automáticamente! Así que mucho cuidado con a quién defiendes.\n\n🎯 Objetivo: Ayudar a los aldeanos a eliminar a todos los lobos." },
  ],
  wolves: [
    { name: "Hombre Lobo", emoji: "🐺", night: true, desc: "Eres un Hombre Lobo. Cada noche, tú y los demás lobos deben elegir a una víctima para eliminar. Durante la noche, puedes enviarme mensajes privados y los reenviaré a los otros lobos para que os coordinéis.\n\n🎯 Objetivo: Eliminar a todos los aldeanos hasta que los lobos sean mayoría." },
    { name: "Gran Lobo Feroz", emoji: "🦴", night: true, desc: "Eres el Gran Lobo Feroz. Eres un Hombre Lobo temible. Mientras no haya muerto NINGÚN otro Hombre Lobo, puedes despertar en noches pares (Noche 2, 4, 6...) después de la cacería normal para matar a una SEGUNDA víctima tú solo.\n\n⚠️ Restricción: Solo actúa en noches pares. Si muere cualquier compañero lobo, pierdes esta habilidad inmediatamente.\n\n🎯 Objetivo: Eliminar a todos los aldeanos." },
    { name: "Padre de los Lobos", emoji: "👑", night: true, desc: "Eres el Padre de los Lobos. Eres un Hombre Lobo con una habilidad especial: una vez por partida, puedes infectar a la víctima de los lobos para convertirla en Hombre Lobo en lugar de matarla.\n\n🎯 Objetivo: Eliminar a todos los aldeanos." },
    { name: "Hechicera", emoji: "🔮", night: true, desc: "Eres la Hechicera. Eres una aliada de los Lobos con un poder especial: cada noche, después de la cacería de los lobos, puedes intentar adivinar quién es el Vidente.\n\n⚠️ Importante: El Vidente te verá como un Hombre Lobo si te investiga.\n• Si aciertas quién es el Vidente, morirá instantáneamente.\n• Si fallas, no pasa nada.\n\n🎯 Objetivo: Eliminar al Vidente y ayudar a los lobos a ganar." },
  ],
  solo: [
    { name: "Curtidor", emoji: "🪡", night: false, desc: "Eres el Curtidor. Estás cansado de la vida y solo quieres morir. Tu ÚNICO objetivo es ser linchado durante el día.\n\n🏆 Condición de Victoria: Si eres linchado, TÚ GANAS y TODOS LOS DEMÁS PIERDEN (aldeanos y lobos). Si mueres de noche, no ganas nada y el juego continúa.\n\n💡 Estrategia: Actúa sospechoso para que te voten, pero no tanto como para que los lobos te maten de noche." },
    { name: "Lobo Blanco", emoji: "🤍", night: true, desc: "El Lobo Blanco aparece en el bando de los lobos, pero en realidad es un solitario. Participa en la cacería nocturna, pero su verdadero objetivo es ser el ÚNICO superviviente. Cada 2 noches puede matar a otro lobo.\n\n🎯 Objetivo: Ser el último en pie." },
  ]
};

export const COMMANDS_DATA = [
  // --- PARTIDA ---
  { id: "start", name: "start", prefix: ",ww ", cat: "partida", desc: "Iniciar lobby de Werewolf.", long_desc: "Crea una nueva instancia de juego. Los jugadores podrán unirse durante el tiempo configurado. Si se marca como private, las votaciones durante el día serán anónimas.", params: [ { name: "min", desc: "Número mínimo de jugadores para empezar (5-20).", optional: true }, { name: "tiempo", desc: "Segundos que durará el lobby antes de empezar.", optional: true }, { name: "private/public", desc: "Si es 'private', los votos del día serán anónimos.", optional: true } ], examples: [",ww start", ",ww start 10 120 private", ",ww start 8 60 public"] },
  { id: "fs", name: "forcestart/fs", prefix: ",ww ", cat: "partida", desc: "Forzar inicio inmediato.", long_desc: "Termina el tiempo de espera del lobby e inicia la repartición de roles inmediatamente. Solo puede usarlo el creador de la partida.", params: [], examples: [",ww forcestart", ",ww fs"] },
  { id: "join", name: "join", prefix: ",ww ", cat: "partida", desc: "Unirse a la partida.", long_desc: "Te añade a la lista de participantes del lobby actual.", params: [], examples: [",ww join"] },
  { id: "leave", name: "leave", prefix: ",ww ", cat: "partida", desc: "Salir del lobby.", long_desc: "Te elimina de la lista de participantes antes de que la partida comience.", params: [], examples: [",ww leave"] },
  { id: "stop", name: "stop", prefix: ",ww ", cat: "partida", desc: "Cancelar partida.", long_desc: "Detiene y elimina la partida activa en el canal. Solo disponible para el creador o administradores.", params: [], examples: [",ww stop"] },
  { id: "status", name: "status", prefix: ",ww ", cat: "partida", desc: "Estado actual del juego.", long_desc: "Muestra información sobre la fase actual (Día/Noche), el tiempo restante y los jugadores vivos.", params: [], examples: [",ww status"] },
  { id: "myrole", name: "myrole", prefix: "/ww ", cat: "partida", desc: "Consultar tu rol en secreto.", long_desc: "Envía un mensaje efímero (solo lo ves tú) recordándote tu rol y tus objetivos actuales.", params: [], examples: ["/ww myrole"] },
  { id: "players", name: "players", prefix: ",ww ", cat: "partida", desc: "Lista de jugadores.", long_desc: "Muestra la lista completa de usuarios que están participando en la partida actual.", params: [], examples: [",ww players"] },
  // --- INFORMACION ---
  { id: "info", name: "info", prefix: "/ww ", cat: "info", desc: "Reglas básicas y guía.", long_desc: "Muestra un embed detallado con las normas del juego, fases y consejos para nuevos jugadores.", params: [], examples: ["/ww info"] },
  { id: "presets", name: "presets", prefix: "/ww ", cat: "info", desc: "Ver tabla de probabilidades.", long_desc: "Muestra un enlace directo a la página de presets donde se detallan las probabilidades de aparición de cada rol según el número de jugadores.", params: [], examples: ["/ww presets", ",ww presets"] },
  { id: "role", name: "role <nombre_rol>", prefix: "/ww ", cat: "info", desc: "Detalles de un rol específico.", long_desc: "Muestra la descripción completa, bando, objetivos y habilidades nocturnas de un rol.", params: [ { name: "nombre_rol", desc: "El nombre del rol a consultar (ej: Vidente, Lobo Blanco).", optional: false } ], examples: ["/ww role Vidente", "/ww role Saquea Tumbas"] },
  { id: "roles", name: "roles", prefix: "/ww ", cat: "info", desc: "Lista de todos los roles.", long_desc: "Muestra una lista compacta de todos los roles cargados en el sistema.", params: [], examples: ["/ww roles"] },
  { id: "help", name: "help", prefix: "/ww ", cat: "info", desc: "Menú de ayuda.", long_desc: "Muestra el mensaje de ayuda general con todas las categorías de comandos.", params: [], examples: ["/ww help"] },
  // --- ESTADISTICAS ---
  { id: "stats", name: "stats [@usuario]", prefix: "/ww ", cat: "stats", desc: "Estadísticas de jugador.", long_desc: "Muestra el historial de partidas, victorias por bando y roles más jugados de un usuario.", params: [ { name: "@usuario", desc: "Mención del usuario a consultar (opcional, por defecto tú).", optional: true } ], examples: ["/ww stats", "/ww stats @vicktor"] },
  { id: "lb", name: "lb", prefix: "/ww ", cat: "stats", desc: "Clasificación de XP.", long_desc: "Muestra la tabla del Top 10 de jugadores con mayor XP acumulada en Werewolf.", params: [], examples: ["/ww lb", ",ww lb", ",ww top"] },
  { id: "pts", name: "pts/xp/puntos/points", prefix: "/ww ", cat: "stats", desc: "Ver XP por acción.", long_desc: "Muestra la XP otorgada por cada acción en la partida (rondas sobrevividas, victoria normal o especial, y supervivencia al final de la partida).", params: [], examples: ["/ww pts", ",ww pts", ",ww puntos"] },
  { id: "niveles", name: "niveles", prefix: "/ww ", cat: "stats", desc: "Ver niveles y rangos.", long_desc: "Muestra los roles de rango por nivel del servidor y tu progreso.", params: [], examples: ["/ww niveles", ",ww niveles"] },
  { id: "wr", name: "wr", prefix: "/ww ", cat: "stats", desc: "Win rates globales.", long_desc: "Estadísticas generales de victoria para cada bando (Aldea, Lobos, Solitarios, Amantes).", params: [], examples: ["/ww wr"] },
  // --- COMUNIDAD ---
  { id: "bug", name: "bug <descripción>", prefix: ",ww ", cat: "comunidad", desc: "Reportar un bug.", long_desc: "Envía un reporte técnico a los desarrolladores sobre un fallo en el bot.", params: [ { name: "descripción", desc: "Detalles del error encontrado.", optional: false } ], examples: [",ww bug El comando status no carga", ",ww bug No morí al ser atacado"] },
  { id: "suggestion", name: "suggestion <texto>", prefix: ",ww ", cat: "comunidad", desc: "Enviar una sugerencia.", long_desc: "Propón nuevas ideas o mejoras para el bot.", params: [ { name: "texto", desc: "Tu propuesta detallada.", optional: false } ], examples: [",ww suggestion Añadir el rol de Flautista", ",ww suggestion Mas tiempo de lobby"] },
  { id: "report", name: "report <@usuario> <motivo>", prefix: ",ww ", cat: "comunidad", desc: "Reportar a un jugador.", long_desc: "Notifica a los moderadores sobre el mal comportamiento de un jugador durante una partida.", params: [ { name: "@usuario", desc: "Mención del jugador reportado.", optional: false }, { name: "motivo", desc: "Razón del reporte.", optional: false } ], examples: [",ww report @troll Insultos constantes", ",ww report @afk Se queda inactivo a propósito"] },
  // --- CONFIGURACION ---
  { id: "mention", name: "mention [mensaje]", prefix: ",ww ", cat: "gear", desc: "Mencionar rol de jugadores.", long_desc: "Realiza una mención al rol especial de los jugadores actuales con un mensaje personalizado. Solo disponible para usuarios poseedores del rol. Cooldown: 15 minutos.", params: [ { name: "mensaje", desc: "Texto adicional para la mención.", optional: true } ], examples: [",ww mention la partida va a empezar", ",ww mention ¡Despertad!"] },
  { id: "ping", name: "ping", prefix: ",ww ", cat: "gear", desc: "Ver latencia del bot.", long_desc: "Muestra el tiempo de respuesta del bot y la conexión con la base de datos.", params: [], examples: [",ww ping"] },
  // --- ADMINISTRACION ---
  { id: "bl", name: "bl", prefix: ",ww ", cat: "admin", desc: "Ver la blacklist completa.", long_desc: "Muestra la lista de todos los usuarios baneados del bot y sus motivos.", params: [], examples: [",ww bl"] },
  { id: "bl_add", name: "bl add @usuario [motivo]", prefix: ",ww ", cat: "admin", desc: "Añadir a la blacklist.", long_desc: "Prohíbe a un usuario participar en cualquier partida del bot.", params: [ { name: "@usuario", desc: "Mención del usuario a banear.", optional: false }, { name: "motivo", desc: "Razón del baneo.", optional: true } ], examples: [",ww bl add @toxico Toxicidad extrema", ",ww bl add @hacker Trampas"] },
  { id: "bl_remove", name: "bl remove @usuario", prefix: ",ww ", cat: "admin", desc: "Eliminar de la blacklist.", long_desc: "Perdona a un usuario y le permite volver a jugar.", params: [ { name: "@usuario", desc: "Mención del usuario a desbanear.", optional: false } ], examples: [",ww bl remove @ex_toxico"] },
  { id: "changelog", name: "changelog <enlace>", prefix: ",ww ", cat: "admin", desc: "Enviar un changelog.", long_desc: "Envía el anuncio de actualización al canal configurado usando un enlace a la imagen del parche. Sin enlace se manda el changelog de texto.", params: [ { name: "enlace", desc: "URL de la imagen del changelog.", optional: true } ], examples: [",ww changelog https://imagen.com/patch.png", ",ww changelog"] },
  { id: "config", name: "config", prefix: ",ww ", cat: "admin", desc: "Ver la configuración del servidor.", long_desc: "Muestra un Embed detallado con la configuración de Werewolf en este servidor, incluyendo canales permitidos, mutes, prefijo y estado del sistema de XP.", params: [], examples: [",ww config"] },
  { id: "resetlb", name: "resetlb", prefix: ",ww ", cat: "admin", desc: "Resetear la XP.", long_desc: "Resetea a 0 la XP acumulada de todos los usuarios registrados en el bot. Solo accesible para administradores de Discord u owners.", params: [], examples: [",ww resetlb", "/ww resetlb"] },
  { id: "fixperms", name: "fixperms", prefix: ",ww ", cat: "admin", desc: "Limpiar bloqueos de chat.", long_desc: "Limpia los permisos de chat de los miembros que se hayan quedado silenciados por error tras una caída del bot o el fin de una partida. Solo disponible para administradores o el creador del bot.", params: [], examples: [",ww fixperms"] },
];

export const CMD_CATEGORIES = [
  { id: "all", label: "🌍 Ver Todos" },
  { id: "partida", label: "🎮 Partida" },
  { id: "info", label: "ℹ️ Información" },
  { id: "stats", label: "📊 Estadísticas" },
  { id: "comunidad", label: "🤝 Comunidad" },
  { id: "gear", label: "⚙️ Config" },
  { id: "admin", label: "🔒 Admin" },
];

export const PRESETS_DATA = {
  village: [
    { name: "Aldeano", emoji: "👨‍🌾", spawn: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100] },
    { name: "Vidente", emoji: "🔮", spawn: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80] },
    { name: "Bruja", emoji: "🧙‍♀️", spawn: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80] },
    { name: "Cazador", emoji: "🏹", spawn: [60,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70] },
    { name: "Curandera", emoji: "💊", spawn: [0,50,60,70,70,70,70,70,70,70,70,70,70,70,70,70] },
    { name: "Caballero", emoji: "⚔️", spawn: [0,40,50,60,60,60,60,60,60,60,60,60,60,60,60,60] },
    { name: "El Anciano", emoji: "👴", spawn: [0,0,40,50,60,60,60,60,60,60,60,60,60,60,60,60] },
    { name: "Zorro", emoji: "🦊", spawn: [0,0,0,0,40,50,60,60,60,60,60,60,60,60,60,60] },
    { name: "Ramera", emoji: "💋", spawn: [0,0,0,0,0,50,50,50,60,60,60,60,60,60,60,60] },
    { name: "Cazador de Bestias", emoji: "🐾", spawn: [0,0,0,30,40,50,55,60,60,60,60,60,60,60,60,60] },
    { name: "Cupido", emoji: "💘", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Panadero", emoji: "🍞", spawn: [0,0,0,30,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Niño Salvaje", emoji: "🌿", spawn: [0,0,0,0,30,40,50,55,55,55,55,55,55,55,55,55] },
    { name: "Alma Pura", emoji: "✨", spawn: [0,0,0,30,40,50,50,50,50,50,50,50,50,50,50,50] },
    { name: "Infiel", emoji: "🏠", spawn: [0,0,50,50,50,55,55,55,55,55,55,55,55,55,55,55] },
    { name: "Licántropo", emoji: "🌕", spawn: [30,40,50,55,55,55,55,55,55,55,55,55,55,55,55,55] },
    { name: "2x Hermanas", emoji: "👯", spawn: [0,0,0,0,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Ladrón", emoji: "🎭", spawn: [0,40,50,50,50,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Saquea Tumbas", emoji: "⚰️", spawn: [0,0,0,30,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Juez", emoji: "⚖️", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Miron", emoji: "👁️", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
  ],
  wolves: [
    { name: "Hombre Lobo", emoji: "🐺", spawn: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100] },
    { name: "Gran Lobo Feroz", emoji: "🦴", spawn: [0,0,50,60,60,65,65,65,65,65,65,65,65,65,65,65] },
    { name: "Padre de Lobos", emoji: "👑", spawn: [0,0,0,0,40,50,60,60,60,60,60,60,60,60,60,60] },
    { name: "Hechicera", emoji: "🔮", spawn: [0,0,0,0,55,60,60,60,60,60,60,60,60,60,60,60] },
  ],
  solo: [
    { name: "Curtidor", emoji: "🪡", spawn: [0,0,0,20,20,33,33,33,40,40,40,50,50,50,50,50] },
    { name: "Lobo Blanco", emoji: "🤍", spawn: [0,0,0,0,0,0,33,33,40,40,40,50,50,50,50,50] },
  ],
  wolfCount: [1,1,2,2,2,3,3,3,4,4,4,5,5,5,5,5],
};

export const NIVELES_DATA = [
  { level: 5, xp: 320, emoji: "🥈", name: "Iniciado", color: "#a0a0a0", desc: "Primer rango por nivel. Has demostrado conocer las bases del juego." },
  { level: 10, xp: 1620, emoji: "🥇", name: "Veterano", color: "var(--gold)", desc: "Rango de veteranía. Eres un jugador experimentado en la manada." },
  { level: 15, xp: 3920, emoji: "👑", name: "Leyenda", color: "var(--accent-purple)", desc: "Rango legendario. Dominas el engaño, la traición y la deducción." },
  { level: 20, xp: 7220, emoji: "🏆", name: "Mítico", color: "#e74c3c", desc: "Rango mítico. Nivel máximo de maestría en Werewolf." }
];

export const CHANGELOG_DATA = [
  {
    date: "AGOSTO 2026",
    title: "📢 Actualización de Agosto — Sistema de XP y Panel Web",
    sections: [
      { heading: "🌟 NUEVAS CARACTERÍSTICAS", items: [
        "<strong>📈 Sistema de Niveles y XP:</strong> ¡Ahora tienes niveles en Werewolf! Tu nivel se calcula automáticamente a partir de tu XP con la fórmula <code>Nivel = 1 + sqrt(XP / 20)</code>.",
        "<strong>🎖️ Roles por Nivel (Exclusivos):</strong> Se ha eliminado el antiguo sistema de logros por victorias. Ahora los servidores otorgan roles automáticos según tu nivel. Al subir de nivel se te asignará el rol nuevo y se retirará el anterior (asignación exclusiva). Modificable por los administradores desde el panel web.",
        "<strong>🎗️ Comando <code>,ww niveles</code> / <code>/ww niveles</code>:</strong> Nuevo comando público para ver el progreso actual, tu nivel, XP acumulada y la lista de rangos por nivel configurados.",
        "<strong>🎗️ Comando <code>,ww pts</code> / <code>/ww pts</code>:</strong> Nuevo comando público para consultar de forma interactiva la XP asignada por cada acción de la partida (victorias, rondas sobrevividas, etc.).",
        "<strong>🛡️ Blacklist de Werewolf en la Web:</strong> Añadida una nueva sección en el Panel de Administración de la Web para gestionar usuarios en la lista negra (ver, añadir y eliminar con doble confirmación) de forma segura y automatizada.",
        "<strong>📊 Niveles en Stats:</strong> Los comandos <code>,ww stats</code> y <code>/ww stats</code> ahora muestran tu nivel de XP actual y se actualizan al instante.",
      ] },
      { heading: "⚖️ CAMBIOS DE BALANCE", items: [
        "<strong>🔮 Hechicera (7 y 8 jugadores):</strong> El rol Hechicera ya no aparece en partidas de menos de 9 jugadores (máximo de 2 lobos).",
        "<strong>🔮 Hechicera (9 jugadores):</strong> Ahora en partidas de 9 jugadores siempre hay 2 lobos de base, y además puede aparecer una Hechicera (haciendo un total de 3 lobos). Si se activa, se garantiza que haya un Vidente en la aldea.",
      ] },
      { heading: "🐛 CORRECCIÓN DE ERRORES Y MEJORAS", items: [
        "<strong>📈 Posición de Ranking Web:</strong> Corregido el fallo de consulta que mostraba a todos en la posición #1 del ranking en la web.",
        "<strong>🏆 Comando <code>,ww wr</code> (Win Rates):</strong> Corregido el comando de porcentaje de victorias global para que cargue y guarde de forma correcta las estadísticas específicas de cada servidor por separado.",
        "<strong>📖 Ayuda e Información (<code>,ww info</code> y <code>,ww help</code>):</strong> Rediseñado el comando informativo para explicar el funcionamiento de los niveles, logros y listar adecuadamente los nuevos comandos de estadísticas."
      ] }
    ]
  },
  {
    date: "JULIO 2026",
    title: "📢 Actualización de Julio — Mejoras y Correcciones",
    sections: [
      { heading: "⚙️ CAMBIOS Y MEJORAS", items: [
        "<strong>🗣️ Tiempo de Discusión:</strong> El bot ahora enviará un aviso cuando queden 10 segundos de discusión antes del cierre de líneas.",
        "<strong>🌙 Información Nocturna:</strong> Se muestra claramente el número de jugadores que quedan vivos al inicio de cada noche.",
        "<strong>💀 Muerte del Infiel:</strong> Corregido el mensaje de muerte del Infiel al acostarse con un lobo para que especifique la causa (VIH).",
      ] },
      { heading: "🐛 CORRECCIÓN DE ERRORES", items: [
        "<strong>🏠 Infiel:</strong> Corregido el bug donde la Bruja lo veía como atacado si los lobos iban a su casa pero él dormía fuera.",
        "<strong>💋 Ramera:</strong> Corregido el bug donde la Bruja lo veía como atacado si los lobos iban a su casa pero él dormía fuera.",
        "<strong>🐺 Licántropo:</strong> Solucionado el bug que permitía la aparición de un Licántropo en partidas sin Vidente.",
      ] }
    ]
  },
  {
    date: "JUNIO 2026",
    title: "📢 Actualización de Junio — Sistema de Eventos",
    sections: [
      { heading: "🏆 SISTEMA DE XP", items: [
        "<strong>⏱️ XP por ronda:</strong> +2 XP por cada ronda aguantada con vida.",
        "<strong>🏆 XP por victoria:</strong> +15 XP a cada miembro del equipo ganador (Aldea o Lobos).",
        "<strong>❤️/💖 Victoria Solitaria o Enamorados:</strong> +50 XP extra por ganar la partida como Solitario o Amantes.",
        "<strong>❤️ Supervivencia final:</strong> +5 XP extra si finalizas la partida con vida.",
        "<strong>🥇 Tabla de Clasificación:</strong> Nuevo comando <code>,ww lb</code> / <code>/ww lb</code> para consultar los Top 10 jugadores.",
        "<strong>📊 XP en Stats:</strong> El comando <code>,ww stats</code> ahora muestra la XP acumulada.",
        "<strong>🛠️ Reset de XP:</strong> Comando <code>,ww resetlb</code> para que admins y owners reinicien la clasificación.",
      ] },
      { heading: "⚙️ CAMBIOS DE EQUILIBRIO Y ROLES", items: [
        "<strong>🦴 Gran Lobo Feroz:</strong> Su habilidad para matar a una 2ª víctima en solitario solo se activa en <strong>noches pares</strong>.",
        "<strong>💋 Ramera:</strong> Su visita a los lobos solo cancela la cacería si se acuesta con el <strong>lobo decisor</strong>.",
        "<strong>🔮 Presets de 5 Jugadores:</strong> En partidas de 5 jugadores, si hay <strong>Vidente</strong>, no habrá <strong>Bruja</strong>.",
      ] },
      { heading: "🐛 CORRECCIÓN DE ERRORES", items: [
        "<strong>🎭 Ladrón:</strong> Corregido un error que limitaba las cartas del centro a 2. Ahora puede ver y elegir entre todas las cartas generadas (entre 2 y 4).",
      ] }
    ]
  },
  {
    date: "ABRIL 2026",
    title: "📢 Gran Actualización de Abril",
    sections: [
      { heading: "✨ NUEVO", items: [
        "<strong>🌐 Página Web:</strong> ¡Ya tenemos documentación oficial! Contiene normas, información detallada sobre roles, presets, registro de actualizaciones y logros.",
        "<strong>🎲 Nuevo Sistema de Presets:</strong> Se acabó la generación de roles pre-establecidos. Ahora se calculan en base a una probabilidad (<em>spawn rate</em>) que depende del número de jugadores. Tienes toda la info con <code>/ww presets</code>.",
        "<strong>🎭 Rol JUEZ 👩🏼‍⚖️:</strong> Nuevo rol disponible en partidas de +10 jugadores. Toda la información con <code>/ww role Juez</code>.",
        "<strong>🎭 Rol MIRÓN 🥷🏼:</strong> Nuevo rol disponible en partidas de +10 jugadores. <em>Nota: En partidas de menos de 15 jugadores, no podrá haber Vidente y Mirón simultáneamente.</em> Info con <code>/ww role Miron</code>.",
        "<strong>🏆 Logro Amantes:</strong> Nuevo rol de recompensa por obtener tu primera victoria como amantes (no es evolutivo, solo requiere 1 victoria).",
        "<strong>🛡️ Sistema de Reportes:</strong> Añadido el comando <code>,ww report [@user] [motivo]</code> para denunciar a jugadores que incumplan las normas del minijuego.",
      ] },
      { heading: "⚙️ CAMBIOS Y AJUSTES", items: [
        "<strong>📊 Estadísticas y Comandos de WR:</strong><ul><li>Los porcentajes de <em>Win Rate</em> ahora son correctos y llevan el conteo exacto de partidas jugadas.</li><li>Ahora se contabilizan las victorias obtenidas como amantes.</li><li>Al ser infectado por el Padre de los Lobos (o si muere el ídolo del Niño Salvaje), las estadísticas de victoria/derrota se guardarán correctamente como si pertenecieses al bando de los lobos.</li></ul>",
        "<strong>🎮 Comando de Inicio:</strong> Usar <code>,ww start</code> sin argumentos iniciará la partida automáticamente con <code>time = 300</code> y votaciones anónimas.",
        "<strong>🔇 Mute de Muertos:</strong> Los jugadores muertos ya no podrán enviar mensajes al canal hasta que finalice la partida por completo.",
        "<strong>🔔 Menciones del Minijuego:</strong> Ya no se puede hacer <em>ping</em> directo al rol. Se debe usar el comando <code>,ww mention [msg]</code> (exclusivo para quienes tengan el rol y con un cooldown de 15 minutos).",
        "<strong>🐺 Padre de los Lobos:</strong> Ya no puede infectar al Alma Pura.",
        "<strong>🦹‍ Ladrón:</strong> Ahora podrá tener hasta 4 roles para elegir al azar.",
        "<strong>🏅 Logros Lobo Blanco y Curtidor:</strong> Se ha reducido el número de victorias necesarias para obtener estos roles. Tienes toda la información en <code>/ww logros</code>.",
      ] },
      { heading: "🐛 CORRECCIÓN DE ERRORES", items: [
        "<strong>🛡️ Caballero:</strong> Corregida su descripción. Solucionado el bug donde, si el lobo decisor moría en la votación, otro lobo aleatorio moría en la noche. Ahora el poder se anula si el decisor muere votado.",
        "<strong>🐺 Lobo Blanco:</strong> Solucionado el bug que le impedía ganar si llegaba a un 1v1 contra otro lobo.",
        "<strong>🪤 Cazador de Bestias:</strong> Se corrigió el uso infinito de trampas. Ahora, si mata a un lobo, la noche siguiente no tendrá trampa disponible.",
        "<strong>👥 Presets de Roles:</strong> La Ramera y el Infiel ya no pueden aparecer juntos en la misma partida.",
      ] },
    ],
  },
  {
    date: "07/04/2026",
    title: "Slash Commands y Saquea Tumbas",
    sections: [
      { heading: "🛠️ BUGS", items: [
        "<strong>Saquea Tumbas:</strong> El select de escrutinio ahora muestra el rol del usuario (Ej: insxyvictor (Vidente)).",
        "<strong>Saquea Tumbas:</strong> En el resumen final aparecen ambos roles (Ej: insxyvictor [Saquea Tumbas (Vidente)]).",
        "<strong>Alma Pura:</strong> Mensajes de muerte corregidos (Ej: \"Murió de pena al perder a su amor\").",
      ] },
      { heading: "📋 CAMBIOS", items: [
        "<strong>Slash Commands:</strong> Habilitados <code>/ww info</code>, <code>role</code>, <code>roles</code>, <code>help</code>, <code>stats</code>, <code>logros</code>, <code>wr</code> y <code>myrole</code> con respuestas privadas.",
      ] },
    ],
  },
  {
    date: "04/04/2026",
    title: "Roles Evolutivos y Blacklist",
    sections: [
      { heading: "🛠️ BUGS", items: [
        "<strong>Hechicera:</strong> Ya no despierta si no hay vidente vivo.",
        "<strong>Lobos:</strong> Ahora conocen quién es la hechicera.",
        "<strong>Lobos:</strong> Solucionado chat vía MD.",
        "<strong>Saquea Tumbas:</strong> Solucionado bug donde no despertaba.",
      ] },
      { heading: "📋 CAMBIOS", items: [
        "<strong>SISTEMA DE ROLES:</strong> Nuevo sistema de logros evolutivos (<code>,ww logros</code>).",
        "<strong>Blacklist Admins:</strong> Nuevos comandos <code>,ww bl</code> para gestión por administradores.",
      ] },
    ],
  },
  {
    date: "03/04/2026",
    title: "Saquea Tumbas y Nuevo Zorro",
    sections: [
      { heading: "🌟 NUEVO", items: [
        "<strong>Rol: Saquea Tumbas ⚰️:</strong> Nuevo rol añadido.",
        "<strong>Modificación Zorro:</strong> Su habilidad ahora tiene un solo uso por partida.",
        "<strong>Comando Stats:</strong> Ahora muestra estadísticas individuales de todos los roles.",
        "<strong>Comando WR:</strong> Estadísticas globales de los 4 bandos, incluidos solitarios.",
      ] },
      { heading: "🛠️ BUGS", items: [
        "<strong>Ramera:</strong> Solucionado error donde podía ir a la misma casa varias noches.",
        "<strong>Lobo Blanco:</strong> Solucionado error en el embed de presentación de MD aparecía en el bando lobo.",
        "<strong>Cazador:</strong> Solucionado bug donde la partida acababa sin dejarle disparar si era el último.",
        "<strong>Anciano:</strong> Al morir pierden poderes pero mantienen el rol (no se transforman todos en aldeanos).",
        "<strong>Presets:</strong> Solucionado bug donde aparecía lycan sin vidente.",
      ] },
      { heading: "📋 OTROS", items: [
        "<strong>Presets:</strong> Zorro no aparece en -10j. El curtidor aparece con más frecuencia.",
        "<strong>Mensaje Amanecer:</strong> Ahora muestra el número de jugadores vivos.",
      ] },
    ],
  },
  {
    date: "30/03/2026",
    title: "Votaciones y Balanceo de Roles",
    sections: [
      { heading: "🛠️ BUGS", items: [
        "<strong>Zorro:</strong> Ahora mantiene su rol de \"Zorro\" tras fallar el olfateo.",
        "<strong>Niño Salvaje:</strong> Corregida transformación cuando su ídolo muere.",
        "<strong>Victoria:</strong> Empate (\"Nadie ha sobrevivido\") si no queda nadie vivo.",
        "<strong>Lobo Blanco:</strong> Ahora aparece como solitario en todos los comandos de información.",
        "<strong>Cazador:</strong> Revisión de fin de partida tras el disparo para evitar partidas sin lobos.",
        "<strong>Hechicera:</strong> No aparece si no existe vidente en el preset.",
      ] },
      { heading: "📋 CAMBIOS", items: [
        "<strong>Alma Pura:</strong> Anuncio público movido al principio de la primera noche.",
        "<strong>Lobo Decisor:</strong> Cambia cada noche si quedan más lobos.",
        "<strong>Infiel:</strong> Muere al visitar cualquier miembro de los lobos (hechicera y blanco incluidos).",
        "<strong>Comando Normas:</strong> <code>,ww info</code> para ver las reglas.",
        "<strong>Sugerencias:</strong> Nuevos alias <code>suggestion/suggest/sugerencia</code>.",
        "<strong>Votaciones:</strong> Dividido en discusión (90s) y votación (30s).",
        "<strong>Votaciones Privadas:</strong> Ver <code>,ww help start</code> para configuración.",
      ] },
    ],
  },
  {
    date: "26/03/2026",
    title: "Gran Corrección de Errores",
    sections: [
      { heading: "🛠️ BUGS", items: [
        "<strong>Victoria Lobo:</strong> Solucionado error interno al calcular victoria por falta de conteo.",
        "<strong>Bug Casa Vacía:</strong> Mejorada lógica de supervivencia para Ramera e Infiel cuando ellos o sus objetivos no están.",
        "<strong>Hechicera:</strong> Suma victorias correctamente en su perfil personal.",
        "<strong>Fin de Partida:</strong> Mostrando mensajes de últimas muertes si la partida acaba de noche.",
        "<strong>Cazador:</strong> Si muere por Bruja o Amor, no puede disparar.",
        "<strong>Venganza Caballero:</strong> Ahora afecta correctamente al lobo decisor.",
        "<strong>Trampa Bestias:</strong> Ya no afecta a todas las muertes de la noche.",
        "<strong>Panadero:</strong> Contando correctamente el doble voto del jugador elegido.",
        "<strong>Bruja:</strong> Puede salvar a la víctima del Gran Lobo Feroz.",
        "<strong>Niño Salvaje:</strong> Ahora los lobos son avisados cuando se transforma.",
        "<strong>Zorro:</strong> Olfato corregido sobre el Licántropo (lo detecta como lobo).",
        "<strong>Amantes:</strong> Muerte por amor corregida para que siempre mueran ambos.",
      ] },
      { heading: "📋 CAMBIOS", items: [
        "<strong>Alias FS:</strong> Sustituye a <code>forcestart</code>.",
        "<strong>Presets:</strong> Mejorada la jugabilidad y el balance general.",
        "<strong>Prioridad Amantes:</strong> Victoria de amantes priorizada sobre Lobos en duelo final de 2 jugadores.",
        "<strong>Niño Salvaje:</strong> Recibe aviso de unión a la manada y aviso secreto a los lobos.",
      ] },
    ],
  },
];
