'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  FireIcon, 
  ClockIcon, 
  PuzzlePieceIcon, 
  BoltIcon, 
  UserGroupIcon, 
  SparklesIcon,
  TicketIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  HeartIcon,
  UserIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid';

export default function BotStatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordleMode, setWordleMode] = useState('normal');

  useEffect(() => {
    fetch('/api/user/bot-stats')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="section"><p className="text-muted text-center">Cargando tus estadísticas...</p></div>;

  if (error || !data) return (
    <section className="section" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
      <div className="card" style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--gold-darker)' }}>
        <div style={{ background: 'rgba(201,168,76,0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
          <UserIcon style={{ width: 40, height: 40, color: 'var(--gold)' }} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Estadísticas de la Comunidad</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Inicia sesión con tu cuenta de Discord para ver tus estadísticas personalizadas de Wordle, Werewolf y más.
        </p>
        <a href="/api/auth/signin?callbackUrl=/bot-stats" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '15px 40px', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 700 }}>
          <SparklesIcon style={{ width: 20, height: 20 }} /> Iniciar Sesión con Discord
        </a>
      </div>
    </section>
  );

  const wordle = data.wordle || null;
  const werewolf = data.werewolf || null;
  const trivial = data.trivial || null;
  const wordlePlayed = wordle && (Number(wordle.normal?.played) || Number(wordle.double?.played) || Number(wordle.triple?.played) || Number(wordle.ladder?.played));


  return (
    <section className="section" style={{ maxWidth: 1200 }}>
      <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <ChartBarIcon style={{ width: 36, height: 36, color: 'var(--gold)' }} /> Mis Estadísticas de Bot
      </h1>
      <p className="section-subtitle">Tu rendimiento en los minijuegos de LA Spain</p>

      <div className="grid-2" style={{ alignItems: 'stretch' }}>
        {/* WORDLE */}
        <div className="card" style={{ borderTop: '4px solid #538d4e', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <PuzzlePieceIcon style={{ width: 28, height: 28, color: '#538d4e' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Wordle</h2>
          </div>

          {!data.isAuthenticated ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Inicia sesión para ver tus estadísticas personalizadas.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="/api/auth/signin?callbackUrl=/bot-stats" className="btn btn-primary" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                  Iniciar Sesión
                </a>
                <Link href="/bot-stats/wordle/doc" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                  Ver Documentación
                </Link>
              </div>
            </div>
          ) : (!wordlePlayed) ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Aún no has jugado ninguna partida de Wordle.</p>
              <a href="https://discord.gg/DbRUker" target="_blank" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                ¡Empieza a jugar en Discord!
              </a>
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ flexGrow: 1 }}>
                {/* Row 1: Principal Stats */}
                <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>{wordle[wordleMode].played}</span>
                    <span className="stat-label">Jugadas</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>{wordle[wordleMode].wins}</span>
                    <span className="stat-label">Victorias</span>
                  </div>
                </div>

                <h4 style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Estadísticas del Modo</h4>
                {/* Other 4 stats in 2x2 grid */}
                {wordleMode !== 'ladder' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Winrate</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{wordle[wordleMode].winrate}%</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Racha Act.</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{wordle[wordleMode].streak}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Racha Máx.</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{wordle[wordleMode].max_streak}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Créditos</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{Number(wordle[wordleMode].earnings || 0).toFixed(0)}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Récord</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{wordle[wordleMode].max_words}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Media</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{wordle[wordleMode].average}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', gridColumn: 'span 2' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Créditos Totales</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{Number(wordle[wordleMode].earnings || 0).toFixed(0)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mode Buttons */}
              <div className="wordle-mode-buttons" style={{ marginBottom: '1.5rem' }}>
                {['normal', 'double', 'triple', 'ladder'].map(m => (
                  <button 
                    key={m}
                    onClick={() => setWordleMode(m)}
                    className={`btn ${wordleMode === m ? 'btn-primary' : ''}`}
                    style={{ 
                      padding: '10px 12px', 
                      fontSize: '0.75rem', 
                      textTransform: 'capitalize',
                      background: wordleMode === m ? 'var(--gold)' : '#fff',
                      color: '#000',
                      borderColor: wordleMode === m ? 'var(--gold)' : '#ddd',
                      fontWeight: 700,
                      width: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="stats-actions" style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <Link href="/bot-stats/wordle" className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', fontWeight: 700 }}>
                  Estadísticas <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </Link>
                <a href="/bot-stats/wordle/doc" className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 700 }}>
                  Documentaci&#243;n
                </a>
              </div>
            </div>
          )}
        </div>

        {/* WEREWOLF SUMMARY & BANDOS */}
        <div className="card" style={{ borderTop: '4px solid #8b0000', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <UserGroupIcon style={{ width: 28, height: 28, color: '#8b0000' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Werewolf</h2>
          </div>

          {!data.isAuthenticated ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Inicia sesión para ver tus estadísticas personalizadas.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="/api/auth/signin?callbackUrl=/bot-stats" className="btn btn-primary" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                  Iniciar Sesión
                </a>
                <a href="/bot-stats/werewolf/doc" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                  Ver Documentación
                </a>
              </div>
            </div>
          ) : (!werewolf || werewolf.games_played === 0) ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Aún no has participado en ninguna partida de Werewolf.</p>
              <a href="https://discord.gg/DbRUker" target="_blank" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>
                ¡Únete a una partida en Discord!
              </a>
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ flexGrow: 1 }}>
                <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem' }}>{werewolf.games_played || 0}</span>
                    <span className="stat-label">Partidas</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem' }}>{werewolf.games_won || 0}</span>
                    <span className="stat-label">Victorias</span>
                  </div>
                </div>

                <h4 style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Rendimiento por Bando</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Aldea</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{werewolf.village_won} / {werewolf.village_played} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>W/P</span></p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Lobos</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{werewolf.wolf_won} / {werewolf.wolf_played} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>W/P</span></p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Solitario</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{(werewolf.tanner_won || 0) + (werewolf.white_wolf_won || 0)} / {(werewolf.tanner_played || 0) + (werewolf.white_wolf_played || 0)} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>W/P</span></p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Amantes</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{werewolf.lovers_won} / {werewolf.lovers_played} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>W/P</span></p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Nivel</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{werewolf.level || 1}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Posición</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{werewolf.position !== '—' ? `#${werewolf.position}` : '—'}</p>
                  </div>
                </div>
              </div>

              {/* Spacing to match Wordle buttons height if needed, though buttons are already at the bottom */}
              <div style={{ height: 'calc(1.5rem + 32px)', marginBottom: '1.5rem', display: 'none' }}></div> 

              <div className="stats-actions" style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <Link href="/bot-stats/werewolf" className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', fontWeight: 700 }}>
                  Estadísticas <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </Link>
                <a href="/bot-stats/werewolf/doc" className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 700 }}>
                  Documentación
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'stretch', marginTop: '2rem' }}>
        {/* LOTERÍA */}
        <div className="card" style={{ borderTop: '4px solid #f39c12', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <TicketIcon style={{ width: 28, height: 28, color: '#f39c12' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Lotería Activa</h2>
          </div>

          {!data.lottery ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              {data.lotteryWinner ? (
                <>
                  <p className="text-muted" style={{ marginBottom: '1.2rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Último Ganador</p>
                  {data.lotteryWinner.avatar ? (
                    <img src={data.lotteryWinner.avatar} alt={data.lotteryWinner.name} style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #f39c12', marginBottom: '1rem' }} />
                  ) : (
                    <div style={{ background: 'rgba(243,156,18,0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <TrophyIcon style={{ width: 34, height: 34, color: '#f39c12' }} />
                    </div>
                  )}
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>{data.lotteryWinner.name}</p>
                  <p style={{ fontSize: '0.85rem', color: '#f39c12', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SparklesIcon style={{ width: 14, height: 14 }} /> Portador de la Fortuna
                  </p>
                  <p className="text-muted" style={{ marginTop: '1.2rem', fontSize: '0.8rem' }}>No hay ninguna lotería activa ahora mismo.</p>
                </>
              ) : (
                <>
                  <div style={{ background: 'rgba(243,156,18,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <TicketIcon style={{ width: 30, height: 30, color: '#f39c12' }} />
                  </div>
                  <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>No hay ninguna lotería activa en este momento.</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>¡Vuelve pronto para participar!</p>
                </>
              )}
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ flexGrow: 1 }}>
                <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.4rem', color: '#f39c12' }}>{data.lottery.min} - {data.lottery.max}</span>
                    <span className="stat-label">Rango</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem' }}>{data.lottery.participants}</span>
                    <span className="stat-label">Participantes</span>
                  </div>
                </div>

                <h4 style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Detalles del Sorteo</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Termina</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800 }}>{data.lottery.end ? new Date(data.lottery.end * 1000).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Intentos máx.</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{data.lottery.maxAttempts === 0 ? '∞' : data.lottery.maxAttempts}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Cooldown</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{data.lottery.cooldown === 0 ? 'Ninguno' : data.lottery.cooldown >= 3600 ? `${Math.round(data.lottery.cooldown / 3600)}h` : `${Math.round(data.lottery.cooldown / 60)}m`}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Premio</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800 }}>Portador de la Fortuna</p>
                  </div>
                </div>
              </div>

              <Link href="/bot-stats/lottery" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f39c12', borderColor: '#f39c12', color: '#000', fontWeight: 700 }}>
                Ver Más Detalles <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </Link>
            </div>
          )}
        </div>

        {/* TRIVIAL — estadísticas personales + enlace a la documentación */}
        <div className="card" style={{ borderTop: '4px solid #7c5cff', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <QuestionMarkCircleIcon style={{ width: 28, height: 28, color: '#7c5cff' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Trivial</h2>
          </div>

          {!data.isAuthenticated ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Inicia sesión para ver tus estadísticas personalizadas.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="/api/auth/signin?callbackUrl=/bot-stats" className="btn btn-primary" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px', background: '#7c5cff', borderColor: '#7c5cff', color: '#fff' }}>Iniciar Sesión</a>
                <Link href="/bot-stats/trivial/doc" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>Ver Documentación</Link>
              </div>
            </div>
          ) : (!trivial || trivial.games === 0) ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Aún no has jugado ninguna partida de Trivial.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="https://discord.gg/DbRUker" target="_blank" className="btn btn-primary" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px', background: '#7c5cff', borderColor: '#7c5cff', color: '#fff' }}>¡Juega en Discord!</a>
                <Link href="/bot-stats/trivial/doc" className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 700, padding: '8px 20px', borderRadius: '8px' }}>Ver Documentación</Link>
              </div>
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ flexGrow: 1 }}>
                <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem', color: '#7c5cff' }}>{trivial.games}</span>
                    <span className="stat-label">Partidas</span>
                  </div>
                  <div className="stat-item" style={{ background: 'var(--bg-body)', padding: '15px' }}>
                    <span className="stat-value" style={{ fontSize: '1.5rem', color: '#7c5cff' }}>{trivial.wins}</span>
                    <span className="stat-label">Victorias</span>
                  </div>
                </div>
                <h4 style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Rendimiento</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Puntos</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{trivial.total_score}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 800 }}>Media</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{trivial.average}</p>
                  </div>
                </div>
              </div>
              <Link href="/bot-stats/trivial/doc" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#7c5cff', borderColor: '#7c5cff', color: '#fff', fontWeight: 700 }}>
                Ver Documentación <ArrowRightIcon style={{ width: 16, height: 16 }} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem', background: 'rgba(201,168,76,0.05)', borderColor: 'rgba(201,168,76,0.2)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon style={{ width: 16, height: 16, color: 'var(--gold)' }} />
          Estas estadísticas se sincronizan en tiempo real con LA Bot. Juega en los canales correspondientes de Discord para subir tus puestos en el ranking.
        </p>
      </div>
    </section>
  );
}




