import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LOADING_WORDS } from '../data/constants';

const DURATION = 2400;
const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  // Counter 0 → 100, eased so it rushes then settles
  useEffect(() => {
    let raf = 0;
    let done: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else done = setTimeout(onComplete, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % LOADING_WORDS.length), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 1, ease: EASE_IN_OUT }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
    >
      <motion.div
        exit={{ y: -120, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE_IN_OUT }}
        className="relative h-full w-full"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #4e85bf, transparent 70%)' }}
        />

        {/* Top row */}
        <div className="absolute left-6 right-6 top-6 flex justify-between text-[11px] uppercase tracking-[0.3em] text-muted md:left-10 md:right-10 md:top-10">
          <motion.span
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Yanis Oukaci
          </motion.span>
          <motion.span
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Portfolio ©26
          </motion.span>
        </div>

        {/* Center rotating word (masked slide) */}
        <div className="flex h-full items-center justify-center px-6">
          <div className="overflow-hidden py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIdx}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl italic text-text-primary md:text-7xl lg:text-8xl"
              >
                {LOADING_WORDS[wordIdx]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom-left caption */}
        <div className="absolute bottom-12 left-6 max-w-[14rem] text-xs leading-relaxed text-muted md:bottom-16 md:left-10">
          Full-stack developer &amp; CS student — Béjaïa, Algeria.
        </div>

        {/* Bottom-right counter */}
        <div className="absolute bottom-10 right-6 flex items-start font-display leading-none text-text-primary md:bottom-14 md:right-10">
          <span className="text-7xl tabular-nums md:text-9xl lg:text-[11rem]">
            {String(count).padStart(3, '0')}
          </span>
          <span className="mt-2 text-2xl text-muted md:text-4xl">%</span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stroke/60">
          <div
            className="accent-gradient h-full origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.5)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
