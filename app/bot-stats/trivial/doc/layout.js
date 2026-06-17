'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/trivial-doc.css';

const NAV = [
  { href: '/bot-stats/trivial/doc', label: 'Inicio', exact: true },
  { href: '/bot-stats/trivial/doc/jugar', label: 'Cómo jugar' },
  { href: '/bot-stats/trivial/doc/comandos', label: 'Comandos' },
  { href: '/bot-stats/trivial/doc/ranking', label: 'Ranking' },
];

export default function TrivialDocLayout({ children }) {
  const path = usePathname();

  return (
    <div className="tv">
      <nav className="tv-nav">
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
    </div>
  );
}
