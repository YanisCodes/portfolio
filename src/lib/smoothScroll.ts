import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './spotlight';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Starts Lenis, wires it into GSAP's ticker + ScrollTrigger, and makes
 *  in-page anchor links glide instead of jump. Returns a teardown fn. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  const instance = lenis;
  instance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href')!;
    const target = hash === '#' ? 0 : document.querySelector<HTMLElement>(hash);
    if (target === null) return;
    e.preventDefault();
    instance.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(raf);
    instance.destroy();
    lenis = null;
  };
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 2 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function setScrollLocked(locked: boolean) {
  if (!lenis) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    return;
  }
  if (locked) lenis.stop();
  else lenis.start();
}
