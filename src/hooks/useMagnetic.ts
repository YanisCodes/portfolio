import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Adds a "magnetic" hover effect to a button-like element — it gently follows
 * the cursor up to `maxOffset` px, springs back on mouseleave.
 */
export function useMagnetic<T extends HTMLElement>(maxOffset = 10) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.transition = 'transform 100ms ease';
      el.style.transform = `translate(${nx * maxOffset}px, ${ny * maxOffset}px)`;
    };
    const onLeave = () => {
      el.style.transition = 'transform 600ms cubic-bezier(0.34,1.56,0.64,1)';
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxOffset, reduced]);

  return ref;
}
