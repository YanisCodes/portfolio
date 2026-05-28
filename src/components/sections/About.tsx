import Reveal from '../effects/Reveal';
import SectionHeader from './SectionHeader';
import { useCountUp } from '../../hooks/useCountUp';

function StatCard({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-border-acc)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),0_0_30px_var(--color-accent-dim)]">
      <div
        className="absolute left-0 right-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
        }}
      />
      <div
        ref={ref}
        className="mb-1.5 font-display text-[40px] font-extrabold leading-none"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-2), var(--color-accent-4))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
        {suffix}
      </div>
      <div className="text-[13px] font-medium tracking-[0.02em] text-[var(--color-t2)]">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="divider-accent relative border-t border-[var(--color-border)] py-[120px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <SectionHeader label="About" title="Who am I?" />
        <div className="grid items-start gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={0.16}>
            <div className="space-y-5 text-[16.5px] leading-[1.8] text-[var(--color-t2)]">
              <p>
                Passionate about development since my first lines of code, I'm currently a{' '}
                <span className="font-medium text-[var(--color-accent-2)]">
                  2nd year Computer Science student at ESTIN Béjaïa
                </span>
                .
              </p>
              <p>
                I specialize in{' '}
                <strong className="font-semibold text-[var(--color-t1)]">full-stack development</strong>,
                building complete applications — from user interfaces with React and Flutter to robust
                backends with Django REST and Supabase.
              </p>
              <p>
                My goal: crafting digital products that combine{' '}
                <strong className="font-semibold text-[var(--color-t1)]">polished design</strong>,{' '}
                <strong className="font-semibold text-[var(--color-t1)]">performance</strong>, and a{' '}
                <strong className="font-semibold text-[var(--color-t1)]">smooth user experience</strong>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="grid grid-cols-2 gap-4">
              <StatCard target={8} label="Projects built" />
              <StatCard target={11} label="Technologies" />
              <StatCard target={2} label="CS Years" />
              <StatCard target={100} label="Motivation" suffix="%" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
