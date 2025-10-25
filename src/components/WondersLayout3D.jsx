import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { GiEgyptianPyramids, GiWorld } from 'react-icons/gi';
import WonderModel from './WonderModel';
import './WondersLayout3D.css';

const WondersLayout3D = () => {
  return (
    <div className="wonders-layout-3d">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        gl={{ 
          antialias: false,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#CD7F32" />
        
        {/* Spotlight for center */}
        <spotLight
          position={[0, 15, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.3}
          castShadow
          color="#FFF8E7"
        />

        {/* Stars in background */}
        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
          speed={0.3}
        />

        {/* Left side - 2 wonders */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <WonderModel 
            wonderName="Great Pyramid" 
            position={[-12, 3, -5]} 
            scale={0.7}
            opacity={0.7}
          />
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
          <WonderModel 
            wonderName="Colosseum" 
            position={[-12, -3, -3]} 
            scale={0.7}
            opacity={0.7}
          />
        </Float>

        {/* Right side - 2 wonders */}
        <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <WonderModel 
            wonderName="Great Wall" 
            position={[12, 3, -5]} 
            scale={0.7}
            opacity={0.7}
          />
        </Float>
        
        <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.3}>
          <WonderModel 
            wonderName="Petra" 
            position={[12, -3, -3]} 
            scale={0.7}
            opacity={0.7}
          />
        </Float>

        {/* Center - Faint Taj Mahal */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, 0, 0]}>
            <WonderModel 
              wonderName="Taj Mahal" 
              position={[0, 0, 0]} 
              scale={1.5}
              opacity={0.15}
              faint={true}
            />
          </group>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      <motion.div 
        className="layout-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <GiWorld style={{ fontSize: '4rem', color: 'var(--vintage-gold)', marginBottom: '1rem' }} />
        </motion.div>
        <h2>The Seven Wonders of the World</h2>
        <p>
          <GiEgyptianPyramids style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          An eternal testament to human achievement
        </p>
      </motion.div>
    </div>
  );
};

export default WondersLayout3D;
