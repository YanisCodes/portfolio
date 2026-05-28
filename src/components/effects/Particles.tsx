import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 140;
const MOUSE_DIST = 200;

type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };

export default function Particles() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = 0;
    let ch = 0;
    let particles: P[] = [];
    const mouse = { x: -999, y: -999 };
    let raf = 0;

    const resize = () => {
      cw = canvas.width = canvas.offsetWidth;
      ch = canvas.height = canvas.offsetHeight;
    };
    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * cw,
        y: Math.random() * ch,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, cw, ch);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.999;
        p.vy *= 0.999;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,163,147,${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(94,163,147,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    const onParentMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onParentLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    resize();
    init();
    raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      init();
    };

    addEventListener('resize', onResize);
    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', onParentMove);
    parent?.addEventListener('mouseleave', onParentLeave);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
      parent?.removeEventListener('mousemove', onParentMove);
      parent?.removeEventListener('mouseleave', onParentLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
