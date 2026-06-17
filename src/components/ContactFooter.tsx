import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HlsVideo from './HlsVideo';
import { CONTACT_EMAIL, HLS_VIDEO_URL, SOCIALS } from '../data/constants';

const MARQUEE_TEXT = 'BUILDING THE FUTURE • ';

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      {/* Background video (flipped) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HlsVideo
          src={HLS_VIDEO_URL}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden whitespace-nowrap py-12 md:py-20">
          <div ref={marqueeRef} className="inline-block whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-6xl italic text-text-primary/40 md:text-8xl lg:text-9xl"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-6 py-12 text-center md:py-16">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Get in touch
            </span>
            <h2 className="font-display text-5xl italic text-text-primary md:text-7xl lg:text-8xl">
              Let's talk.
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="gradient-border-hover relative mt-4 inline-flex rounded-full"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg">
                {CONTACT_EMAIL} <span aria-hidden>↗</span>
              </span>
            </a>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mx-auto max-w-[1200px] border-t border-stroke px-6 pt-8 md:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener' : undefined}
                  className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Available for projects
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted/60 sm:text-left">
            © 2026 Yanis Oukaci · Béjaïa, Algeria
          </div>
        </div>
      </div>
    </footer>
  );
}
