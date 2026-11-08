import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Now', href: '#now' },
  { label: 'Toolkit', href: '#toolkit' },
];
const SECTION_IDS = ['home', 'about', 'work', 'now', 'toolkit', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('#home');
  const [hovered, setHovered] = useState<string | null>(null);
  const lastY = useRef(0);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setScrolled(y > 60);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 400);
        lastY.current = y;
      }
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in the middle of the viewport
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const pill = hovered ?? active;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-4 md:pt-6"
    >
      <div
        onMouseLeave={() => setHovered(null)}
        className={`inline-flex items-center gap-0.5 rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-surface/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]'
            : 'border-white/5 bg-white/[0.03]'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Home"
          className="group relative mr-1 flex h-9 w-9 items-center justify-center rounded-full p-[1.5px]"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-700 group-hover:rotate-180" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            YO
          </span>
        </a>

        {LINKS.map((link) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className={`relative rounded-full px-2.5 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                isActive || hovered === link.href ? 'text-text-primary' : 'text-muted'
              } ${link.label === 'Toolkit' ? 'hidden sm:block' : ''}`}
            >
              {pill === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          );
        })}

        <a
          href="#contact"
          className={`group relative ml-1 inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
            active === '#contact' ? 'text-white' : 'bg-text-primary text-bg hover:text-white'
          }`}
        >
          <span
            className={`accent-gradient absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active === '#contact' ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
            }`}
          />
          <span className="relative">Say hi</span>
          <span aria-hidden className="relative transition-transform duration-300 group-hover:rotate-45">
            ↗
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
