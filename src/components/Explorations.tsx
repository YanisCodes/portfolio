import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLKIT, type Tool } from '../data/explorations';
import Magnetic from './Magnetic';
import { trackSpotlight } from '../lib/spotlight';

gsap.registerPlugin(ScrollTrigger);

function ToolCard({
  tool,
  index,
  rotate,
  onClick,
}: {
  tool: Tool;
  index: number;
  rotate: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseMove={trackSpotlight}
      data-cursor="Open"
      style={{ transform: `rotate(${rotate}deg)` }}
      className="spotlight pointer-events-auto group relative block aspect-square w-full max-w-[320px] overflow-hidden rounded-[28px] border border-stroke bg-surface text-left transition-[scale,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="mesh-blob -left-[15%] -top-[15%] h-[70%] w-[70%] opacity-45 transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: `hsl(${tool.hue} 55% 32%)` }}
        />
        <div
          className="mesh-blob -bottom-[20%] -right-[15%] h-[60%] w-[60%] opacity-35"
          style={{
            background: `hsl(${(tool.hue + 50) % 360} 60% 28%)`,
            animationDelay: '-8s',
          }}
        />
      </div>
      <div className="grid-lines absolute inset-0" />
      <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
      <div className="relative z-[2] flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.25em] text-text-primary/60">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(${tool.hue} 70% 65%)` }} />
            {tool.tag}
          </span>
          <span className="font-display text-sm normal-case italic tracking-normal">
            {String(index + 1).padStart(2, '0')}/{String(TOOLKIT.length).padStart(2, '0')}
          </span>
        </div>
        <span className="font-display text-4xl italic leading-none text-text-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:text-5xl lg:text-6xl">
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
    <section id="toolkit" ref={sectionRef} className="relative min-h-[300vh] overflow-hidden bg-bg">
      {/* Layer 1: pinned center */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen items-center justify-center px-6"
      >
        <div className="max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted">
            <span className="font-display text-base normal-case italic tracking-normal text-text-primary/70">
              (04)
            </span>
            <span className="h-px w-8 bg-stroke" />
            Toolkit
          </div>
          <h2 className="mb-6 text-5xl leading-[1] tracking-[-0.03em] text-text-primary md:text-7xl lg:text-8xl">
            Tools of the <em className="text-gradient font-display italic">craft</em>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-muted md:text-base">
            What I reach for when I build — from interface to database.
          </p>
          <Magnetic>
            <a
              href="https://github.com/YanisCodes"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-bg/60 py-2 pl-5 pr-2 text-sm text-text-primary backdrop-blur-md transition-colors duration-300 hover:border-text-primary/40"
            >
              See it in repos
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-bg transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
            </a>
          </Magnetic>
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
                index={TOOLKIT.indexOf(item)}
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
                index={TOOLKIT.indexOf(item)}
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
              <div className="text-gradient font-display text-7xl italic md:text-9xl">
                {TOOLKIT[lightbox].name}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
