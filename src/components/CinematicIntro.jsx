import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import WonderModel from './WonderModel';
import * as THREE from 'three';
import './CinematicIntro.css';

const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=dark, 1=first3, 2=next3, 3=all7
  const [showIntro, setShowIntro] = useState(true);
  const [litWonders, setLitWonders] = useState([]);

  const wonders = [
    { name: 'Taj Mahal', position: [-8, 0, -3], color: '#FFFFF0' },
    { name: 'Great Wall', position: [-5, 1, -2], color: '#D4725B' },
    { name: 'Colosseum', position: [-2, -1, -1], color: '#E8D4B8' },
    { name: 'Petra', position: [2, 0, -2], color: '#CD7F32' },
    { name: 'Machu Picchu', position: [5, -1, -3], color: '#8B3A3A' },
    { name: 'Chichen Itza', position: [8, 1, -1], color: '#D4AF37' },
    { name: 'Christ Redeemer', position: [0, -2, -4], color: '#5C3317' }
  ];

  useEffect(() => {
    // Play birds chirping audio
    const audio = new Audio('/birds-chirping.mp3');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio autoplay prevented or file not found:', err));

    const timers = [];

    // Phase 0: Dark (0.5s)
    timers.push(setTimeout(() => {
      setPhase(1);
      setLitWonders([0, 1, 2]); // First 3 wonders
    }, 500));
    
    // Phase 1: Light first 3 wonders (1.5s)
    timers.push(setTimeout(() => {
      setPhase(2);
      setLitWonders([3, 4, 5]); // Next 3 wonders
    }, 2000));
    
    // Phase 2: Light next 3 wonders (1.5s)
    timers.push(setTimeout(() => {
      setPhase(3);
      setLitWonders([0, 1, 2, 3, 4, 5, 6]); // All 7 wonders
    }, 3500));
    
    // Phase 3: All lit (1s hold)
    timers.push(setTimeout(() => {
      setShowIntro(false);
      if (onComplete) onComplete();
      audio.pause();
    }, 5000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      audio.pause();
    };
  }, [onComplete]);

  if (!showIntro) return null;

  const WonderSpotlight = ({ index }) => {
    const isLit = litWonders.includes(index);
    
    return (
      <spotLight
        position={[wonders[index].position[0], wonders[index].position[1] + 5, wonders[index].position[2] + 2]}
        angle={0.8}
        penumbra={1}
        intensity={isLit ? 3 : 0}
        color={wonders[index].color}
        castShadow
      />
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Dark background */}
        <div className="dark-background" />

        {/* 3D Scene with spotlights */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Canvas
            camera={{ position: [0, 2, 15], fov: 60 }}
            gl={{ 
              antialias: false, 
              alpha: true,
              powerPreference: 'high-performance'
            }}
          >
            <fog attach="fog" args={['#000000', 10, 25]} />
            
            {/* Very dim ambient light */}
            <ambientLight intensity={0.05} />

            {/* Spotlights for each wonder */}
            {wonders.map((_, index) => (
              <WonderSpotlight key={index} index={index} />
            ))}

            {/* Wonder models */}
            {wonders.map((wonder, index) => (
              <Float
                key={wonder.name}
                speed={0.5}
                rotationIntensity={0.1}
                floatIntensity={0.2}
              >
                <WonderModel
                  wonderName={wonder.name}
                  position={wonder.position}
                  scale={0.7}
                  color={wonder.color}
                  opacity={litWonders.includes(index) ? 1 : 0.1}
                />
              </Float>
            ))}
          </Canvas>
        </div>

        {/* Particles overlay */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: phase >= 2 ? [0, 0.3, 0] : 0,
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicIntro;
