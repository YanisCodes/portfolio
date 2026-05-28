import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../../data/roles';
import { ArrowUpRight, GithubLg, ScrollDown } from '../../data/icons';
import { useTextScramble } from '../../hooks/useTextScramble';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import MagneticButton from '../ui/MagneticButton';
import Particles from '../effects/Particles';

const ENTER = {
  initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2400;
const PAUSE_AFTER_DELETE = 350;

export default function Hero() {
  const reduced = useReducedMotion();

  // Hero name scramble
  const { text: nameText, scramble: scrambleName } = useTextScramble('Yanis Oukaci');
  const [nameVisible, setNameVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setNameVisible(true);
      return;
    }
    const t = setTimeout(() => {
      setNameVisible(true);
      scrambleName('Yanis Oukaci', 1200);
    }, 380);
    return () => clearTimeout(t);
  }, [scrambleName, reduced]);

  // Role typewriter
  const [roleText, setRoleText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer: number;
    setCursorVisible(true);
    const tick = () => {
      const word = ROLES[wordIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setRoleText(word.substring(0, charIdx.current));
        if (charIdx.current === word.length) {
          deleting.current = true;
          timer = window.setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        timer = window.setTimeout(tick, TYPE_SPEED + Math.random() * 40);
      } else {
        charIdx.current--;
        setRoleText(word.substring(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % ROLES.length;
          timer = window.setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timer = window.setTimeout(tick, DELETE_SPEED);
      }
    };
    timer = window.setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll indicator
  const [scrollVisible, setScrollVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScrollVisible(true), 1800);
    const onScroll = () => {
      if (scrollY > 100) setScrollVisible(false);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <Particles />

      {/* Gradient orbs */}
      <div
        aria-hidden
        className="mesh-a pointer-events-none absolute z-0 rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          top: '-20%',
          right: '-15%',
          filter: 'blur(80px)',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="mesh-b pointer-events-none absolute z-0 rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          bottom: '-15%',
          left: '-10%',
          filter: 'blur(80px)',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(99,102,241,0.03) 40%, transparent 65%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1120px] px-7">
        <div className="relative z-10">
          {/* Status badge */}
          <motion.div
            {...ENTER}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12.5px] font-medium"
            style={{
              background: 'rgba(52,211,153,0.08)',
              borderColor: 'rgba(52,211,153,0.2)',
              color: '#34d399',
            }}
          >
            <span className="pulse-glow inline-block h-[7px] w-[7px] rounded-full bg-[#34d399]" />
            Available for projects
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            {...ENTER}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-t2)]"
          >
            <span
              className="h-[1.5px] w-6 rounded-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-accent-1), var(--color-accent-3))',
              }}
            />
            Béjaïa, Algeria
          </motion.div>

          {/* Name with scramble */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: nameVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-grad-name font-display text-[clamp(56px,10vw,110px)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          >
            {nameText}
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            {...ENTER}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 mt-3.5 flex min-h-[clamp(38px,6vw,62px)] items-center gap-1"
          >
            <span className="font-display text-[clamp(32px,5.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-accent-2)]">
              {roleText}
            </span>
            <span
              className={`cursor-blink ml-1 inline-block w-[3px] rounded-sm bg-[var(--color-accent-2)] ${cursorVisible ? '' : 'opacity-0'}`}
              style={{ height: 'clamp(28px, 4.5vw, 48px)' }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            {...ENTER}
            transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-[520px] text-[17px] leading-[1.75] text-[var(--color-t2)]"
          >
            2<sup>nd</sup> year CS student at ESTIN — I build complete web and mobile applications,
            from polished interfaces to robust APIs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...ENTER}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <MagneticButton href="#projects" variant="primary">
              {ArrowUpRight}
              View my projects
            </MagneticButton>
            <MagneticButton href="mailto:yanisoukaci667@gmail.com" variant="ghost">
              Contact me
            </MagneticButton>
            <a
              href="https://github.com/YanisCodes"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--color-t2)] transition-colors hover:text-[var(--color-t1)]"
            >
              {GithubLg}
              GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`bounce-down absolute bottom-9 left-1/2 flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-t3)] transition-opacity duration-1000 ${scrollVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <span>Scroll</span>
        <span className="opacity-50">{ScrollDown}</span>
      </div>
    </section>
  );
}
