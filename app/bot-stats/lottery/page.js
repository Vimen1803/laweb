'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  TicketIcon,
  SparklesIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
  HashtagIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

function fmtCooldown(s) {
  if (!s) return 'Ninguno';
  if (s % 3600 === 0) return `${s / 3600}h`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  return `${Math.floor(s / 3600)}h ${Math.round((s % 3600) / 60)}m`;
}

function fmtDate(epoch) {
  if (!epoch) return '—';
  return new Date(epoch * 1000).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export default function LotteryStatsPage() {
  const [data, setData] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => res.json())
      .then(d => {
        setData(d.lottery);
        setWinner(d.lotteryWinner || null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
        <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '8px 15px' }}>
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
        </Link>
        <div className="card" style={{ padding: '3rem', borderTop: '4px solid #f39c12' }}>
          {winner ? (
            <>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Último Ganador de la Lotería</p>
              {winner.avatar ? (
                <img src={winner.avatar} alt={winner.name} style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid #f39c12', margin: '0 auto 1.2rem' }} />
              ) : (
                <TrophyIcon style={{ width: 60, height: 60, color: '#f39c12', margin: '0 auto 1.2rem' }} />
              )}
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{winner.name}</h1>
              <p style={{ color: '#f39c12', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <SparklesIcon style={{ width: 18, height: 18 }} /> Portador de la Fortuna
              </p>
              <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>No hay ningún sorteo en curso ahora mismo. ¡Vuelve pronto para arrebatarle el título!</p>
              <Link href="/bot-stats" className="btn btn-primary">Volver al Dashboard</Link>
            </>
          ) : (
            <>
              <TicketIcon style={{ width: 60, height: 60, color: 'var(--text-muted)', margin: '0 auto 1.5rem' }} />
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No hay Lotería Activa</h1>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>Actualmente no hay ningún sorteo en curso en el servidor de LA Spain.</p>
              <Link href="/bot-stats" className="btn btn-primary">Volver al Dashboard</Link>
            </>
          )}
        </div>
      </section>
    );
  }

  const stats = [
    { icon: <HashtagIcon style={{ width: 20, height: 20 }} />, label: 'Rango', value: `${data.min} – ${data.max}` },
    { icon: <ClockIcon style={{ width: 20, height: 20 }} />, label: 'Termina', value: fmtDate(data.end) },
    { icon: <TicketIcon style={{ width: 20, height: 20 }} />, label: 'Intentos máx.', value: data.maxAttempts === 0 ? '∞' : data.maxAttempts },
    { icon: <ClockIcon style={{ width: 20, height: 20 }} />, label: 'Cooldown', value: fmtCooldown(data.cooldown) },
    { icon: <UsersIcon style={{ width: 20, height: 20 }} />, label: 'Participantes', value: data.participants },
    { icon: <SparklesIcon style={{ width: 20, height: 20 }} />, label: 'Intentos totales', value: data.attempts },
  ];

  return (
    <section className="section" style={{ maxWidth: 1000 }}>
      <Link href="/bot-stats" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '8px 15px' }}>
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver al Dashboard
      </Link>

      <div className="card" style={{ borderTop: '4px solid #f39c12', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <TicketIcon style={{ width: 40, height: 40, color: '#f39c12' }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Lotería: Portador de la Fortuna</h1>
            <p className="text-muted">Estado actual del sorteo activo en LA Spain</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, background: data.rotate ? 'rgba(46,204,113,0.12)' : 'rgba(231,76,60,0.12)', color: data.rotate ? '#2ecc71' : '#e74c3c', border: `1px solid ${data.rotate ? 'rgba(46,204,113,0.3)' : 'rgba(231,76,60,0.3)'}` }}>
            <ArrowPathIcon style={{ width: 14, height: 14 }} /> {data.rotate ? 'Rotación activa' : 'Rotación detenida'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#f39c12', display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>{s.icon}</div>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.2rem' }}>{s.value}</p>
              <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', textAlign: 'center', padding: '2rem' }}>
          <SparklesIcon style={{ width: 30, height: 30, color: 'var(--gold)', margin: '0 auto 1rem' }} />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>¿Cómo Participar?</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: 620, margin: '0 auto' }}>
            Dirígete al canal <span style={{ color: '#fff', fontWeight: 700 }}>#lotería</span> y escribe un número dentro del rango.
            Si <span style={{ color: '#fff', fontWeight: 700 }}>aciertas el número exacto</span> ganas al instante; si nadie acierta antes de que termine,
            gana quien <span style={{ color: '#fff', fontWeight: 700 }}>más se acerque</span>. ¡Cuando acaba un sorteo empieza otro!
          </p>
        </div>
      </div>
    </section>
  );
}
