import Cursor from './components/effects/Cursor';
import Noise from './components/effects/Noise';
import ScrollProgress from './components/effects/ScrollProgress';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Stack from './components/sections/Stack';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <>
      <Cursor />
      <Noise />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
