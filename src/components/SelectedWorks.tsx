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
          subtext="A selection of projects I've worked on, from concept to launch."
          cta={{ label: 'View all work', href: 'https://github.com/YanisCodes' }}
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
              className={`group relative block overflow-hidden rounded-3xl border border-stroke bg-surface md:col-span-[${p.span}] ${p.aspect}`}
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <span className="gradient-border relative rounded-full bg-text-primary px-5 py-2.5 text-sm text-bg">
                  View — <em className="font-display italic">{p.title}</em>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
