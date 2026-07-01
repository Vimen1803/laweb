import { 
  SparklesIcon, ShieldCheckIcon, ChatBubbleLeftEllipsisIcon, 
  WrenchScrewdriverIcon, TrophyIcon, MoonIcon, 
  CommandLineIcon, NoSymbolIcon, CheckCircleIcon, 
  HeartIcon, PaperAirplaneIcon, CurrencyDollarIcon, 
  FaceFrownIcon, PlayIcon, PuzzlePieceIcon, 
  GiftIcon, QuestionMarkCircleIcon, TicketIcon, 
  FaceSmileIcon, HandRaisedIcon, CakeIcon,
  StarIcon, RectangleGroupIcon, ClipboardDocumentListIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid';

const commandsData = {
  "Brawl Stars": {
    icon: <SparklesIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos relacionados con Brawl Stars",
    commands: [
      { name: "save", aliases: ["bssave"], description: "Guarda tu tag de Brawl Stars vinculándolo a tu cuenta de Discord. Un admin puede guardar el tag de otro usuario pasándolo como segundo argumento.", usage: ",save <tag> [usuario]", example: ",save #8GRCQK", category: "CUENTA" },
      { name: "savealt", aliases: [], description: "Guarda el tag de tu cuenta alternativa de Brawl Stars. Requiere tener una cuenta principal guardada previamente.", usage: ",savealt <tag> [usuario]", example: ",savealt #9PQLR2", category: "CUENTA" },
      { name: "unsave", aliases: ["bsunsave"], description: "Elimina el tag de Brawl Stars guardado de un usuario. Solo admins.", usage: ",unsave <@usuario>", example: ",unsave @David", category: "ADMIN" },
      { name: "profile", aliases: ["p", "bsp"], description: "Muestra las estadísticas de Brawl Stars de un jugador: copas, brawlers, victorias, etc.", usage: ",profile [usuario]", example: ",p @David", category: "INFO" },
      { name: "alt", aliases: [], description: "Muestra las estadísticas de la cuenta alternativa de un jugador.", usage: ",alt [usuario]", example: ",alt @David", category: "INFO" },
      { name: "renamebs", aliases: ["rbs"], description: "Cambia el apodo de un miembro al nombre de su cuenta de Brawl Stars. Si se pasa `true`, añade también el nombre del club.", usage: ",renamebs [usuario] [club_name]", example: ",rbs @David true", category: "UTILIDAD" },
      { name: "brawler", aliases: ["br"], description: "Muestra información específica de un brawler para un jugador: nivel, gadgets, star powers, gears. Si el nombre del brawler tiene espacios, usa comillas.", usage: ",brawler <nombre> [usuario]", example: ",br Shelly @David", category: "INFO" },
      { name: "brawlers", aliases: ["b"], description: "Muestra la lista completa de brawlers desbloqueados de un jugador con sus niveles.", usage: ",brawlers [usuario]", example: ",b @David", category: "INFO" },
      { name: "map", aliases: ["m"], description: "Muestra información sobre un mapa específico del juego.", usage: ",map <nombre>", example: ",map Skull Creek", category: "INFO" },
      { name: "top", aliases: [], description: "Muestra el ranking global o regional de clubes de Brawl Stars.", usage: ",top [region]", example: ",top global", category: "INFO" },
      { name: "club", aliases: ["c"], description: "Muestra la información de un club. Acepta una key guardada, un tag (#) o un usuario de Discord. Keyword opcionales: `members` para ver la lista de miembros, `logs` para ver el historial de cambios del club.", usage: ",club [key/tag/usuario] [members|logs]", example: ",club la7 members", category: "INFO" },
      { name: "clubs", aliases: [], description: "Lista todos los clubes guardados del servidor con sus trofeos, requisitos y miembros. Keywords: `roles`, `desc`, `members <n>`, `icanjoin [copas]`, `reverse`, `regions <region>`.", usage: ",clubs [keyword] [args]", example: ",clubs roles", category: "INFO" },
      { name: "clubs add", aliases: [], description: "Añade un club al servidor con una clave identificativa. Solo admins.", usage: ",clubs add <key> <tag>", example: ",clubs add la7 #2YGR8C9", category: "ADMIN" },
      { name: "clubs remove", aliases: [], description: "Elimina un club del servidor y su webhook de logs si existe. Solo admins.", usage: ",clubs remove <key>", example: ",clubs remove la7", category: "ADMIN" },
      { name: "clubs role", aliases: [], description: "Asigna un rol de Discord a un club (rol de miembro). Solo admins.", usage: ",clubs role <key> <@rol>", example: ",clubs role la7 @LA7", category: "ADMIN" },
      { name: "clubs srole", aliases: [], description: "Asigna un rol de staff a un club (vicepresidentes/veteranos). Solo admins.", usage: ",clubs srole <key> <@rol>", example: ",clubs srole la7 @LA7-Staff", category: "ADMIN" },
      { name: "clubs region", aliases: [], description: "Establece la región de un club para filtros por región. Solo admins.", usage: ",clubs region <key> <region>", example: ",clubs region la7 es", category: "ADMIN" },
      { name: "leaderboard", aliases: ["lb"], description: "Muestra la clasificación del servidor. Tipos válidos: `copas` (trofeos totales), `equipo` (victorias 3v3), `solo` (victorias Showdown solo), `duos` (victorias Showdown dúos).", usage: ",leaderboard <tipo>", example: ",lb copas", category: "INFO" },
      { name: "userbytag", aliases: [], description: "Busca qué usuario de Discord tiene guardado un tag específico de Brawl Stars.", usage: ",userbytag <tag>", example: ",userbytag #8GRCQK", category: "UTILIDAD" },
      { name: "usersbyclub", aliases: [], description: "Muestra los usuarios del servidor que pertenecen a un club concreto y tienen su tag guardado.", usage: ",usersbyclub <tag>", example: ",usersbyclub #2YGR8C9", category: "UTILIDAD" },
      { name: "membersBS", aliases: [], description: "Lista los miembros de un rol mostrando para cada uno su nombre de Discord, IGN de Brawl Stars y club actual.", usage: ",membersBS <rol>", example: ",membersBS Moderador", category: "UTILIDAD" },
      { name: "uemoji", aliases: [], description: "Actualiza los emojis de los brawlers en el servidor. Solo admins.", usage: ",uemoji", example: ",uemoji", category: "ADMIN" },
    ]
  },
  "Moderación": {
    icon: <ShieldCheckIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de moderación del servidor",
    commands: [
      { name: "ban", aliases: [], description: "Banea a un usuario del servidor con duración opcional y motivo.", usage: ",ban <usuario> [duración] [motivo]", example: ",ban @user 7d Toxicidad", category: "SANCIÓN" },
      { name: "unban", aliases: [], description: "Desbanea a un usuario del servidor.", usage: ",unban <usuario> [motivo]", example: ",unban @user Apelación aprobada", category: "SANCIÓN" },
      { name: "kick", aliases: [], description: "Expulsa a un miembro del servidor con un motivo opcional.", usage: ",kick <miembro> [motivo]", example: ",kick @user Spam", category: "SANCIÓN" },
      { name: "mute", aliases: [], description: "Silencia a un miembro durante el tiempo especificado.", usage: ",mute <miembro> <duración> [motivo]", example: ",mute @user 1h Flood", category: "SANCIÓN" },
      { name: "unmute", aliases: [], description: "Quita el silencio a un miembro antes de que expire.", usage: ",unmute <miembro> [motivo]", example: ",unmute @user Cumplió sanción", category: "SANCIÓN" },
      { name: "strike", aliases: [], description: "Añade un strike (advertencia) a un usuario. Al acumular strikes se aplican sanciones automáticas configuradas.", usage: ",strike <usuario> <motivo>", example: ",strike @user Incumplir norma 3", category: "SANCIÓN" },
      { name: "pardon", aliases: [], description: "Elimina un strike de un usuario.", usage: ",pardon <usuario> <motivo>", example: ",pardon @user Buen comportamiento", category: "SANCIÓN" },
      { name: "check", aliases: [], description: "Revisa los strikes activos y el estado de moderación de un usuario.", usage: ",check <usuario>", example: ",check @user", category: "INFO" },
      { name: "history", aliases: [], description: "Muestra el historial completo de sanciones y acciones de moderación de un usuario.", usage: ",history <usuario>", example: ",history @user", category: "INFO" },
      { name: "reason", aliases: [], description: "Modifica la razón de un caso de moderación existente por su ID.", usage: ",reason <id_caso> <nueva_razón>", example: ",reason 42 Motivo actualizado", category: "GESTIÓN" },
      { name: "names", aliases: [], description: "Muestra el historial de nombres de usuario de Discord de un miembro.", usage: ",names [usuario]", example: ",names @user", category: "INFO" },
      { name: "nicks", aliases: [], description: "Muestra el historial de apodos en el servidor de un miembro.", usage: ",nicks [usuario]", example: ",nicks @user", category: "INFO" },
      { name: "punishments", aliases: [], description: "Muestra las sanciones automáticas configuradas por número de strikes.", usage: ",punishments", example: ",punishments", category: "CONFIG" },
      { name: "punishments set", aliases: [], description: "Configura la sanción automática que se aplica al alcanzar un número de strikes. Tipos: mute, kick, ban.", usage: ",punishments set <nº> <tipo> [duración]", example: ",punishments set 3 mute 24h", category: "CONFIG" },
    ]
  },
  "Ajustes del servidor": {
    icon: <Cog6ToothIcon style={{ width: 18, height: 18 }} />,
    description: "Visualiza y edita la configuración del servidor. Requiere ser administrador o tener el rol del Dpto. de Programación.",
    commands: [
      { name: "settings", aliases: ["ajustes", "config"], description: "Muestra todos los ajustes del servidor: idioma, canales, roles, flags, sincronización y sanciones.", usage: ",settings", example: ",settings", category: "INFO" },
      { name: "settings language", aliases: ["settings idioma"], description: "Ver o cambiar el idioma del servidor (`en` o `es`). Se inicializa en `es` al añadir el bot.", usage: ",settings language [en|es]", example: ",settings language es", category: "CONFIG" },
      { name: "settings global", aliases: [], description: "Ver o cambiar la flag `global` del servidor.", usage: ",settings global [on|off]", example: ",settings global on", category: "CONFIG" },
      { name: "settings autonick", aliases: [], description: "Ver o cambiar la flag `autonick` (cambio automático de apodo).", usage: ",settings autonick [on|off]", example: ",settings autonick off", category: "CONFIG" },
      { name: "settings modlog", aliases: [], description: "Ver, cambiar o borrar el canal de registro de moderación. Usa `none` para borrarlo.", usage: ",settings modlog [#canal|none]", example: ",settings modlog #mod-log", category: "CONFIG" },
      { name: "settings labotlog", aliases: ["settings welcomelog"], description: "Ver, cambiar o borrar el canal de logs del bot (bienvenidas).", usage: ",settings labotlog [#canal|none]", example: ",settings labotlog #labot-logs", category: "CONFIG" },
      { name: "settings blacklist", aliases: [], description: "Ver, cambiar o borrar el canal de alertas de blacklist.", usage: ",settings blacklist [#canal|none]", example: ",settings blacklist #alerts", category: "CONFIG" },
      { name: "settings clubsview", aliases: [], description: "Ver, cambiar o borrar el canal de Clubs View.", usage: ",settings clubsview [#canal|none]", example: ",settings clubsview #clubs", category: "CONFIG" },
      { name: "settings cumplecanal", aliases: ["settings cumplechannel"], description: "Ver, cambiar o borrar el canal de cumpleaños.", usage: ",settings cumplecanal [#canal|none]", example: ",settings cumplecanal #cumples", category: "CONFIG" },
      { name: "settings muterole", aliases: [], description: "Ver, cambiar o borrar el rol de mute.", usage: ",settings muterole [@rol|none]", example: ",settings muterole @Muted", category: "CONFIG" },
      { name: "settings modrole", aliases: [], description: "Ver, cambiar o borrar el rol de moderador.", usage: ",settings modrole [@rol|none]", example: ",settings modrole @Mod", category: "CONFIG" },
      { name: "settings cumplerol", aliases: ["settings cumplerole"], description: "Ver, cambiar o borrar el rol de cumpleaños.", usage: ",settings cumplerol [@rol|none]", example: ",settings cumplerol @Cumple", category: "CONFIG" },
      { name: "settings eventsrole", aliases: ["settings eventsrol"], description: "Ver, cambiar o borrar el rol de eventos.", usage: ",settings eventsrole [@rol|none]", example: ",settings eventsrole @Eventos", category: "CONFIG" },
      { name: "settings whitelistrole", aliases: ["settings whitelistrol"], description: "Ver, cambiar o borrar el rol de whitelist.", usage: ",settings whitelistrole [@rol|none]", example: ",settings whitelistrole @WL", category: "CONFIG" },
      { name: "settings programador", aliases: ["settings progrole"], description: "Ver, cambiar o borrar el rol del Dpto. de Programación.", usage: ",settings programador [@rol|none]", example: ",settings programador @Prog", category: "CONFIG" },
      { name: "settings quiniela", aliases: [], description: "Ver, cambiar o borrar el rol de quiniela.", usage: ",settings quiniela [@rol|none]", example: ",settings quiniela @Quiniela", category: "CONFIG" },
      { name: "settings welcome", aliases: ["settings bienvenida"], description: "Muestra los roles de bienvenida configurados por clave.", usage: ",settings welcome", example: ",settings welcome", category: "INFO" },
      { name: "settings welcome set", aliases: ["settings welcome add"], description: "Asigna un rol de bienvenida a una clave.", usage: ",settings welcome set <clave> <@rol>", example: ",settings welcome set miembro @Miembro", category: "CONFIG" },
      { name: "settings welcome remove", aliases: [], description: "Elimina un rol de bienvenida por su clave.", usage: ",settings welcome remove <clave>", example: ",settings welcome remove miembro", category: "CONFIG" },
      { name: "settings sync", aliases: ["settings sincronizacion"], description: "Muestra los servidores sincronizados.", usage: ",settings sync", example: ",settings sync", category: "INFO" },
      { name: "settings sync add", aliases: [], description: "Añade un servidor a la lista de sincronización.", usage: ",settings sync add <guild_id>", example: ",settings sync add 724202847822151680", category: "CONFIG" },
      { name: "settings sync remove", aliases: [], description: "Quita un servidor de la lista de sincronización.", usage: ",settings sync remove <guild_id>", example: ",settings sync remove 724202847822151680", category: "CONFIG" },
    ]
  },
  "General": {
    icon: <ChatBubbleLeftEllipsisIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de uso general y entretenimiento",
    commands: [
      { name: "choose", aliases: [], description: "El bot elige aleatoriamente entre las opciones proporcionadas.", usage: ",choose <op1> <op2> ...", example: ",choose pizza sushi pasta", category: "DIVERSIÓN" },
      { name: "8ball", aliases: ["8"], description: "Hazle una pregunta a la bola mágica 8 y recibe una respuesta aleatoria.", usage: ",8ball <pregunta>", example: ",8ball ¿Aprobaré?", category: "DIVERSIÓN" },
      { name: "lmgtfy", aliases: [], description: "Genera un enlace de 'Let Me Google That For You' con la búsqueda indicada.", usage: ",lmgtfy <búsqueda>", example: ",lmgtfy brawl stars tips", category: "DIVERSIÓN" },
      { name: "flip", aliases: [], description: "Lanza una moneda (cara o cruz). Si se menciona un usuario, voltea su nombre.", usage: ",flip [usuario]", example: ",flip @user", category: "DIVERSIÓN" },
      { name: "urban", aliases: [], description: "Busca una palabra o expresión en el Urban Dictionary.", usage: ",urban <palabra>", example: ",urban bruh", category: "DIVERSIÓN" },
      { name: "cmdgang", aliases: [], description: "Asigna o quita el rol y apodo de la CMDGang al usuario que lo usa.", usage: ",cmdgang", example: ",cmdgang", category: "ROLES" },
      { name: "gif", aliases: [], description: "Busca y muestra un GIF de Giphy con las palabras clave indicadas.", usage: ",gif <palabras clave>", example: ",gif brawl stars win", category: "DIVERSIÓN" },
      { name: "rps", aliases: [], description: "Juega Piedra, Papel o Tijeras contra el bot.", usage: ",rps <rock|paper|scissors>", example: ",rps rock", category: "DIVERSIÓN" },
      { name: "roll", aliases: [], description: "Lanza un dado con el número máximo especificado (por defecto 100).", usage: ",roll [número]", example: ",roll 20", category: "DIVERSIÓN" },
      { name: "letra", aliases: [], description: "Busca la letra de una canción usando Genius.", usage: ",letra <canción>", example: ",letra Despacito", category: "DIVERSIÓN" },
      { name: "customcommands", aliases: ["cc"], description: "Lista todos los comandos personalizados del servidor.", usage: ",cc", example: ",cc", category: "GESTIÓN" },
      { name: "cc create", aliases: [], description: "Crea un nuevo comando personalizado con nombre y respuesta.", usage: ",cc create <nombre> <respuesta>", example: ",cc create hola ¡Hola a todos!", category: "GESTIÓN" },
      { name: "cc delete", aliases: [], description: "Elimina un comando personalizado existente.", usage: ",cc delete <nombre>", example: ",cc delete hola", category: "GESTIÓN" },
      { name: "tags", aliases: [], description: "Lista todas las etiquetas disponibles en el servidor.", usage: ",tags", example: ",tags", category: "GESTIÓN" },
      { name: "tag", aliases: [], description: "Muestra el contenido de una etiqueta por su nombre.", usage: ",tag <nombre>", example: ",tag normas", category: "INFO" },
      { name: "tags create", aliases: [], description: "Crea una nueva etiqueta con nombre y contenido.", usage: ",tags create <nombre> <contenido>", example: ",tags create normas Lee las normas del servidor", category: "GESTIÓN" },
      { name: "tags delete", aliases: [], description: "Elimina una etiqueta existente.", usage: ",tags delete <nombre>", example: ",tags delete normas", category: "GESTIÓN" },
    ]
  },
  "Herramientas": {
    icon: <WrenchScrewdriverIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de utilidad e información del servidor",
    commands: [
      { name: "members", aliases: [], description: "Lista todos los miembros del servidor que tienen un rol específico, con su IGN de BS y club si está guardado.", usage: ",members <rol>", example: ",members Moderador", category: "INFO" },
      { name: "miembros1", aliases: [], description: "Lista todos los miembros del servidor que solo tienen un rol (sin roles adicionales).", usage: ",miembros1", example: ",miembros1", category: "INFO" },
      { name: "members2", aliases: [], description: "Lista los miembros que tienen simultáneamente dos roles especificados.", usage: ",members2 <rol1> <rol2>", example: ",members2 Admin Moderador", category: "INFO" },
      { name: "membersadvanced", aliases: [], description: "Búsqueda avanzada de miembros con múltiples filtros de roles en pares clave-valor.", usage: ",membersadvanced <setting1> <value1> ...", example: ",membersadvanced has Moderador", category: "INFO" },
      { name: "membersall", aliases: [], description: "Muestra el conteo total de miembros del servidor incluyendo usuarios en línea.", usage: ",membersall", example: ",membersall", category: "INFO" },
      { name: "userinfo", aliases: ["ui"], description: "Muestra información detallada de un miembro: roles, fecha de entrada, cuenta creada, etc.", usage: ",userinfo [miembro]", example: ",ui @David", category: "INFO" },
      { name: "serverinfo", aliases: [], description: "Muestra información general del servidor. Con `true` muestra detalles adicionales.", usage: ",serverinfo [true]", example: ",serverinfo true", category: "INFO" },
      { name: "roleinfo", aliases: [], description: "Muestra información detallada de un rol: color, permisos, miembros que lo tienen.", usage: ",roleinfo <rol>", example: ",roleinfo Admin", category: "INFO" },
      { name: "info", aliases: [], description: "Muestra información técnica sobre el bot: versión, latencia, uso de memoria, líneas de código.", usage: ",info", example: ",info", category: "INFO" },
    ]
  },
  "LA Spain": {
    icon: <TrophyIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos específicos de la comunidad LA Spain",
    commands: [
      { name: "bumpslb", aliases: [], description: "Muestra la clasificación del servidor por número de bumps realizados.", usage: ",bumpslb", example: ",bumpslb", category: "RANKING" },
      { name: "starboardlb", aliases: [], description: "Muestra la clasificación del starboard por mensajes destacados.", usage: ",starboardlb", example: ",starboardlb", category: "RANKING" },
      { name: "pingww", aliases: ["werewolf"], description: "Menciona al rol de Werewolf para avisar de una partida.", usage: ",pingww", example: ",pingww", category: "UTILIDAD" },
      { name: "crole add", aliases: [], description: "Añade un rol existente a la lista de roles personalizables por usuarios. Solo admins.", usage: ",crole add <@rol>", example: ",crole add @MiRol", category: "ROLES" },
      { name: "crole list", aliases: [], description: "Lista todos los roles que están disponibles como personalizables.", usage: ",crole list", example: ",crole list", category: "ROLES" },
      { name: "crole remove", aliases: [], description: "Elimina un rol de la lista de personalizables usando su ID.", usage: ",crole remove <id_rol>", example: ",crole remove 123456789", category: "ROLES" },
      { name: "crole edit", aliases: [], description: "Edita el nombre, color o icono de tu rol personalizado. Opciones: `name`, `color` (hex), `icon` (emoji/URL).", usage: ",crole edit <name|color|icon> <valor>", example: ",crole edit color #ff5733", category: "ROLES" },
      { name: "quiniela", aliases: [], description: "Escribe tu predicción en el servidor y el bot la reenvía al canal correspondiente, te manda una copia por privado y borra tu mensaje para que nadie pueda copiar tus predicciones. Tipos: `bs`, `lol`, `fútbol`.", usage: ",quiniela <tipo> <mensaje>", example: ",quiniela bs Mi predicción de la semana", category: "EVENTOS" },
    ]
  },
  "Werewolf": {
    icon: <MoonIcon style={{ width: 18, height: 18 }} />,
    description: "Minijuego de Hombre Lobo en Discord",
    commands: [
      { name: "ww start", aliases: [], description: "Abre un lobby de Werewolf. Parámetros opcionales: mínimo de jugadores, tiempo de espera en segundos y visibilidad (`private`/`public`).", usage: ",ww start [min_jugadores] [tiempo] [private|public]", example: ",ww start 8 120 private", category: "PARTIDA" },
      { name: "ww forcestart", aliases: ["ww fs"], description: "Fuerza el inicio inmediato de la partida sin esperar el tiempo de lobby. Solo el creador puede usarlo.", usage: ",ww forcestart", example: ",ww fs", category: "PARTIDA" },
      { name: "ww join", aliases: [], description: "Únete al lobby de una partida de Werewolf en curso.", usage: ",ww join", example: ",ww join", category: "PARTIDA" },
      { name: "ww leave", aliases: [], description: "Sal del lobby antes de que empiece la partida.", usage: ",ww leave", example: ",ww leave", category: "PARTIDA" },
      { name: "ww stop", aliases: [], description: "Cancela la partida en curso. Solo el creador o un admin puede hacerlo.", usage: ",ww stop", example: ",ww stop", category: "PARTIDA" },
      { name: "ww players", aliases: [], description: "Muestra la lista de jugadores en el lobby o en la partida activa.", usage: ",ww players", example: ",ww players", category: "PARTIDA" },
      { name: "ww status", aliases: [], description: "Muestra el estado actual de la partida: fase, jugadores vivos, etc.", usage: ",ww status", example: ",ww status", category: "PARTIDA" },
      { name: "ww mention", aliases: [], description: "Menciona al rol de Werewolf con un mensaje personalizado. Cooldown global de 15 minutos.", usage: ",ww mention [mensaje]", example: ",ww mention ¡Partida en 5 minutos!", category: "UTILIDAD" },
      { name: "ww ping", aliases: [], description: "Muestra la latencia actual del bot.", usage: ",ww ping", example: ",ww ping", category: "UTILIDAD" },
      { name: "ww info", aliases: [], description: "Muestra las reglas básicas del juego y cómo jugar.", usage: ",ww info", example: ",ww info", category: "INFO" },
      { name: "ww roles", aliases: [], description: "Lista todos los roles disponibles en el juego por bando (aldeanos, lobos, neutros).", usage: ",ww roles", example: ",ww roles", category: "INFO" },
      { name: "ww role", aliases: [], description: "Muestra los detalles y habilidad de un rol concreto.", usage: ",ww role <nombre_rol>", example: ",ww role Vidente", category: "INFO" },
      { name: "ww stats", aliases: [], description: "Muestra las estadísticas de Werewolf de un usuario: partidas jugadas, victorias, rol más jugado, etc.", usage: ",ww stats [usuario]", example: ",ww stats @David", category: "INFO" },
      { name: "ww logros", aliases: ["ww achievements", "ww logro"], description: "Muestra cómo conseguir cada rol de logro desbloqueables.", usage: ",ww logros", example: ",ww logros", category: "INFO" },
      { name: "ww wr", aliases: [], description: "Muestra los win rates globales por bando basados en todas las partidas registradas.", usage: ",ww wr", example: ",ww wr", category: "INFO" },
      { name: "ww presets", aliases: [], description: "Muestra el enlace a los presets disponibles y sus probabilidades de rol.", usage: ",ww presets", example: ",ww presets", category: "INFO" },
      { name: "ww help", aliases: [], description: "Muestra todos los comandos disponibles de Werewolf.", usage: ",ww help", example: ",ww help", category: "INFO" },
      { name: "ww changelog", aliases: ["ww update", "ww patch", "ww cambios"], description: "Envía el changelog de la última actualización. Con enlace opcional. Solo admins.", usage: ",ww changelog [enlace]", example: ",ww changelog https://...", category: "ADMIN" },
      { name: "ww fixperms", aliases: ["ww fix", "ww unmuteall", "ww clearperms"], description: "Limpia permisos de canal de jugadores bloqueados por error tras una partida. Solo admins.", usage: ",ww fixperms", example: ",ww fixperms", category: "ADMIN" },
      { name: "ww sync_slash", aliases: [], description: "Sincroniza los slash commands manualmente. Solo owners.", usage: ",ww sync_slash", example: ",ww sync_slash", category: "ADMIN" },
      { name: "ww bl list", aliases: [], description: "Lista todos los usuarios en la blacklist de Werewolf.", usage: ",ww bl list", example: ",ww bl list", category: "ADMIN" },
      { name: "ww bl add", aliases: ["ww bl añadir", "ww bl ban"], description: "Añade un usuario a la blacklist de Werewolf con motivo.", usage: ",ww bl add <@usuario> [motivo]", example: ",ww bl add @user Hacer trampa", category: "ADMIN" },
      { name: "ww bl remove", aliases: ["ww bl quitar", "ww bl unban", "ww bl rm"], description: "Elimina un usuario de la blacklist de Werewolf.", usage: ",ww bl remove <@usuario>", example: ",ww bl remove @user", category: "ADMIN" },
      { name: "ww report", aliases: [], description: "Reporta a un usuario por mal comportamiento durante la partida.", usage: ",ww report <@usuario> [motivo]", example: ",ww report @user Insultos en canal de juego", category: "UTILIDAD" },
      { name: "ww invite", aliases: [], description: "Genera el enlace de invitación del bot de Werewolf. Solo owners.", usage: ",ww invite", example: ",ww invite", category: "ADMIN" },
      { name: "ww bug", aliases: [], description: "Reporta un bug del juego al equipo de desarrollo.", usage: ",ww bug <descripción>", example: ",ww bug El vidente no pudo ver un rol", category: "UTILIDAD" },
      { name: "ww suggestion", aliases: ["ww suggest", "ww sugerencia"], description: "Envía una sugerencia para mejorar el juego.", usage: ",ww suggestion <texto>", example: ",ww suggestion Añadir el rol de Bruja", category: "UTILIDAD" },
    ]
  },
  "Clash Royale": {
    icon: <CommandLineIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de Clash Royale",
    commands: [
      { name: "crsave", aliases: [], description: "Guarda tu tag de Clash Royale vinculándolo a tu cuenta de Discord. Un admin puede guardarlo para otro usuario.", usage: ",crsave <tag> [usuario]", example: ",crsave #2YQPLC", category: "CUENTA" },
      { name: "crunsave", aliases: [], description: "Elimina el tag de Clash Royale guardado de un usuario. Solo admins.", usage: ",crunsave <@usuario>", example: ",crunsave @user", category: "ADMIN" },
      { name: "crprofile", aliases: ["crp"], description: "Muestra el perfil de Clash Royale de un jugador con sus estadísticas y cartas.", usage: ",crprofile [usuario]", example: ",crp @David", category: "INFO" },
      { name: "renamecr", aliases: ["rcr"], description: "Cambia el apodo de un miembro a su nombre de Clash Royale. Con `true` añade también el nombre del clan.", usage: ",renamecr [usuario] [clan]", example: ",rcr @David true", category: "UTILIDAD" },
    ]
  },
  "Blacklist": {
    icon: <NoSymbolIcon style={{ width: 18, height: 18 }} />,
    description: "Gestión de la lista negra de jugadores de Brawl Stars",
    commands: [
      { name: "blacklist", aliases: ["bl"], description: "Muestra la lista negra del servidor con los jugadores vetados y sus motivos.", usage: ",blacklist", example: ",bl", category: "INFO" },
      { name: "blacklist add", aliases: ["bl add"], description: "Añade un jugador a la lista negra del servidor con su tag y motivo. Solo admins.", usage: ",bl add <tag> <motivo>", example: ",bl add #2YGR Comportamiento tóxico", category: "ADMIN" },
      { name: "blacklist remove", aliases: ["bl remove"], description: "Elimina un jugador de la lista negra del servidor. Solo admins.", usage: ",bl remove <tag>", example: ",bl remove #2YGR", category: "ADMIN" },
      { name: "blacklist check", aliases: ["bl check"], description: "Comprueba si un jugador está en la lista negra global, mostrando en qué servidores aparece vetado y el motivo de cada uno.", usage: ",bl check <tag>", example: ",bl check #2YGR", category: "INFO" },
      { name: "blacklist setchannel", aliases: [], description: "Establece el canal donde se enviarán las notificaciones cuando alguien en la blacklist se una a un club del servidor. Solo admins.", usage: ",bl setchannel #canal", example: ",bl setchannel #blacklist-alerts", category: "CONFIG" },
    ]
  },
  "Whitelist": {
    icon: <CheckCircleIcon style={{ width: 18, height: 18 }} />,
    description: "Gestión de la whitelist de jugadores",
    commands: [
      { name: "whitelist", aliases: [], description: "Muestra los miembros de la whitelist con sus clubes y datos de Brawl Stars.", usage: ",whitelist", example: ",whitelist", category: "INFO" },
      { name: "whitelist stats", aliases: [], description: "Estadísticas generales de la whitelist del servidor.", usage: ",whitelist stats", example: ",whitelist stats", category: "INFO" },
      { name: "whitelist club", aliases: [], description: "Muestra los miembros de la whitelist que pertenecen a un club específico.", usage: ",whitelist club <tag>", example: ",whitelist club #2YGR", category: "INFO" },
      { name: "whitelist setrole", aliases: [], description: "Configura el rol de Discord que se asigna a los miembros de la whitelist. Solo admins.", usage: ",whitelist setrole <@rol>", example: ",whitelist setrole @Whitelist", category: "CONFIG" },
    ]
  },
  "Club Logs": {
    icon: <ClipboardDocumentListIcon style={{ width: 18, height: 18 }} />,
    description: "Registro automático de cambios en los clubes de Brawl Stars",
    commands: [
      { name: "clublogs", aliases: ["cl"], description: "Muestra la configuración actual del sistema de logs de clubes en el servidor.", usage: ",clublogs", example: ",cl", category: "INFO" },
      { name: "clublogs add", aliases: [], description: "Activa el registro de cambios para un club en un canal específico mediante un webhook. Solo admins.", usage: ",clublogs add <key> <#canal>", example: ",clublogs add la7 #logs-la7", category: "ADMIN" },
      { name: "clublogs remove", aliases: [], description: "Desactiva el registro de cambios para un club y elimina su webhook. Solo admins.", usage: ",clublogs remove <key>", example: ",clublogs remove la7", category: "ADMIN" },
      { name: "clublogs editch", aliases: [], description: "Cambia el canal donde se envían los logs de un club. Solo admins.", usage: ",clublogs editch <key> <#canal>", example: ",clublogs editch la7 #nuevo-canal", category: "ADMIN" },
      { name: "clublogs min", aliases: [], description: "Establece los trofeos mínimos para que un cambio de miembro se registre en los logs.", usage: ",clublogs min [mínimo] [key]", example: ",clublogs min 500 la7", category: "ADMIN" },
      { name: "clublogs alert", aliases: [], description: "Activa o desactiva las alertas especiales en los logs de un club.", usage: ",clublogs alert [key]", example: ",clublogs alert la7", category: "ADMIN" },
    ]
  },
  "Clubs View": {
    icon: <RectangleGroupIcon style={{ width: 18, height: 18 }} />,
    description: "Vista dinámica y actualizada de los clubes del servidor",
    commands: [
      { name: "clubsview", aliases: [], description: "Genera un embed dinámico en el canal actual que se actualiza automáticamente con los datos de todos los clubes del servidor. Solo admins.", usage: ",clubsview", example: ",clubsview", category: "ADMIN" },
    ]
  },
  "Mascotas": {
    icon: <HeartIcon style={{ width: 18, height: 18 }} />,
    description: "Sistema de mascotas virtuales con tu pareja",
    commands: [
      { name: "pet help", aliases: [], description: "Muestra el menú de ayuda del sistema de mascotas con todos los comandos disponibles.", usage: ",pet help", example: ",pet help", category: "INFO" },
      { name: "pet adopt", aliases: [], description: "Adopta una mascota junto a otra persona. Máximo 5 mascotas por usuario. Animales disponibles: Gato, Perro, Conejo, etc.", usage: ",pet adopt <@usuario> <animal> <nombre>", example: ",pet adopt @Pareja Gato Mishi", category: "JUEGO" },
      { name: "pet list", aliases: [], description: "Muestra todas las mascotas que tienes adoptadas con su estado actual.", usage: ",pet list", example: ",pet list", category: "INFO" },
      { name: "pet stats", aliases: [], description: "Muestra las estadísticas detalladas de tu mascota: hambre, energía, felicidad, etc.", usage: ",pet stats", example: ",pet stats", category: "INFO" },
      { name: "pet feed", aliases: [], description: "Alimenta a tu mascota para subir su nivel de hambre.", usage: ",pet feed", example: ",pet feed", category: "ACCIÓN" },
      { name: "pet sleep", aliases: [], description: "Acuesta a tu mascota a dormir para recuperar su energía.", usage: ",pet sleep", example: ",pet sleep", category: "ACCIÓN" },
      { name: "pet play", aliases: [], description: "Juega con tu mascota para aumentar su felicidad.", usage: ",pet play", example: ",pet play", category: "ACCIÓN" },
      { name: "pet rename", aliases: [], description: "Cambia el nombre de tu mascota por uno nuevo.", usage: ",pet rename <nuevo_nombre>", example: ",pet rename Firulais", category: "ACCIÓN" },
      { name: "pet delete", aliases: [], description: "Elimina una mascota. Requiere confirmación de ambos dueños.", usage: ",pet delete", example: ",pet delete", category: "ACCIÓN" },
    ]
  },
  "Battleship": {
    icon: <PaperAirplaneIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Hundir la Flota en Discord",
    commands: [
      { name: "battleship", aliases: [], description: "Inicia una partida de Hundir la Flota contra otro jugador o la IA con un tablero interactivo.", usage: ",battleship", example: ",battleship", category: "JUEGO" },
      { name: "battleshipstop", aliases: [], description: "Detiene la partida de Battleship en curso en el canal actual. Solo staff.", usage: ",battleshipstop", example: ",battleshipstop", category: "ADMIN" },
      { name: "battleshipboard", aliases: [], description: "Muestra tu tablero actual de una partida en curso pasando el ID del canal de la partida.", usage: ",battleshipboard <canal_id>", example: ",battleshipboard 123456789", category: "JUEGO" },
      { name: "battleshipset extra", aliases: [], description: "Activa o desactiva el modo barco extra en las partidas.", usage: ",battleshipset extra [true|false]", example: ",battleshipset extra true", category: "CONFIG" },
      { name: "battleshipset mention", aliases: [], description: "Activa o desactiva las menciones al iniciar una partida.", usage: ",battleshipset mention [true|false]", example: ",battleshipset mention false", category: "CONFIG" },
      { name: "battleshipset imgboard", aliases: [], description: "Activa o desactiva el tablero en formato imagen en lugar de emojis.", usage: ",battleshipset imgboard [true|false]", example: ",battleshipset imgboard true", category: "CONFIG" },
    ]
  },
  "Monopoly": {
    icon: <CurrencyDollarIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Monopoly para 2-8 jugadores",
    commands: [
      { name: "monopoly", aliases: [], description: "Inicia una partida de Monopoly de 2 a 8 jugadores. Se puede pasar un archivo guardado para continuar una partida anterior.", usage: ",monopoly [savefile]", example: ",monopoly", category: "JUEGO" },
      { name: "monopoly list", aliases: [], description: "Lista las partidas guardadas disponibles para continuar.", usage: ",monopoly list", example: ",monopoly list", category: "INFO" },
      { name: "monopoly delete", aliases: [], description: "Elimina uno o varios archivos de partidas guardadas.", usage: ",monopoly delete <savefile> [...]", example: ",monopoly delete partida1", category: "GESTIÓN" },
      { name: "monopolyconvert", aliases: [], description: "Convierte un savefile del formato antiguo al nuevo formato compatible con la versión actual del cog.", usage: ",monopolyconvert <savefile>", example: ",monopolyconvert partida_vieja", category: "UTILIDAD" },
      { name: "monopolyconvert list", aliases: [], description: "Lista los archivos `.txt` de partidas antiguas que pueden ser convertidos.", usage: ",monopolyconvert list", example: ",monopolyconvert list", category: "UTILIDAD" },
      { name: "monopolystop", aliases: [], description: "Detiene la partida de Monopoly en curso. Solo admins.", usage: ",monopolystop", example: ",monopolystop", category: "ADMIN" },
    ]
  },
  "Ahorcado": {
    icon: <FaceFrownIcon style={{ width: 18, height: 18 }} />,
    description: "Juego del ahorcado con ranking y estadísticas",
    commands: [
      { name: "ahorcado", aliases: [], description: "Inicia una partida del ahorcado. Adivina la palabra letra a letra antes de quedarte sin intentos.", usage: ",ahorcado", example: ",ahorcado", category: "JUEGO" },
      { name: "ahorcado lb", aliases: [], description: "Muestra la clasificación del servidor en el ahorcado.", usage: ",ahorcado lb", example: ",ahorcado lb", category: "RANKING" },
      { name: "ahorcadostats", aliases: [], description: "Muestra las estadísticas del ahorcado de un usuario: partidas, victorias, racha, etc.", usage: ",ahorcadostats [usuario]", example: ",ahorcadostats @David", category: "INFO" },
    ]
  },
  "Snake": {
    icon: <PlayIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de la serpiente en Discord",
    commands: [
      { name: "snake", aliases: [], description: "Juega al juego de la serpiente con botones interactivos de dirección.", usage: ",snake", example: ",snake", category: "JUEGO" },
    ]
  },
  "Wordle": {
    icon: <PuzzlePieceIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Wordle en Discord con varios modos",
    commands: [
      { name: "wordle", aliases: ["w"], description: "Inicia una partida de Wordle clásico. Adivina la palabra de 5 letras en 6 intentos.", usage: ",wordle", example: ",wordle", category: "JUEGO" },
      { name: "wordle doble", aliases: ["wordle double", "wordle d"], description: "Inicia una partida de Wordle doble: adivina dos palabras simultáneamente.", usage: ",wordle doble", example: ",wordle doble", category: "JUEGO" },
      { name: "wordle triple", aliases: ["wordle t"], description: "Inicia una partida de Wordle triple: adivina tres palabras a la vez.", usage: ",wordle triple", example: ",wordle triple", category: "JUEGO" },
      { name: "wordle escalera", aliases: ["wordle e", "wordle ladder"], description: "Modo escalera: cada palabra adivinada añade una letra más a la siguiente.", usage: ",wordle escalera", example: ",wordle escalera", category: "JUEGO" },
      { name: "wordle tip", aliases: [], description: "Muestra una pista para la partida de Wordle en curso.", usage: ",wordle tip", example: ",wordle tip", category: "JUEGO" },
      { name: "wordle normas", aliases: [], description: "Muestra las reglas del Wordle y cómo se interpretan los colores.", usage: ",wordle normas", example: ",wordle normas", category: "INFO" },
      { name: "wordle lb", aliases: [], description: "Muestra la clasificación del servidor en Wordle por puntos o modo de juego.", usage: ",wordle lb [categoría] [modo]", example: ",wordle lb points", category: "RANKING" },
      { name: "wordle stats", aliases: [], description: "Muestra las estadísticas de Wordle de un usuario: distribución de intentos, racha, etc.", usage: ",wordle stats [modo] [usuario]", example: ",wordle stats @David", category: "INFO" },
      { name: "wordle recompensa", aliases: [], description: "Otorga la recompensa de Wordle a un usuario. Solo admins.", usage: ",wordle recompensa <usuario>", example: ",wordle recompensa @David", category: "ADMIN" },
      { name: "wordle done", aliases: [], description: "Marca la recompensa de Wordle como entregada a un usuario. Solo admins.", usage: ",wordle done <usuario>", example: ",wordle done @David", category: "ADMIN" },
      { name: "wordle xd", aliases: [], description: "Muestra la lista paginada de palabras de la Wordle XD (palabras especiales registradas por la comunidad).", usage: ",wordle xd [página]", example: ",wordle xd 2", category: "INFO" },
      { name: "wordle xd add", aliases: [], description: "Añade una palabra a la lista Wordle XD con un enlace de referencia.", usage: ",wordle xd add <palabra> <enlace> [usuario]", example: ",wordle xd add BRAWL https://...", category: "GESTIÓN" },
      { name: "wordle xd delete", aliases: [], description: "Elimina una palabra de la lista Wordle XD.", usage: ",wordle xd delete <palabra>", example: ",wordle xd delete BRAWL", category: "GESTIÓN" },
    ]
  },
  "Party Games": {
    icon: <GiftIcon style={{ width: 18, height: 18 }} />,
    description: "Juegos en grupo de palabras para divertirse",
    commands: [
      { name: "partygames", aliases: ["pg"], description: "Muestra el menú de Party Games con los modos disponibles.", usage: ",pg", example: ",pg", category: "JUEGO" },
      { name: "partygames bombparty", aliases: [], description: "Juego de Bomb Party: tienes que escribir una palabra que contenga las letras dadas antes de que explote la bomba. HP configurable.", usage: ",pg bombparty [hp]", example: ",pg bombparty 3", category: "JUEGO" },
      { name: "partygames fast", aliases: [], description: "Escribe la palabra más rápido que los demás para ganar puntos. Primero en llegar al máximo gana.", usage: ",pg fast [puntos_máx]", example: ",pg fast 5", category: "JUEGO" },
      { name: "partygames long", aliases: [], description: "Gana puntos escribiendo la palabra más larga posible con las letras dadas.", usage: ",pg long [puntos_máx]", example: ",pg long 5", category: "JUEGO" },
      { name: "partygames most", aliases: [], description: "Gana puntos escribiendo el mayor número de palabras válidas en el tiempo dado.", usage: ",pg most [puntos_máx]", example: ",pg most 5", category: "JUEGO" },
      { name: "partygames mix", aliases: [], description: "Modo mixto que combina aleatoriamente los distintos modos de Party Games.", usage: ",pg mix [puntos_máx]", example: ",pg mix 5", category: "JUEGO" },
    ]
  },
  "Trivial": {
    icon: <QuestionMarkCircleIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de preguntas trivia personalizado",
    commands: [
      { name: "trivial", aliases: [], description: "Inicia una partida de trivia con el pack de preguntas indicado.", usage: ",trivial <nombre_pack>", example: ",trivial brawlstars", category: "JUEGO" },
      { name: "trivial list", aliases: [], description: "Lista todos los packs de preguntas de trivia disponibles.", usage: ",trivial list", example: ",trivial list", category: "INFO" },
      { name: "trivial stop", aliases: [], description: "Detiene la partida de trivial en curso. Solo admins.", usage: ",trivial stop", example: ",trivial stop", category: "ADMIN" },
      { name: "trivial lb", aliases: [], description: "Muestra la clasificación del servidor en trivial.", usage: ",trivial lb", example: ",trivial lb", category: "RANKING" },
      { name: "trivial load", aliases: [], description: "Carga o actualiza los packs de preguntas desde los archivos de datos. Solo admins.", usage: ",trivial load", example: ",trivial load", category: "ADMIN" },
      { name: "trivial delete", aliases: [], description: "Elimina uno o varios packs de preguntas de trivia. Solo admins.", usage: ",trivial delete <nombre> [...]", example: ",trivial delete brawlstars", category: "ADMIN" },
    ]
  },
  "Lotería": {
    icon: <TicketIcon style={{ width: 18, height: 18 }} />,
    description: "Sorteos temporizados con rotación automática: gana quien acierte el número exacto o, al cerrar, quien más se acerque",
    commands: [
      { name: "loteria", aliases: [], description: "Muestra el estado del sorteo activo (rango, fecha de fin, intentos, participantes) y genera un Excel con los números intentados.", usage: ",loteria", example: ",loteria", category: "INFO" },
      { name: "loteria lb", aliases: ["loteria leaderboard", "loteria top"], description: "Clasificación de los 10 usuarios que más loterías han ganado, con formato posición → usuario (victorias). El footer muestra tus victorias y tu posición.", usage: ",loteria lb", example: ",loteria lb", category: "RANKING" },
      { name: "loteria crear", aliases: ["loteria iniciar", "loteria start"], description: "Crea una lotería en el canal indicado (se juega ahí, no donde ejecutas el comando) e inicia la rotación automática. Premio: un rol. intentos 0 = ilimitados; cooldown admite 30m/2h (0 = sin cooldown). Admins o Dpto. de Programación.", usage: ",loteria crear <#canal> <min> <max> <horas> <intentos> <cooldown> <@rol>", example: ",loteria crear #loteria 1 1000 168 5 30m @Premios", category: "ADMIN" },
      { name: "loteria finalizar", aliases: ["loteria finish", "loteria sortear"], description: "Detiene la rotación y cierra ya el sorteo, dando por ganador al más cercano actual. Admins o Dpto. de Programación.", usage: ",loteria finalizar", example: ",loteria finalizar", category: "ADMIN" },
      { name: "loteria detener", aliases: ["loteria parar", "loteria stop"], description: "Detiene solo la rotación; el sorteo actual sigue hasta su fin y al cerrarse no arranca otro (se bloquea el canal). Admins o Dpto. de Programación.", usage: ",loteria detener", example: ",loteria detener", category: "ADMIN" },
    ]
  },
  "Mario Party": {
    icon: <StarIcon style={{ width: 18, height: 18 }} />,
    description: "Minijuego de Mario Party en Discord",
    commands: [
      { name: "party", aliases: [], description: "Inicia una partida de Mario Party. Se puede especificar el número de rondas. Usa `stop` para detenerla.", usage: ",party [rondas]", example: ",party 5", category: "JUEGO" },
    ]
  },
  "Eventos": {
    icon: <SparklesIcon style={{ width: 18, height: 18 }} />,
    description: "Eventos especiales y sistema de recolección de recompensas",
    commands: [
      { name: "start_candies", aliases: [], description: "Inicia un evento de recolección de items (ej: caramelos). Parámetros: tema visual, canal, mínimo de mensajes, mínimo de interacciones y máximo de participantes opcional. Solo admins.", usage: ",start_candies <tema> <#canal> <min_msg> <min_inter> [max]", example: ",start_candies halloween #general 10 5 50", category: "ADMIN" },
      { name: "eventlb", aliases: [], description: "Muestra la clasificación del evento activo o las estadísticas de un usuario concreto.", usage: ",eventlb [usuario]", example: ",eventlb @David", category: "RANKING" },
      { name: "claim", aliases: [], description: "Reclama tu recompensa del evento activo si cumples los requisitos.", usage: ",claim", example: ",claim", category: "JUEGO" },
      { name: "candies_status", aliases: [], description: "Muestra el estado del evento activo: tema, canal, requisitos y participantes. Solo admins.", usage: ",candies_status", example: ",candies_status", category: "ADMIN" },
      { name: "drop", aliases: [], description: "Fuerza la aparición de un objeto del evento en el canal configurado. Solo owners del bot.", usage: ",drop", example: ",drop", category: "OWNER" },
      { name: "elegir", aliases: [], description: "Elige al azar un ganador entre los participantes que tienen puntos en el evento. Solo owners del bot.", usage: ",elegir", example: ",elegir", category: "OWNER" },
      { name: "forzar_eliminar", aliases: [], description: "Elimina por completo el evento de caramelos de la base de datos. Solo owners del bot.", usage: ",forzar_eliminar", example: ",forzar_eliminar", category: "OWNER" },
    ]
  },
  "Memes": {
    icon: <FaceSmileIcon style={{ width: 18, height: 18 }} />,
    description: "Concurso de memes con votaciones",
    commands: [
      { name: "start_event", aliases: ["start"], description: "Inicia un concurso de memes en el servidor. Solo coordinadores.", usage: ",start_event", example: ",start_event", category: "ADMIN" },
      { name: "top", aliases: [], description: "Muestra el ranking del concurso de memes activo con los más votados.", usage: ",top", example: ",top", category: "RANKING" },
      { name: "me", aliases: [], description: "Muestra tus votos recibidos y puntos acumulados en el concurso actual.", usage: ",me [usuario]", example: ",me @user", category: "INFO" },
      { name: "edit votos", aliases: [], description: "Edita manualmente el número de votos de un participante en el concurso. Solo Departamento Eventos.", usage: ",edit votos <@usuario> <cantidad>", example: ",edit votos @user 5", category: "ADMIN" },
      { name: "edit puntos", aliases: [], description: "Edita manualmente los puntos de un mensaje en el concurso por su ID. Solo Departamento Eventos.", usage: ",edit puntos <id_mensaje> <cantidad>", example: ",edit puntos 123456789 10", category: "ADMIN" },
    ]
  },
  "Welcome": {
    icon: <HandRaisedIcon style={{ width: 18, height: 18 }} />,
    description: "Configuración roles automáticos",
    commands: [
      { name: "welcome", aliases: ["wlc"], description: "Muestra la configuración actual del sistema de roles automáticos.", usage: ",welcome", example: ",welcome", category: "CONFIG" },
      { name: "welcome nick", aliases: ["wlc nick"], description: "Activa o desactiva el cambio automático de apodo al unirse un nuevo miembro.", usage: ",welcome nick", example: ",wlc nick", category: "CONFIG" },
      { name: "welcome setchannel", aliases: ["wlc setchannel"], description: "Configura el canal donde se enviarán los logs de welcome.", usage: ",welcome setchannel <#canal>", example: ",wlc setchannel #labot-logs", category: "CONFIG" },
      { name: "welcome setrole", aliases: ["wlc setrole"], description: "Configura los roles automáticos de bienvenida por clave.", usage: ",welcome setrole <key> <@rol>", example: ",wlc setrole miembro @Miembro", category: "CONFIG" },
      { name: "update", aliases: [], description: "Actualiza manualmente los roles de un usuario sin esperar a la sincronización automática.", usage: ",update [usuario]", example: ",update @David", category: "UTILIDAD" },
    ]
  },
  "Cumpleaños": {
    icon: <CakeIcon style={{ width: 18, height: 18 }} />,
    description: "Sistema de cumpleaños del servidor",
    commands: [
      { name: "cumpleaños", aliases: ["cumple", "bday"], description: "Gestiona tu cumpleaños. Sin subcomando muestra tus datos actuales.", usage: ",cumple", example: ",cumple", category: "UTILIDAD" },
      { name: "cumpleaños guardar", aliases: [], description: "Guarda o actualiza tu fecha de cumpleaños. Un admin puede guardarlo para otro usuario. Formato: YYYY-MM-DD.", usage: ",cumple guardar <fecha> [usuario]", example: ",cumple guardar 2000-05-15", category: "UTILIDAD" },
      { name: "cumpleaños eliminar", aliases: [], description: "Elimina tu fecha de cumpleaños guardada.", usage: ",cumple eliminar", example: ",cumple eliminar", category: "UTILIDAD" },
    ]
  },
  "Reseñas": {
    icon: <StarIcon style={{ width: 18, height: 18 }} />,
    description: "Publica y consulta reseñas del bot que se muestran en la web",
    commands: [
      { name: "review", aliases: [], description: "Publica o actualiza tu reseña del bot con una puntuación de 1 a 5 estrellas y un mensaje. Aparecerá en la web.", usage: ",review <estrellas 1-5> <mensaje>", example: ",review 5 ¡Un bot increíble!", category: "RESEÑA" },
      { name: "myreview", aliases: [], description: "Muestra tu reseña o la de otro usuario mencionado.", usage: ",myreview [usuario]", example: ",myreview @David", category: "INFO" },
      { name: "reviewsinfo", aliases: [], description: "Muestra la puntuación media y el número total de reseñas.", usage: ",reviewsinfo", example: ",reviewsinfo", category: "INFO" },
      { name: "reviewslist", aliases: [], description: "Lista todas las reseñas publicadas mostrando usuario y estrellas.", usage: ",reviewslist", example: ",reviewslist", category: "INFO" },
    ]
  },
  "Poker": {
    icon: <CurrencyDollarIcon style={{ width: 18, height: 18 }} />,
    description: "Mesas de Poker del casino del servidor con fichas, perfiles y ranking",
    commands: [
      { name: "poker create", aliases: ["pk create"], description: "Crea una nueva sala de Poker en el canal actual.", usage: ",poker create", example: ",poker create", category: "JUEGO" },
      { name: "poker join", aliases: [], description: "Únete a la partida aportando fichas de tu cuenta.", usage: ",poker join <fichas>", example: ",poker join 500", category: "JUEGO" },
      { name: "poker leave", aliases: [], description: "Abandona la partida; el abandono se procesa al final de la ronda.", usage: ",poker leave", example: ",poker leave", category: "JUEGO" },
      { name: "poker cards", aliases: [], description: "Consulta tu mano y las cartas comunitarias en privado.", usage: ",poker cards", example: ",poker cards", category: "JUEGO" },
      { name: "poker status", aliases: [], description: "Muestra los jugadores activos de la partida y sus fichas.", usage: ",poker status", example: ",poker status", category: "INFO" },
      { name: "poker profile", aliases: [], description: "Estadísticas de un jugador: victorias, XP y mejor mano.", usage: ",poker profile [usuario]", example: ",poker profile @David", category: "INFO" },
      { name: "poker clasificacion", aliases: ["lb"], description: "Muestra el Top 10 del casino por riqueza y victorias.", usage: ",poker clasificacion", example: ",poker lb", category: "RANKING" },
      { name: "poker rescate", aliases: [], description: "Reclama fichas de emergencia si estás en la quiebra.", usage: ",poker rescate", example: ",poker rescate", category: "JUEGO" },
      { name: "poker info", aliases: [], description: "Muestra la guía de comandos del poker.", usage: ",poker info", example: ",poker info", category: "INFO" },
    ]
  },
  "Patata Caliente": {
    icon: <PlayIcon style={{ width: 18, height: 18 }} />,
    description: "Minijuego automático de la patata caliente",
    commands: [
      { name: "patata", aliases: [], description: "Juego automático (no es un comando con prefijo): escribe «patata» en el canal del juego para activarlo. Quien tenga la patata debe pasarla mencionando a otro participante antes de que se agote el tiempo; si te explota en las manos, te banean.", usage: "Escribe «patata» en el canal del juego", example: "patata", category: "JUEGO" },
    ]
  },
  "Control de acceso": {
    icon: <ShieldCheckIcon style={{ width: 18, height: 18 }} />,
    description: "Restringe el bot a una lista de servidores; fuera de ella solo funcionan los cogs permitidos. Solo owners/developers del bot",
    commands: [
      { name: "access", aliases: ["acceso"], description: "Muestra el estado del control de acceso: servidores permitidos, cogs permitidos fuera y si el gating está activo.", usage: ",access", example: ",access", category: "OWNER" },
      { name: "access server", aliases: ["access servers"], description: "Lista los servidores con acceso total al bot.", usage: ",access server", example: ",access server", category: "OWNER" },
      { name: "access server add", aliases: [], description: "Añade un servidor a la lista de permitidos (acceso total). Solo owners/developers.", usage: ",access server add <guild_id>", example: ",access server add 460550486257565697", category: "OWNER" },
      { name: "access server remove", aliases: [], description: "Quita un servidor de la lista de permitidos. Solo owners/developers.", usage: ",access server remove <guild_id>", example: ",access server remove 460550486257565697", category: "OWNER" },
      { name: "access cog", aliases: ["access cogs"], description: "Lista los cogs permitidos en los servidores de fuera (y los disponibles).", usage: ",access cog", example: ",access cog", category: "OWNER" },
      { name: "access cog add", aliases: [], description: "Permite uno o varios cogs en los servidores de fuera de la lista. Solo owners/developers.", usage: ",access cog add <cog> [...]", example: ",access cog add poker snake", category: "OWNER" },
      { name: "access cog remove", aliases: [], description: "Quita uno o varios cogs de los permitidos en los servidores de fuera. Solo owners/developers.", usage: ",access cog remove <cog> [...]", example: ",access cog remove poker", category: "OWNER" },
    ]
  },
};

export default commandsData;