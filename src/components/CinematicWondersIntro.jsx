import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CinematicWondersIntro.css';

const CinematicWondersIntro = ({ onComplete }) => {
  const [illuminatedIndices, setIlluminatedIndices] = useState([]);

  // Monument wireframe data
  const monuments = [
    {
      name: 'Taj Mahal',
      paths: [
        'M 50 80 L 50 40 L 70 20 L 90 40 L 90 80 Z', // dome
        'M 40 80 L 100 80 L 100 120 L 40 120 Z', // main body
        'M 30 50 L 30 120 L 25 120 L 25 50 Z', // left minaret
        'M 110 50 L 110 120 L 115 120 L 115 50 Z', // right minaret
      ]
    },
    {
      name: 'Great Wall',
      paths: [
        'M 10 60 L 30 50 L 50 60 L 70 50 L 90 60 L 110 50 L 130 60 L 130 80 L 10 80 Z',
        'M 25 50 L 35 50 L 35 40 L 25 40 Z',
        'M 65 50 L 75 50 L 75 40 L 65 40 Z',
        'M 105 50 L 115 50 L 115 40 L 105 40 Z',
      ]
    },
    {
      name: 'Petra',
      paths: [
        'M 50 100 L 30 60 L 30 30 L 50 20 L 70 30 L 70 60 Z', // facade
        'M 35 50 L 45 50 L 45 70 L 35 70 Z', // left column
        'M 55 50 L 65 50 L 65 70 L 55 70 Z', // right column
        'M 40 35 L 60 35 L 60 45 L 40 45 Z', // entrance
      ]
    },
    {
      name: 'Colosseum',
      paths: [
        'M 50 50 Q 80 50 80 70 Q 80 90 50 90 Q 20 90 20 70 Q 20 50 50 50 Z', // outer ring
        'M 50 60 Q 70 60 70 70 Q 70 80 50 80 Q 30 80 30 70 Q 30 60 50 60 Z', // inner ring
        'M 30 70 L 70 70', // horizontal line
        'M 50 50 L 50 90', // vertical line
      ]
    },
    {
      name: 'Chichen Itza',
      paths: [
        'M 50 20 L 70 40 L 70 80 L 30 80 L 30 40 Z', // pyramid
        'M 30 40 L 70 40', // level 1
        'M 35 50 L 65 50', // level 2
        'M 40 60 L 60 60', // level 3
        'M 45 70 L 55 70', // level 4
      ]
    },
    {
      name: 'Machu Picchu',
      paths: [
        'M 20 80 L 30 70 L 40 75 L 50 65 L 60 70 L 70 60 L 80 70 L 80 90 L 20 90 Z',
        'M 35 75 L 45 75 L 45 85 L 35 85 Z',
        'M 55 70 L 65 70 L 65 80 L 55 80 Z',
        'M 50 65 L 50 55 L 60 55 L 60 65 Z',
      ]
    },
    {
      name: 'Christ the Redeemer',
      paths: [
        'M 50 30 L 50 80', // body
        'M 20 40 L 80 40', // arms
        'M 45 20 Q 50 15 55 20 Q 55 25 50 25 Q 45 25 45 20 Z', // head
        'M 45 80 L 50 100 L 55 80 Z', // robe base
      ]
    }
  ];

  useEffect(() => {
    // Randomly select 3 monuments to illuminate
    const indices = [];
    while (indices.length < 3) {
      const rand = Math.floor(Math.random() * monuments.length);
      if (!indices.includes(rand)) indices.push(rand);
    }
    setIlluminatedIndices(indices);

    // Auto-complete after animation duration
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8000); // 8 seconds total

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="cinematic-intro-container">
      {/* Cosmic background with particles */}
      <div className="cosmic-background">
        <div className="stars-layer"></div>
        <div className="smoke-layer"></div>
      </div>

      {/* Monument wireframes scattered */}
      <div className="monuments-grid">
        {monuments.map((monument, index) => {
          const isIlluminated = illuminatedIndices.includes(index);
          
          return (
            <motion.div
              key={monument.name}
              className={`monument-item ${isIlluminated ? 'illuminated' : 'dim'}`}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 1.5, delay: index * 0.2 },
                scale: { duration: 1.5, delay: index * 0.2 },
                rotateY: { duration: 1.5, delay: index * 0.2 },
                y: { 
                  duration: 3 + index * 0.3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }
              }}
              style={{
                gridColumn: `span ${index % 2 === 0 ? 1 : 2}`,
              }}
            >
              <svg 
                className="monument-svg" 
                viewBox="0 0 140 120" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id={`glow-${index}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isIlluminated ? "#D4AF37" : "#8B3A3A"} stopOpacity="0.8"/>
                    <stop offset="100%" stopColor={isIlluminated ? "#CD7F32" : "#D4725B"} stopOpacity="0.4"/>
                  </linearGradient>
                </defs>
                
                {monument.paths.map((path, pathIndex) => (
                  <motion.path
                    key={pathIndex}
                    d={path}
                    fill="none"
                    stroke={`url(#grad-${index})`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={isIlluminated ? `url(#glow-${index})` : 'none'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isIlluminated ? [0.6, 1, 0.6] : 0.25,
                    }}
                    transition={{
                      pathLength: { duration: 2, delay: index * 0.2 + pathIndex * 0.1 },
                      opacity: isIlluminated 
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 1.5, delay: index * 0.2 }
                    }}
                  />
                ))}
              </svg>
              
              <motion.div 
                className="monument-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: isIlluminated ? 0.8 : 0.3 }}
                transition={{ duration: 1, delay: index * 0.2 + 1 }}
              >
                {monument.name}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Central title that fades in */}
      <motion.div
        className="intro-title"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, delay: 2.5, times: [0, 0.2, 0.8, 1] }}
        >
          Seven Wonders
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, delay: 3, times: [0, 0.2, 0.8, 1] }}
        >
          Whispers of History in the Cosmic Expanse
        </motion.p>
      </motion.div>

      {/* Fade out overlay before transitioning */}
      <motion.div
        className="fade-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1] }}
        transition={{ duration: 2, delay: 6.5, times: [0, 0.7, 0.9, 1] }}
      />
    </div>
  );
};

export default CinematicWondersIntro;
