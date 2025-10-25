import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import WonderModel from './WonderModel';
import * as THREE from 'three';

const ArchWonders = () => {
  const [focusedIndices, setFocusedIndices] = useState([0, 1, 2]);
  const lightRefs = useRef([]);

  const wonders = [
    { name: 'Taj Mahal', color: '#FFFFF0' },
    { name: 'Great Wall', color: '#D4725B' },
    { name: 'Colosseum', color: '#E8D4B8' },
    { name: 'Petra', color: '#CD7F32' },
    { name: 'Machu Picchu', color: '#8B3A3A' },
    { name: 'Chichen Itza', color: '#D4AF37' },
    { name: 'Christ Redeemer', color: '#5C3317' }
  ];

  // Recursive focus change
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndices(prev => {
        const nextStart = (prev[0] + 1) % wonders.length;
        return [
          nextStart,
          (nextStart + 1) % wonders.length,
          (nextStart + 2) % wonders.length
        ];
      });
    }, 3000); // Change focus every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate arch positions
  const getArchPosition = (index, total) => {
    const radius = 12;
    const arcSpan = Math.PI * 0.8; // 144 degrees
    const startAngle = -arcSpan / 2;
    const angle = startAngle + (index / (total - 1)) * arcSpan;
    
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * 3 - 2; // Elevation
    const z = -Math.cos(angle) * radius * 0.3;
    
    return [x, y, z];
  };

  const DynamicLights = () => {
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      
      lightRefs.current.forEach((light, i) => {
        if (light && focusedIndices.includes(i)) {
          light.intensity = THREE.MathUtils.lerp(
            light.intensity,
            2.5 + Math.sin(time * 2) * 0.5,
            0.1
          );
        } else if (light) {
          light.intensity = THREE.MathUtils.lerp(light.intensity, 0.3, 0.1);
        }
      });
    });

    return (
      <>
        {wonders.map((wonder, i) => {
          const pos = getArchPosition(i, wonders.length);
          return (
            <spotLight
              key={i}
              ref={el => lightRefs.current[i] = el}
              position={[pos[0], pos[1] + 5, pos[2] + 3]}
              angle={0.6}
              penumbra={1}
              intensity={focusedIndices.includes(i) ? 2.5 : 0.3}
              color={wonder.color}
              castShadow
              target-position={pos}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <ambientLight intensity={0.2} />
      <DynamicLights />
      
      <pointLight position={[0, 10, 5]} intensity={0.5} color="#D4AF37" />
      
      {wonders.map((wonder, index) => {
        const position = getArchPosition(index, wonders.length);
        const isFocused = focusedIndices.includes(index);
        
        return (
          <Float
            key={wonder.name}
            speed={isFocused ? 1.5 : 0.8}
            rotationIntensity={isFocused ? 0.3 : 0.1}
            floatIntensity={isFocused ? 0.4 : 0.2}
          >
            <WonderModel
              wonderName={wonder.name}
              position={position}
              scale={isFocused ? 1.2 : 0.8}
              color={wonder.color}
              opacity={isFocused ? 1 : 0.6}
            />
          </Float>
        );
      })}
    </>
  );
};

const HeroArch3D = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 2, 20], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <fog attach="fog" args={['#faf8f5', 20, 40]} />
        
        <ArchWonders />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default HeroArch3D;
