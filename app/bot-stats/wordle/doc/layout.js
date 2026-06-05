'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/wordle-doc.css';

const NAV = [
  { href: '/bot-stats/wordle/doc', label: 'Inicio', exact: true },
  { href: '/bot-stats/wordle/doc/modos', label: 'Modos' },
  { href: '/bot-stats/wordle/doc/puntuacion', label: 'Puntuación' },
  { href: '/bot-stats/wordle/doc/comandos', label: 'Comandos' },
  { href: '/bot-stats/wordle/doc/normas', label: 'Normas' },
];

// W O R D L E con la combinación de colores característica
const WORDMARK = [
  ['W', 'g'], ['O', 'k'], ['R', 'y'], ['D', 'g'], ['L', 'k'], ['E', 'g'],
];

export default function WordleDocLayout({ children }) {
  const path = usePathname();

  return (
    <div className="wd">
      <header className="wd-header">
        <Link href="/" className="wd-brand">
          <img src="/la-icon.png" alt="LA Spain" />
          <span>LA Spain</span>
        </Link>
        <div className="wd-wordmark" aria-label="Wordle">
          {WORDMARK.map(([ch, c], i) => (
            <span key={i} className={`wd-wm-tile ${c}`}>{ch}</span>
          ))}
        </div>
        <a href="https://discord.gg/DbRUker" className="wd-discord" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.06,72.06,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.39,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.52-51.27-19.07-72.13ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.44-12.67S96.22,46,96,53,90.89,65.69,84.69,65.69Z" /></svg>
          Discord
        </a>
      </header>

      <nav className="wd-nav">
        {NAV.map(n => {
          const active = n.exact ? path === n.href : path === n.href || path?.startsWith(n.href + '/');
          return (
            <Link key={n.href} href={n.href} className={active ? 'active' : ''}>
              {n.label}
            </Link>
          );
        })}
      </nav>

      {children}

      <footer className="wd-footer">
        © 2026 LA Spain · Wordle — la comunidad de la <strong>CMD Gang</strong>. <Link href="/">Volver a laweb</Link>
      </footer>
    </div>
  );
}
