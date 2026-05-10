'use client';

import Link from 'next/link';
import { ArrowLeftIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export default function WordleDocPage() {
  return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2rem' }}>
        <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 15px' }}>
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
        </Link>
      </div>

      <div className="card" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <div style={{ background: 'rgba(201,168,76,0.1)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
          <WrenchScrewdriverIcon style={{ width: 50, height: 50, color: 'var(--gold)' }} />
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem', color: 'var(--gold)' }}>Próximamente</h2>
        <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          La documentación detallada sobre cómo jugar al Wordle, los comandos disponibles y el funcionamiento de las estadísticas estará disponible muy pronto.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/bot-stats/wordle" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '1.1rem' }}>
            Ir a Estadísticas de Wordle
          </Link>
        </div>
      </div>
    </section>
  );
}
