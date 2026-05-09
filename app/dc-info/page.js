'use client';
import Link from 'next/link';
import { ShieldCheckIcon, UserGroupIcon, ArrowRightIcon, BookOpenIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

export default function DCInfoPage() {
  return (
    <section className="section" style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>DC Info</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Todo lo que necesitas saber sobre nuestra comunidad</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* NORMAS */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--gold)' }}>
          <div style={{ background: 'rgba(201,168,76,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <ShieldCheckIcon style={{ width: 30, height: 30, color: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem', fontFamily: 'Outfit, sans-serif' }}>Normas</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5', flexGrow: 1 }}>
            Reglamento oficial. Mantener un ambiente sano es nuestra prioridad.
          </p>
          <Link href="/normas" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
            Reglas <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* ROLES */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid #3498db' }}>
          <div style={{ background: 'rgba(52,152,219,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <UserGroupIcon style={{ width: 30, height: 30, color: '#3498db' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem', fontFamily: 'Outfit, sans-serif' }}>Roles</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5', flexGrow: 1 }}>
            Descubre los rangos, medallas y roles especiales de la comunidad.
          </p>
          <Link href="/roles" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', fontWeight: 700, fontSize: '0.9rem' }}>
            Ver Roles <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* ABOUT US */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid #e74c3c' }}>
          <div style={{ background: 'rgba(231,76,60,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <BookOpenIcon style={{ width: 30, height: 30, color: '#e74c3c' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem', fontFamily: 'Outfit, sans-serif' }}>About Us</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5', flexGrow: 1 }}>
            Conoce nuestra historia y los valores que nos definen desde 2019.
          </p>
          <Link href="/about" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', fontWeight: 700, fontSize: '0.9rem' }}>
            Historia <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* FAQ */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid #2ecc71' }}>
          <div style={{ background: 'rgba(46,204,113,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <QuestionMarkCircleIcon style={{ width: 30, height: 30, color: '#2ecc71' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem', fontFamily: 'Outfit, sans-serif' }}>FAQ</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5', flexGrow: 1 }}>
            Resolvemos las dudas más frecuentes de los nuevos miembros.
          </p>
          <Link href="/faq" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', fontWeight: 700, fontSize: '0.9rem' }}>
            Preguntas <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
