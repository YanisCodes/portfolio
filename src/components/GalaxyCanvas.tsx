import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  /** Galaxy core position as a fraction of the canvas (0–1). */
  centerX?: number;
  centerY?: number;
  /** Vertical squash of the disk — < 1 gives a perspective tilt. */
  tilt?: number;
};

type Star = {
  r: number; // normalized radius 0..1
  a: number; // base angle
  w: number; // angular speed (rad / s)
  trail: number; // streak length (rad)
};

/** Color buckets — each one is stroked as a single path for speed. */
const BUCKETS = [
  { color: 'rgba(235,242,255,0.85)', width: 1.3 }, // core white
  { color: 'rgba(160,200,240,0.55)', width: 1.1 }, // ice blue
  { color: 'rgba(95,145,205,0.45)', width: 1 }, // deep blue
  { color: 'rgba(200,215,235,0.30)', width: 0.8 }, // faint dust
  { color: 'rgba(255,135,170,0.85)', width: 2 }, // pink sparks
];

const ARMS = 2;
const SPIN = 4.2;

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

function makeStars(count: number) {
  const buckets: Star[][] = BUCKETS.map(() => []);
  for (let i = 0; i < count; i++) {
    const halo = Math.random() < 0.2;
    const r = halo ? 0.08 + Math.random() * 0.92 : 0.03 + Math.pow(Math.random(), 0.8) * 0.97;
    const arm = i % ARMS;
    const spread = halo ? Math.PI : 0.5 * (1 - r * 0.35);
    const a = (arm * Math.PI * 2) / ARMS + r * SPIN + gauss() * spread;
    const w = 0.55 / (r + 0.12); // inner stars orbit faster
    const trail = 0.02 + Math.random() * 0.09 * (1.2 - r);

    const roll = Math.random();
    const b = r < 0.1 ? 0 : roll < 0.025 ? 4 : roll < 0.45 ? 1 : roll < 0.75 ? 2 : 3;
    buckets[b].push({ r, a, w, trail: b === 4 ? 0.004 : trail });
  }
  return buckets;
}

/**
 * Procedural rotating spiral galaxy with motion-streaked stars. Pauses when
 * off-screen and renders a single static frame under reduced motion.
 */
export default function GalaxyCanvas({
  className = '',
  centerX = 0.5,
  centerY = 0.3,
  tilt = 0.5,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    const buckets = makeStars(small ? 3000 : 6500);
    const bgStars = Array.from({ length: small ? 140 : 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 1.2 + 0.3,
      p: Math.random() * Math.PI * 2,
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#04060b';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // Distant twinkling field
      for (const b of bgStars) {
        const alpha = 0.2 + 0.4 * Math.sin(t * 1.3 + b.p) ** 2;
        ctx.fillStyle = `rgba(220,230,255,${alpha.toFixed(3)})`;
        ctx.fillRect(b.x * w, b.y * h, b.s, b.s);
      }

      const cx = w * centerX;
      const cy = h * centerY;
      const R = Math.max(w * 0.62, h * 0.9);
      const rot = t * 0.06;

      // Nebula haze (squashed by tilt)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, tilt);
      const neb = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.8);
      neb.addColorStop(0, 'rgba(120,170,230,0.35)');
      neb.addColorStop(0.25, 'rgba(70,115,190,0.16)');
      neb.addColorStop(0.6, 'rgba(40,70,140,0.06)');
      neb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb;
      ctx.fillRect(-R, -R, R * 2, R * 2);
      ctx.restore();

      // Streaked spiral arms — one stroke() per color bucket
      for (let bi = 0; bi < BUCKETS.length; bi++) {
        const list = buckets[bi];
        ctx.strokeStyle = BUCKETS[bi].color;
        ctx.lineWidth = BUCKETS[bi].width;
        ctx.beginPath();
        for (const st of list) {
          const ang = st.a + rot * st.w;
          const rr = st.r * R;
          const x1 = cx + Math.cos(ang) * rr;
          const y1 = cy + Math.sin(ang) * rr * tilt;
          if (x1 < -20 || x1 > w + 20 || y1 < -20 || y1 > h + 20) continue;
          const a0 = ang - st.trail;
          ctx.moveTo(cx + Math.cos(a0) * rr, cy + Math.sin(a0) * rr * tilt);
          ctx.lineTo(x1, y1);
        }
        ctx.stroke();
      }

      // Bright core
      const coreR = R * 0.12;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, 'rgba(255,255,255,0.7)');
      core.addColorStop(0.35, 'rgba(180,210,250,0.28)');
      core.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core;
      ctx.fillRect(cx - coreR, cy - coreR, coreR * 2, coreR * 2);
    };

    let raf = 0;
    let running = false;
    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    draw(performance.now());
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [centerX, centerY, tilt]);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
