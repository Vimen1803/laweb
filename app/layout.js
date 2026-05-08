import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'LA Spain',
  description: 'La comunidad hispana de clubes más grande de Brawl Stars. Fundada el 4 de mayo de 2019.',
  icons: { icon: '/la-icon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
