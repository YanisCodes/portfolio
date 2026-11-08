import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { CURRENTLY } from '../data/journal';

export default function Journal() {
  return (
    <section id="now" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="03"
          eyebrow="Currently"
          heading={
            <>
              What I'm <em className="text-gradient font-display italic">working on</em>
            </>
          }
          subtext="A live snapshot — projects shipping, classes on, and whatever I'm learning this week."
        />

        <ul className="border-t border-stroke">
          {CURRENTLY.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="border-b border-stroke"
            >
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener' : undefined}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 overflow-hidden px-2 py-7 md:grid-cols-[4rem_10rem_1fr_auto_auto] md:gap-x-8 md:px-4 md:py-9"
              >
                {/* Hover fill sweeping up */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />

                <span className="relative font-display text-lg italic text-muted transition-colors group-hover:text-text-primary/80">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="relative col-start-2 inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.28em] text-text-primary/70 md:col-start-auto">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping-soft absolute inset-0 rounded-full bg-emerald-400" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {item.verb}
                </span>

                <span className="relative col-span-3 text-xl leading-snug tracking-[-0.01em] text-text-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:col-span-1 md:text-2xl lg:text-[1.7rem]">
                  {item.title}
                </span>

                <span className="relative col-span-2 text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-1">
                  {item.meta}
                </span>

                <span
                  aria-hidden
                  className="relative col-start-3 row-start-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-stroke text-text-primary/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg md:col-start-auto md:row-start-auto"
                >
                  ↗
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
