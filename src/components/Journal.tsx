import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { JOURNAL } from '../data/journal';

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Notes"
          heading={
            <>
              Recent <em className="font-display italic">thoughts</em>
            </>
          }
          subtext="Things I'm learning, building, and thinking about."
          cta={{ label: 'View all notes', href: '#' }}
        />

        <div className="flex flex-col gap-3 md:gap-4">
          {JOURNAL.map((entry, i) => (
            <motion.a
              key={entry.title}
              href={entry.href}
              target={entry.href.startsWith('http') ? '_blank' : undefined}
              rel={entry.href.startsWith('http') ? 'noopener' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.06,
              }}
              className="group flex flex-col gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:gap-6 sm:rounded-full"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-sm text-text-primary sm:text-base">
                  {entry.title}
                </span>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>{entry.readTime}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-stroke sm:block" />
                  <span>{entry.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
