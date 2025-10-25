import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './RetroScroll.css';

export default function RetroScroll({ story, inkSound, onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isWriting, setIsWriting] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const paperRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  // Ink writing animation for each line
  useEffect(() => {
    if (!isWriting || currentLine >= story.length) {
      if (currentLine >= story.length && onComplete) {
        setTimeout(() => onComplete(), 3000);
      }
      return;
    }

    const line = story[currentLine];
    
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
        
        // Play ink sound occasionally (reduced frequency)
        if (inkSound && Math.random() < 0.03) {
          try {
            inkSound.currentTime = 0;
            inkSound.play().catch(err => console.log('Audio play failed:', err));
          } catch (e) {
            // Silently handle audio errors
          }
        }
      }, 60 + Math.random() * 20);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after pause
      const pauseTimer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 600);
      
      return () => clearTimeout(pauseTimer);
    }
  }, [currentChar, currentLine, isWriting, story, inkSound, onComplete]);

  return (
    <div className="retro-scroll-container" ref={containerRef}>
      
      {/* Left Half - Torn Paper with Ink Writing */}
      <motion.div 
        className="scroll-left-half"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          rotate: paperRotate,
          willChange: 'transform'
        }}
      >
        {/* Torn Paper Texture Background */}
        <div className="torn-paper-bg">
          {/* Urdu/Arabic calligraphy watermark */}
          <div className="urdu-watermark">
            <p className="urdu-text">محبت</p>
            <p className="urdu-text">تاج محل</p>
            <p className="urdu-text">شاہ جہاں</p>
            <p className="urdu-text">ممتاز محل</p>
            <p className="urdu-text">محبت ابدی</p>
          </div>

          {/* Ink Writing Story */}
          <div className="ink-story-content">
            <motion.h2 
              className="story-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A Love Beyond Time
            </motion.h2>

            <div className="story-lines">
              {story.map((line, lineIndex) => (
                <motion.div
                  key={lineIndex}
                  className="story-line"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: lineIndex <= currentLine ? 1 : 0.15 
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <span className="ink-writing">
                    {lineIndex < currentLine 
                      ? line 
                      : lineIndex === currentLine 
                      ? line.substring(0, currentChar)
                      : ''}
                    {lineIndex === currentLine && isWriting && currentChar < line.length && (
                      <motion.span 
                        className="ink-pen-cursor"
                        animate={{ opacity: [1, 0.4] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ✒️
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Signature when complete */}
            {currentLine >= story.length && (
              <motion.div 
                className="ink-signature"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                
                <p className="signature-name">— Shah Jahan</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Right Half - Local Video */}
      <motion.div 
        className="scroll-right-half"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ 
          scale: videoScale,
          willChange: 'transform'
        }}
      >
        <div className="video-container">
          <video
            className="local-video"
            src="/src/video/videoplayback.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          
          {/* Subtle overlay for aesthetic */}
          <div className="video-overlay" />
        </div>

        {/* Video caption */}
        <motion.div 
          className="video-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        >
          <p>The Monument of Eternal Love</p>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <div className="writing-progress-indicator">
        <div className="progress-dots">
          {story.map((_, idx) => (
            <div 
              key={idx}
              className={`dot ${idx <= currentLine ? 'completed' : ''}`}
            />
          ))}
        </div>
        <p className="progress-label">
          {currentLine >= story.length 
            ? 'Story Complete' 
            : `${currentLine + 1} / ${story.length}`}
        </p>
      </div>
    </div>
  );
}
