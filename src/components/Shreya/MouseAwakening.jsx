import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MouseAwakening.css';

export default function MouseAwakening({ children }) {
  const [isAwakened, setIsAwakened] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isAwakened) {
        setIsAwakened(true);
      }
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      if (!isAwakened) {
        setIsAwakened(true);
      }
    };

    const handleScroll = () => {
      if (!isAwakened) {
        setIsAwakened(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAwakened]);

  return (
    <div className="awakening-wrapper">
      {/* Deserted Overlay */}
      <motion.div
        className="deserted-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: isAwakened ? 0 : 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ pointerEvents: isAwakened ? 'none' : 'auto' }}
      >
        <div className="sand-texture"></div>
        <div className="dust-particles"></div>
        <motion.div
          className="awakening-prompt"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
        
          <p className="prompt-text">Move your mouse to awaken the monument...</p>
        </motion.div>
      </motion.div>

      {/* Actual Content with Reveal Effect */}
      <motion.div
        className="awakened-content"
        initial={{ opacity: 0, filter: 'grayscale(100%) blur(10px)' }}
        animate={{
          opacity: isAwakened ? 1 : 0,
          filter: isAwakened ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(10px)'
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Light Orb Following Mouse */}
      {isAwakened && (
        <motion.div
          className="light-orb"
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20
          }}
        />
      )}
    </div>
  );
}
