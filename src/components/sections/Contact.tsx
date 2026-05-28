import Reveal from '../effects/Reveal';
import { GithubLg, Mail, Whatsapp } from '../../data/icons';
import type { ReactNode } from 'react';

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener"
      className="group flex flex-col items-center gap-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-7 transition-[border-color,transform,box-shadow,background] duration-300 hover:-translate-y-1 hover:border-[var(--color-border-acc)] hover:bg-[var(--color-surface-2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_30px_var(--color-accent-dim)]"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-accent-2)] transition-[background,transform] duration-300 group-hover:scale-[1.08]"
        style={{
          background: 'var(--color-accent-dim)',
          border: '1px solid rgba(217,168,113,0.18)',
        }}
      >
        {icon}
      </div>
      <span className="text-[15px] font-semibold text-[var(--color-t1)]">{label}</span>
      <span className="break-all text-[12.5px] text-[var(--color-t2)]">{value}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="divider-accent relative overflow-hidden border-t border-[var(--color-border)] py-[120px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '-40%',
            width: '80vw',
            height: '80vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(217,168,113,0.07), transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1120px] px-7">
        <div className="text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-2)]">
              <span
                className="h-[1.5px] w-6 rounded-[1px]"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
                }}
              />
              Contact
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-4 font-display text-[clamp(40px,7vw,72px)] font-extrabold leading-none tracking-[-0.03em]">
              <span className="text-grad-soft">
                Let's build
                <br />
                something?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mb-12 max-w-[480px] text-[17px] leading-[1.7] text-[var(--color-t2)]">
              Always open to new ideas and collaborations. Feel free to reach out!
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mx-auto grid max-w-[720px] gap-4 sm:grid-cols-3">
              <ContactCard
                href="mailto:yanisoukaci667@gmail.com"
                icon={Mail}
                label="Email"
                value="yanisoukaci667@gmail.com"
              />
              <ContactCard
                href="https://github.com/YanisCodes"
                icon={GithubLg}
                label="GitHub"
                value="YanisCodes"
              />
              <ContactCard
                href="https://wa.me/213541168410"
                icon={Whatsapp}
                label="WhatsApp"
                value="+213 541 168 410"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
