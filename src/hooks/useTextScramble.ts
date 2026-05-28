import { useCallback, useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

/**
 * Scrambles a text string into the provided value over `duration` ms.
 * Characters resolve left-to-right with a small overlap.
 */
export function useTextScramble(initial = ''): {
  text: string;
  scramble: (next: string, durationMs?: number) => void;
} {
  const [text, setText] = useState(initial);
  const rafRef = useRef<number | null>(null);

  const scramble = useCallback((next: string, durationMs = 900) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const start = performance.now();
    const n = next.length;

    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      let out = '';
      for (let i = 0; i < n; i++) {
        const cp = Math.max(0, Math.min(1, (p * (n + 4) - i) / 4));
        out +=
          cp >= 1 || next[i] === ' ' ? next[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setText(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(next);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return { text, scramble };
}
