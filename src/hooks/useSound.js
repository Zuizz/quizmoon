import { useRef, useCallback, useState } from 'react';

export function useSound() {
  const ctxRef = useRef(null);
  const [muted, setMuted] = useState(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch {
        return null;
      }
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((type) => {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;

    const configs = {
      six: [
        { freq: 880, dur: 0.15, gain: 0.4, delay: 0 },
        { freq: 1100, dur: 0.15, gain: 0.4, delay: 0.15 },
        { freq: 1320, dur: 0.3, gain: 0.5, delay: 0.3 },
      ],
      four: [
        { freq: 660, dur: 0.15, gain: 0.35, delay: 0 },
        { freq: 880, dur: 0.25, gain: 0.4, delay: 0.15 },
      ],
      out: [
        { freq: 220, dur: 0.3, gain: 0.4, delay: 0 },
        { freq: 180, dur: 0.4, gain: 0.3, delay: 0.25 },
      ],
      tick: [{ freq: 440, dur: 0.05, gain: 0.1, delay: 0 }],
      correct: [
        { freq: 523, dur: 0.1, gain: 0.3, delay: 0 },
        { freq: 659, dur: 0.1, gain: 0.3, delay: 0.1 },
        { freq: 784, dur: 0.2, gain: 0.4, delay: 0.2 },
      ],
      wrong: [
        { freq: 300, dur: 0.2, gain: 0.3, delay: 0 },
        { freq: 220, dur: 0.3, gain: 0.3, delay: 0.15 },
      ],
    };

    const notes = configs[type] || [];
    const now = ctx.currentTime;
    notes.forEach(({ freq, dur, gain, delay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type === 'tick' ? 'sine' : 'triangle';
      gainNode.gain.setValueAtTime(gain, now + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.01);
    });
  }, [muted, getCtx]);

  return { play, muted, toggleMute: () => setMuted(m => !m) };
}
