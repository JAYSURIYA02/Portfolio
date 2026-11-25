import { useCallback, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { portfolioConfig } from './config/portfolioConfig';
import { LenisProvider } from './hooks/useLenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <HelmetProvider>
      <LenisProvider>
        <Helmet>
          <html lang="en" />
          <title>{portfolioConfig.seo.title}</title>
          <meta name="description" content={portfolioConfig.seo.description} />
          <meta name="keywords" content={portfolioConfig.seo.keywords} />
          <meta property="og:title" content={portfolioConfig.seo.title} />
          <meta property="og:description" content={portfolioConfig.seo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={portfolioConfig.seo.url} />
        </Helmet>

        {/* Subtle grain overlay */}
        <div className="film-grain" aria-hidden="true" />

        <Preloader onComplete={handlePreloaderComplete} />
        <CustomCursor />
        <Navbar />

        <main className="relative bg-[#080808]">
          <Hero preloaderDone={preloaderDone} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </LenisProvider>
    </HelmetProvider>
  );
}
