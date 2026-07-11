'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon, ClipboardDocumentListIcon, MagnifyingGlassIcon,
  Cog6ToothIcon, UsersIcon, ShieldExclamationIcon, SpeakerWaveIcon,
  SpeakerXMarkIcon, ExclamationTriangleIcon, FlagIcon,
  NoSymbolIcon, WrenchScrewdriverIcon,
  ScaleIcon, ClockIcon, LockClosedIcon,
  BuildingLibraryIcon, TrashIcon, CheckCircleIcon, XCircleIcon, XMarkIcon,
  PencilSquareIcon, CakeIcon, SparklesIcon, GlobeAltIcon, PlusIcon
} from '@heroicons/react/24/solid';

const iconMap = { 
  kick: <ExclamationTriangleIcon style={{ width: 16, height: 16 }} />, 
  mute: <SpeakerXMarkIcon style={{ width: 16, height: 16 }} />, 
  unmute: <SpeakerWaveIcon style={{ width: 16, height: 16 }} />, 
  strike: <ShieldExclamationIcon style={{ width: 16, height: 16 }} />, 
  pardon: <FlagIcon style={{ width: 16, height: 16 }} />, 
  ban: <NoSymbolIcon style={{ width: 16, height: 16 }} />, 
  unban: <WrenchScrewdriverIcon style={{ width: 16, height: 16 }} /> 
};

const WolfIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2.2c-.3 0-.5.1-.7.4L7.5 8.3 3.6 9.5c-.5.2-.8.6-.8 1.1 0 .7.6 1.3 1.3 1.3h.2L6.5 17.5l-1.6 3.6c-.2.5 0 1.1.5 1.3.2.1.3.1.5.1.4 0 .7-.2.9-.6l2-4.6c.2-.4.6-.7 1-.7h4.4c.4 0 .8.3 1 .7l2 4.6c.2.4.6.6.9.6.2 0 .3 0 .5-.1.5-.2.7-.8.5-1.3l-1.6-3.6 2.2-5.6h.2c.7 0 1.3-.6 1.3-1.3 0-.5-.3-.9-.8-1.1L16.5 8.3l-3.8-5.7c-.2-.3-.5-.4-.7-.4zM9 10c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
  </svg>
);

export default function AdminPage() {
  const [section, setSection] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [authStatus, setAuthStatus] = useState('loading');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [clubesLaData, setClubesLaData] = useState([]);
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [isAddingBlacklist, setIsAddingBlacklist] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  // --- Edición de configuración del servidor ---
  const [drafts, setDrafts] = useState({});
  const [savingField, setSavingField] = useState(null);
  const [punish, setPunish] = useState([]);
  const [isAddingWwBlacklist, setIsAddingWwBlacklist] = useState(false);
  const [newLevel, setNewLevel] = useState('');
  const [newRole, setNewRole] = useState('');

  // --- Sistema de notificaciones (toasts) ---
  function showToast(type, title, message) {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => dismissToast(id), 4500);
  }
  function dismissToast(id) {
    setToasts(prev => prev.map(t => (t.id === id ? { ...t, closing: true } : t)));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 280);
  }
  // --- Modal de confirmación (sustituye al confirm() nativo) ---
  function askConfirm({ title, message, confirmLabel = 'Eliminar', onConfirm }) {
    setConfirmState({ title, message, confirmLabel, onConfirm });
  }

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(d => {
        if (!d || !d.user) {
          setAuthStatus('unauthenticated');
          router.push('/');
        } else if (!d.isAdmin) {
          setAuthStatus('unauthenticated');
          router.push('/');
        } else {
          setSession(d);
          setAuthStatus('authenticated');
        }
      })
      .catch(() => {
        setAuthStatus('unauthenticated');
        router.push('/');
      });
  }, [router]);

  useEffect(() => {
    if (authStatus === 'authenticated' && session?.isAdmin) {
      loadSection(section);
    }
  }, [section, authStatus, session]);

  // Inicializa los borradores editables al cargar la configuración.
  useEffect(() => {
    if (section === 'config' && data && !Array.isArray(data)) {
      setDrafts({
        nickname: data.nickname || '',
        modlog: data.modlog || '',
        welcome: data.welcome || '',
        clubsview: data.clubsview || '',
        cumch: data.cumch || '',
        cumrole: data.cumrole || '',
        eventsrol: data.eventsrol || '',
      });
      setPunish(
        Object.entries(data.punishments || {})
          .map(([k, v]) => ({ strike: String(k), type: v.type || 'mute', hours: v.duration ? Math.round(v.duration / 3600) : '' }))
          .sort((a, b) => parseInt(a.strike) - parseInt(b.strike))
      );
    }
    if ((section === 'werewolf' || section === 'werewolf_xp' || section === 'werewolf_blacklist') && data && !Array.isArray(data)) {
      setDrafts({
        allowed_channels: data.allowed_channels || [],
        mention_role_id: data.mention_role_id || '',
        canal_anuncios: data.canal_anuncios || '',
        mute_noche: data.mute_noche ?? true,
        mute_votacion: data.mute_votacion ?? true,
        mute_muertos: data.mute_muertos ?? true,
        level_roles: data.level_roles || {},
        prefix: data.prefix || 'ww',
        pts_victory: data.pts_victory ?? 15,
        pts_special_victory: data.pts_special_victory ?? 50,
        pts_round_alive: data.pts_round_alive ?? 2,
        pts_survive_end: data.pts_survive_end ?? 5,
        pts_enabled: data.pts_enabled ?? true,
        mention_cooldown: data.mention_cooldown ?? 900,
      });
    }
  }, [section, data]);

  async function saveConfigField(field) {
    setSavingField(field);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setServerConfig', field, value: drafts[field] }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.success) { showToast('success', 'Guardado', 'Configuración actualizada.'); loadSection('config'); }
      else showToast('error', 'No se pudo guardar', d.error || 'Ha ocurrido un error.');
    } catch { showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.'); }
    setSavingField(null);
  }

  async function saveNickname() {
    setSavingField('nickname');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setNickname', value: drafts.nickname }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.success) { showToast('success', 'Apodo actualizado', `El bot ahora se llama "${drafts.nickname || ''}".`); loadSection('config'); }
      else showToast('error', 'No se pudo cambiar el apodo', d.error || 'Ha ocurrido un error.');
    } catch { showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.'); }
    setSavingField(null);
  }

  async function savePunishments() {
    setSavingField('punishments');
    const obj = {};
    for (const row of (punish || [])) {
      if (!row.strike) continue;
      obj[String(row.strike)] = {
        type: row.type,
        duration: (row.hours === '' || row.hours === null || row.hours === undefined) ? null : Math.round(Number(row.hours) * 3600),
      };
    }
    try {
      const res = await fetch('/api/admin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setPunishments', punishments: obj }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.success) { showToast('success', 'Sanciones guardadas', 'Se actualizaron los castigos por strike.'); loadSection('config'); }
      else showToast('error', 'No se pudo guardar', d.error || 'Ha ocurrido un error.');
    } catch { showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.'); }
    setSavingField(null);
  }

  async function saveWerewolfConfig() {
    setSavingField('werewolf');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'setWerewolfConfig',
          werewolfConfig: {
            allowed_channels: drafts.allowed_channels || [],
            mention_role_id: drafts.mention_role_id || null,
            canal_anuncios: drafts.canal_anuncios || null,
            mute_noche: drafts.mute_noche === true,
            mute_votacion: drafts.mute_votacion === true,
            mute_muertos: drafts.mute_muertos === true,
            level_roles: drafts.level_roles || {},
            prefix: drafts.prefix || 'ww',
            pts_victory: Number(drafts.pts_victory) || 0,
            pts_special_victory: Number(drafts.pts_special_victory) || 0,
            pts_round_alive: Number(drafts.pts_round_alive) || 0,
            pts_survive_end: Number(drafts.pts_survive_end) || 0,
            pts_enabled: drafts.pts_enabled === true,
            mention_cooldown: Number(drafts.mention_cooldown) || 900,
          }
        })
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.success) {
        showToast('success', 'Guardado', 'Configuración de Werewolf actualizada.');
        loadSection('werewolf');
      } else {
        showToast('error', 'No se pudo guardar', d.error || 'Ha ocurrido un error.');
      }
    } catch {
      showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
    }
    setSavingField(null);
  }

  const updateLevelRole = (lvl, roleId) => {
    setDrafts(prev => ({
      ...prev,
      level_roles: {
        ...(prev.level_roles || {}),
        [lvl]: roleId
      }
    }));
  };

  const deleteLevelRole = (lvl) => {
    setDrafts(prev => {
      const updated = { ...(prev.level_roles || {}) };
      delete updated[lvl];
      return { ...prev, level_roles: updated };
    });
  };

  const addLevelRole = () => {
    if (!newLevel || !newRole) return;
    const lvlStr = String(parseInt(newLevel, 10));
    if (isNaN(lvlStr)) return;
    setDrafts(prev => ({
      ...prev,
      level_roles: {
        ...(prev.level_roles || {}),
        [lvlStr]: newRole
      }
    }));
    setNewLevel('');
    setNewRole('');
  };

  const addPunishRow = () => {
    const next = (punish && punish.length) ? Math.max(...punish.map(r => parseInt(r.strike) || 0)) + 1 : 1;
    setPunish([...(punish || []), { strike: String(next), type: 'mute', hours: '' }]);
  };
  const removePunishRow = (i) => setPunish(punish.filter((_, idx) => idx !== i));
  const updatePunishRow = (i, key, val) => setPunish(punish.map((r, idx) => idx === i ? { ...r, [key]: val } : r));

  const cfgChannelName = (id) => (data?.channels || []).find(c => c.id === String(id))?.name;
  const cfgRoleName = (id) => (data?.roles || []).find(r => r.id === String(id))?.name;

  function renderConfigSelect(field, label, icon, kind) {
    const options = kind === 'channel' ? (data?.channels || []) : (data?.roles || []);
    const prefix = kind === 'channel' ? '#' : '@';
    const current = data?.[field] || '';
    const draft = drafts[field] ?? '';
    const changed = String(draft) !== String(current);
    return (
      <div className="admin-card" style={{ borderLeft: `4px solid ${current ? '#3498db' : 'var(--border)'}` }}>
        <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{icon} {label}</div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
          <select value={draft} onChange={e => setDrafts(d => ({ ...d, [field]: e.target.value }))}
            style={{ flex: 1, minWidth: '160px', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
            <option value="">— Sin configurar —</option>
            {options.map(o => <option key={o.id} value={o.id}>{prefix}{o.name}</option>)}
          </select>
          <button className="btn-primary" disabled={!changed || savingField === field} onClick={() => saveConfigField(field)} style={{ padding: '10px 18px', borderRadius: '8px', margin: 0 }}>
            {savingField === field ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    );
  }

  async function loadSection(sec) {
    setLoading(true); setData(null);
    try {
      if (sec === 'overview') {
        const res = await fetch('/api/admin');
        const adminData = await res.json();
        
        let bsMemberCount = 0;
        let discordMemberCount = adminData.discordMemberCount || 0;
        try {
          const dRes = await fetch('/api/discord');
          const dData = await dRes.json();
          if (dData.memberCount) discordMemberCount = dData.memberCount;
          if (dData.bsMembers) bsMemberCount = dData.bsMembers;
        } catch {}

        setData({ ...adminData, bsMemberCount, discordMemberCount });
      } else if (sec === 'clubesla') {
        const res = await fetch('/api/clubs');
        setClubesLaData(await res.json());
      } else if (sec === 'werewolf' || sec === 'werewolf_xp' || sec === 'werewolf_blacklist') {
        const res = await fetch(`/api/admin?section=werewolf`);
        setData(await res.json());
      } else if (sec !== 'usercheck') {
        const res = await fetch(`/api/admin?section=${sec}`);
        setData(await res.json());
      }
    } catch {}
    setLoading(false);
  }

  async function searchUser(e) {
    e.preventDefault();
    if (!userId.trim()) return;
    setLoading(true); setUserData(null);
    try {
      const res = await fetch(`/api/admin?section=usercheck&userId=${userId}`);
      const d = await res.json();
      setUserData(d);
    } catch {}
    setLoading(false);
  }

  function formatTime(ts) {
    if (!ts) return '—';
    return new Date(ts * 1000).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  const groupedSideItems = {
    Discord: [
      { id: 'overview', icon: <ChartBarIcon style={{ width: 18, height: 18 }} />, label: 'Resumen' },
      { id: 'usercheck', icon: <MagnifyingGlassIcon style={{ width: 18, height: 18 }} />, label: 'Buscar Usuario' },
      { id: 'modlogs', icon: <ClipboardDocumentListIcon style={{ width: 18, height: 18 }} />, label: 'Historial de Mod.' },
      { id: 'config', icon: <Cog6ToothIcon style={{ width: 18, height: 18 }} />, label: 'Configuración' },
    ],
    Brawl: [
      { id: 'clubesla', icon: <BuildingLibraryIcon style={{ width: 18, height: 18 }} />, label: 'Clubes de LA' },
      { id: 'blacklist', icon: <NoSymbolIcon style={{ width: 18, height: 18 }} />, label: 'Blacklist' },
    ],
    Werewolf: [
      { id: 'werewolf', icon: <WolfIcon style={{ width: 18, height: 18 }} />, label: 'Configuración' },
      { id: 'werewolf_xp', icon: <SparklesIcon style={{ width: 18, height: 18 }} />, label: 'XP' },
      { id: 'werewolf_blacklist', icon: <NoSymbolIcon style={{ width: 18, height: 18 }} />, label: 'Blacklist' },
    ]
  };

  async function handleAddClub(e) {
    e.preventDefault();
    const tag = document.getElementById('newClubTag').value.trim();
    const key = document.getElementById('newClubKey').value.trim();
    if (!tag || !key) return;

    setIsAddingClub(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addClub', tag, key })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        document.getElementById('newClubTag').value = '';
        document.getElementById('newClubKey').value = '';
        showToast('success', 'Club añadido', `El club ${tag} se ha guardado en la base de datos.`);
        loadSection('clubesla');
      } else {
        showToast('error', 'No se pudo añadir', data.error || 'Ha ocurrido un error al guardar el club.');
      }
    } catch {
      showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
    }
    setIsAddingClub(false);
  }

  function handleRemoveClub(tag) {
    askConfirm({
      title: 'Eliminar club',
      message: `¿Seguro que quieres eliminar el club ${tag} de la base de datos? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar club',
      onConfirm: async () => {
        try {
          const res = await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'removeClub', tag })
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) {
            showToast('success', 'Club eliminado', `El club ${tag} se ha eliminado correctamente.`);
            loadSection('clubesla');
          } else {
            showToast('error', 'No se pudo eliminar', data.error || 'Ha ocurrido un error al eliminar el club.');
          }
        } catch {
          showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
        }
      }
    });
  }

  async function handleAddBlacklist(e) {
    e.preventDefault();
    const tag = document.getElementById('newBlTag').value.trim();
    const razon = document.getElementById('newBlReason').value.trim();
    if (!tag || !razon) return;

    setIsAddingBlacklist(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addBlacklist', tag, razon })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        document.getElementById('newBlTag').value = '';
        document.getElementById('newBlReason').value = '';
        showToast('success', 'Añadido a la blacklist', `${tag} se ha añadido correctamente.`);
        loadSection('blacklist');
      } else {
        showToast('error', 'No se pudo añadir', data.error || 'Ha ocurrido un error al añadir a la blacklist.');
      }
    } catch {
      showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
    }
    setIsAddingBlacklist(false);
  }

  function handleRemoveBlacklist(tag) {
    askConfirm({
      title: 'Eliminar de la blacklist',
      message: `¿Seguro que quieres quitar a ${tag} de la blacklist? El usuario podrá volver a participar.`,
      confirmLabel: 'Eliminar',
      onConfirm: async () => {
        try {
          const res = await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'removeBlacklist', tag })
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) {
            showToast('success', 'Eliminado de la blacklist', `${tag} se ha eliminado correctamente.`);
            loadSection('blacklist');
          } else {
            showToast('error', 'No se pudo eliminar', data.error || 'Ha ocurrido un error al eliminar de la blacklist.');
          }
        } catch {
          showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
        }
      }
    });
  }

  async function handleAddWwBlacklist(e) {
    e.preventDefault();
    const userIdInput = document.getElementById('newWwBlId').value.trim();
    const reasonInput = document.getElementById('newWwBlReason').value.trim();
    if (!userIdInput || !reasonInput) return;

    setIsAddingWwBlacklist(true);
    let resolvedName = `ID: ${userIdInput}`;
    try {
      const checkRes = await fetch(`/api/admin?section=usercheck&userId=${userIdInput}`);
      if (checkRes.ok) {
        const d = await checkRes.json();
        if (d.discordUser) {
          resolvedName = d.discordUser.global_name || d.discordUser.username || resolvedName;
        } else if (d.userInfo?.username) {
          resolvedName = d.userInfo.username;
        }
      }
    } catch (err) {
      console.warn("Could not pre-resolve username:", err);
    }
    setIsAddingWwBlacklist(false);

    askConfirm({
      title: '¿Añadir a la blacklist de Werewolf?',
      message: `¿Estás seguro de que quieres añadir al usuario "${resolvedName}" a la blacklist por el motivo: "${reasonInput}"?`,
      confirmLabel: 'Confirmar',
      onConfirm: () => {
        setTimeout(() => {
          askConfirm({
            title: '⚠️ Confirmación Final',
            message: `Por favor, confirma por segunda vez para añadir definitivamente al usuario "${resolvedName}" a la blacklist de Werewolf.`,
            confirmLabel: 'Añadir definitivamente',
            onConfirm: async () => {
              setIsAddingWwBlacklist(true);
              try {
                const res = await fetch('/api/admin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'addWerewolfBlacklist', userId: userIdInput, reason: reasonInput })
                });
                const d = await res.json().catch(() => ({}));
                if (res.ok && d.success) {
                  showToast('success', 'Añadido', `Usuario "${resolvedName}" añadido a la blacklist de Werewolf.`);
                  document.getElementById('newWwBlId').value = '';
                  document.getElementById('newWwBlReason').value = '';
                  loadSection('werewolf');
                } else {
                  showToast('error', 'No se pudo añadir', d.error || 'Ha ocurrido un error al añadir a la blacklist.');
                }
              } catch {
                showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
              }
              setIsAddingWwBlacklist(false);
            }
          });
        }, 150);
      }
    });
  }

  function handleRemoveWwBlacklist(userId, username) {
    const displayName = username || `ID: ${userId}`;
    askConfirm({
      title: '¿Eliminar de la blacklist de Werewolf?',
      message: `¿Estás seguro de que quieres quitar al usuario "${displayName}" de la blacklist de Werewolf? El usuario podrá volver a participar.`,
      confirmLabel: 'Eliminar',
      onConfirm: () => {
        setTimeout(() => {
          askConfirm({
            title: '⚠️ Confirmación Final',
            message: `Por favor, confirma por segunda vez para eliminar definitivamente al usuario "${displayName}" de la blacklist de Werewolf.`,
            confirmLabel: 'Eliminar definitivamente',
            onConfirm: async () => {
              try {
                const res = await fetch('/api/admin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'removeWerewolfBlacklist', userId })
                });
                const d = await res.json().catch(() => ({}));
                if (res.ok && d.success) {
                  showToast('success', 'Eliminado', `Usuario "${displayName}" eliminado de la blacklist de Werewolf.`);
                  loadSection('werewolf');
                } else {
                  showToast('error', 'No se pudo eliminar', d.error || 'Ha ocurrido un error al eliminar de la blacklist.');
                }
              } catch {
                showToast('error', 'Error de conexión', 'No se pudo contactar con el servidor.');
              }
            }
          });
        }, 150);
      }
    });
  }

  if (authStatus === 'loading' || !session?.isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
        <ClockIcon style={{ width: 48, height: 48, margin: '0 auto 1rem', animation: 'pulse 1.5s infinite' }} />
        <p>Comprobando credenciales de administrador...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '1rem' }}>
      {/* Notificaciones (toasts) */}
      <div className="toast-container" aria-live="polite" aria-atomic="false">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}${t.closing ? ' toast-closing' : ''}`} role="status">
            <span className="toast-icon">
              {t.type === 'success'
                ? <CheckCircleIcon style={{ width: 20, height: 20 }} />
                : t.type === 'error'
                  ? <XCircleIcon style={{ width: 20, height: 20 }} />
                  : <ExclamationTriangleIcon style={{ width: 20, height: 20 }} />}
            </span>
            <div className="toast-body">
              <div className="toast-title">{t.title}</div>
              {t.message && <div className="toast-msg">{t.message}</div>}
            </div>
            <button className="toast-close" onClick={() => dismissToast(t.id)} aria-label="Cerrar notificación">
              <XMarkIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal de confirmación */}
      {confirmState && (
        <div className="confirm-overlay" onClick={() => setConfirmState(null)} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <ExclamationTriangleIcon style={{ width: 26, height: 26 }} />
            </div>
            <h3 className="confirm-title" id="confirm-title">{confirmState.title}</h3>
            <p className="confirm-msg">{confirmState.message}</p>
            <div className="confirm-actions">
              <button className="confirm-btn confirm-btn-cancel" onClick={() => setConfirmState(null)}>
                Cancelar
              </button>
              <button
                className="confirm-btn confirm-btn-danger"
                onClick={() => { const fn = confirmState.onConfirm; setConfirmState(null); fn && fn(); }}
                autoFocus
              >
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${!adminSidebarOpen ? 'collapsed' : ''}`}>
          <div className="sidebar-title" onClick={() => setAdminSidebarOpen(!adminSidebarOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LockClosedIcon style={{ width: 20, height: 20 }} /> PANEL ADMIN</span>
            <span className="sidebar-toggle-icon" style={{ fontSize: '0.8rem', transition: 'transform 0.3s', transform: adminSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </div>
          {Object.entries(groupedSideItems).map(([category, items]) => (
            <div key={category} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginTop: '0.75rem',
                marginBottom: '0.5rem',
                paddingLeft: '0.75rem'
              }}>
                {category}
              </div>
              {items.map(s => (
                <button key={s.id}
                  className={`sidebar-item ${section === s.id ? 'active' : ''}`}
                  onClick={() => { setSection(s.id); setAdminSidebarOpen(false); }}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{s.icon} {s.label}</span>
                </button>
              ))}
            </div>
          ))}
          <div className="admin-sidebar-footer" style={{ padding: '1rem 0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              ⚠️ Panel de lectura/escritura. Los datos se obtienen y modifican directamente de la base de datos del bot.
            </p>
          </div>
        </aside>

        {/* Content */}
        <div>
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', animation: 'pulse 1.5s infinite', display: 'flex', justifyContent: 'center' }}>
                <ClockIcon style={{ width: 48, height: 48 }} />
              </div>
              <p>Cargando datos...</p>
            </div>
          )}

          {/* Overview */}
          {section === 'overview' && data && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ChartBarIcon style={{ width: 28, height: 28 }} /> Resumen General
              </h2>
              <div className="grid-3" style={{ marginBottom: '2rem' }}>
                <div className="stat-item"><span className="stat-value">{data.userCount || 0}</span><span className="stat-label">Usuarios con tag</span></div>
                <div className="stat-item"><span className="stat-value">{data.discordMemberCount || 0}</span><span className="stat-label">Miembros en Discord</span></div>
                <div className="stat-item"><span className="stat-value">{data.bsMemberCount || 0}</span><span className="stat-label">Miembros en BS</span></div>
                <div className="stat-item"><span className="stat-value">{data.clubCount || 0}</span><span className="stat-label">Clubes de LA</span></div>
                <div className="stat-item"><span className="stat-value">{data.modLogCount || 0}</span><span className="stat-label">Casos de moderación</span></div>
                <div className="stat-item"><span className="stat-value">{data.blacklistCount || 0}</span><span className="stat-label">Blacklist</span></div>
              </div>
            </>
          )}

          {/* Mod Logs */}
          {section === 'modlogs' && data && Array.isArray(data) && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardDocumentListIcon style={{ width: 28, height: 28 }} /> Historial de Mod.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {data.map((log, i) => (
                  <div key={i} style={{
                    background: '#313338',
                    borderRadius: '4px',
                    padding: '16px',
                    borderLeft: '4px solid #f39c12',
                    color: '#dbdee1',
                    fontFamily: 'gg sans, Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#f2f3f5', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>Miembro</strong>
                      <span style={{ color: '#dbdee1' }}>{log.memberName} (ID: {log.member_id})</span>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#f2f3f5', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>Moderador</strong>
                      <span style={{ color: '#dbdee1' }}>{log.modName} (ID: {log.moderator})</span>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <strong style={{ color: '#f2f3f5', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>Motivo</strong>
                      <span style={{ color: '#dbdee1' }}>{log.reason || '—'}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#f2f3f5', fontWeight: 600 }}>
                      <img src="/favicon.ico" alt="LA Bot" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                      <span>Caso ID: {log.case_id} — {log.type ? (log.type.charAt(0).toUpperCase() + log.type.slice(1)) : 'General'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Blacklist */}
          {section === 'blacklist' && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NoSymbolIcon style={{ width: 28, height: 28 }} /> Blacklist
              </h2>
              <div className="card" style={{ marginBottom: '20px', padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '10px', color: 'var(--accent-orange)' }}>Añadir a Blacklist</h3>
                <form onSubmit={handleAddBlacklist} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                  <input type="text" id="newBlTag" placeholder="#Tag" className="search-box" style={{ flex: 1, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                  <input type="text" id="newBlReason" placeholder="Razón" className="search-box" style={{ flex: 2, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                  <button type="submit" className="btn-primary" disabled={isAddingBlacklist} style={{ padding: '12px 24px', borderRadius: '8px', margin: 0 }}>
                    {isAddingBlacklist ? 'Añadiendo...' : 'Añadir'}
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} /> Blacklist ({Array.isArray(data) ? data.length : 0})
                </div>
                {/* Desktop table */}
                <table className="admin-table admin-table-desktop">
                  <thead><tr><th>Tag</th><th>Nombre</th><th>Razón</th><th>Acciones</th></tr></thead>
                  <tbody>
                    {(Array.isArray(data) ? data : []).map((b, i) => (
                      <tr key={i}>
                        <td style={{ color: 'var(--gold)' }}>{b.tag}</td>
                        <td style={{ fontWeight: '600' }}>{b.name || '—'}</td>
                        <td>{b.razon || '—'}</td>
                        <td>
                          <button onClick={() => handleRemoveBlacklist(b.tag)} className="btn-danger" style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Mobile cards */}
                <div className="admin-cards-mobile">
                  {(Array.isArray(data) ? data : []).map((b, i) => (
                    <div key={i} className="admin-entry-card">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>{b.tag}</span>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{b.name || '—'}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', wordBreak: 'break-word' }}>{b.razon || '—'}</div>
                      </div>
                      <button onClick={() => handleRemoveBlacklist(b.tag)} className="btn-danger" style={{ padding: '8px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrashIcon style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* User Check */}
          {section === 'usercheck' && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MagnifyingGlassIcon style={{ width: 28, height: 28 }} /> Buscar Usuario
              </h2>
              <form onSubmit={searchUser} className="search-box" style={{ marginBottom: '1.5rem' }}>
                <input type="text" value={userId} onChange={e => setUserId(e.target.value)}
                  placeholder="Introduce el ID de Discord del usuario" />
                <button type="submit">Buscar</button>
              </form>

              {userData && (
                <div style={{
                  background: '#313338',
                  borderRadius: '4px',
                  padding: '16px',
                  borderLeft: '4px solid #ed4245',
                  color: '#dbdee1',
                  fontFamily: 'gg sans, Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
                  maxWidth: '500px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  margin: '0 auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <img src="/favicon.ico" alt="LA Bot" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 600, color: '#f2f3f5' }}>LA Bot</span>
                    <span style={{ background: '#5865f2', fontSize: '0.65rem', padding: '2px 4px', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>APP</span>
                    <span style={{ fontSize: '0.75rem', color: '#949ba4' }}>Hoy a las {new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    {userData.discordUser && userData.discordUser.avatar ? (
                      <img src={`https://cdn.discordapp.com/avatars/${userData.discordUser.id}/${userData.discordUser.avatar}.png`} alt="User Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UsersIcon style={{ width: 14, height: 14, color: '#fff' }} />
                      </div>
                    )}
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f2f3f5' }}>
                      {userData.discordUser ? (userData.discordUser.global_name || userData.discordUser.username) : (userData.userInfo?.bs_tag || 'Usuario')}
                    </span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ color: '#f2f3f5', display: 'block', marginBottom: '8px' }}>Strikes ({userData.account?.strikes?.length || 0}):</strong>
                    {userData.account?.strikes?.length > 0 ? (
                      userData.account.strikes.map((s, i) => (
                        <div key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                          <span style={{ color: '#dbdee1', flexShrink: 0 }}>{s.case_id} -</span>
                          <code style={{ background: '#1e1f22', padding: '2px 4px', borderRadius: '3px', color: '#dbdee1', fontFamily: 'monospace', wordBreak: 'break-word' }}>{s.reason}</code>
                        </div>
                      ))
                    ) : <span style={{ color: '#949ba4' }}>Ninguno</span>}
                  </div>

                  <div style={{ marginBottom: '4px' }}>
                    <strong style={{ color: '#f2f3f5' }}>Mute:</strong> {userData.history?.some(h => h.type === 'mute') ? 'Si' : 'No'}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ color: '#f2f3f5' }}>Ban:</strong> {userData.history?.some(h => h.type === 'ban') ? 'Si' : 'No'}
                  </div>

                  <div>
                    <strong style={{ color: '#f2f3f5' }}>ID:</strong> {userId}
                  </div>
                </div>
              )}
            </>
          )}

              {/* Clubes de LA */}
          {section === 'clubesla' && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BuildingLibraryIcon style={{ width: 28, height: 28 }} /> Clubes de LA
              </h2>
              <div className="card" style={{ marginBottom: '20px', padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '10px', color: 'var(--accent-orange)' }}>Añadir Nuevo Club</h3>
                <form onSubmit={handleAddClub} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                  <input type="text" id="newClubTag" placeholder="Tag del Club (ej: #2YGR8C9)" className="search-box" style={{ flex: 1, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                  <input type="text" id="newClubKey" placeholder="Abreviatura/Nombre" className="search-box" style={{ flex: 1, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                  <button type="submit" className="btn-primary" disabled={isAddingClub} style={{ padding: '12px 24px', borderRadius: '8px', margin: 0 }}>
                    {isAddingClub ? 'Añadiendo...' : 'Añadir'}
                  </button>
                </form>
              </div>

              <div className="admin-card">
                <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} /> Clubes en Base de Datos ({clubesLaData?.length || 0})
                </div>
                {/* Desktop table */}
                <table className="admin-table admin-table-desktop">
                  <thead><tr><th>Tag</th><th>Abreviatura</th><th>Nombre Ingame</th><th>Trofeos</th><th>Acciones</th></tr></thead>
                  <tbody>
                    {(clubesLaData || []).map((c, i) => (
                      <tr key={i}>
                        <td style={{ color: 'var(--gold)' }}>{c.tag}</td>
                        <td>{c.key || '—'}</td>
                        <td>{c.name || '—'}</td>
                        <td>{c.trophies || '—'}</td>
                        <td>
                          <button onClick={() => handleRemoveClub(c.tag)} className="btn-danger" style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Mobile cards */}
                <div className="admin-cards-mobile">
                  {(clubesLaData || []).map((c, i) => (
                    <div key={i} className="admin-entry-card">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>{c.tag}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.key || '—'}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                          <span style={{ fontWeight: 600 }}>{c.name || '—'}</span>
                          <span style={{ color: 'var(--gold)' }}>🏆 {c.trophies?.toLocaleString() || '—'}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveClub(c.tag)} className="btn-danger" style={{ padding: '8px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrashIcon style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Config */}
          {section === 'config' && data && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cog6ToothIcon style={{ width: 28, height: 28 }} /> Configuración del Servidor
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Ajustes del bot en LA Spain. Los campos editables se guardan al instante (el apodo se cambia en Discord; el resto en la base de datos).
              </p>

              {/* Apodo del bot */}
              <div className="admin-card" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--gold)' }}>
                <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PencilSquareIcon style={{ width: 20, height: 20 }} /> Apodo del bot
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '6px 0 10px' }}>Nombre que muestra el bot dentro del servidor.</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <input value={drafts.nickname ?? ''} onChange={e => setDrafts(d => ({ ...d, nickname: e.target.value }))} placeholder="Apodo del bot" maxLength={32}
                    style={{ flex: 1, minWidth: '180px', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <button className="btn-primary" disabled={savingField === 'nickname' || (drafts.nickname || '') === (data.nickname || '')} onClick={saveNickname} style={{ padding: '10px 18px', borderRadius: '8px', margin: 0 }}>
                    {savingField === 'nickname' ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>

              {/* Canales y roles editables */}
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                {renderConfigSelect('modlog', 'Canal de ModLog', <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} />, 'channel')}
                {renderConfigSelect('welcome', 'Canal de LA Bot Log', <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} />, 'channel')}
                {renderConfigSelect('clubsview', 'Canal del Embed de Clubes', <BuildingLibraryIcon style={{ width: 20, height: 20 }} />, 'channel')}
                {renderConfigSelect('cumch', 'Canal de Cumpleaños', <CakeIcon style={{ width: 20, height: 20 }} />, 'channel')}
                {renderConfigSelect('cumrole', 'Rol de Cumpleañero', <CakeIcon style={{ width: 20, height: 20 }} />, 'role')}
                {renderConfigSelect('eventsrol', 'Rol del Dpto. de Eventos', <SparklesIcon style={{ width: 20, height: 20 }} />, 'role')}
              </div>

              {/* Información (solo lectura) */}
              <div className="admin-card" style={{ marginBottom: '1rem' }}>
                <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GlobeAltIcon style={{ width: 20, height: 20 }} /> Información (solo lectura)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '12px' }}>
                  {[
                    ['Global', data.global === null ? '—' : (data.global ? 'Sí' : 'No')],
                    ['Apodo automático (nick)', data.nick === null ? '—' : (data.nick ? 'Sí' : 'No')],
                    ['Canal de Blacklist', data.blchannel ? `#${cfgChannelName(data.blchannel) || data.blchannel}` : '—'],
                    ['Whitelist', data.whitelist ? (cfgRoleName(data.whitelist) ? `@${cfgRoleName(data.whitelist)}` : data.whitelist) : '—'],
                    ['Servidores sincronizados', (data.sync && data.sync.length) ? data.sync.join(', ') : '—'],
                  ].map(([label, value], i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{label}</p>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, wordBreak: 'break-word' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sanciones automáticas (editables) */}
              <div className="admin-card">
                <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ScaleIcon style={{ width: 20, height: 20 }} /> Sanciones Automáticas (por strikes)
                  </span>
                  <button onClick={addPunishRow} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)' }}>
                    <PlusIcon style={{ width: 14, height: 14 }} /> Añadir
                  </button>
                </div>
                <table className="admin-table" style={{ marginTop: '10px' }}>
                  <thead><tr><th>Strikes</th><th>Sanción</th><th>Duración (horas)</th><th></th></tr></thead>
                  <tbody>
                    {(punish || []).map((row, i) => (
                      <tr key={i}>
                        <td>
                          <input type="number" min="1" value={row.strike} onChange={e => updatePunishRow(i, 'strike', e.target.value)}
                            style={{ width: '70px', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </td>
                        <td>
                          <select value={row.type} onChange={e => updatePunishRow(i, 'type', e.target.value)}
                            style={{ padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                            <option value="mute">Mute</option>
                            <option value="ban">Ban</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" min="0" value={row.hours} placeholder="Permanente" onChange={e => updatePunishRow(i, 'hours', e.target.value)}
                            style={{ width: '120px', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </td>
                        <td>
                          <button onClick={() => removePunishRow(i)} className="btn-danger" style={{ padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrashIcon style={{ width: 16, height: 16 }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!punish || punish.length === 0) && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.5rem 0' }}>No hay sanciones configuradas. Pulsa «Añadir» para crear una.</p>
                )}
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Duración en horas; déjala vacía para una sanción permanente.</p>
                  <button className="btn-primary" disabled={savingField === 'punishments'} onClick={savePunishments} style={{ padding: '10px 20px', borderRadius: '8px', margin: 0 }}>
                    {savingField === 'punishments' ? 'Guardando...' : 'Guardar sanciones'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Werewolf Config */}
          {section === 'werewolf' && data && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WolfIcon style={{ width: 28, height: 28 }} />
                </span>
                Configuración de Werewolf
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Personaliza las opciones del bot de hombres lobo para este servidor.
              </p>

                  {/* Columnas del medio */}
                  <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                    
                    {/* Columna Izquierda: Canales Permitidos + Puntos */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      {/* Canales Permitidos */}
                      <div className="admin-card" style={{ borderLeft: '4px solid #3498db' }}>
                        <div className="admin-card-title">🌐 Canales Permitidos</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0 10px' }}>
                          Si no seleccionas ninguno, se podrá jugar en todos los canales.
                        </p>
                        
                        {/* Select and Add */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          <select id="add_allowed_channel_select" defaultValue=""
                            style={{ flex: 1, minWidth: '150px', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                            <option value="">— Selecciona un canal —</option>
                            {(data.channels || []).map(c => (
                              <option key={c.id} value={c.id}>#{c.name}</option>
                            ))}
                          </select>
                          <button type="button" className="btn-primary" style={{ padding: '8px 12px', borderRadius: '8px', margin: 0 }}
                            onClick={() => {
                              const sel = document.getElementById('add_allowed_channel_select');
                              const val = sel.value;
                              if (val && !drafts.allowed_channels?.includes(val)) {
                                const ch = (data.channels || []).find(c => String(c.id) === String(val));
                                const name = ch ? ch.name : val;
                                askConfirm({
                                  title: '¿Confirmar canal?',
                                  message: `¿Estás seguro de que quieres añadir el canal #${name} a la lista de canales permitidos?`,
                                  confirmLabel: 'Confirmar',
                                  onConfirm: () => {
                                    setTimeout(() => {
                                      askConfirm({
                                        title: '⚠️ Confirmación Final',
                                        message: `Por favor, confirma por segunda vez para añadir definitivamente el canal #${name}.`,
                                        confirmLabel: 'Añadir definitivamente',
                                        onConfirm: () => {
                                          setDrafts(prev => ({
                                            ...prev,
                                            allowed_channels: [...(prev.allowed_channels || []), val]
                                          }));
                                          sel.value = "";
                                        }
                                      });
                                    }, 150);
                                  }
                                });
                              }
                            }}>
                            Añadir
                          </button>
                        </div>
                        
                        {/* List of selected channels with remove buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                          {(drafts.allowed_channels || []).map(cid => {
                            const ch = (data.channels || []).find(c => String(c.id) === String(cid));
                            const name = ch ? ch.name : cid;
                            return (
                              <div key={cid} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.85rem', color: '#5dade2', fontWeight: 500 }}>#{name}</span>
                                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  onClick={() => {
                                    askConfirm({
                                      title: '¿Eliminar canal?',
                                      message: `¿Estás seguro de que quieres eliminar el canal #${name} de la lista de canales permitidos?`,
                                      confirmLabel: 'Eliminar',
                                      onConfirm: () => {
                                        setTimeout(() => {
                                          askConfirm({
                                            title: '⚠️ Confirmación Final',
                                            message: `Por favor, confirma por segunda vez para eliminar definitivamente el canal #${name}.`,
                                            confirmLabel: 'Eliminar definitivamente',
                                            onConfirm: () => {
                                              setDrafts(prev => ({
                                                ...prev,
                                                allowed_channels: (prev.allowed_channels || []).filter(x => x !== cid)
                                              }));
                                            }
                                          });
                                        }, 150);
                                      }
                                    });
                                  }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e74c3c" style={{ width: '18px', height: '18px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                          {(!drafts.allowed_channels || drafts.allowed_channels.length === 0) && (
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', padding: '4px' }}>Todos los canales permitidos</div>
                          )}
                        </div>
                      </div>

                      {/* Prefijo */}
                      <div className="admin-card" style={{ borderLeft: '4px solid #9b59b6' }}>
                        <div className="admin-card-title">✏️ Prefijo para comandos de texto</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '4px 0 10px' }}>
                          Prefijo para invocar comandos de texto (ej. cambiarás de `,ww` a `,lobos`). El prefijo global (ej. `,`) se mantiene.
                        </p>
                        <input type="text" value={drafts.prefix ?? 'ww'} onChange={e => setDrafts(prev => ({ ...prev, prefix: e.target.value }))} placeholder="ww" maxLength={10}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} />
                      </div>
                    </div>

                    {/* Columna Derecha: Canal Anuncios + Mention Rol & Cooldown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      {/* Canal Anuncios */}
                      <div className="admin-card" style={{ borderLeft: '4px solid var(--gold)' }}>
                        <div className="admin-card-title">📢 Canal de Anuncios</div>
                        <select value={drafts.canal_anuncios ?? ''} onChange={e => setDrafts(prev => ({ ...prev, canal_anuncios: e.target.value }))}
                          style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginTop: '6px' }}>
                          <option value="">— Sin configurar —</option>
                          {(data.channels || []).map(c => (
                            <option key={c.id} value={c.id}>#{c.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Mention Rol + Cooldown */}
                      <div className="admin-card" style={{ borderLeft: '4px solid #1abc9c', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <div className="admin-card-title">📡 Rol de Mención</div>
                          <select value={drafts.mention_role_id ?? ''} onChange={e => setDrafts(prev => ({ ...prev, mention_role_id: e.target.value }))}
                            style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginTop: '6px' }}>
                            <option value="">— Sin configurar —</option>
                            {(data.roles || []).map(r => (
                              <option key={r.id} value={r.id}>@{r.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="admin-card-title">⏳ Cooldown de Mención (segundos)</div>
                          <input type="number" min="0" value={drafts.mention_cooldown ?? 900} onChange={e => setDrafts(prev => ({ ...prev, mention_cooldown: e.target.value }))}
                            style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginTop: '6px' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parámetros del juego (Ancho completo) */}
                  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '4px solid #e74c3c' }}>
                    <div className="admin-card-title">⚙️ Parámetros del Juego</div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '6px' }}>
                      {[
                        ['mute_noche', 'Silenciar canal de Noche', 'Deshabilita la escritura al pueblo durante la noche.'],
                        ['mute_votacion', 'Silenciar canal en Votaciones', 'Deshabilita la escritura general durante la fase de votación.'],
                        ['mute_muertos', 'Silenciar a los Muertos', 'Silencia individualmente a los jugadores eliminados.'],
                      ].map(([field, label, desc]) => (
                        <div key={field} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{desc}</div>
                          </div>
                          <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                            <div style={{ position: 'relative' }}>
                              <input type="checkbox" checked={drafts[field] ?? true} onChange={e => setDrafts(prev => ({ ...prev, [field]: e.target.checked }))} style={{ opacity: 0, width: 0, height: 0 }} />
                              <div style={{ width: '40px', height: '20px', background: (drafts[field] ?? true) ? '#2ecc71' : '#e74c3c', borderRadius: '10px', transition: 'background-color 0.2s' }}></div>
                              <div style={{ position: 'absolute', top: '2px', left: (drafts[field] ?? true) ? '22px' : '2px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}></div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roles por Nivel (Ancho completo) */}
                  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '4px solid #3498db', marginTop: '1.5rem' }}>
                    <div className="admin-card-title">🎖️ Roles de Discord por Nivel</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '4px 0 10px' }}>
                      Configura los roles de Discord otorgados automáticamente al alcanzar un nivel determinado en el juego (se asignará solo el rol de nivel más alto alcanzado).
                    </p>
                    
                    {/* Lista de roles actuales */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                      {Object.entries(drafts.level_roles || {}).length === 0 ? (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
                          No hay roles configurados por nivel. El bot no asignará roles por nivel hasta que añadas alguno.
                        </div>
                      ) : (
                        Object.entries(drafts.level_roles || {})
                          .sort((a, b) => Number(a[0]) - Number(b[0]))
                          .map(([lvl, roleId]) => (
                            <div key={lvl} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, width: '80px', flexShrink: 0 }}>
                                Nivel {lvl}
                              </div>
                              <select value={roleId} onChange={e => updateLevelRole(lvl, e.target.value)}
                                style={{ flexGrow: 1, padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                                <option value="">— Seleccionar Rol —</option>
                                {(data.roles || []).map(r => (
                                  <option key={r.id} value={r.id}>@{r.name}</option>
                                ))}
                              </select>
                              <button type="button" onClick={() => deleteLevelRole(lvl)} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                                Eliminar
                              </button>
                            </div>
                          ))
                      )}
                    </div>

                    {/* Formulario para añadir uno nuevo */}
                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 120px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nivel</span>
                        <input type="number" min="1" placeholder="Ej: 5" value={newLevel} onChange={e => setNewLevel(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                      </div>
                      <div style={{ flex: '2 1 200px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Rol obtenido</span>
                        <select value={newRole} onChange={e => setNewRole(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                          <option value="">— Seleccionar Rol —</option>
                          {(data.roles || []).map(r => (
                            <option key={r.id} value={r.id}>@{r.name}</option>
                          ))}
                        </select>
                      </div>
                      <button type="button" onClick={addLevelRole} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, height: '38px', flexShrink: 0 }}>
                        + Añadir Rol
                      </button>
                    </div>
                  </div>

                </>
              )}

              {section === 'werewolf_xp' && data && !loading && (
                <>
                  <h2 className="section-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SparklesIcon style={{ width: 28, height: 28, color: 'var(--gold)' }} />
                    </span>
                    Configuración de XP de Werewolf
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Configura el sistema de XP y las cantidades obtenidas en las partidas.
                  </p>

                  <div className="admin-card" style={{ borderLeft: '4px solid var(--gold)', marginBottom: '1.5rem' }}>
                    <div className="admin-card-title">🏆 Configuración del Sistema de XP</div>
                    
                    <div style={{ opacity: drafts.pts_enabled ? 1 : 0.5, pointerEvents: drafts.pts_enabled ? 'auto' : 'none', transition: 'all 0.2s ease-in-out' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '12px', marginBottom: '16px' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Victoria Normal</span>
                          <input type="number" min="0" value={drafts.pts_victory ?? 15} onChange={e => setDrafts(prev => ({ ...prev, pts_victory: e.target.value }))}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Victoria Especial</span>
                          <input type="number" min="0" value={drafts.pts_special_victory ?? 50} onChange={e => setDrafts(prev => ({ ...prev, pts_special_victory: e.target.value }))}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Por Ronda Vivo</span>
                          <input type="number" min="0" value={drafts.pts_round_alive ?? 2} onChange={e => setDrafts(prev => ({ ...prev, pts_round_alive: e.target.value }))}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Extra Fin de Partida Vivo</span>
                          <input type="number" min="0" value={drafts.pts_survive_end ?? 5} onChange={e => setDrafts(prev => ({ ...prev, pts_survive_end: e.target.value }))}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Activar o desactivar el sistema de XP</span>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                        <div style={{ position: 'relative' }}>
                          <input type="checkbox" checked={drafts.pts_enabled ?? true} onChange={e => setDrafts(prev => ({ ...prev, pts_enabled: e.target.checked }))} style={{ opacity: 0, width: 0, height: 0 }} />
                          <div style={{ width: '40px', height: '20px', background: drafts.pts_enabled ? '#2ecc71' : '#e74c3c', borderRadius: '10px', transition: 'background-color 0.2s' }}></div>
                          <div style={{ position: 'absolute', top: '2px', left: drafts.pts_enabled ? '22px' : '2px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Botón de guardar todo */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="button" className="btn-primary" disabled={savingField === 'werewolf'} onClick={saveWerewolfConfig} style={{ padding: '12px 30px', borderRadius: '8px', margin: 0, fontSize: '0.95rem' }}>
                      {savingField === 'werewolf' ? 'Guardando...' : 'Guardar Configuración de XP'}
                    </button>
                  </div>
                </>
              )}

              {section === 'werewolf_blacklist' && data && !loading && (
                <>
                  <h2 className="section-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <WolfIcon style={{ width: 28, height: 28 }} />
                    </span>
                    Blacklist de Werewolf
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Gestión de la blacklist para evitar que ciertos usuarios jueguen a Werewolf.
                  </p>
                  
                  {/* Formulario de añadir */}
                  <div className="card" style={{ marginBottom: '20px', padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                    <h3 style={{ marginBottom: '10px', color: 'var(--accent-orange)', fontSize: '1.1rem', fontWeight: 700 }}>Añadir a la Blacklist de Werewolf</h3>
                    <form onSubmit={handleAddWwBlacklist} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                      <input type="text" id="newWwBlId" placeholder="ID de Discord (ej: 523883024106913813)" className="search-box" style={{ flex: 1, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                      <input type="text" id="newWwBlReason" placeholder="Razón de la blacklist" className="search-box" style={{ flex: 2, padding: '10px', borderRadius: '8px', margin: 0 }} required />
                      <button type="submit" className="btn-primary" disabled={isAddingWwBlacklist} style={{ padding: '12px 24px', borderRadius: '8px', margin: 0 }}>
                        {isAddingWwBlacklist ? 'Añadiendo...' : 'Añadir'}
                      </button>
                    </form>
                  </div>

                  {/* Tabla / Listado */}
                  <div className="admin-card">
                    <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} /> Blacklist Werewolf ({data.blacklist?.length || 0})
                    </div>
                    
                    {/* Desktop table */}
                    <table className="admin-table admin-table-desktop">
                      <thead>
                        <tr>
                          <th>Nombre de Usuario</th>
                          <th>Razón</th>
                          <th>Añadido Por</th>
                          <th>Fecha</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(data.blacklist || []).map((b, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: '600', color: 'var(--gold)' }}>{b.username || '—'}</td>
                            <td>{b.reason || '—'}</td>
                            <td style={{ fontSize: '0.85rem' }}>{b.added_by_name || '—'}</td>
                            <td style={{ fontSize: '0.85rem' }}>{formatTime(new Date(b.date_added).getTime() / 1000)}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleRemoveWwBlacklist(b._id, b.username)}
                                className="btn-danger"
                                style={{
                                  background: '#ef4444',
                                  color: '#fff',
                                  padding: '8px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'background 0.2s, transform 0.1s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
                                title="Eliminar de la blacklist"
                              >
                                <TrashIcon style={{ width: 16, height: 16 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile cards */}
                    <div className="admin-cards-mobile">
                      {(data.blacklist || []).map((b, i) => (
                        <div key={i} className="admin-entry-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gold)' }}>{b.username || '—'}</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', wordBreak: 'break-word' }}>
                              <strong>Motivo:</strong> {b.reason || '—'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Por: {b.added_by_name} • {formatTime(new Date(b.date_added).getTime() / 1000)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveWwBlacklist(b._id, b.username)}
                            className="btn-danger"
                            style={{
                              background: '#ef4444',
                              color: '#fff',
                              padding: '8px',
                              borderRadius: '8px',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                            title="Eliminar de la blacklist"
                          >
                            <TrashIcon style={{ width: 16, height: 16 }} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {(!data.blacklist || data.blacklist.length === 0) && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
                        No hay ningún usuario en la blacklist de Werewolf.
                      </p>
                    )}
                  </div>
                </>
              )}

        </div>
      </div>
    </div>
  );
}
