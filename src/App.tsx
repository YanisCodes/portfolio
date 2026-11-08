import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import ContactFooter from './components/ContactFooter';
import Cursor from './components/Cursor';
import { initSmoothScroll, setScrollLocked } from './lib/smoothScroll';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="accent-gradient fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const teardown = initSmoothScroll();
    return teardown;
  }, []);

  useEffect(() => {
    setScrollLocked(isLoading);
    if (!isLoading) ScrollTrigger.refresh();
  }, [isLoading]);

  const handleLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <div className="bg-bg text-text-primary">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoaded} />}
      </AnimatePresence>

      <Cursor />
      <div className="grain" aria-hidden />
      <ScrollProgress />

      <Navbar />
      <main>
        <Hero ready={!isLoading} />
        <About />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
      </main>
      <ContactFooter />
    </div>
  );
}
