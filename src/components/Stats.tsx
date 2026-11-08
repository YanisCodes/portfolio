import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { STATS } from '../data/constants';

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 border-y border-stroke md:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`group relative flex flex-col gap-4 overflow-hidden px-2 py-12 md:px-10 md:py-16 ${
                i > 0 ? 'border-t border-stroke md:border-l md:border-t-0' : ''
              }`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: '#4e85bf' }}
              />
              <span className="font-display text-sm italic text-muted">
                ({String(i + 1).padStart(2, '0')})
              </span>
              <div className="flex items-start font-display text-8xl italic leading-[0.85] text-text-primary md:text-9xl">
                <CountUp to={Number(stat.value)} />
                <span className="text-gradient ml-1 text-6xl md:text-7xl">{stat.suffix}</span>
              </div>
              <div className="text-xs uppercase tracking-[0.28em] text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
