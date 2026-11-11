import { useEffect, useState, useRef } from 'react';
import { QUESTION_TIME, SIX_WINDOW } from '../config';

export default function Timer({ active, onExpire, onTick }) {
  const [remainingSec, setRemainingSec] = useState(QUESTION_TIME);
  const [inSixZone, setInSixZone] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);

  const barRef = useRef(null);
  const onTickRef = useRef(onTick);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onTickRef.current = onTick;
    onExpireRef.current = onExpire;
  }, [onTick, onExpire]);

  useEffect(() => {
    if (!active) {
      setRemainingSec(QUESTION_TIME);
      setInSixZone(true);
      setIsUrgent(false);
      if (barRef.current) {
        barRef.current.style.width = '100%';
        barRef.current.style.backgroundColor = '#22c55e';
        barRef.current.style.boxShadow = 'none';
      }
      return;
    }

    const startTime = performance.now();
    let hasExpired = false;
    let animId = null;
    let intervalId = null;

    // Direct DOM update loop for 60fps / 120fps ultra-smooth bar decrease
    const updateBar = () => {
      const elapsed = Math.max(0, (performance.now() - startTime) / 1000);
      const remaining = Math.max(0, QUESTION_TIME - elapsed);
      const pct = Math.max(0, Math.min(100, (remaining / QUESTION_TIME) * 100));

      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;

        let color = '#22c55e';
        let shadow = elapsed <= SIX_WINDOW ? '0 0 8px rgba(251,191,36,0.6)' : 'none';

        if (remaining <= 10) {
          color = '#ef4444';
          if (remaining <= 5) shadow = '0 0 10px #ef4444';
        } else if (remaining <= 20) {
          color = '#f59e0b';
        }

        barRef.current.style.backgroundColor = color;
        barRef.current.style.boxShadow = shadow;
      }

      if (remaining <= 0) {
        if (!hasExpired) {
          hasExpired = true;
          onExpireRef.current?.();
        }
        return;
      }

      animId = requestAnimationFrame(updateBar);
    };

    // Low-frequency interval (every 100ms) for seconds label and React state, unaffected by tab throttles
    const checkInterval = () => {
      const elapsed = Math.max(0, (performance.now() - startTime) / 1000);
      const remaining = Math.max(0, QUESTION_TIME - elapsed);

      setRemainingSec(Math.ceil(remaining));
      setInSixZone(elapsed <= SIX_WINDOW);
      setIsUrgent(remaining <= 5 && remaining > 0);
      onTickRef.current?.(elapsed, remaining);

      if (remaining <= 0) {
        if (!hasExpired) {
          hasExpired = true;
          onExpireRef.current?.();
        }
      }
    };

    animId = requestAnimationFrame(updateBar);
    intervalId = setInterval(checkInterval, 100);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [active]);

  // Six-zone marker position: 10s elapsed = 20s remaining = 66.67% of the 30s bar
  const markerPct = ((QUESTION_TIME - SIX_WINDOW) / QUESTION_TIME) * 100;

  return (
    <div className="timer-bar-wrap" aria-label={`Timer: ${remainingSec} seconds remaining`}>
      <div
        className="timer-label"
        style={{
          color: isUrgent ? '#ef4444' : inSixZone ? '#facc15' : 'white',
          animation: isUrgent ? 'urgentPulse 0.5s ease-in-out infinite alternate' : 'none',
        }}
      >
        {remainingSec}s
      </div>
      <div className="timer-bar-track">
        <div
          ref={barRef}
          className="timer-bar-fill"
          style={{ width: '100%' }}
        />
        {/* Six zone marker dividing boundary */}
        <div
          className="timer-six-marker"
          style={{ left: `${markerPct}%` }}
        />
        <div
          className="timer-six-label"
          style={{ left: `${markerPct}%`, transform: 'translateX(-50%)' }}
        >
          ⚡ 10s SIX ZONE
        </div>
      </div>
      <style>{`
        @keyframes urgentPulse {
          from { transform: scale(1); }
          to   { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
