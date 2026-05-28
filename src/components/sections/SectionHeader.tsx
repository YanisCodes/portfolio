import Reveal from '../effects/Reveal';

export default function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <>
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-2)]">
          <span
            className="h-[1.5px] w-6 rounded-[1px]"
            style={{
              background: 'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
            }}
          />
          {label}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mb-14 font-display text-[clamp(36px,5vw,56px)] font-bold leading-[1.08] tracking-[-0.025em] text-[var(--color-t1)]">
          {title}
        </h2>
      </Reveal>
    </>
  );
}
