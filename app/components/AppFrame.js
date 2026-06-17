'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Las documentaciones de Wordle y Werewolf son "sub-sitios" independientes con
// su propia cabecera, navegación y footer; en esas rutas ocultamos el chrome
// principal para que se vean a pantalla completa. La doc de Trivial, en cambio,
// se integra en el sitio normal (usa el navbar/footer principales).
const isDocRoute = (p) => /^\/bot-stats\/(werewolf|wordle)\/doc(\/|$)/.test(p || '');

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
