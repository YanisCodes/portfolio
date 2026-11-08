import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { hasFinePointer } from '../lib/spotlight';

/**
 * Two-part cursor: a precise dot + a lagging ring. Over links/buttons the
 * ring grows; over anything with [data-cursor="Label"] it becomes a filled
 * disc showing that label.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled] = useState(hasFinePointer);
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;
    document.documentElement.classList.add('has-cursor');

    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.45, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const labeled = t?.closest<HTMLElement>('[data-cursor]');
      if (labeled) {
        setLabel(labeled.dataset.cursor ?? '');
        setMode('label');
        return;
      }
      setMode(t?.closest('a, button') ? 'link' : 'idle');
    };
    const onLeaveWindow = () => setVisible(false);

    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeaveWindow);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      removeEventListener('mousemove', onMove);
      removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = mode === 'label' ? 96 : mode === 'link' ? 56 : 34;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          border: mode === 'label' ? 'none' : '1px solid hsl(0 0% 96% / 0.45)',
          background:
            mode === 'label'
              ? 'linear-gradient(135deg, #89aacc, #4e85bf)'
              : mode === 'link'
                ? 'hsl(0 0% 96% / 0.06)'
                : 'transparent',
          backdropFilter: mode === 'link' ? 'blur(2px)' : undefined,
          transition:
            'width 400ms var(--ease-out-expo), height 400ms var(--ease-out-expo), background 300ms ease, opacity 300ms ease',
        }}
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-white"
          style={{
            opacity: mode === 'label' ? 1 : 0,
            transform: mode === 'label' ? 'scale(1)' : 'scale(0.6)',
            transition: 'opacity 250ms ease, transform 400ms var(--ease-out-expo)',
          }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          opacity: visible && mode !== 'label' ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      />
    </>
  );
}
