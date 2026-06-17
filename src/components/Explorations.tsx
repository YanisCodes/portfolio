import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPLORATIONS } from '../data/explorations';

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const leftItems = EXPLORATIONS.filter((_, i) => i % 2 === 0);
  const rightItems = EXPLORATIONS.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the centered text
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax columns
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Layer 1: pinned center text */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen items-center justify-center px-6"
      >
        <div className="max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Explorations
            </span>
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="mb-5 text-4xl text-text-primary md:text-6xl lg:text-7xl">
            Visual <em className="font-display italic">playground</em>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-muted md:text-base">
            Side experiments. Form studies, gradients, typography tests.
          </p>
          <a
            href="https://github.com/YanisCodes"
            target="_blank"
            rel="noopener"
            className="gradient-border-hover relative inline-flex rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-5 py-2.5 text-sm text-text-primary">
              More on GitHub <span aria-hidden>↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-10">
          <div ref={leftColRef} className="flex flex-col gap-12 pt-[20vh] md:gap-20">
            {leftItems.map((item, i) => (
              <button
                key={item.image}
                onClick={() => setLightbox(EXPLORATIONS.indexOf(item))}
                className="pointer-events-auto group block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.02]"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 1.5}deg)` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-12 pt-[40vh] md:gap-20">
            {rightItems.map((item, i) => (
              <button
                key={item.image}
                onClick={() => setLightbox(EXPLORATIONS.indexOf(item))}
                className="pointer-events-auto group block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.02]"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -1.5}deg)` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={EXPLORATIONS[lightbox].image}
              alt={EXPLORATIONS[lightbox].title}
              className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
