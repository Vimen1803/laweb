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
    if (section === 'werewolf' && data && !Array.isArray(data)) {
      setDrafts({
        allowed_channels: data.allowed_channels || [],
        mention_role_id: data.mention_role_id || '',
        canal_anuncios: data.canal_anuncios || '',
        mute_noche: data.mute_noche ?? true,
        mute_votacion: data.mute_votacion ?? true,
        mute_muertos: data.mute_muertos ?? true,
        logros_enabled: data.logros_enabled ?? true,
        prefix: data.prefix || 'ww',
        pts_victory: data.pts_victory ?? 15,
        pts_special_victory: data.pts_special_victory ?? 50,
        pts_round_alive: data.pts_round_alive ?? 2,
        pts_survive_end: data.pts_survive_end ?? 5,
        pts_enabled: data.pts_enabled ?? true,
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
            logros_enabled: drafts.logros_enabled === true,
            prefix: drafts.prefix || 'ww',
            pts_victory: Number(drafts.pts_victory) || 0,
            pts_special_victory: Number(drafts.pts_special_victory) || 0,
            pts_round_alive: Number(drafts.pts_round_alive) || 0,
            pts_survive_end: Number(drafts.pts_survive_end) || 0,
            pts_enabled: drafts.pts_enabled === true,
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

  const sideItems = [
    { id: 'overview', icon: <ChartBarIcon style={{ width: 18, height: 18 }} />, label: 'Resumen' },
    { id: 'usercheck', icon: <MagnifyingGlassIcon style={{ width: 18, height: 18 }} />, label: 'Buscar Usuario' },
    { id: 'clubesla', icon: <BuildingLibraryIcon style={{ width: 18, height: 18 }} />, label: 'Clubes de LA' },
    { id: 'blacklist', icon: <NoSymbolIcon style={{ width: 18, height: 18 }} />, label: 'Blacklist' },
    { id: 'modlogs', icon: <ClipboardDocumentListIcon style={{ width: 18, height: 18 }} />, label: 'Historial de Mod.' },
    { id: 'config', icon: <Cog6ToothIcon style={{ width: 18, height: 18 }} />, label: 'Configuración' },
    { id: 'werewolf', icon: <SparklesIcon style={{ width: 18, height: 18 }} />, label: 'Werewolf' },
  ];

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
          {sideItems.map(s => (
            <button key={s.id}
              className={`sidebar-item ${section === s.id ? 'active' : ''}`}
              onClick={() => { setSection(s.id); setAdminSidebarOpen(false); }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{s.icon} {s.label}</span>
            </button>
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
                🐺 Configuración de Werewolf
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Personaliza las opciones del bot de hombres lobo para este servidor.
              </p>

              <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
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
                          setDrafts(prev => ({
                            ...prev,
                            allowed_channels: [...(prev.allowed_channels || []), val]
                          }));
                          sel.value = "";
                        }
                      }}>
                      Añadir
                    </button>
                  </div>
                  
                  {/* List of selected channels with remove buttons */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {(drafts.allowed_channels || []).map(cid => {
                      const ch = (data.channels || []).find(c => String(c.id) === String(cid));
                      return (
                        <span key={cid} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 152, 219, 0.2)', color: '#5dade2', padding: '4px 8px', borderRadius: '16px', fontSize: '0.8rem', border: '1px solid rgba(52,152,219,0.3)' }}>
                          #{ch ? ch.name : cid}
                          <button type="button" style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}
                            onClick={() => {
                              setDrafts(prev => ({
                                ...prev,
                                allowed_channels: prev.allowed_channels.filter(x => x !== cid)
                              }));
                            }}>
                            ×
                          </button>
                        </span>
                      );
                    })}
                    {(!drafts.allowed_channels || drafts.allowed_channels.length === 0) && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Todos los canales permitidos</span>
                    )}
                  </div>
                </div>

                {/* Canal de Anuncios y Rol de Mención */}
                <div className="admin-card" style={{ borderLeft: '4px solid var(--gold)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div className="admin-card-title">📢 Canal de Anuncios</div>
                    <select value={drafts.canal_anuncios ?? ''} onChange={e => setDrafts(prev => ({ ...prev, canal_anuncios: e.target.value }))}
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginTop: '6px' }}>
                      <option value="">— Sin configurar —</option>
                      {(data.channels || []).map(c => (
                        <option key={c.id} value={c.id}>#{c.name}</option>
                      ))}
                    </select>
                  </div>
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
                </div>
              </div>

              {/* Toggles y Prefijo */}
              <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                {/* Flags/Toggles */}
                <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="admin-card-title">⚙️ Parámetros del Juego</div>
                  
                  {[
                    ['mute_noche', 'Silenciar canal de Noche', 'Deshabilita la escritura al pueblo durante la noche.'],
                    ['mute_votacion', 'Silenciar canal en Votaciones', 'Deshabilita la escritura general durante la fase de votación.'],
                    ['mute_muertos', 'Silenciar a los Muertos', 'Silencia individualmente a los jugadores eliminados.'],
                    ['logros_enabled', 'Habilitar Roles de Logro', 'Concede roles automáticos según victorias acumuladas.'],
                    ['pts_enabled', 'Habilitar Puntos de Evento', 'Activa la acumulación y guardado de puntos por partida.'],
                  ].map(([field, label, desc]) => (
                    <label key={field} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.01)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <input type="checkbox" checked={drafts[field] ?? true} onChange={e => setDrafts(prev => ({ ...prev, [field]: e.target.checked }))}
                        style={{ marginTop: '4px', width: '16px', height: '16px', cursor: 'pointer' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Prefijo y Puntos */}
                <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div className="admin-card-title">✏️ Prefijo para comandos de texto</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '4px 0 6px' }}>
                      Prefijo para invocar comandos de texto (ej. cambiarás de `,ww` a `,lobos`). El prefijo global (ej. `,`) se mantiene.
                    </p>
                    <input type="text" value={drafts.prefix ?? 'ww'} onChange={e => setDrafts(prev => ({ ...prev, prefix: e.target.value }))} placeholder="ww" maxLength={10}
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  </div>
                  
                  <div>
                    <div className="admin-card-title">🏆 Puntos del Evento</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Victoria Normal</span>
                        <input type="number" min="0" value={drafts.pts_victory ?? 15} onChange={e => setDrafts(prev => ({ ...prev, pts_victory: e.target.value }))}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Victoria Especial</span>
                        <input type="number" min="0" value={drafts.pts_special_victory ?? 50} onChange={e => setDrafts(prev => ({ ...prev, pts_special_victory: e.target.value }))}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Por Ronda Vivo</span>
                        <input type="number" min="0" value={drafts.pts_round_alive ?? 2} onChange={e => setDrafts(prev => ({ ...prev, pts_round_alive: e.target.value }))}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Extra Fin de Partida Vivo</span>
                        <input type="number" min="0" value={drafts.pts_survive_end ?? 5} onChange={e => setDrafts(prev => ({ ...prev, pts_survive_end: e.target.value }))}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de guardar todo */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn-primary" disabled={savingField === 'werewolf'} onClick={saveWerewolfConfig} style={{ padding: '12px 30px', borderRadius: '8px', margin: 0, fontSize: '0.95rem' }}>
                  {savingField === 'werewolf' ? 'Guardando...' : 'Guardar Configuración de Werewolf'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
