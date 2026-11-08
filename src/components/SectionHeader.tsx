import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

type Props = {
  index: string; // e.g. "02"
  eyebrow: string;
  heading: React.ReactNode; // can include <em> wrapped italic words
  subtext: string;
  cta?: { label: string; href: string };
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SectionHeader({ index, eyebrow, heading, subtext, cta }: Props) {
  return (
    <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted"
        >
          <span className="font-display text-base normal-case italic tracking-normal text-text-primary/70">
            ({index})
          </span>
          <span className="h-px w-8 bg-stroke" />
          {eyebrow}
        </motion.div>

        <div className="overflow-hidden pb-2">
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl"
          >
            {heading}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base"
        >
          {subtext}
        </motion.p>
      </div>

      {cta && (
        <Magnetic className="hidden md:inline-flex">
          <a
            href={cta.href}
            target={cta.href.startsWith('http') ? '_blank' : undefined}
            rel={cta.href.startsWith('http') ? 'noopener' : undefined}
            className="group inline-flex items-center gap-3 rounded-full border border-stroke py-2 pl-5 pr-2 text-sm text-text-primary transition-colors duration-300 hover:border-text-primary/40"
          >
            {cta.label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-bg transition-transform duration-500 group-hover:rotate-[-45deg]">
              →
            </span>
          </a>
        </Magnetic>
      )}
    </div>
  );
}
