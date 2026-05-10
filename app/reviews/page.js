'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon, UserIcon, ChatBubbleBottomCenterTextIcon, SparklesIcon, ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export default function ReviewsPage() {
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'form'

  const MAX_CHARS = 500;

  // Form state
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReviews(data.reviews || []);
      setAverage(data.average || 0);
      
      // If user is logged in, find their review to pre-fill the form
      if (session?.user && data.reviews) {
        const discordId = session.discordId || session.user.id;
        const myReview = data.reviews.find(r => r.userId === discordId);
        if (myReview) {
          setRating(myReview.stars);
          setMessage(myReview.message);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(d => setSession(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [session]);

  const handleOpenForm = () => {
    if (!session) {
      window.location.href = '/api/auth/signin?callbackUrl=/reviews';
      return;
    }
    setView('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;
    
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars: rating, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar');
      
      setSuccess(data.message || '¡Gracias por tu reseña!');
      setTimeout(() => {
        setSuccess(null);
        setView('list');
      }, 2000);
      fetchReviews(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (view === 'form') {
    return (
      <section className="section" style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={() => setView('list')} className="btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Volver a las reseñas
        </button>

        <div className="card fade-in" style={{ padding: '3rem 2rem', borderTop: '4px solid var(--gold)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <PencilSquareIcon style={{ width: 32, height: 32, color: 'var(--gold)' }} />
            Tu opinión nos importa
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>¿Cómo calificarías tu experiencia?</label>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    key={s} 
                    type="button"
                    onClick={() => setRating(s)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {s <= rating ? (
                      <StarIcon style={{ width: 48, height: 48, color: 'var(--gold)' }} />
                    ) : (
                      <StarOutline style={{ width: 48, height: 48, color: 'rgba(255,255,255,0.2)' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '1rem', fontWeight: 600 }}>Tu mensaje</label>
                <span style={{ fontSize: '0.8rem', color: message.length > MAX_CHARS ? '#e74c3c' : 'var(--text-muted)' }}>
                  {message.length} / {MAX_CHARS}
                </span>
              </div>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí tu reseña sobre LA Spain..."
                maxLength={MAX_CHARS}
                style={{ 
                  width: '100%', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  padding: '15px', 
                  color: 'white', 
                  minHeight: '180px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  fontSize: '1rem',
                  lineHeight: 1.5
                }}
                required
              />
            </div>

            {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', background: 'rgba(231,76,60,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}
            {success && <p style={{ color: '#2ecc71', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', background: 'rgba(46,204,113,0.1)', padding: '10px', borderRadius: '8px' }}>{success}</p>}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting || message.length > MAX_CHARS}
              style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1.1rem' }}
            >
              {submitting ? 'Enviando...' : 'Publicar Reseña'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ maxWidth: 900, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          Reseñas de la Comunidad
        </h1>
        <p className="section-subtitle">Lo que nuestros miembros opinan de LA Spain</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          {average > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 25px'}}>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <StarIcon key={s} style={{ width: 20, height: 20, color: s <= Math.round(average) ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>{average.toFixed(1)}</span>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>({reviews.length} reseñas)</span>
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleOpenForm} 
              className="btn btn-primary" 
              style={{ padding: '12px 30px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <PencilSquareIcon style={{ width: 20, height: 20 }} /> Publicar reseña
            </button>
          </div>
        </div>
      </header>

      <div style={{ marginTop: '4rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="text-muted">Cargando reseñas...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {reviews.map(rev => (
              <div key={rev._id} className="card fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {rev.userImage ? (
                      <img src={rev.userImage} alt={rev.userName} style={{ width: 45, height: 45, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
                    ) : (
                      <div style={{ width: 45, height: 45, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserIcon style={{ width: 22, height: 22, color: 'var(--text-muted)' }} />
                      </div>
                    )}
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{rev.userName}</p>
                      <p className="text-muted" style={{ fontSize: '0.8rem' }}>{new Date(rev.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <StarIcon key={s} style={{ width: 16, height: 16, color: s <= rev.stars ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', fontSize: '1rem', flexGrow: 1 }}>
                  "{rev.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(auto-fill"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
