import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'LA Spain - La mayor comunidad de Brawl Stars',
  description: 'La comunidad hispana de clubes más grande de Brawl Stars. Fundada el 4 de mayo de 2019. Únete a nuestra familia de más de 15 clubes y compite al más alto nivel.',
  metadataBase: new URL('https://laweb-eta.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LA Spain - La mayor comunidad de Brawl Stars',
    description: 'La comunidad hispana de clubes más grande de Brawl Stars. Únete a nuestra familia de más de 15 clubes y compite al más alto nivel.',
    url: 'https://laweb-eta.vercel.app',
    siteName: 'LA Spain',
    images: [
      {
        url: '/lashare.png',
        width: 512,
        height: 512,
        alt: 'LA Spain Logo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA Spain - La mayor comunidad de Brawl Stars',
    description: 'La comunidad hispana de clubes más grande de Brawl Stars. Únete a nuestra familia de más de 15 clubes y compite al más alto nivel.',
    images: ['/lashare.png'],
    creator: '@Viiictooor18',
  },
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
