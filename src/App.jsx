import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import JourneySection from './components/JourneySection';
import WonderCards from './components/WonderCards';
import AmbientBackground from './components/AmbientBackground';
import CursorOrnament from './components/CursorOrnament';
import EnhancedBackground from './components/EnhancedBackground';
import './App.css';

// Lazy load heavy 3D components
const Scene3D = lazy(() => import('./components/Scene3D'));
const WondersLayout3D = lazy(() => import('./components/WondersLayout3D'));

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWonder, setSelectedWonder] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWonderClick = (wonderName) => {
    setSelectedWonder(wonderName);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <div className="App">
        <EnhancedBackground />
        <AmbientBackground />
        <CursorOrnament />
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
      </div>
    </>
  );
}

export default App;
