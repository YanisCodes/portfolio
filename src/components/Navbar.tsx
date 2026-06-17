import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Resume', href: 'https://github.com/YanisCodes', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 100);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'work'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Home"
          className="group relative flex h-9 w-9 items-center justify-center rounded-full p-[1.5px] transition-transform hover:scale-110"
        >
          <span
            className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:rotate-180"
            style={{ transformOrigin: 'center' }}
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            YO
          </span>
        </a>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Links */}
        {LINKS.map((link) => {
          const isActive = !link.external && active === link.href;
          const base =
            'rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors';
          return (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener' : undefined}
              className={`${base} ${
                isActive
                  ? 'bg-stroke/50 text-text-primary'
                  : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          );
        })}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Say hi button */}
        <a
          href="#contact"
          className="gradient-border-hover relative inline-flex rounded-full"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
