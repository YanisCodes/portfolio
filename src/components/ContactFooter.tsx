import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import HlsVideo from './HlsVideo';
import Magnetic from './Magnetic';
import { CONTACT_EMAIL, HLS_VIDEO_URL, SOCIALS } from '../data/constants';
import { useLocalTime } from '../lib/useLocalTime';
import { scrollToTop } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_WORDS = ["Let's build", 'something', 'together'];

export default function ContactFooter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const time = useLocalTime();

  // Marquee that speeds up and flips direction with scroll velocity
  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 36,
        ease: 'none',
        repeat: -1,
      });
      // Start far into the loop so a negative timeScale can run backwards freely
      tween.totalTime(tween.duration() * 1000);
      let dir = 1;
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 6);
          gsap.to(tween, { timeScale: dir * boost, duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' });
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <footer id="contact" ref={rootRef} className="relative overflow-hidden bg-bg pb-8 pt-10 md:pb-10">
      {/* Background video (flipped) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HlsVideo
          src={HLS_VIDEO_URL}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />
        <div className="grid-lines absolute inset-0 opacity-70" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-8 md:py-12">
          <div ref={trackRef} className="inline-flex whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, half) => (
              <div key={half} className="inline-flex items-center">
                {Array.from({ length: 4 }).map((__, r) =>
                  MARQUEE_WORDS.map((w, j) => (
                    <span key={`${r}-${j}`} className="inline-flex items-center">
                      <span
                        className={`px-6 font-display text-6xl italic md:text-8xl lg:text-9xl ${
                          j % 2 === 1 ? 'text-outline' : 'text-text-primary/85'
                        }`}
                      >
                        {w}
                      </span>
                      <span className="animate-spin-slow inline-block text-3xl text-accent md:text-5xl">✦</span>
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-8 py-20 text-center md:py-28">
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-text-primary/60">
              <span className="font-display text-base normal-case italic tracking-normal">(05)</span>
              <span className="h-px w-8 bg-white/20" />
              Get in touch
            </span>

            <div className="overflow-hidden pb-3">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[18vw] italic leading-[0.9] tracking-[-0.02em] text-text-primary md:text-[11vw] lg:text-[9.5rem]"
              >
                Let's <span className="text-gradient">talk.</span>
              </motion.h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-text-primary/60 md:text-base">
              Got a project, an internship, or just want to say hi? My inbox is
              always open.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  data-cursor="Write"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-text-primary py-2 pl-6 pr-2 text-sm font-medium text-bg md:text-base"
                >
                  <span className="relative z-10">{CONTACT_EMAIL}</span>
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg text-text-primary transition-transform duration-500 group-hover:rotate-45">
                    ↗
                  </span>
                  <span className="accent-gradient absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                </a>
              </Magnetic>
              <button
                onClick={copyEmail}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-text-primary backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
              >
                {copied ? 'Copied ✓' : 'Copy email'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 text-xs md:grid-cols-4">
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.25em] text-muted">Socials</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener' : undefined}
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-text-primary/80 transition-colors hover:text-text-primary"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {s.label}
                  </span>
                  <span aria-hidden className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.25em] text-muted">Local time</span>
              <span className="tabular-nums text-sm text-text-primary/80">{time}</span>
              <span className="text-sm text-text-primary/50">Béjaïa, GMT+1</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.25em] text-muted">Status</span>
              <span className="inline-flex items-center gap-2 text-sm text-text-primary/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-soft absolute inset-0 rounded-full bg-emerald-400" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for projects
              </span>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="uppercase tracking-[0.25em] text-muted">Back to top</span>
              <Magnetic>
                <button
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-text-primary transition-colors duration-300 hover:border-transparent hover:bg-text-primary hover:text-bg"
                >
                  <span className="transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
                </button>
              </Magnetic>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-text-primary/40 sm:flex-row">
            <span>© 2026 Yanis Oukaci</span>
            <span>Designed &amp; built with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
