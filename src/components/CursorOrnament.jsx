import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './CursorOrnament.css';

const CursorOrnament = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="cursor-ornament"
      animate={{
        x: mousePosition.x - 25,
        y: mousePosition.y - 25,
        opacity: isVisible ? 0.15 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5
      }}
    >
      <svg width="50" height="50" viewBox="0 0 50 50">
        {/* Outer ring */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
        
        {/* Inner ring */}
        <circle
          cx="25"
          cy="25"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.6"
        />
        
        {/* Cardinal points */}
        <line x1="25" y1="5" x2="25" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="25" y1="40" x2="25" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="5" y1="25" x2="10" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="25" x2="45" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        
        {/* Center dot */}
        <circle cx="25" cy="25" r="2" fill="currentColor" opacity="0.3" />
        
        {/* Decorative diamonds */}
        <polygon points="25,12 27,14 25,16 23,14" fill="currentColor" opacity="0.4" />
        <polygon points="25,34 27,36 25,38 23,36" fill="currentColor" opacity="0.4" />
        <polygon points="12,25 14,27 12,29 10,27" fill="currentColor" opacity="0.4" />
        <polygon points="34,25 36,27 34,29 32,27" fill="currentColor" opacity="0.4" />
      </svg>
    </motion.div>
  );
};

export default CursorOrnament;
