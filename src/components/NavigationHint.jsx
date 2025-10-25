import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './NavigationHint.css';

const NavigationHint = () => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowHint(false);
  };

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          className="navigation-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <button className="hint-close" onClick={handleDismiss}>✕</button>
          <div className="hint-content">
            <div className="hint-icon">👆</div>
            <div className="hint-text">
              <strong>Explore in 3D</strong>
              <span>Drag to rotate • Scroll to zoom • Click wonders for details</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationHint;
