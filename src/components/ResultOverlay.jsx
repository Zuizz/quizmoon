import { useMemo } from 'react';

const CONFETTI_COLORS = ['#FBBF24', '#3B82F6', '#10B981', '#F97316', '#EC4899', '#8B5CF6', '#fff'];

function Confetti({ count = 60 }) {
  const pieces = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      dur: `${0.8 + Math.random() * 1.5}s`,
      delay: `${Math.random() * 0.6}s`,
      rotate: Math.random() > 0.5 ? 1 : -1,
      width: `${6 + Math.random() * 10}px`,
      height: `${12 + Math.random() * 16}px`,
    }))
  ), [count]);

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-5%',
            backgroundColor: p.color,
            width: p.width,
            height: p.height,
            '--dur': p.dur,
            '--delay': p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function ResultOverlay({ result, showText = true }) {
  if (!result) return null;

  const config = {
    six: { label: 'SIX!', cls: 'six', emoji: '🎉', showConfetti: true, count: 60 },
    four: { label: 'FOUR!', cls: 'four', emoji: '🏃', showConfetti: true, count: 30 },
    out: { label: 'OUT!', cls: 'out', emoji: '💥', showConfetti: false },
  }[result] || {};

  return (
    <div className="result-overlay-anim" aria-live="assertive" aria-atomic="true">
      {config.showConfetti && <Confetti count={config.count}/>}
      {showText && config.label && (
        <div className={`result-big-text ${config.cls}`}>
          {config.emoji} {config.label}
        </div>
      )}
    </div>
  );
}
