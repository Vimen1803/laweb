'use client';
import Link from 'next/link';
import { ShieldCheckIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export default function DCInfoPage() {
  return (
    <section className="section" style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>DC Info</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Información esencial sobre nuestro servidor de Discord</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* NORMAS */}
        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--gold)' }}>
          <div style={{ background: 'rgba(201,168,76,0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <ShieldCheckIcon style={{ width: 35, height: 35, color: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Normas</h2>
          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Consulta el reglamento oficial de LA Spain. Mantener un ambiente sano y respetuoso es nuestra prioridad número uno.
          </p>
          <Link href="/normas" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}>
            Ver Normativa <ArrowRightIcon style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        {/* ROLES */}
        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid #3498db' }}>
          <div style={{ background: 'rgba(52,152,219,0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <UserGroupIcon style={{ width: 35, height: 35, color: '#3498db' }} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Roles</h2>
          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Descubre los diferentes rangos, medallas y roles especiales que puedes conseguir participando en la comunidad.
          </p>
          <Link href="/roles" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', fontWeight: 700 }}>
            Ver Roles <ArrowRightIcon style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
