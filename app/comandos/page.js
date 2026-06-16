'use client';
import { useState, useMemo } from 'react';
import commandsData from '@/lib/commands-data';

export default function ComandosPage() {
  const [activeCog, setActiveCog] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCmd, setSelectedCmd] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Categorías ordenadas alfabéticamente (sidebar y listado).
  const cogs = useMemo(() => Object.keys(commandsData).sort((a, b) => a.localeCompare(b, 'es')), []);
  const totalCommands = useMemo(() => Object.values(commandsData).reduce((s, c) => s + c.commands.length, 0), []);

  const filteredCommands = useMemo(() => {
    let cmds = [];
    // Recorremos las categorías en orden alfabético para que el listado salga
    // agrupado por categoría.
    const orderedCogs = activeCog ? [activeCog] : cogs;
    for (const cogName of orderedCogs) {
      const cog = commandsData[cogName];
      if (!cog) continue;
      for (const cmd of cog.commands) {
        cmds.push({ ...cmd, cogName, cogIcon: cog.icon });
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      cmds = cmds.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.aliases.some(a => a.toLowerCase().includes(q))
      );
    }
    return cmds;
  }, [activeCog, search, cogs]);

  return (
    <div style={{ paddingTop: '1rem' }}>
      <div className="commands-layout">
        {/* Sidebar */}
        <aside className={`commands-sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
          <div className="sidebar-title" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>CATEGORÍAS</span>
            <span className="sidebar-toggle-icon" style={{ fontSize: '0.8rem', transition: 'transform 0.3s', transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </div>
          <button
            className={`sidebar-item ${activeCog === null ? 'active' : ''}`}
            onClick={() => { setActiveCog(null); setSidebarOpen(false); }}
          >
            <span><span className="sidebar-icon">🌐</span> Ver Todos</span>
            <span className="sidebar-count">{totalCommands}</span>
          </button>
          {cogs.map(cog => (
            <button
              key={cog}
              className={`sidebar-item ${activeCog === cog ? 'active' : ''}`}
              onClick={() => { setActiveCog(cog); setSidebarOpen(false); }}
            >
              <span><span className="sidebar-icon">{commandsData[cog].icon}</span> {cog}</span>
              <span className="sidebar-count">{commandsData[cog].commands.length}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div>
          {/* Search */}
          <div className="cmd-search">
            <span className="cmd-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar comando o descripción..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Command grid */}
          <div className="grid-3">
            {filteredCommands.map((cmd, i) => (
              <div key={i} className="cmd-card" onClick={() => setSelectedCmd(cmd)}>
                <div className="cmd-card-header">
                  <span className="cmd-name">,{cmd.name}</span>
                  <span className="cmd-badge">{cmd.category}</span>
                </div>
                <p className="cmd-desc">{cmd.description}</p>
                <p className="cmd-hint">Haz clic para ver detalles</p>
              </div>
            ))}
          </div>

          {filteredCommands.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>No se encontraron comandos</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedCmd && (
        <div className="modal-overlay" onClick={() => setSelectedCmd(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCmd(null)}>✕</button>

            <div className="modal-cmd-name">,{selectedCmd.name}</div>

            {selectedCmd.aliases.length > 0 && (
              <>
                <div className="modal-section-label">ALIAS</div>
                <div className="modal-aliases">
                  {selectedCmd.aliases.map((a, i) => (
                    <span key={i} className="modal-alias">,{a}</span>
                  ))}
                </div>
              </>
            )}

            <div className="modal-section-label">DESCRIPCIÓN</div>
            <p className="modal-desc">{selectedCmd.description}</p>

            <div className="modal-section-label">USO</div>
            <div className="modal-param">
              <span className="modal-param-name" style={{ fontFamily: 'monospace' }}>{selectedCmd.usage}</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="modal-section-label">EJEMPLOS DE USO</div>
              <div className="modal-example">
                {selectedCmd.example}
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Categoría:</span>
              <span className="cmd-badge">{selectedCmd.cogName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
