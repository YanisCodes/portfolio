import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import ContactFooter from './components/ContactFooter';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-bg text-text-primary">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
      </main>
      <ContactFooter />
    </div>
  );
}
