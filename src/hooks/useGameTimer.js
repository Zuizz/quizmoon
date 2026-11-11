import { useEffect, useRef, useCallback } from 'react';

/**
 * A robust, drift-resistant countdown timer hook.
 */
export function useGameTimer({ active, duration, onTick, onExpire }) {
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const expiredRef = useRef(false);

  // Keep callback refs so function identity changes don't retrigger the effect
  const onTickRef = useRef(onTick);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onTickRef.current = onTick;
    onExpireRef.current = onExpire;
  }, [onTick, onExpire]);

  const cancel = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!active) {
      cancel();
      startRef.current = null;
      expiredRef.current = false;
      return;
    }

    expiredRef.current = false;
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = Math.max(0, (now - startRef.current) / 1000);
      const remaining = Math.max(0, duration - elapsed);

      onTickRef.current?.(elapsed, remaining);

      if (remaining <= 0) {
        if (!expiredRef.current) {
          expiredRef.current = true;
          onExpireRef.current?.();
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return cancel;
  }, [active, duration, cancel]);
}
