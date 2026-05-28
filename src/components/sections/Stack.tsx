import { useEffect, useRef, useState } from 'react';
import Reveal from '../effects/Reveal';
import SectionHeader from './SectionHeader';
import { STACK_CATEGORIES } from '../../data/stack';

function StackItem({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setWidth(level), 200);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="group/item flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-t2)] transition-colors duration-200 group-hover/item:text-[var(--color-t1)]">
          <span className="h-[5px] w-[5px] rounded-full bg-[var(--color-accent-2)] opacity-50" />
          {name}
        </span>
        <span className="font-mono text-[11px] font-medium text-[var(--color-t3)]">
          {level}%
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-sm bg-white/[0.04]">
        <div
          className="h-full rounded-sm transition-[width] duration-[1s] [transition-timing-function:var(--ease-snap)]"
          style={{
            width: `${width}%`,
            background:
              'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
          }}
        />
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="divider-accent relative border-t border-[var(--color-border)] py-[120px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <SectionHeader label="Technologies" title="My stack" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STACK_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={0.16 + i * 0.07}>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-border-acc)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.25),0_0_20px_var(--color-accent-dim)]">
                {/* Shimmer */}
                <div
                  className="absolute top-0 h-full w-1/2 -translate-x-[100%] [transition:transform_600ms_var(--ease-snap)] group-hover:translate-x-[300%]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                  }}
                />
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent-2)]">
                    {cat.icon}
                  </div>
                  <h3 className="font-display text-[16px] font-semibold tracking-[-0.01em] text-[var(--color-t1)]">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-3.5">
                  {cat.items.map((item) => (
                    <StackItem key={item.name} {...item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
