import { 
  SparklesIcon, ShieldCheckIcon, ChatBubbleLeftEllipsisIcon, 
  WrenchScrewdriverIcon, TrophyIcon, MoonIcon, 
  CommandLineIcon, NoSymbolIcon, CheckCircleIcon, 
  HeartIcon, PaperAirplaneIcon, CurrencyDollarIcon, 
  FaceFrownIcon, PlayIcon, PuzzlePieceIcon, 
  GiftIcon, QuestionMarkCircleIcon, TicketIcon, 
  FaceSmileIcon, HandRaisedIcon, CakeIcon 
} from '@heroicons/react/24/solid';

const commandsData = {
  "Brawl Stars": {
    icon: <SparklesIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos relacionados con Brawl Stars",
    commands: [
      { name: "save", aliases: ["bssave"], description: "Guarda tu tag de Brawl Stars vinculándolo a tu cuenta de Discord.", usage: ",save <tag>", example: ",save 8GRCQK", category: "CUENTA" },
      { name: "savealt", aliases: [], description: "Guarda el tag de tu cuenta alternativa de Brawl Stars.", usage: ",savealt <tag>", example: ",savealt 9PQLR2", category: "CUENTA" },
      { name: "unsave", aliases: ["bsunsave"], description: "Elimina el tag guardado de un usuario. Solo admins.", usage: ",unsave <@usuario>", example: ",unsave @David", category: "ADMIN" },
      { name: "profile", aliases: ["p", "bsp"], description: "Muestra las estadísticas de Brawl Stars de un jugador.", usage: ",profile [usuario]", example: ",p @David", category: "INFO" },
      { name: "alt", aliases: [], description: "Muestra las estadísticas de la cuenta alternativa de un jugador.", usage: ",alt [usuario]", example: ",alt @David", category: "INFO" },
      { name: "renamebs", aliases: ["rbs"], description: "Cambia el apodo de un miembro a su nombre de Brawl Stars.", usage: ",renamebs [usuario] [club_name]", example: ",rbs @David true", category: "UTILIDAD" },
      { name: "brawler", aliases: ["br"], description: "Muestra información específica de un brawler de un jugador.", usage: ",brawler <nombre> [usuario]", example: ",br Shelly @David", category: "INFO" },
      { name: "brawlers", aliases: ["b"], description: "Muestra la lista completa de brawlers de un jugador.", usage: ",brawlers [usuario]", example: ",b @David", category: "INFO" },
      { name: "map", aliases: ["m"], description: "Muestra información sobre un mapa específico.", usage: ",map <nombre>", example: ",map Skull Creek", category: "INFO" },
      { name: "top", aliases: [], description: "Muestra el ranking de clubes por región.", usage: ",top [region]", example: ",top global", category: "INFO" },
      { name: "club", aliases: ["c"], description: "Muestra la información de un club.", usage: ",club [key/tag/usuario] [members/logs]", example: ",club la7 members", category: "INFO" },
      { name: "clubs", aliases: [], description: "Lista todos los clubes guardados del servidor.", usage: ",clubs [keyword] [args]", example: ",clubs roles", category: "INFO" },
      { name: "clubs add", aliases: [], description: "Añade un club al servidor. Solo admins.", usage: ",clubs add <key> <tag>", example: ",clubs add la7 #2YGR8C9", category: "ADMIN" },
      { name: "clubs remove", aliases: [], description: "Elimina un club del servidor. Solo admins.", usage: ",clubs remove <key>", example: ",clubs remove la7", category: "ADMIN" },
      { name: "clubs role", aliases: [], description: "Asigna un rol de Discord a un club. Solo admins.", usage: ",clubs role <key> <@rol>", example: ",clubs role la7 @LA7", category: "ADMIN" },
      { name: "clubs region", aliases: [], description: "Establece la región de un club. Solo admins.", usage: ",clubs region <key> <region>", example: ",clubs region la7 es", category: "ADMIN" },
      { name: "leaderboard", aliases: ["lb"], description: "Muestra la clasificación del servidor por copas, equipo, solo o dúos.", usage: ",leaderboard <tipo>", example: ",lb copas", category: "INFO" },
      { name: "userbytag", aliases: [], description: "Busca qué usuario de Discord tiene un tag específico.", usage: ",userbytag <tag>", example: ",userbytag #8GRCQK", category: "UTILIDAD" },
      { name: "usersbyclub", aliases: [], description: "Busca usuarios del servidor que pertenezcan a un club.", usage: ",usersbyclub <tag>", example: ",usersbyclub #2YGR8C9", category: "UTILIDAD" },
      { name: "uemoji", aliases: [], description: "Actualiza los emojis de los brawlers. Solo admins.", usage: ",uemoji", example: ",uemoji", category: "ADMIN" },
    ]
  },
  "Moderación": {
    icon: <ShieldCheckIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de moderación del servidor",
    commands: [
      { name: "ban", aliases: [], description: "Banea a un usuario del servidor.", usage: ",ban <usuario> [duración] [motivo]", example: ",ban @user 7d Toxicidad", category: "SANCIÓN" },
      { name: "unban", aliases: [], description: "Desbanea a un usuario del servidor.", usage: ",unban <usuario> [motivo]", example: ",unban @user Apelación aprobada", category: "SANCIÓN" },
      { name: "kick", aliases: [], description: "Expulsa a un miembro del servidor.", usage: ",kick <miembro> [motivo]", example: ",kick @user Spam", category: "SANCIÓN" },
      { name: "mute", aliases: [], description: "Silencia a un miembro durante un tiempo determinado.", usage: ",mute <miembro> <duración> [motivo]", example: ",mute @user 1h Flood", category: "SANCIÓN" },
      { name: "unmute", aliases: [], description: "Quita el silencio a un miembro.", usage: ",unmute <miembro> [motivo]", example: ",unmute @user Cumplió sanción", category: "SANCIÓN" },
      { name: "strike", aliases: [], description: "Añade un strike a un usuario.", usage: ",strike <usuario> <motivo>", example: ",strike @user Incumplir norma 3", category: "SANCIÓN" },
      { name: "pardon", aliases: [], description: "Elimina un strike de un usuario.", usage: ",pardon <usuario> <motivo>", example: ",pardon @user Buen comportamiento", category: "SANCIÓN" },
      { name: "check", aliases: [], description: "Revisa los strikes y estado de moderación de un usuario.", usage: ",check <usuario>", example: ",check @user", category: "INFO" },
      { name: "history", aliases: [], description: "Muestra el historial completo de moderación de un usuario.", usage: ",history <usuario>", example: ",history @user", category: "INFO" },
      { name: "reason", aliases: [], description: "Modifica la razón de un caso de moderación.", usage: ",reason <id_caso> <nueva_razón>", example: ",reason 42 Actualizado", category: "GESTIÓN" },
      { name: "modlog", aliases: [], description: "Configura el canal de registro de moderación.", usage: ",modlog [#canal]", example: ",modlog #mod-log", category: "CONFIG" },
      { name: "punishments", aliases: [], description: "Muestra las sanciones automáticas por strikes.", usage: ",punishments", example: ",punishments", category: "CONFIG" },
      { name: "punishments set", aliases: [], description: "Configura una sanción automática para un número de strikes.", usage: ",punishments set <nº> <tipo> [dur]", example: ",punishments set 3 mute 24h", category: "CONFIG" },
      { name: "names", aliases: [], description: "Historial de nombres de usuario de un miembro.", usage: ",names [usuario]", example: ",names @user", category: "INFO" },
      { name: "nicks", aliases: [], description: "Historial de apodos en el servidor de un miembro.", usage: ",nicks [usuario]", example: ",nicks @user", category: "INFO" },
    ]
  },
  "General": {
    icon: <ChatBubbleLeftEllipsisIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de uso general y entretenimiento",
    commands: [
      { name: "choose", aliases: [], description: "El bot elige aleatoriamente entre las opciones.", usage: ",choose <op1> <op2> ...", example: ",choose pizza sushi", category: "DIVERSIÓN" },
      { name: "8ball", aliases: ["8"], description: "Hazle una pregunta a la bola mágica 8.", usage: ",8ball <pregunta>", example: ",8ball ¿Aprobaré?", category: "DIVERSIÓN" },
      { name: "lmgtfy", aliases: [], description: "Genera un enlace de 'Let Me Google That For You'.", usage: ",lmgtfy <búsqueda>", example: ",lmgtfy brawl stars", category: "DIVERSIÓN" },
      { name: "flip", aliases: [], description: "Lanza una moneda o voltea un nombre.", usage: ",flip [usuario]", example: ",flip @user", category: "DIVERSIÓN" },
      { name: "urban", aliases: [], description: "Busca una palabra en el Urban Dictionary.", usage: ",urban <palabra>", example: ",urban bruh", category: "DIVERSIÓN" },
      { name: "cmdgang", aliases: [], description: "Gestiona el rol y apodo de la CMDGang.", usage: ",cmdgang", example: ",cmdgang", category: "ROLES" },
      { name: "gif", aliases: [], description: "Busca un GIF en Giphy.", usage: ",gif <palabras>", example: ",gif brawl stars win", category: "DIVERSIÓN" },
      { name: "rps", aliases: [], description: "Juega Piedra, Papel o Tijeras.", usage: ",rps <rock/paper/scissors>", example: ",rps rock", category: "DIVERSIÓN" },
      { name: "roll", aliases: [], description: "Lanza un dado con el número máximo especificado.", usage: ",roll [número]", example: ",roll 20", category: "DIVERSIÓN" },
      { name: "letra", aliases: [], description: "Busca la letra de una canción usando Genius.", usage: ",letra <canción>", example: ",letra Despacito", category: "DIVERSIÓN" },
      { name: "customcommands", aliases: ["cc"], description: "Lista todos los comandos personalizados.", usage: ",cc", example: ",cc", category: "GESTIÓN" },
      { name: "cc create", aliases: [], description: "Crea un nuevo comando personalizado.", usage: ",cc create <nombre> <respuesta>", example: ",cc create hola ¡Hola!", category: "GESTIÓN" },
      { name: "cc delete", aliases: [], description: "Elimina un comando personalizado.", usage: ",cc delete <nombre>", example: ",cc delete hola", category: "GESTIÓN" },
      { name: "tags", aliases: [], description: "Lista todas las etiquetas disponibles.", usage: ",tags", example: ",tags", category: "GESTIÓN" },
      { name: "tag", aliases: [], description: "Usa una etiqueta para obtener su contenido.", usage: ",tag <nombre>", example: ",tag normas", category: "INFO" },
      { name: "tags create", aliases: [], description: "Crea una nueva etiqueta.", usage: ",tags create <nombre> <contenido>", example: ",tags create normas Lee las normas", category: "GESTIÓN" },
      { name: "tags delete", aliases: [], description: "Elimina una etiqueta.", usage: ",tags delete <nombre>", example: ",tags delete normas", category: "GESTIÓN" },
    ]
  },
  "Herramientas": {
    icon: <WrenchScrewdriverIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de utilidad e información del servidor",
    commands: [
      { name: "members", aliases: [], description: "Lista todos los miembros que tienen un rol.", usage: ",members <rol>", example: ",members Moderador", category: "INFO" },
      { name: "members2", aliases: [], description: "Lista los miembros que tienen dos roles simultáneamente.", usage: ",members2 <rol1> <rol2>", example: ",members2 Admin Mod", category: "INFO" },
      { name: "userinfo", aliases: ["ui"], description: "Información detallada de un miembro del servidor.", usage: ",userinfo [miembro]", example: ",ui @David", category: "INFO" },
      { name: "serverinfo", aliases: [], description: "Información general del servidor.", usage: ",serverinfo [detallado]", example: ",serverinfo true", category: "INFO" },
      { name: "roleinfo", aliases: [], description: "Información detallada de un rol.", usage: ",roleinfo <rol>", example: ",roleinfo Admin", category: "INFO" },
      { name: "info", aliases: [], description: "Información técnica sobre el bot.", usage: ",info", example: ",info", category: "INFO" },
    ]
  },
  "LA Spain": {
    icon: <TrophyIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos específicos de la comunidad LA Spain",
    commands: [
      { name: "bumpslb", aliases: [], description: "Clasificación de bumps del servidor.", usage: ",bumpslb", example: ",bumpslb", category: "RANKING" },
      { name: "starboardlb", aliases: [], description: "Clasificación del starboard.", usage: ",starboardlb", example: ",starboardlb", category: "RANKING" },
      { name: "pingww", aliases: ["werewolf"], description: "Menciona al rol de Werewolf.", usage: ",pingww", example: ",pingww", category: "UTILIDAD" },
      { name: "crole add", aliases: [], description: "Añade un rol a la lista de personalizables.", usage: ",crole add <@rol>", example: ",crole add @MiRol", category: "ROLES" },
      { name: "crole list", aliases: [], description: "Lista todos los roles personalizables.", usage: ",crole list", example: ",crole list", category: "ROLES" },
      { name: "crole remove", aliases: [], description: "Elimina un rol de la lista de personalizables.", usage: ",crole remove <id_rol>", example: ",crole remove 123456", category: "ROLES" },
      { name: "crole edit", aliases: [], description: "Edita nombre, color o icono de tu rol personalizado.", usage: ",crole edit <name/color/icon> <valor>", example: ",crole edit color #ff5733", category: "ROLES" },
      { name: "quiniela", aliases: [], description: "Envía una predicción de quiniela (solo por MD).", usage: ",quiniela <tipo> <msg>", example: ",quiniela bs Mi predicción", category: "EVENTOS" },
    ]
  },
  "Werewolf": {
    icon: <MoonIcon style={{ width: 18, height: 18 }} />,
    description: "Minijuego de Hombre Lobo en Discord",
    commands: [
      { name: "ww start", aliases: [], description: "Inicia una nueva partida de Werewolf.", usage: ",ww start [min] [tiempo] [private/public]", example: ",ww start 8 120 private", category: "PARTIDA" },
      { name: "ww forcestart", aliases: ["ww fs"], description: "Fuerza el inicio inmediato.", usage: ",ww forcestart", example: ",ww fs", category: "PARTIDA" },
      { name: "ww join", aliases: [], description: "Únete al lobby.", usage: ",ww join", example: ",ww join", category: "PARTIDA" },
      { name: "ww leave", aliases: [], description: "Sal del lobby.", usage: ",ww leave", example: ",ww leave", category: "PARTIDA" },
      { name: "ww stop", aliases: [], description: "Cancela la partida en curso.", usage: ",ww stop", example: ",ww stop", category: "PARTIDA" },
      { name: "ww changelog", aliases: ["ww update", "ww patch"], description: "Envía un changelog. Solo admins.", usage: ",ww changelog [enlace]", example: ",ww changelog https://...", category: "ADMIN" },
      { name: "ww mention", aliases: [], description: "Menciona al rol de Werewolf. Cooldown 15min.", usage: ",ww mention [msg]", example: ",ww mention ¡Partida!", category: "UTILIDAD" },
      { name: "ww bl list", aliases: [], description: "Lista los usuarios en la blacklist de WW.", usage: ",ww bl list", example: ",ww bl list", category: "ADMIN" },
      { name: "ww bl add", aliases: [], description: "Añade un usuario a la blacklist de WW.", usage: ",ww bl add <@user> [motivo]", example: ",ww bl add @user Trollear", category: "ADMIN" },
    ]
  },
  "Clash Royale": {
    icon: <CommandLineIcon style={{ width: 18, height: 18 }} />,
    description: "Comandos de Clash Royale",
    commands: [
      { name: "crsave", aliases: [], description: "Guarda tu tag de Clash Royale.", usage: ",crsave <tag>", example: ",crsave #2YQPLC", category: "CUENTA" },
      { name: "crunsave", aliases: [], description: "Elimina el tag de CR de un usuario. Solo admins.", usage: ",crunsave <@usuario>", example: ",crunsave @user", category: "ADMIN" },
      { name: "crprofile", aliases: ["crp"], description: "Muestra el perfil de Clash Royale de un jugador.", usage: ",crprofile [usuario]", example: ",crp @David", category: "INFO" },
      { name: "renamecr", aliases: ["rcr"], description: "Cambia el apodo a su nombre de Clash Royale.", usage: ",renamecr [usuario] [clan]", example: ",rcr @David true", category: "UTILIDAD" },
    ]
  },
  "Blacklist": {
    icon: <NoSymbolIcon style={{ width: 18, height: 18 }} />,
    description: "Gestión de la lista negra de jugadores de BS",
    commands: [
      { name: "blacklist", aliases: ["bl"], description: "Muestra la lista negra del servidor.", usage: ",blacklist", example: ",bl", category: "INFO" },
      { name: "blacklist add", aliases: ["bl add"], description: "Añade un jugador a la lista negra.", usage: ",bl add <tag> <motivo>", example: ",bl add #2YGR Tóxico", category: "ADMIN" },
      { name: "blacklist remove", aliases: ["bl remove"], description: "Elimina un jugador de la lista negra.", usage: ",bl remove <tag>", example: ",bl remove #2YGR", category: "ADMIN" },
      { name: "blacklist check", aliases: ["bl check"], description: "Comprueba si un jugador está en la lista negra global.", usage: ",bl check <tag>", example: ",bl check #2YGR", category: "INFO" },
      { name: "blacklist setchannel", aliases: [], description: "Establece el canal de notificaciones de la blacklist.", usage: ",bl setchannel #canal", example: ",bl setchannel #blacklist", category: "CONFIG" },
    ]
  },
  "Whitelist": {
    icon: <CheckCircleIcon style={{ width: 18, height: 18 }} />,
    description: "Gestión de la whitelist de jugadores",
    commands: [
      { name: "whitelist", aliases: [], description: "Muestra los miembros de la whitelist con sus clubes.", usage: ",whitelist", example: ",whitelist", category: "INFO" },
      { name: "whitelist stats", aliases: [], description: "Estadísticas generales de la whitelist.", usage: ",whitelist stats", example: ",whitelist stats", category: "INFO" },
      { name: "whitelist club", aliases: [], description: "Muestra miembros de la whitelist en un club específico.", usage: ",whitelist club <tag>", example: ",whitelist club #2YGR", category: "INFO" },
      { name: "whitelist setrole", aliases: [], description: "Configura el rol de la whitelist.", usage: ",whitelist setrole <@rol>", example: ",whitelist setrole @WL", category: "CONFIG" },
    ]
  },
  "Mascotas": {
    icon: <HeartIcon style={{ width: 18, height: 18 }} />,
    description: "Sistema de mascotas virtuales con tu pareja",
    commands: [
      { name: "pet adopt", aliases: [], description: "Adopta una mascota con otra persona (máx 5).", usage: ",pet adopt <@user> <animal> <nombre>", example: ",pet adopt @Pareja Gato Mishi", category: "JUEGO" },
      { name: "pet list", aliases: [], description: "Muestra todas tus mascotas.", usage: ",pet list", example: ",pet list", category: "INFO" },
      { name: "pet stats", aliases: [], description: "Muestra estadísticas detalladas de tu mascota.", usage: ",pet stats", example: ",pet stats", category: "INFO" },
      { name: "pet feed", aliases: [], description: "Alimenta a tu mascota.", usage: ",pet feed", example: ",pet feed", category: "ACCIÓN" },
      { name: "pet sleep", aliases: [], description: "Acuesta a tu mascota a dormir.", usage: ",pet sleep", example: ",pet sleep", category: "ACCIÓN" },
      { name: "pet play", aliases: [], description: "Juega con tu mascota.", usage: ",pet play", example: ",pet play", category: "ACCIÓN" },
      { name: "pet rename", aliases: [], description: "Cambia el nombre de tu mascota.", usage: ",pet rename <nuevo_nombre>", example: ",pet rename Firulais", category: "ACCIÓN" },
      { name: "pet delete", aliases: [], description: "Elimina una mascota (requiere confirmación de ambos dueños).", usage: ",pet delete", example: ",pet delete", category: "ACCIÓN" },
    ]
  },
  "Battleship": {
    icon: <PaperAirplaneIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Hundir la Flota en Discord",
    commands: [
      { name: "battleship", aliases: [], description: "Inicia una partida de Hundir la Flota contra otro jugador o la IA.", usage: ",battleship", example: ",battleship", category: "JUEGO" },
      { name: "battleshipstop", aliases: [], description: "Detiene la partida en curso. Solo staff.", usage: ",battleshipstop", example: ",battleshipstop", category: "ADMIN" },
      { name: "battleshipboard", aliases: [], description: "Ve tu tablero en una partida en curso.", usage: ",battleshipboard <canal_id>", example: ",battleshipboard 12345", category: "JUEGO" },
    ]
  },
  "Monopoly": {
    icon: <CurrencyDollarIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Monopoly para 2-8 jugadores",
    commands: [
      { name: "monopoly", aliases: [], description: "Inicia una partida de Monopoly de 2 a 8 jugadores.", usage: ",monopoly [savefile]", example: ",monopoly", category: "JUEGO" },
      { name: "monopoly list", aliases: [], description: "Lista las partidas guardadas.", usage: ",monopoly list", example: ",monopoly list", category: "INFO" },
      { name: "monopolystop", aliases: [], description: "Detiene la partida de Monopoly. Solo admins.", usage: ",monopolystop", example: ",monopolystop", category: "ADMIN" },
    ]
  },
  "Ahorcado": {
    icon: <FaceFrownIcon style={{ width: 18, height: 18 }} />,
    description: "Juego del ahorcado con ranking y estadísticas",
    commands: [
      { name: "ahorcado", aliases: [], description: "Inicia una partida del ahorcado. Adivina la palabra.", usage: ",ahorcado", example: ",ahorcado", category: "JUEGO" },
      { name: "ahorcado lb", aliases: [], description: "Muestra la clasificación del ahorcado.", usage: ",ahorcado lb", example: ",ahorcado lb", category: "RANKING" },
      { name: "ahorcadostats", aliases: [], description: "Muestra tus estadísticas del ahorcado.", usage: ",ahorcadostats [usuario]", example: ",ahorcadostats @David", category: "INFO" },
    ]
  },
  "Snake": {
    icon: <PlayIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de la serpiente en Discord",
    commands: [
      { name: "snake", aliases: [], description: "Juega al juego de la serpiente con botones interactivos.", usage: ",snake", example: ",snake", category: "JUEGO" },
    ]
  },
  "Wordle": {
    icon: <PuzzlePieceIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de Wordle en Discord",
    commands: [
      { name: "wordle", aliases: ["w"], description: "Inicia una partida de Wordle. Adivina la palabra en 6 intentos.", usage: ",wordle", example: ",wordle", category: "JUEGO" },
    ]
  },
  "Party Games": {
    icon: <GiftIcon style={{ width: 18, height: 18 }} />,
    description: "Juegos en grupo para divertirse",
    commands: [
      { name: "partygames", aliases: ["pg"], description: "Inicia juegos de preguntas y respuestas en grupo.", usage: ",pg", example: ",pg", category: "JUEGO" },
    ]
  },
  "Trivial": {
    icon: <QuestionMarkCircleIcon style={{ width: 18, height: 18 }} />,
    description: "Juego de preguntas trivia",
    commands: [
      { name: "trivial", aliases: [], description: "Inicia una partida de trivia.", usage: ",trivial", example: ",trivial", category: "JUEGO" },
    ]
  },
  "Lotería": {
    icon: <TicketIcon style={{ width: 18, height: 18 }} />,
    description: "Sistema de lotería del servidor",
    commands: [
      { name: "lottery", aliases: [], description: "Participa en la lotería del servidor.", usage: ",lottery", example: ",lottery", category: "ECONOMÍA" },
    ]
  },
  "Eventos": {
    icon: <SparklesIcon style={{ width: 18, height: 18 }} />,
    description: "Eventos especiales y sistema de recompensas",
    commands: [
      { name: "start_candies", aliases: [], description: "Inicia un evento de recolección. Solo admins.", usage: ",start_candies <theme> <#canal> <min_msg> <min_inter> [max]", example: ",start_candies halloween #general 10 5", category: "ADMIN" },
      { name: "eventlb", aliases: [], description: "Muestra la clasificación del evento activo.", usage: ",eventlb [usuario]", example: ",eventlb", category: "RANKING" },
      { name: "claim", aliases: [], description: "Reclama tu recompensa del evento.", usage: ",claim", example: ",claim", category: "JUEGO" },
    ]
  },
  "Memes": {
    icon: <FaceSmileIcon style={{ width: 18, height: 18 }} />,
    description: "Concurso de memes con votaciones",
    commands: [
      { name: "start_event", aliases: ["start"], description: "Inicia un concurso de memes. Solo coordinadores.", usage: ",start_event", example: ",start_event", category: "ADMIN" },
      { name: "top", aliases: [], description: "Muestra el ranking del concurso de memes.", usage: ",top", example: ",top", category: "RANKING" },
      { name: "me", aliases: [], description: "Muestra tus votos y puntos en el concurso.", usage: ",me [usuario]", example: ",me @user", category: "INFO" },
    ]
  },
  "Welcome": {
    icon: <HandRaisedIcon style={{ width: 18, height: 18 }} />,
    description: "Configuración de bienvenidas automáticas",
    commands: [
      { name: "greet", aliases: [], description: "Configura el sistema de saludos.", usage: ",greet", example: ",greet", category: "CONFIG" },
      { name: "welcome", aliases: [], description: "Configura los mensajes de bienvenida.", usage: ",welcome", example: ",welcome", category: "CONFIG" },
    ]
  },
  "Cumpleaños": {
    icon: <CakeIcon style={{ width: 18, height: 18 }} />,
    description: "Sistema de cumpleaños del servidor",
    commands: [
      { name: "cumple", aliases: ["bday"], description: "Gestiona tu cumpleaños. Recibe ventajas especiales.", usage: ",cumple [fecha]", example: ",cumple 2000-05-15", category: "UTILIDAD" },
    ]
  },
};

export default commandsData;
