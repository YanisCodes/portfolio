import { motion } from 'framer-motion';
import { STATS } from '../data/constants';

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 border-t border-stroke pt-16 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.1,
              }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-baseline gap-1 font-display text-7xl italic text-text-primary md:text-8xl">
                {stat.value}
                <span className="text-5xl md:text-6xl">{stat.suffix}</span>
              </div>
              <div className="text-sm uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
