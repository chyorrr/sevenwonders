import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, SpotLight } from '@react-three/drei';
import WonderModel from './WonderModel';
import Particles from './Particles';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Cinematic camera movement component
const CinematicCamera = ({ scrollProgress }) => {
  const cameraRef = useRef();
  
  useFrame((state) => {
    if (cameraRef.current) {
      const time = state.clock.elapsedTime;
      // Very gentle camera sway
      cameraRef.current.position.x = Math.sin(time * 0.05) * 1;
      cameraRef.current.position.y = Math.cos(time * 0.08) * 0.5;
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={[0, 0, 20]} 
      fov={60} 
    />
  );
};

const Scene3D = ({ scrollProgress, onWonderClick }) => {
  const wonders = [
    { name: 'Great Wall', position: [-8, 2, -5], color: '#D4725B' },
    { name: 'Petra', position: [-6, -2, -3], color: '#CD7F32' },
    { name: 'Colosseum', position: [-8, 0, 2], color: '#E8D4B8' },
    { name: 'Taj Mahal', position: [0, 0, 0], color: '#FFFFF0', isCenter: true },
    { name: 'Chichen Itza', position: [8, 2, -5], color: '#D4AF37' },
    { name: 'Machu Picchu', position: [6, -2, -3], color: '#8B3A3A' },
    { name: 'Christ Redeemer', position: [8, 0, 2], color: '#5C3317' },
  ];

  return (
    <Canvas
      shadows
      gl={{ 
        antialias: false, 
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: "high-performance"
      }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      <Suspense fallback={null}>
        {/* Cinematic Camera */}
        <CinematicCamera scrollProgress={scrollProgress} />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={12}
          maxDistance={35}
          autoRotate={true}
          autoRotateSpeed={0.2}
          dampingFactor={0.03}
          enableDamping={true}
        />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} />
        
        {/* Main directional light (sun) */}
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          color="#FFF8E7"
        />
        
        {/* Accent lights for depth */}
        <pointLight position={[-15, 8, -10]} intensity={0.5} color="#D4AF37" distance={30} />
        <pointLight position={[15, -8, 10]} intensity={0.4} color="#CD7F32" distance={25} />
        <pointLight position={[0, -10, -15]} intensity={0.3} color="#D4725B" distance={20} />
        
        {/* Dramatic spotlight on center */}
        <SpotLight
          position={[0, 20, 0]}
          angle={0.4}
          penumbra={1}
          intensity={1.2}
          color="#FFFFF0"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        
        {/* Rim lights for silhouette */}
        <pointLight position={[-20, 5, -15]} intensity={0.4} color="#8B3A3A" />
        <pointLight position={[20, 5, -15]} intensity={0.4} color="#2C3E50" />

        {/* Environment */}
        <Stars 
          radius={100} 
          depth={50} 
          count={800} 
          factor={3} 
          saturation={0.3} 
          fade 
          speed={0.3} 
        />
        
        {/* Animated Particles */}
        <Particles count={150} />

        {/* Wonder Models */}
        {wonders.map((wonder, index) => (
          <WonderModel
            key={wonder.name}
            position={wonder.position}
            wonderName={wonder.name}
            scale={wonder.isCenter ? 1.5 : 0.8}
            isCenter={wonder.isCenter}
            color={wonder.color}
            onClick={onWonderClick}
          />
        ))}

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#faf8f5', 25, 60]} />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;
