import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import JourneySection from './components/JourneySection';
import WonderCards from './components/WonderCards';
import AmbientBackground from './components/AmbientBackground';
import CursorOrnament from './components/CursorOrnament';
import EnhancedBackground from './components/EnhancedBackground';
import CinematicWondersIntro from './components/CinematicWondersIntro';
import './App.css';
import { FaGlobe } from 'react-icons/fa';

// Lazy load heavy 3D components
const Scene3D = lazy(() => import('./components/Scene3D'));
const WondersLayout3D = lazy(() => import('./components/WondersLayout3D'));
// Lazy-load Shreya pages (hash-based simple routing)
const TicketPage = lazy(() => import('./components/Shreya/TicketPage'));
const ArtisansPage = lazy(() => import('./components/Shreya/ArtisansPage'));
const TajMahalExperience = lazy(() => import('./components/Shreya/TajMahalExperience'));
const TajMahalStreetViewSimple = lazy(() => import('./components/Shreya/TajMahakStreetViewSimple'));

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWonder, setSelectedWonder] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onHash = () => setCurrentHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleWonderClick = (wonderName) => {
    setSelectedWonder(wonderName);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setShowIntro(false), 500);
  };

  return (
    <>
      {/* Cinematic Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <CinematicWondersIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="App">
        <EnhancedBackground />
        <AmbientBackground />
        <CursorOrnament />

        {/* If hash points to one of the standalone pages, render it. Otherwise render main experience */}
        {currentHash === '#ticket' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <TicketPage />
          </Suspense>
        ) : currentHash === '#artisans' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <ArtisansPage />
          </Suspense>
        ) : currentHash === '#retroscroll' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <TajMahalExperience />
          </Suspense>
        ) : currentHash === '#tajmahalstreetview' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1a1a2e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Street View...</div>}>
            <TajMahalStreetViewSimple />
          </Suspense>
        ) : (
          // default / home flow
          <>
            <Hero />
            <Suspense fallback={<div style={{ height: '100vh', background: 'transparent' }}></div>}>
              <WondersLayout3D />
            </Suspense>
            <StorySection />
            <Suspense fallback={<div style={{ height: '100vh', background: 'transparent' }}></div>}>
              <Scene3D />
            </Suspense>
            <JourneySection />
            <WonderCards />
          </>
        )}
        {/* Sticky globe button — navigates to the street view \"page\" */}
        <button
          className="globe-button"
          aria-label="Open Taj Mahal Street View"
          onClick={() => { window.location.hash = '#tajmahalstreetview'; }}
        >
          <FaGlobe className="icon" />
        </button>
      </div>
    </>
  );
}

export default App;
