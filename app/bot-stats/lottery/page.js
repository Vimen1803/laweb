'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  TicketIcon, 
  SparklesIcon, 
  ClockIcon, 
  HashtagIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

export default function LotteryStatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => res.json())
      .then(d => {
        setData(d.lottery);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (!val || isNaN(val)) {
      setSearchResult(null);
      return;
    }

    const num = parseInt(val);
    if (data && data.numbers) {
      if (data.numbers.includes(num)) {
        setSearchResult('guessed');
      } else if (num < data.min || num > data.max) {
        setSearchResult('out-of-range');
      } else {
        setSearchResult('available');
      }
    }
  };

  // ... (loading and empty states remain same)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <section className="section" style={{ maxWidth: 800, textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <TicketIcon style={{ width: 60, height: 60, color: 'var(--text-muted)', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No hay Lotería Activa</h1>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>Actualmente no hay ningún sorteo en curso en el servidor de LA Spain.</p>
          <Link href="/bot-stats" className="btn btn-primary">Volver al Dashboard</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '8px 15px' }}>
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
      </Link>

      <div className="card" style={{ borderTop: '4px solid #f39c12', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
          <TicketIcon style={{ width: 40, height: 40, color: '#f39c12' }} />
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Lotería: Portador de la Fortuna</h1>
            <p className="text-muted">Estado actual del sorteo activo en LA Spain</p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
          {/* Main Info */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HashtagIcon style={{ width: 18, height: 18 }} /> Parámetros del Juego
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-muted">Rango Mínimo</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{data.min}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-muted">Rango Máximo</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f39c12' }}>{data.max}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-muted">Números Intentados</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{data.guessed}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-muted">Tiempo de Espera</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ClockIcon style={{ width: 18, height: 18, color: 'var(--text-muted)' }} /> {data.timeout}s
                </span>
              </div>
            </div>
          </div>

          {/* Reward Info */}
          <div style={{ background: 'rgba(201,168,76,0.05)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(201,168,76,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--gold)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <TrophyIcon style={{ width: 30, height: 30, color: '#000' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Recompensa de Victoria</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>El primer usuario en adivinar el número secreto recibirá:</p>
            <div style={{ background: '#000', padding: '15px', borderRadius: '10px', border: '1px solid var(--gold)' }}>
              <span style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Portador de la Fortuna</span>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID del Rol: {data.role}</p>
          </div>
        </div>

        {/* Searcher Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: 'var(--gold)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MagnifyingGlassIcon style={{ width: 18, height: 18 }} /> Buscador de Números
          </h3>
          <div className="card" style={{ background: 'rgba(255,255,255,0.01)', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Escribe un número para comprobar si ya ha sido intentado por otro jugador.</p>
            <div style={{ position: 'relative', maxWidth: '400px' }}>
              <input 
                type="number"
                placeholder="Ej: 972"
                value={searchQuery}
                onChange={handleSearch}
                style={{ 
                  width: '100%', 
                  padding: '15px 15px 15px 45px', 
                  borderRadius: '12px', 
                  background: 'rgba(0,0,0,0.3)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff',
                  fontSize: '1.1rem',
                  outline: 'none'
                }}
              />
              <MagnifyingGlassIcon style={{ width: 20, height: 20, color: 'rgba(255,255,255,0.3)', position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {searchResult && (
              <div className="fade-in" style={{ marginTop: '1.5rem', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', 
                background: searchResult === 'available' ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)',
                border: `1px solid ${searchResult === 'available' ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.2)'}`
              }}>
                {searchResult === 'available' ? (
                  <>
                    <CheckCircleIcon style={{ width: 24, height: 24, color: '#2ecc71' }} />
                    <div>
                      <p style={{ color: '#2ecc71', fontWeight: 800 }}>¡Número disponible!</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Este número aún no ha sido dicho. ¡Pruébalo en Discord!</p>
                    </div>
                  </>
                ) : searchResult === 'guessed' ? (
                  <>
                    <XCircleIcon style={{ width: 24, height: 24, color: '#e74c3c' }} />
                    <div>
                      <p style={{ color: '#e74c3c', fontWeight: 800 }}>Número ya intentado</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Alguien ya ha dicho el {searchQuery}. Prueba con otro diferente.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircleIcon style={{ width: 24, height: 24, color: '#f39c12' }} />
                    <div>
                      <p style={{ color: '#f39c12', fontWeight: 800 }}>Fuera de rango</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>El número debe estar entre {data.min} y {data.max}.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', textAlign: 'center', padding: '2rem' }}>
          <SparklesIcon style={{ width: 30, height: 30, color: 'var(--gold)', margin: '0 auto 1rem' }} />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>¿Cómo Participar?</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Dirígete al canal <span style={{ color: '#fff', fontWeight: 700 }}>#lotería</span> en nuestro Discord y escribe un número dentro del rango permitido. 
            ¡Si aciertas, el rol será tuyo automáticamente!
          </p>
        </div>
      </div>
    </section>
  );
}
