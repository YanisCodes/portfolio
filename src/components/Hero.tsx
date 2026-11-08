import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import HlsVideo from './HlsVideo';
import Magnetic from './Magnetic';
import { HLS_VIDEO_URL, ROLES } from '../data/constants';
import { useLocalTime } from '../lib/useLocalTime';
import { hasFinePointer } from '../lib/spotlight';

gsap.registerPlugin(ScrollTrigger);

const NAME = ['Yanis', 'Oukaci'];

export default function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const time = useLocalTime();

  // Hide entrance targets before first paint (they sit behind the loader anyway)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-char', { yPercent: 115, rotate: 6 });
      gsap.set('.hero-fade', { opacity: 0, y: 24, filter: 'blur(8px)' });
      gsap.set('.hero-line', { scaleX: 0 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Entrance — fires as the loader curtain lifts
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.25 });
      tl.to('.hero-char', { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.045 })
        .to('.hero-line', { scaleX: 1, duration: 1.2 }, 0.2)
        .to(
          '.hero-fade',
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.09 },
          0.45
        );
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  // Scroll-out: content drifts up & fades, video slowly zooms
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(contentRef.current, { yPercent: 35, opacity: 0, ease: 'none', scrollTrigger: st });
      gsap.to(videoWrapRef.current, { scale: 1.18, ease: 'none', scrollTrigger: st });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Pointer-following glow
  useEffect(() => {
    const el = rootRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    gsap.set(glow, { x: el.clientWidth / 2, y: el.clientHeight * 0.42 });
    if (!hasFinePointer()) return;
    const xTo = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3' });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background video */}
      <div ref={videoWrapRef} className="absolute inset-0 z-0 overflow-hidden will-change-transform">
        <HlsVideo
          src={HLS_VIDEO_URL}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black/35" />
      <div className="grid-lines absolute inset-0 z-0 opacity-60" />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 mix-blend-screen blur-[90px]"
        style={{ background: 'radial-gradient(circle, #89aacc, transparent 65%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="flex w-full flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4 md:mb-8">
            <span className="hero-line h-px w-10 origin-right bg-text-primary/40 md:w-16" />
            <span className="hero-fade text-[11px] uppercase tracking-[0.35em] text-text-primary/70">
              Portfolio — Works ’26
            </span>
            <span className="hero-line h-px w-10 origin-left bg-text-primary/40 md:w-16" />
          </div>

          <h1
            aria-label={NAME.join(' ')}
            className="mb-6 flex flex-wrap justify-center gap-x-[0.22em] font-display text-[17vw] italic leading-[0.85] tracking-[-0.02em] text-text-primary sm:text-[14vw] lg:text-[11.5vw]"
          >
            {NAME.map((word) => (
              <span key={word} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] pr-[0.06em]">
                {word.split('').map((ch, i) => (
                  <span key={i} className="hero-char inline-block origin-bottom-left will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade mb-4 flex items-center gap-2 text-lg text-text-primary/90 md:text-2xl">
            <span>A</span>
            <span className="relative inline-flex h-[1.4em] min-w-[4.6em] justify-center overflow-hidden text-[1.2em] leading-[1.4]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={roleIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-gradient absolute inset-x-0 font-display italic"
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>living in Béjaïa.</span>
          </p>

          <p className="hero-fade mb-10 max-w-md text-sm leading-relaxed text-text-primary/60 md:mb-12 md:text-base">
            Second-year CS student at ESTIN, building full-stack web and mobile
            apps. Quietly obsessed with the small details that make software
            feel right.
          </p>

          <div className="hero-fade flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-text-primary py-2 pl-6 pr-2 text-sm font-medium text-bg"
              >
                <span className="relative z-10">See my work</span>
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg text-text-primary transition-transform duration-500 group-hover:rotate-[-45deg]">
                  →
                </span>
                <span className="accent-gradient absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-text-primary backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-8 text-[11px] uppercase tracking-[0.25em] text-text-primary/60 md:px-10">
        <div className="hero-fade hidden flex-col gap-1 md:flex">
          <span className="text-muted">Local time</span>
          <span className="tabular-nums text-text-primary/80">{time} · GMT+1</span>
        </div>

        <a href="#about" className="hero-fade absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="animate-scroll-down absolute inset-x-0 top-0 h-1/2 bg-text-primary" />
          </span>
        </a>

        <div className="hero-fade hidden items-center gap-2.5 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-emerald-400" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for projects
        </div>
      </div>
    </section>
  );
}
