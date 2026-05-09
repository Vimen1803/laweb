'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, ClipboardDocumentListIcon, MagnifyingGlassIcon, 
  Cog6ToothIcon, UsersIcon, ShieldExclamationIcon, SpeakerWaveIcon, 
  SpeakerXMarkIcon, ExclamationTriangleIcon, FlagIcon, 
  NoSymbolIcon, WrenchScrewdriverIcon, QuestionMarkCircleIcon, 
  IdentificationIcon, ScaleIcon, ClockIcon, LockClosedIcon, DocumentTextIcon,
  BuildingLibraryIcon, TrashIcon
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
  ];

  async function handleAddClub(e) {
    e.preventDefault();
    const tag = document.getElementById('newClubTag').value.trim();
    const key = document.getElementById('newClubKey').value.trim();
    if (!tag || !key) return;
    
    setIsAddingClub(true);
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addClub', tag, key })
      });
      document.getElementById('newClubTag').value = '';
      document.getElementById('newClubKey').value = '';
      loadSection('clubesla');
    } catch {}
    setIsAddingClub(false);
  }

  async function handleRemoveClub(tag) {
    if (!confirm(`¿Eliminar club ${tag}?`)) return;
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'removeClub', tag })
      });
      loadSection('clubesla');
    } catch {}
  }

  async function handleAddBlacklist(e) {
    e.preventDefault();
    const tag = document.getElementById('newBlTag').value.trim();
    const razon = document.getElementById('newBlReason').value.trim();
    if (!tag || !razon) return;
    
    setIsAddingBlacklist(true);
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addBlacklist', tag, razon })
      });
      document.getElementById('newBlTag').value = '';
      document.getElementById('newBlReason').value = '';
      loadSection('blacklist');
    } catch {}
    setIsAddingBlacklist(false);
  }

  async function handleRemoveBlacklist(tag) {
    if (!confirm(`¿Eliminar de blacklist ${tag}?`)) return;
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'removeBlacklist', tag })
      });
      loadSection('blacklist');
    } catch {}
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
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cog6ToothIcon style={{ width: 28, height: 28 }} /> Configuración
              </h2>
              <div className="grid-2">
                <div className="admin-card">
                  <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClipboardDocumentListIcon style={{ width: 20, height: 20 }} /> Canal ModLog
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>ID: <span style={{ color: 'var(--gold)' }}>{data.modlog || 'No configurado'}</span></p>
                </div>
                <div className="admin-card">
                  <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SpeakerXMarkIcon style={{ width: 20, height: 20 }} /> Rol Mute
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>ID: <span style={{ color: 'var(--gold)' }}>{data.muterole || 'No configurado'}</span></p>
                </div>
              </div>
              {data.punishments && Object.keys(data.punishments).length > 0 && (
                <div className="admin-card" style={{ marginTop: '1rem' }}>
                  <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ScaleIcon style={{ width: 20, height: 20 }} /> Sanciones Automáticas
                  </div>
                  <table className="admin-table">
                    <thead><tr><th>Strike #</th><th>Tipo</th><th>Duración</th></tr></thead>
                    <tbody>
                      {Object.entries(data.punishments).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([num, p], i) => (
                        <tr key={i}>
                          <td style={{ color: 'var(--gold)' }}>{num}</td>
                          <td>{p.type}</td>
                          <td>{p.duration ? `${Math.round(p.duration / 3600)}h` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Users */}
          {section === 'users' && data && Array.isArray(data) && !loading && (
            <>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UsersIcon style={{ width: 28, height: 28 }} /> Usuarios con Tag BS ({data.length})
              </h2>
              <div className="admin-card">
                <table className="admin-table">
                  <thead><tr><th>Discord ID</th><th>Tag BS</th><th>Alt Tag</th></tr></thead>
                  <tbody>
                    {data.map((u, i) => (
                      <tr key={i} style={{ cursor: 'pointer' }}
                        onClick={() => { setUserId(String(u.member_id)); setSection('usercheck'); }}>
                        <td>{u.member_id}</td>
                        <td style={{ color: 'var(--gold)' }}>{u.bs_tag || '—'}</td>
                        <td>{u.bs_alt_tag || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
