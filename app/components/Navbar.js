'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const path = usePathname();

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(d => setSession(d))
      .catch(() => {});
  }, []);

  // Hemos eliminado la sección de Sponsors de aquí por completo
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/brawlstars', label: 'Brawl Stars' },
    { href: '/bot-stats', label: 'Bot Stats' },
    { href: '/comandos', label: 'Comandos' },
    { href: '/dc-info', label: 'DC Info' },
    { href: '/reviews', label: 'Reseñas' },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <img src="/favicon.ico" alt="LA Spain" width={32} height={32} style={{ borderRadius: '50%' }} />
        <span>LA <span>Spain</span></span>
      </Link>

      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={path === l.href ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        {session?.isAdmin && (
          <Link
            href="/admin"
            className={path.startsWith('/admin') ? 'active' : ''}
            onClick={() => setOpen(false)}
            style={{ color: 'var(--accent-orange)' }}
          >
            Panel Admin
          </Link>
        )}
      </div>

      <div className="nav-auth">
        {session?.user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {session.user.image && (
              <img src={session.user.image} alt="" className="nav-avatar" />
            )}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {session.user.name}
            </span>
            <a href={`/api/auth/signout?callbackUrl=${path}`} className="btn-logout">
              Salir
            </a>
          </div>
        ) : (
          <a href={`/api/auth/signin?callbackUrl=${path}`} className="btn-login">
            Acceder
          </a>
        )}
      </div>
    </nav>
  );
}