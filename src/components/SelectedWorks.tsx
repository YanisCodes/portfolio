import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { WORKS } from '../data/projects';

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          heading={
            <>
              Featured <em className="font-display italic">projects</em>
            </>
          }
          subtext="A few things I've built — real apps, shipped, mostly while studying."
          cta={{ label: 'All on GitHub', href: 'https://github.com/YanisCodes' }}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {WORKS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.08,
              }}
              style={{ gridColumn: `span ${p.span} / span ${p.span}` }}
              className={`group relative block overflow-hidden rounded-3xl border border-stroke bg-surface ${p.aspect}`}
            >
              {/* Subtle hue gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(${p.hue} 40% 14% / 0.6), transparent 60%), radial-gradient(circle at 75% 80%, hsl(${(p.hue + 40) % 360} 50% 18% / 0.45), transparent 55%)`,
                }}
              />

              {/* Halftone */}
              <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
                <div className="flex items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted">
                  <span>{p.liveLabel}</span>
                  <span aria-hidden className="text-text-primary/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>

                <div>
                  <h3 className="mb-2 font-display text-5xl italic leading-[0.95] text-text-primary md:text-6xl lg:text-7xl">
                    {p.title}
                  </h3>
                  <p className="mb-4 max-w-xs text-sm text-text-primary/70">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-stroke bg-bg/40 px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.15em] text-muted backdrop-blur-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <span className="gradient-border relative rounded-full bg-text-primary px-5 py-2.5 text-sm text-bg">
                  Visit — <em className="font-display italic">{p.title}</em>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
