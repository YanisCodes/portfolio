import { useRef } from 'react';
import Reveal from '../effects/Reveal';
import SectionHeader from './SectionHeader';
import { PROJECTS, type Project } from '../../data/projects';
import { ArrowUpRight, Github } from '../../data/icons';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="flex shrink-0 gap-1.5">
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener"
          title="GitHub"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-t2)] transition-[border-color,color,background,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-2)] hover:bg-[var(--color-accent-dim)] hover:text-[var(--color-accent-2)]"
        >
          {Github}
        </a>
      )}
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener"
          title="Live"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-t2)] transition-[border-color,color,background,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-2)] hover:bg-[var(--color-accent-dim)] hover:text-[var(--color-accent-2)]"
        >
          {ArrowUpRight}
        </a>
      )}
    </div>
  );
}

function Pills({ stack }: { stack: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span
          key={s}
          className="inline-block rounded-md border border-[var(--color-border)] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] font-normal tracking-[0.02em] text-[var(--color-t3)]"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function useTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 600ms cubic-bezier(0.34,1.56,0.64,1)';
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 600);
  };
  return { ref, onMove, onLeave };
}

function FeaturedCard({ p, idx }: { p: Project; idx: number }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <Reveal delay={0.16}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative mb-5 grid grid-cols-1 gap-9 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-border-acc)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_var(--color-accent-dim)] md:grid-cols-2"
      >
        <div
          className="absolute left-0 right-0 top-0 h-0.5"
          style={{
            background:
              'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-2), var(--color-accent-3), var(--color-accent-4))',
          }}
        />
        <span
          className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-3))',
          }}
        >
          ⭐ Featured
        </span>

        <div className="flex flex-col justify-center gap-4">
          <span className="font-mono text-[13px] font-semibold tracking-[0.05em] text-[var(--color-accent-2)]">
            Project {pad(idx + 1)}
          </span>
          <h3 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--color-t1)]">
            {p.name}
          </h3>
          <p className="text-[15px] leading-[1.75] text-[var(--color-t2)]">{p.desc}</p>
          <Pills stack={p.stack} />
          <div className="mt-3 flex gap-2">
            <ProjectLinks p={p} />
          </div>
        </div>

        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
          <span
            className="font-mono text-[52px] font-bold opacity-70"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-4))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {p.name.substring(0, 2).toUpperCase()}
          </span>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, var(--color-accent-dim), transparent 70%)',
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}

function GridCard({ p, idx }: { p: Project; idx: number }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <Reveal delay={0.1 + idx * 0.06}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-border-acc)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_var(--color-accent-dim)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute left-0 right-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-accent-2), transparent)',
          }}
        />
        <span className="font-mono text-[12px] font-semibold tracking-[0.05em] text-[var(--color-accent-2)] opacity-60">
          Project {pad(idx + 1)}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-t1)]">
            {p.name}
          </h3>
          <ProjectLinks p={p} />
        </div>
        <p className="flex-1 text-[13.5px] leading-[1.7] text-[var(--color-t2)]">{p.desc}</p>
        <Pills stack={p.stack} />
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="divider-accent relative border-t border-[var(--color-border)] py-[120px]"
    >
      <div className="mx-auto max-w-[1120px] px-7">
        <SectionHeader label="Work" title="Recent projects" />
        {featured && (
          <FeaturedCard p={featured} idx={PROJECTS.indexOf(featured)} />
        )}
        <div className="grid gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <GridCard key={p.name} p={p} idx={PROJECTS.indexOf(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
