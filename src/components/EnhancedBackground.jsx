import { motion } from 'framer-motion';
import './EnhancedBackground.css';

const EnhancedBackground = () => {
  return (
    <div className="enhanced-background">
      {/* Animated gradient orbs */}
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="gradient-orb orb-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="gradient-orb orb-3"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Decorative patterns */}
      <div className="pattern-overlay pattern-1"></div>
      <div className="pattern-overlay pattern-2"></div>
      
      {/* Corner ornaments */}
      <div className="corner-ornament corner-tl"></div>
      <div className="corner-ornament corner-tr"></div>
      <div className="corner-ornament corner-bl"></div>
      <div className="corner-ornament corner-br"></div>
    </div>
  );
};

export default EnhancedBackground;
