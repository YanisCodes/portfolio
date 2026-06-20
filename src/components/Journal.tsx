import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { CURRENTLY } from '../data/journal';

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Currently"
          heading={
            <>
              What I'm <em className="font-display italic">working on</em>
            </>
          }
          subtext="A live snapshot — projects shipping, classes on, and whatever I'm reading this week."
        />

        <div className="flex flex-col gap-3 md:gap-4">
          {CURRENTLY.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.06,
              }}
              className="group flex flex-col gap-3 rounded-[28px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:gap-6 sm:rounded-full"
            >
              {/* Verb chip */}
              <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-stroke bg-bg/60 px-4 py-2 text-[10.5px] uppercase tracking-[0.25em] text-text-primary/80">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {item.verb}
              </div>

              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-sm text-text-primary sm:text-base">
                  {item.title}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-muted">
                  {item.meta}
                </span>
              </div>

              <span
                aria-hidden
                className="hidden text-text-primary/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:inline pr-4"
              >
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
