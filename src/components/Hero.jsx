import { motion } from 'framer-motion';
import { useState, useEffect, Suspense, lazy } from 'react';
import { FaCompass, FaMapMarkedAlt, FaChevronDown } from 'react-icons/fa';
import { GiAncientColumns, GiGreekTemple } from 'react-icons/gi';
import LightRays from './LightRays';
import './Hero.css';

// Lazy load the 3D component
const HeroArch3D = lazy(() => import('./HeroArch3D'));

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="hero-container">
      {/* Light Rays Effect */}
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        top: 0, 
        left: 0,
        zIndex: 1
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#D4AF37"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.03}
          saturation={0.7}
          fadeDistance={0.8}
          className="hero-light-rays"
        />
      </div>

      {/* 3D Arch of Wonders */}
      <Suspense fallback={null}>
        <div style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          zIndex: 2
        }}>
          <HeroArch3D />
        </div>
      </Suspense>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Seven Wonders
          <motion.span 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            of the World
          </motion.span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Journey through time and space to explore humanity's greatest architectural marvels
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <button className="cta-button primary">
            <FaCompass className="button-icon" />
            Begin Journey
            <span className="button-shine"></span>
          </button>
          <button className="cta-button secondary">
            <FaMapMarkedAlt className="button-icon" />
            Discover More
          </button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
        >
          <FaChevronDown className="scroll-arrow" />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Decorative elements with icons */}
      <motion.div
        className="decorative-corner top-left"
        initial={{ opacity: 0, x: -30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      >
        <GiGreekTemple className="corner-icon" />
      </motion.div>
      <motion.div
        className="decorative-corner top-right"
        initial={{ opacity: 0, x: 30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      >
        <GiAncientColumns className="corner-icon" />
      </motion.div>
      <motion.div
        className="decorative-corner bottom-left"
        initial={{ opacity: 0, x: -30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      >
        <GiAncientColumns className="corner-icon" />
      </motion.div>
      <motion.div
        className="decorative-corner bottom-right"
        initial={{ opacity: 0, x: 30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      >
        <GiGreekTemple className="corner-icon" />
      </motion.div>
    </div>
  );
};

export default Hero;
