import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { WORKS, type Project } from '../data/projects';
import { hasFinePointer, trackSpotlight } from '../lib/spotlight';

const SPAN: Record<number, string> = {
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  12: 'md:col-span-12',
};

function onTilt(e: MouseEvent<HTMLElement>) {
  trackSpotlight(e);
  if (!hasFinePointer()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(1400px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
}
function resetTilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
}

function WorkCard({ p, i }: { p: Project; i: number }) {
  const num = String(i + 1).padStart(2, '0');
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.12 }}
      className={`col-span-1 ${SPAN[p.span] ?? 'md:col-span-6'}`}
    >
      <a
        href={p.href}
        target="_blank"
        rel="noopener"
        data-cursor="Visit"
        aria-label={`${p.title} — ${p.tagline}`}
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        className="spotlight group relative block min-h-[440px] overflow-hidden rounded-[28px] border border-stroke bg-surface transition-transform duration-500 ease-out will-change-transform md:h-[460px] md:min-h-0 lg:h-[520px]"
      >
        {/* Living gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="mesh-blob -left-[10%] -top-[20%] h-[70%] w-[60%] opacity-50 transition-opacity duration-700 group-hover:opacity-80"
            style={{ background: `hsl(${p.hue} 60% 35%)` }}
          />
          <div
            className="mesh-blob -bottom-[25%] -right-[10%] h-[75%] w-[55%] opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{
              background: `hsl(${(p.hue + 45) % 360} 65% 30%)`,
              animationDelay: '-6s',
              animationDuration: '20s',
            }}
          />
        </div>
        <div className="grid-lines absolute inset-0" />
        <div className="halftone pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply" />

        {/* Giant outlined index */}
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute -bottom-[0.18em] right-4 select-none font-display text-[11rem] italic leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 md:text-[14rem]"
        >
          {num}
        </span>

        {/* Content */}
        <div className="relative z-[2] flex h-full min-h-[inherit] flex-col justify-between p-7 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.25em] text-text-primary/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {p.liveLabel}
            </span>
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/20 text-text-primary backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg"
            >
              ↗
            </span>
          </div>

          <div>
            <h3 className="mb-3 font-display text-6xl italic leading-[0.9] tracking-[-0.02em] text-text-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-7xl lg:text-8xl">
              {p.title}
            </h3>
            <p className="mb-5 max-w-xs text-sm text-text-primary/70 md:text-base">{p.tagline}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s, j) => (
                <span
                  key={s}
                  style={{ transitionDelay: `${j * 40}ms` }}
                  className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-text-primary/65 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20 group-hover:text-text-primary/90"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="work" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="02"
          eyebrow="Selected Work"
          heading={
            <>
              Featured <em className="text-gradient font-display italic">projects</em>
            </>
          }
          subtext="A few things I've built — real apps, shipped, mostly while studying."
          cta={{ label: 'All on GitHub', href: 'https://github.com/YanisCodes' }}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {WORKS.map((p, i) => (
            <WorkCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
