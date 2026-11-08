import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/** `*word*` = rendered in italic serif accent. */
const MANIFESTO =
  "I'm Yanis — a computer science student who *builds* full-stack web & mobile apps. I care about clean interfaces, solid backends, and the *tiny* details that make software feel *right.*";

const FACTS = [
  { k: 'Based in', v: 'Béjaïa, Algeria' },
  { k: 'Studying', v: 'CS · ESTIN, year 2' },
  { k: 'Focus', v: 'React · Django · Flutter' },
];

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const words = MANIFESTO.split(' ');

  return (
    <section id="about" ref={rootRef} className="relative bg-bg py-28 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-12 md:px-10 lg:px-16">
        <div className="md:col-span-3">
          <div className="sticky top-28 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted">
            <span className="font-display text-base normal-case italic tracking-normal text-text-primary/70">
              (01)
            </span>
            About
          </div>
        </div>

        <div className="md:col-span-9">
          <p className="about-text text-[1.85rem] leading-[1.2] tracking-[-0.01em] text-text-primary sm:text-4xl md:text-5xl lg:text-[3.6rem]">
            {words.map((w, i) => {
              const accent = w.startsWith('*');
              const clean = w.replace(/\*/g, '');
              return (
                <span
                  key={i}
                  className={`about-word inline-block ${
                    accent ? 'text-gradient font-display italic' : ''
                  }`}
                >
                  {clean}
                  {i < words.length - 1 && ' '}
                </span>
              );
            })}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stroke bg-stroke sm:grid-cols-3 md:mt-24">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="flex flex-col gap-2 bg-bg p-6 md:p-8"
              >
                <span className="text-[10.5px] uppercase tracking-[0.3em] text-muted">{f.k}</span>
                <span className="font-display text-2xl italic text-text-primary md:text-3xl">{f.v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
