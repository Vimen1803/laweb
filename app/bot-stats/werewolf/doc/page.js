'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WerewolfDocPage() {
  useEffect(() => {
    window.location.href = '/ww-doc/index.html';
  }, []);

  return (
    <section className="section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <p className="text-muted">Redirigiendo a la documentación de Werewolf...</p>
    </section>
  );
}
