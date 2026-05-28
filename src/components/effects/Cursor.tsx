import { useEffect, useRef } from 'react';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HOVERABLE_SELECTOR =
  'a, button, [data-cursor-hover], .cursor-hover';

export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let dx = mx,
      dy = my,
      rx = mx,
      ry = my;
    let tDs = 1,
      tRs = 1,
      cDs = 1,
      cRs = 1;
    let started = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (!started) {
        started = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const h = target?.closest(HOVERABLE_SELECTOR);
      tDs = h ? 2.5 : 1;
      tRs = h ? 1.5 : 1;
      ring.style.borderColor = h ? 'rgba(155,161,124,0.6)' : 'rgba(155,161,124,0.38)';
    };

    const loop = () => {
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      cDs += (tDs - cDs) * 0.12;
      cRs += (tRs - cRs) * 0.1;
      dot.style.transform = `translate(${dx - 3}px,${dy - 3}px) scale(${cDs})`;
      ring.style.transform = `translate(${rx - 17}px,${ry - 17}px) scale(${cRs})`;
      raf = requestAnimationFrame(loop);
    };

    addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ background: 'rgba(255,255,255,0.9)' }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[34px] w-[34px] rounded-full opacity-0 will-change-transform"
        style={{
          border: '1.5px solid rgba(155,161,124,0.38)',
          transition: 'border-color 200ms ease, opacity 300ms ease',
        }}
      />
    </>
  );
}
