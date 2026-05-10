'use client';

import Link from 'next/link';
import { HeartIcon, TrophyIcon, ArrowTopRightOnSquareIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function SponsorsPage() {
  const topDonors = [
    { name: '༺ 絶 𝑻𝒐𝒙𝒊𝒄𝑬𝒏𝒌𝒐 剣 ༻', amount: '66€', medal: '🥇' },
    { name: 'isgx.🪽', amount: '55€', medal: '🥈' },
    { name: 'Sebas 🐳🩵', amount: '51€', medal: '🥉' },
    { name: 'My Chemical Romance', amount: '42€', medal: '🏅' },
    { name: 'sanchezz27', amount: '16,50€', medal: '🏅' },
  ];

  return (
    <section className="section" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <HeartIcon style={{ width: 40, height: 40, color: 'var(--gold)' }} /> 
          Sponsors y Donaciones
        </h1>
        <p className="section-subtitle">Gracias a vosotros, esta comunidad sigue creciendo día a día.</p>
      </header>

      <div className="grid-2" style={{ alignItems: 'stretch', gap: '2rem' }}>

        {/* Top Donors */}
        <div className="card fade-in" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <TrophyIcon style={{ width: 32, height: 32, color: 'var(--gold)' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Tabla Histórica</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2.5rem' }}>
            {topDonors.map((donor, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 15px', 
                background: index === 0 ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)', 
                borderRadius: '8px',
                border: index === 0 ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{donor.medal}</span>
                  <span style={{ fontWeight: index < 3 ? 700 : 500, color: index === 0 ? 'var(--gold)' : 'inherit' }}>{donor.name}</span>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>{donor.amount}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>¿Quieres colaborar?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Las donaciones nos ayudan a mantener los servidores y mejorar la comunidad. ¡No olvides poner tu usuario de Discord en el motivo!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="https://www.paypal.com/paypalme/laspain" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                Donar por PayPal <ArrowTopRightOnSquareIcon style={{ width: 18, height: 18 }} />
              </a>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem' }}>
                Para donar por <strong>Bizum</strong>, contactar con <strong style={{ color: 'var(--gold)' }}>@Amaroyusi ☀️ #LA2026</strong> en Discord.
              </div>
            </div>
          </div>
        </div>

        {/* Vore Fitness Collab */}
        <div className="card fade-in" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--accent-orange)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <ShoppingBagIcon style={{ width: 32, height: 32, color: 'var(--accent-orange)' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Vore Fitness</h2>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Os presentamos <strong>Vore Fitness</strong>, una marca dedicada a material deportivo y accesorios para el gimnasio. Sus productos son geniales y estupendos para comenzar en el gimnasio o continuar avanzando en vuestro progreso.
          </p>
          
          <div style={{ background: 'rgba(255,165,0,0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,165,0,0.2)', marginBottom: '2rem' }}>
            <p style={{ fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon style={{ width: 20, height: 20, color: 'var(--accent-orange)' }} />
              Descuento del 10%
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Usa nuestro código exclusivo de la comunidad al realizar tu compra:
            </p>
            <div style={{ background: 'var(--bg-body)', padding: '15px', borderRadius: '8px', textAlign: 'center', marginTop: '15px', border: '1px dashed var(--accent-orange)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '2px', color: 'var(--accent-orange)' }}>LASPAIN</span>
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="https://vore.es/?ref=LASPAIN" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', gap: '10px', background: 'var(--accent-orange)', borderColor: 'var(--accent-orange)' }}>
              Tienda Oficial <ArrowTopRightOnSquareIcon style={{ width: 18, height: 18 }} />
            </a>
            <a href="https://instagram.com/vorefitness" target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'flex', justifyContent: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)' }}>
              Instagram de Vore Fitness
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
