import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#about', label: 'About', section: 'about' },
  { href: '#stack', label: 'Stack', section: 'stack' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#contact', label: 'Contact', section: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 50);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.section)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[100] flex h-16 items-center justify-between px-8 transition-[border-color,background] duration-300 [transition-timing-function:var(--ease-snap)] ${
          scrolled
            ? 'border-b border-[var(--color-border)] bg-[rgba(5,5,8,0.88)]'
            : 'border-b border-transparent bg-[rgba(5,5,8,0.7)]'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        }}
      >
        <a href="#" className="text-grad-logo font-display text-2xl font-bold tracking-[-0.02em] transition-opacity hover:opacity-80">
          YO.
        </a>

        <ul className="hidden gap-2 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative inline-block rounded-md px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-200 hover:bg-white/[0.04] hover:text-[var(--color-t1)] ${
                  active === l.section ? 'text-[var(--color-t1)]' : 'text-[var(--color-t2)]'
                }`}
              >
                {l.label}
                {active === l.section && (
                  <span
                    className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-[1px]"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="z-[102] flex cursor-pointer flex-col gap-[5px] bg-transparent p-1 md:hidden"
        >
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-[var(--color-t1)] transition-transform duration-300 [transition-timing-function:var(--ease-snap)] ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-[var(--color-t1)] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-[var(--color-t1)] transition-transform duration-300 [transition-timing-function:var(--ease-snap)] ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[101] flex flex-col items-center justify-center gap-3 bg-[rgba(5,5,8,0.96)] transition-opacity duration-300 md:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)' }}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="rounded-xl px-8 py-3 font-display text-3xl font-semibold text-[var(--color-t2)] transition-colors duration-200 hover:bg-white/[0.04] hover:text-[var(--color-t1)]"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
