import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/favicon.ico" alt="LA Spain" width={28} height={28} style={{ borderRadius: '50%' }} />
            LA Spain
          </div>
          <p className="footer-desc">
            La comunidad hispana de clubes más grande de Brawl Stars. Fundada el 4 de mayo de 2019.
            Parte de LA Gaming, una organización internacional &quot;by gamers, for gamers&quot;.
          </p>
        </div>
        <div>
          <div className="footer-title">Navegación</div>
          <ul className="footer-links">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/comandos">Comandos</Link></li>
            <li><Link href="/normas">Normas</Link></li>
            <li><Link href="/sponsors">Sponsors</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Comunidad</div>
          <ul className="footer-links">
            <li><Link href="/roles">Roles</Link></li>
            <li><Link href="/brawlstars">Brawl Stars</Link></li>
            <li><Link href="/bot-stats">Bot Stats</Link></li>
            <li><Link href="/reviews">Reseñas</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">Redes</div>
          <ul className="footer-links">
            <li><a href="https://discord.gg/DbRUker" target="_blank" rel="noopener">Discord</a></li>
            <li><a href="https://x.com/LASpain_" target="_blank" rel="noopener">Twitter / X</a></li>
            <li><a href="https://www.tiktok.com/@laspain_" target="_blank" rel="noopener">TikTok</a></li>
            <li><a href="https://brawl-stars-club.fandom.com/wiki/LA_Spain_(Club_Family)" target="_blank" rel="noopener">Wiki</a></li>
            <li><a href="https://lagaming.com/" target="_blank" rel="noopener">LA Gaming</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} LA Spain. Todos los derechos reservados.
      </div>
    </footer>
  );
}
