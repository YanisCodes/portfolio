import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLKIT, type Tool } from '../data/explorations';

gsap.registerPlugin(ScrollTrigger);

function ToolCard({
  tool,
  rotate,
  onClick,
}: {
  tool: Tool;
  rotate: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `
          radial-gradient(circle at 30% 25%, hsl(${tool.hue} 50% 18% / 0.55), transparent 60%),
          radial-gradient(circle at 75% 80%, hsl(${(tool.hue + 50) % 360} 60% 20% / 0.4), transparent 55%)
        `,
      }}
      className="pointer-events-auto group relative block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03]"
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply" />
      <div className="relative flex h-full flex-col items-start justify-between p-6">
        <span className="text-[10.5px] uppercase tracking-[0.25em] text-muted">
          {tool.tag}
        </span>
        <span className="font-display text-4xl italic leading-none text-text-primary md:text-5xl lg:text-6xl">
          {tool.name}
        </span>
      </div>
    </button>
  );
}

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const leftItems = TOOLKIT.filter((_, i) => i % 2 === 0);
  const rightItems = TOOLKIT.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

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
    <section ref={sectionRef} className="relative min-h-[300vh] overflow-hidden bg-bg">
      {/* Layer 1: pinned center */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen items-center justify-center px-6"
      >
        <div className="max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Toolkit
            </span>
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="mb-5 text-4xl text-text-primary md:text-6xl lg:text-7xl">
            Tools of the <em className="font-display italic">craft</em>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-muted md:text-base">
            What I reach for when I build — from interface to database.
          </p>
          <a
            href="https://github.com/YanisCodes"
            target="_blank"
            rel="noopener"
            className="gradient-border-hover relative inline-flex rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-5 py-2.5 text-sm text-text-primary">
              See it in repos <span aria-hidden>↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-10">
          <div ref={leftColRef} className="flex flex-col gap-12 pt-[20vh] md:gap-20">
            {leftItems.map((item, i) => (
              <ToolCard
                key={item.name}
                tool={item}
                rotate={i % 2 === 0 ? -2 : 1.5}
                onClick={() => setLightbox(TOOLKIT.indexOf(item))}
              />
            ))}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-12 pt-[40vh] md:gap-20">
            {rightItems.map((item, i) => (
              <ToolCard
                key={item.name}
                tool={item}
                rotate={i % 2 === 0 ? 2 : -1.5}
                onClick={() => setLightbox(TOOLKIT.indexOf(item))}
              />
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
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-center"
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted">
                {TOOLKIT[lightbox].tag}
              </div>
              <div className="font-display text-7xl italic text-text-primary md:text-8xl">
                {TOOLKIT[lightbox].name}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
