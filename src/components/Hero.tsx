import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HlsVideo from './HlsVideo';
import { HLS_VIDEO_URL, ROLES } from '../data/constants';

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.name-reveal', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
      }).from(
        '.blur-in',
        {
          opacity: 0,
          filter: 'blur(10px)',
          y: 20,
          duration: 1,
          stagger: 0.1,
        },
        '-=0.9'
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Role cycle
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HlsVideo
          src={HLS_VIDEO_URL}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <div className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
            COLLECTION '26
          </div>

          <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
            Yanis Oukaci
          </h1>

          <p className="blur-in mb-3 text-lg text-text-primary/90 md:text-xl">
            A{' '}
            <span
              key={roleIdx}
              className="animate-role-fade-in inline-block font-display italic text-text-primary"
            >
              {ROLES[roleIdx]}
            </span>{' '}
            lives in Béjaïa.
          </p>

          <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
            Designing seamless digital interactions by focusing on the unique
            nuances which bring systems to life.
          </p>

          <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="group relative inline-flex rounded-full"
            >
              <span className="relative inline-flex items-center rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-all duration-300 group-hover:bg-bg group-hover:text-text-primary">
                See works
              </span>
              <span className="gradient-border pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>

            <a
              href="#contact"
              className="group relative inline-flex rounded-full"
            >
              <span className="relative inline-flex items-center rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-all duration-300 group-hover:border-transparent">
                Reach out...
              </span>
              <span className="gradient-border pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          SCROLL
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div className="animate-scroll-down absolute inset-x-0 top-0 h-1/2 bg-text-primary" />
        </div>
      </div>
    </section>
  );
}
