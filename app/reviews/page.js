'use client';

import { useState, useEffect } from 'react';
import { StarIcon, UserIcon, ChatBubbleBottomCenterTextIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export default function ReviewsPage() {
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(d => setSession(d))
      .catch(() => {});
  }, []);

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
    fetchReviews();
  }, [session]);

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
      fetchReviews(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <SparklesIcon style={{ width: 40, height: 40, color: 'var(--gold)' }} /> 
          Reseñas de la Comunidad
        </h1>
        <p className="section-subtitle">Lo que nuestros miembros opinan de LA Spain</p>
        
        {average > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '1rem', background: 'rgba(201,168,76,0.1)', padding: '10px 20px', borderRadius: '50px', width: 'fit-content', margin: '1rem auto 0 auto' }}>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <StarIcon key={s} style={{ width: 24, height: 24, color: s <= Math.round(average) ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }} />
              ))}
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>{average.toFixed(1)}</span>
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>({reviews.length} reseñas)</span>
          </div>
        )}
      </header>

      <div className="grid-2" style={{ alignItems: 'flex-start', gap: '3rem' }}>
        
        {/* Left Column: Form */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div className="card" style={{ padding: '2rem', borderTop: '4px solid var(--gold)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ChatBubbleBottomCenterTextIcon style={{ width: 24, height: 24, color: 'var(--gold)' }} />
              Deja tu reseña
            </h2>

            {!session ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Debes iniciar sesión con Discord para valorar nuestra comunidad.</p>
                <a href="/api/auth/signin" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Iniciar Sesión
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Valoración</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setRating(s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        {s <= rating ? (
                          <StarIcon style={{ width: 32, height: 32, color: 'var(--gold)' }} />
                        ) : (
                          <StarOutline style={{ width: 32, height: 32, color: 'rgba(255,255,255,0.2)' }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tu mensaje</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos tu experiencia en LA Spain..."
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px', 
                      padding: '12px', 
                      color: 'white', 
                      minHeight: '120px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>

                {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
                {success && <p style={{ color: '#2ecc71', fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</p>}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={submitting}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {submitting ? 'Enviando...' : 'Publicar Reseña'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: List */}
        <div>
          {loading ? (
            <p className="text-muted">Cargando reseñas...</p>
          ) : reviews.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p className="text-muted">Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.map(rev => (
                <div key={rev._id} className="card fade-in" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {rev.userImage ? (
                        <img src={rev.userImage} alt={rev.userName} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserIcon style={{ width: 20, height: 20, color: 'var(--text-muted)' }} />
                        </div>
                      )}
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '1rem' }}>{rev.userName}</p>
                        <p className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(rev.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <StarIcon key={s} style={{ width: 16, height: 16, color: s <= rev.stars ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{rev.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
