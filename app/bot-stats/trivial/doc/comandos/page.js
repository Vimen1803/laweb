'use client';
import { useState } from 'react';
import { TRIVIAL_COMMANDS, TRIVIAL_CMD_CATEGORIES } from '../data';

export default function TrivialComandos() {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(null);

  const q = search.toLowerCase();
  const filtered = TRIVIAL_COMMANDS.filter(c =>
    (cat === 'all' || c.cat === cat) &&
    (c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
  );

  return (
    <main className="tv-main tv-fade">
      <span className="tv-eyebrow">▪ Referencia</span>
      <h1 className="tv-section-title">Comandos</h1>
      <p className="tv-section-sub">Todos los comandos del Trivial. Pulsa en uno para ver su descripción, parámetros y ejemplos.</p>

      <div className="tv-search">
        <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
        <input type="text" placeholder="Buscar comando..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Buscar comando" />
      </div>

      <div className="tv-chips">
        {TRIVIAL_CMD_CATEGORIES.map(c => (
          <button key={c.id} className={`tv-chip ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="tv-empty">No se han encontrado comandos.</p>
      ) : (
        <div className="tv-cmds">
          {filtered.map(cmd => {
            const isOpen = open === cmd.id;
            return (
              <div key={cmd.id} className={`tv-cmd ${isOpen ? 'open' : ''}`}>
                <div className="tv-cmd-head" role="button" tabIndex={0} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : cmd.id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? null : cmd.id); } }}>
                  <span className="tv-cmd-name">{cmd.name}</span>
                  <span className="tv-cmd-desc">{cmd.desc}</span>
                  <span className="tv-cmd-tag">{cmd.cat}</span>
                  <svg className="tv-cmd-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="tv-cmd-body">
                  <div className="tv-cmd-bi">
                    <div className="tv-cmd-detail">
                      <h5>Descripción</h5>
                      <p>{cmd.long_desc}</p>
                      {cmd.params.length > 0 && (
                        <>
                          <h5>Parámetros</h5>
                          {cmd.params.map((p, i) => (
                            <div className="tv-param" key={i}><strong>{p.name}</strong> — {p.desc}{p.optional ? ' (opcional)' : ''}</div>
                          ))}
                        </>
                      )}
                      <h5>Ejemplos</h5>
                      <div className="tv-examples">
                        {cmd.examples.map((ex, i) => <code key={i}>{ex}</code>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
