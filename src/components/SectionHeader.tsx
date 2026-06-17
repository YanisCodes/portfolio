import { motion } from 'framer-motion';

type Props = {
  eyebrow: string;
  heading: React.ReactNode; // can include <em> wrapped italic words
  subtext: string;
  cta?: { label: string; href: string };
};

export default function SectionHeader({ eyebrow, heading, subtext, cta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="mb-4 text-4xl text-text-primary md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-md text-sm text-muted md:text-base">{subtext}</p>
      </div>
      {cta && (
        <a
          href={cta.href}
          className="gradient-border-hover relative hidden rounded-full md:inline-flex"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-5 py-2.5 text-sm text-text-primary">
            {cta.label} <span aria-hidden>→</span>
          </span>
        </a>
      )}
    </motion.div>
  );
}
