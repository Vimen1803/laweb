'use client';
import { useEffect, useState } from 'react';

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

function Avatar({ src, name, size }) {
  const [broken, setBroken] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  if (src && !broken) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        onError={() => setBroken(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'grid', placeItems: 'center', fontWeight: 800, color: '#fff',
      fontSize: size * 0.42, fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(135deg, var(--tv-violet), var(--tv-violet-d))',
    }}>{initial}</span>
  );
}

export default function Leaderboard() {
  const [players, setPlayers] = useState(null); // null = cargando
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/trivial/leaderboard')
      .then(r => r.json())
      .then(d => { if (alive) setPlayers(Array.isArray(d.players) ? d.players : []); })
      .catch(() => { if (alive) { setError(true); setPlayers([]); } });
    return () => { alive = false; };
  }, []);

  if (players === null) {
    return <p className="tv-empty">Cargando clasificación…</p>;
  }

  if (error) {
    return <p className="tv-empty">No se ha podido cargar la clasificación.</p>;
  }

  if (players.length === 0) {
    return <p className="tv-empty">Aún no hay partidas de Trivial registradas. ¡Sé el primero en jugar!</p>;
  }

  // Podio: top 3 en orden 2 · 1 · 3
  const top3 = players.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const podClass = { 1: 'first', 2: 'second', 3: 'third' };

  return (
    <>
      <div className="tv-podium">
        {podiumOrder.map(p => (
          <div key={p.rank} className={`tv-pod ${podClass[p.rank]}`}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
              <Avatar src={p.avatar} name={p.name} size={p.rank === 1 ? 44 : 34} />
            </div>
            <div className="tv-pod-rank">{p.rank}</div>
            <div className="tv-pod-name">{p.name}</div>
            <div className="tv-pod-pts">{p.total_score} pts</div>
          </div>
        ))}
      </div>

      <div className="tv-lb-wrap">
        <table className="tv-lb">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th className="r">Victorias</th>
              <th className="r">Partidas</th>
              <th className="r">Puntos</th>
              <th className="r">Media</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.user_id}>
                <td className="rk">{MEDAL[p.rank] || `#${p.rank}`}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Avatar src={p.avatar} name={p.name} size={26} />
                    {p.name}
                  </span>
                </td>
                <td className="r">{p.wins}</td>
                <td className="r">{p.games}</td>
                <td className="r pts">{p.total_score}</td>
                <td className="r">{p.average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
