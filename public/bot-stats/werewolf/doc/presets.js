const DATA = {
  village: [
    { name: "Aldeano",           emoji: "👨‍🌾", spawn: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100] },
    { name: "Vidente",           emoji: "🔮", spawn: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80] },
    { name: "Bruja",             emoji: "🧙‍♀️", spawn: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80] },
    { name: "Cazador",           emoji: "🏹", spawn: [60,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70] },
    { name: "Curandera",         emoji: "💊", spawn: [0,50,60,70,70,70,70,70,70,70,70,70,70,70,70,70] },
    { name: "Caballero",         emoji: "⚔️", spawn: [0,40,50,60,60,60,60,60,60,60,60,60,60,60,60,60] },
    { name: "El Anciano",        emoji: "👴", spawn: [0,0,40,50,60,60,60,60,60,60,60,60,60,60,60,60] },
    { name: "Zorro",             emoji: "🦊", spawn: [0,0,0,0,40,50,60,60,60,60,60,60,60,60,60,60] },
    { name: "Ramera",            emoji: "💋", spawn: [0,0,0,0,0,50,50,50,60,60,60,60,60,60,60,60] },
    { name: "Cazador de Bestias",emoji: "🐾", spawn: [0,0,0,30,40,50,55,60,60,60,60,60,60,60,60,60] },
    { name: "Cupido",            emoji: "💘", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Panadero",          emoji: "🍞", spawn: [0,0,0,30,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Niño Salvaje",      emoji: "🌿", spawn: [0,0,0,0,30,40,50,55,55,55,55,55,55,55,55,55] },
    { name: "Alma Pura",         emoji: "✨", spawn: [0,0,0,30,40,50,50,50,50,50,50,50,50,50,50,50] },
    { name: "Infiel",            emoji: "🏠", spawn: [0,0,50,50,50,55,55,55,55,55,55,55,55,55,55,55] },
    { name: "Licántropo",        emoji: "🌕", spawn: [30,40,50,55,55,55,55,55,55,55,55,55,55,55,55,55] },
    { name: "2x Hermanas",       emoji: "👯", spawn: [0,0,0,0,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Ladrón",            emoji: "🎭", spawn: [0,40,50,50,50,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Saquea Tumbas",     emoji: "⚰️", spawn: [0,0,0,30,40,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Juez",              emoji: "⚖️", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
    { name: "Miron",             emoji: "👁️", spawn: [0,0,0,0,0,50,55,55,55,55,55,55,55,55,55,55] },
  ],
  wolves: [
    { name: "Hombre Lobo",       emoji: "🐺", spawn: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100] },
    { name: "Gran Lobo Feroz",   emoji: "🦴", spawn: [0,0,50,60,60,65,65,65,65,65,65,65,65,65,65,65] },
    { name: "Padre de Lobos",    emoji: "👑", spawn: [0,0,0,0,40,50,60,60,60,60,60,60,60,60,60,60] },
    { name: "Hechicera",         emoji: "🔮", spawn: [0,0,40,50,55,60,60,60,60,60,60,60,60,60,60,60] },
  ],
  solo: [
    { name: "Curtidor",    emoji: "🪡", spawn: [0,0,0,20,20,33,33,33,40,40,40,50,50,50,50,50] },
    { name: "Lobo Blanco", emoji: "🤍", spawn: [0,0,0,0,0,0,33,33,40,40,40,50,50,50,50,50] }
  ],
  wolfCount: [1,1,2,2,2,3,3,3,4,4,4,5,5,5,5,5]
};

const slider = document.getElementById('player-slider');
const countDisplay = document.getElementById('player-count-display');
const summaryContainer = document.getElementById('summary-stats');
const outputContainer = document.getElementById('roles-output');
const notesText = document.getElementById('preset-notes');

function getPctClass(v) {
  if (v === 0) return 'pct-zero';
  if (v >= 70) return 'pct-high';
  if (v >= 40) return 'pct-med';
  return 'pct-low';
}

function renderRole(r, idx, team) {
  const v = r.spawn[idx];
  
  return `
    <div class="role-bar-item ${v === 0 ? 'pct-zero' : ''}">
      <span style="font-size:1.2rem">${r.emoji}</span>
      <span class="role-name">${r.name}</span>
      <div class="bar-container">
        <div class="bar-fill bar-${team}" style="width:${v}%"></div>
      </div>
      <span class="role-pct ${getPctClass(v)}">${v}%</span>
    </div>
  `;
}

function update(n) {
  const idx = n - 5;
  countDisplay.textContent = n;

  const wolfBase = DATA.wolfCount[idx];
  const soloSlot = n == 20 ? 2 : (n >= 8 ? 1 : 0);
  const villageCount = n - wolfBase - soloSlot;

  summaryContainer.innerHTML = `
    <div class="sum-card"><span class="sum-label">Aldea</span><span class="sum-value val-aldea">${villageCount}</span></div>
    <div class="sum-card"><span class="sum-label">Lobos</span><span class="sum-value val-lobos">${wolfBase}</span></div>
    <div class="sum-card"><span class="sum-label">Solitario</span><span class="sum-value val-solo">${soloSlot}</span></div>
    <div class="sum-card"><span class="sum-label">Total</span><span class="sum-value">${n}</span></div>
  `;

  let html = '';
  
  // Village Section
  html += `<div class="section"><div class="section-header">🏡 Aldea</div><div class="role-grid">`;
  DATA.village.forEach(r => html += renderRole(r, idx, 'village'));
  html += `</div></div>`;

  // Wolves Section
  html += `<div class="section"><div class="section-header">🐺 Lobos</div><div class="role-grid">`;
  DATA.wolves.forEach(r => html += renderRole(r, idx, 'wolves'));
  html += `</div></div>`;

  // Solo Section
  html += `<div class="section"><div class="section-header">🎭 Solitarios (Slot Único / Doble en 20j)</div><div class="role-grid">`;
  DATA.solo.forEach(r => html += renderRole(r, idx, 'solo'));
  html += `</div></div>`;

  outputContainer.innerHTML = html;

  const notes = [];
  if (n < 8) notes.push("Sin slot solitario con menos de 8 jugadores.");
  if (n >= 8 && n < 11) notes.push("Si no sale ningún rol solitario se suma un slot a la aldea.");
  if (n >= 11 && n < 20) notes.push("Curtidor y Lobo Blanco compiten por el slot solitario. Si sale Lobo Blanco, se resta un slot a los lobos.");
  if (n == 20) notes.push("Partida especial: Pueden aparecer hasta 2 roles solitarios (Máx 1 Lobo Blanco, hasta 2 Curtidores).");
  notesText.textContent = notes.join(' ');
}

slider.addEventListener('input', e => update(+e.target.value));
update(10);
