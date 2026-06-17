'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Las documentaciones de los minijuegos (/bot-stats/{wordle,werewolf,trivial}/doc)
// son "sub-sitios" independientes con su propia cabecera, navegación y footer.
// En esas rutas ocultamos el chrome principal para que se vean a pantalla completa.
const isDocRoute = (p) => /^\/bot-stats\/(werewolf|wordle|trivial)\/doc(\/|$)/.test(p || '');

export default function AppFrame({ children }) {
  const path = usePathname();

  if (isDocRoute(path)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
