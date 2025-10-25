import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './AmbientBackground.css';

const AmbientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="ambient-background">
      {/* Subtle gradient overlays */}
      <div className="gradient-overlay overlay-1"></div>
      <div className="gradient-overlay overlay-2"></div>
      <div className="gradient-overlay overlay-3"></div>

      {/* Vintage paper texture */}
      <div className="paper-texture"></div>

      {/* Floating ornamental shapes */}
      <div className="ornamental-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`ornament ornament-${i % 4}`}
            style={{
              left: `${(i * 16 + Math.random() * 5)}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Subtle geometric patterns */}
      <div className="geometric-patterns">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="geo-pattern"
            style={{
              left: `${i * 25}%`,
              top: `${(i % 2) * 50}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Vintage map lines */}
      <svg className="map-lines" width="100%" height="100%">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Ancient symbols floating */}
      <div className="ancient-symbols">
        {['◇', '○', '△', '☆'].map((symbol, i) => (
          <motion.div
            key={i}
            className="symbol"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Parallax layers */}
      <motion.div
        className="parallax-layer layer-1"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      />
      <motion.div
        className="parallax-layer layer-2"
        style={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
        }}
      />
      <motion.div
        className="parallax-layer layer-3"
        style={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
      />

      {/* Subtle light rays */}
      <div className="light-rays">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="light-ray"
            style={{
              left: `${i * 33}%`,
            }}
            animate={{
              opacity: [0.02, 0.08, 0.02],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* Vintage vignette */}
      <div className="vignette"></div>
    </div>
  );
};

export default AmbientBackground;
