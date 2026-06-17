// Utilidades para consultar miembros y roles del servidor de Discord vía la API
// del bot. Requiere DISCORD_BOT_TOKEN (y opcionalmente DISCORD_GUILD_ID).
//
// Nota: listar miembros (`GET /guilds/{id}/members`) requiere que el bot tenga
// activado el intent privilegiado "Server Members". Si falla, las funciones
// devuelven null para que quien las llame pueda usar un respaldo.

const GUILD_ID = process.env.DISCORD_GUILD_ID || '460550486257565697';
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const API = 'https://discord.com/api/v10';

function authHeaders() {
  return { Authorization: `Bot ${TOKEN}` };
}

function normalize(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Convierte un miembro de la API en { id, name, avatar } listo para la UI.
function memberDisplay(m) {
  const u = m.user || {};
  const name = m.nick || u.global_name || u.username || 'Usuario';

  let avatar;
  if (m.avatar) {
    avatar = `${'https://cdn.discordapp.com'}/guilds/${GUILD_ID}/users/${u.id}/avatars/${m.avatar}.png?size=128`;
  } else if (u.avatar) {
    avatar = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`;
  } else {
    let idx = 0;
    try { idx = Number((BigInt(u.id) >> 22n) % 6n); } catch { idx = 0; }
    avatar = `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }

  return { id: u.id, name, avatar };
}

// Descarga todos los miembros del servidor (paginado). Devuelve null si falla.
async function fetchAllMembers() {
  if (!TOKEN) return null;

  const members = [];
  let after = '0';

  // Límite de seguridad: 25 páginas (25 000 miembros) para evitar bucles.
  for (let page = 0; page < 25; page++) {
    let res;
    // Reintenta hasta 3 veces si Discord aplica rate limit (429).
    for (let attempt = 0; ; attempt++) {
      try {
        res = await fetch(`${API}/guilds/${GUILD_ID}/members?limit=1000&after=${after}`, {
          headers: authHeaders(),
          next: { revalidate: 600 },
        });
      } catch {
        return members.length ? members : null;
      }
      if (res.status === 429 && attempt < 3) {
        const info = await res.json().catch(() => ({}));
        const waitMs = Math.min((info.retry_after || 1) * 1000, 5000);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      break;
    }

    if (!res.ok) return members.length ? members : null;

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    members.push(...batch);
    if (batch.length < 1000) break;
    after = batch[batch.length - 1]?.user?.id;
    if (!after) break;
  }

  return members;
}

// Devuelve { [roleId]: [{id,name,avatar}, ...] } para los roles indicados.
// Devuelve null si no se pudieron obtener los miembros.
export async function getMembersByRoleIds(roleIds) {
  const all = await fetchAllMembers();
  if (!all) return null;

  const result = {};
  for (const rid of roleIds) result[rid] = [];

  for (const m of all) {
    const roles = m.roles || [];
    for (const rid of roleIds) {
      if (roles.includes(rid)) result[rid].push(memberDisplay(m));
    }
  }
  return result;
}

// Resuelve nombre+avatar de varios usuarios para una clasificación.
// Para cada id intenta el miembro del servidor (nick + avatar del server) y,
// si no está, cae al usuario global. Devuelve { [id]: {name, avatar} | null }.
// No requiere el intent privilegiado: pide cada miembro por id, no la lista.
export async function getGuildMembersDisplay(userIds) {
  if (!TOKEN || !Array.isArray(userIds) || userIds.length === 0) return {};
  const out = {};
  await Promise.all(userIds.map(async (rawId) => {
    const id = String(rawId);
    // 1) Miembro del servidor (da el apodo y el avatar propios del server).
    try {
      const res = await fetch(`${API}/guilds/${GUILD_ID}/members/${id}`, {
        headers: authHeaders(),
        next: { revalidate: 600 },
      });
      if (res.ok) {
        const m = await res.json();
        const d = memberDisplay(m);
        out[id] = { name: d.name, avatar: d.avatar };
        return;
      }
    } catch { /* sigue al respaldo */ }
    // 2) Respaldo: usuario global (si ya no está en el servidor).
    try {
      const res = await fetch(`${API}/users/${id}`, {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const u = await res.json();
        out[id] = {
          name: u.global_name || u.username || 'Jugador',
          avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128` : null,
        };
        return;
      }
    } catch { /* nada */ }
    out[id] = null;
  }));
  return out;
}

// Busca el ID de un rol por su nombre (sin distinguir mayúsculas/acentos).
export async function getRoleIdByName(name) {
  if (!TOKEN) return null;
  try {
    const res = await fetch(`${API}/guilds/${GUILD_ID}/roles`, {
      headers: authHeaders(),
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const roles = await res.json();
    const target = normalize(name);
    const found = (roles || []).find(r => normalize(r.name) === target);
    return found ? found.id : null;
  } catch {
    return null;
  }
}

// ID del rol "Portador de la Fortuna" en LA Spain (último ganador de la lotería).
// Se puede sobreescribir con la variable de entorno LOTTERY_ROLE_ID.
const FORTUNE_ROLE_ID = '1392863608190406707';

// Devuelve el portador actual del rol "Portador de la Fortuna" (último ganador
// de la lotería), o null si no hay ninguno / no se pudo determinar.
export async function getFortuneHolder() {
  const roleId = process.env.LOTTERY_ROLE_ID || FORTUNE_ROLE_ID || await getRoleIdByName('Portador de la Fortuna');
  if (!roleId) return null;

  const byRole = await getMembersByRoleIds([roleId]);
  const holders = byRole?.[roleId] || [];
  return holders.length ? holders[0] : null;
}
