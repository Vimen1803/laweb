export const TRIVIAL_CMD_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'JUEGO', label: 'Juego' },
  { id: 'INFO', label: 'Info' },
  { id: 'ADMIN', label: 'Admin' },
];

export const TRIVIAL_COMMANDS = [
  {
    id: 'trivial', name: ',trivial <pack>', cat: 'JUEGO',
    desc: 'Inicia una partida de trivia con el pack indicado.',
    long_desc: 'Comienza una partida de trivial en el canal con el pack de preguntas elegido. Gana quien antes alcance la puntuación máxima.',
    params: [{ name: '<pack>', desc: 'Nombre del pack de preguntas', optional: false }],
    examples: [',trivial brawlstars'],
  },
  {
    id: 'list', name: ',trivial list', cat: 'INFO',
    desc: 'Lista los packs de preguntas disponibles.',
    long_desc: 'Muestra todos los packs de trivia que están cargados y listos para jugar.',
    params: [],
    examples: [',trivial list'],
  },
  {
    id: 'lb', name: ',trivial lb', cat: 'INFO',
    desc: 'Clasificación del servidor en trivial.',
    long_desc: 'Muestra el ranking del servidor ordenado por puntos totales, con victorias, partidas y media por jugador.',
    params: [],
    examples: [',trivial lb'],
  },
  {
    id: 'stop', name: ',trivial stop', cat: 'JUEGO',
    desc: 'Detiene la partida de trivial en curso del canal.',
    long_desc: 'Cancela la partida de trivial activa en el canal actual.',
    params: [],
    examples: [',trivial stop'],
  },
  {
    id: 'load', name: ',trivial load', cat: 'ADMIN',
    desc: 'Carga packs desde un archivo adjunto. (Manager/Admin/Programador)',
    long_desc: 'Sube uno o varios archivos .yaml adjuntos para añadir nuevos packs de preguntas. Restringido a Manager, Admin o Programador.',
    params: [],
    examples: [',trivial load  (adjuntando el .yaml)'],
  },
  {
    id: 'delete', name: ',trivial delete <nombre>', cat: 'ADMIN',
    desc: 'Elimina uno o varios packs. (Manager/Admin/Programador)',
    long_desc: 'Borra los packs de preguntas indicados por nombre. Restringido a Manager, Admin o Programador.',
    params: [{ name: '<nombre> ...', desc: 'Uno o más packs a eliminar', optional: false }],
    examples: [',trivial delete brawlstars'],
  },
];
