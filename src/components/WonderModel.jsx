import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

const WonderModel = ({ position, wonderName, scale = 1, isCenter = false, color, onClick, opacity = 1, faint = false }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Subtle cinematic rotation
      meshRef.current.rotation.y = Math.sin(time * 0.05) * 0.15 + time * 0.02;
      
      // Very subtle breathing animation
      const breathScale = 1 + Math.sin(time * 0.3) * 0.01;
      
      // Hover effect with smooth transition
      if (hovered) {
        meshRef.current.scale.lerp(
          new THREE.Vector3(scale * 1.15 * breathScale, scale * 1.15 * breathScale, scale * 1.15 * breathScale),
          0.08
        );
        meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.05;
      } else {
        meshRef.current.scale.lerp(
          new THREE.Vector3(scale * breathScale, scale * breathScale, scale * breathScale),
          0.08
        );
        meshRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.03;
      }
    }
  });

  // Different geometries for different wonders with enhanced details
  const getGeometry = () => {
    switch (wonderName) {
      case 'Taj Mahal':
        return <group>
          {/* Main dome with ornate details */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <sphereGeometry args={[1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.4} 
              roughness={0.3}
              emissive="#FFFFF0"
              emissiveIntensity={faint ? 0.01 : (hovered ? 0.15 : 0.03)}
              opacity={faint ? 0.15 : opacity}
              transparent={faint || opacity < 1}
            />
          </mesh>
          {/* Dome finial */}
          <mesh position={[0, 3.5, 0]} castShadow>
            <coneGeometry args={[0.2, 0.5, 16]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              metalness={0.8} 
              roughness={0.2}
              opacity={faint ? 0.15 : opacity}
              transparent={faint || opacity < 1}
            />
          </mesh>
          {/* Main building base */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[3, 2, 3]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.2} 
              roughness={0.4}
              emissive="#FFF8E7"
              emissiveIntensity={faint ? 0.005 : (hovered ? 0.1 : 0.02)}
              opacity={faint ? 0.15 : opacity}
              transparent={faint || opacity < 1}
            />
          </mesh>
          {/* Platform base */}
          <mesh position={[0, -0.6, 0]} receiveShadow>
            <boxGeometry args={[4, 0.4, 4]} />
            <meshStandardMaterial color="#E8D4B8" metalness={0.1} roughness={0.6} />
          </mesh>
          {/* Four minarets with caps */}
          {[[-2, 0, -2], [2, 0, -2], [-2, 0, 2], [2, 0, 2]].map((pos, i) => (
            <group key={i}>
              <mesh position={pos} castShadow>
                <cylinderGeometry args={[0.2, 0.22, 4, 16]} />
                <meshStandardMaterial 
                  color={color} 
                  metalness={0.3} 
                  roughness={0.4}
                  emissive="#FFFFF0"
                  emissiveIntensity={hovered ? 0.1 : 0.02}
                />
              </mesh>
              {/* Minaret caps */}
              <mesh position={[pos[0], pos[1] + 2.3, pos[2]]} castShadow>
                <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          ))}
          {/* Decorative arches */}
          <mesh position={[0, 0.5, 1.51]} castShadow>
            <boxGeometry args={[1, 1.5, 0.1]} />
            <meshStandardMaterial color="#8B3A3A" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>;
      
      case 'Great Wall':
        return <group>
          {/* Main wall sections with crenellations */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 1.2, 0.6]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.1} 
              roughness={0.9}
              emissive="#D4725B"
              emissiveIntensity={hovered ? 0.1 : 0.02}
            />
          </mesh>
          {/* Watchtower */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[1.2, 1.5, 1.2]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.2} roughness={0.8} />
          </mesh>
          {/* Tower roof */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[0.8, 0.6, 4]} />
            <meshStandardMaterial color="#8B3A3A" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Crenellations (battlements) */}
          {[-1.8, -0.9, 0, 0.9, 1.8].map((x, i) => (
            <mesh key={i} position={[x, 0.8, 0]} castShadow>
              <boxGeometry args={[0.3, 0.4, 0.5]} />
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
            </mesh>
          ))}
          {/* Wall steps */}
          <mesh position={[-1.5, 0, 0.4]} castShadow>
            <boxGeometry args={[0.8, 0.3, 0.3]} />
            <meshStandardMaterial color="#5C3317" metalness={0.1} roughness={0.9} />
          </mesh>
          {/* Foundation */}
          <mesh position={[0, -0.7, 0]} receiveShadow>
            <boxGeometry args={[5, 0.2, 1]} />
            <meshStandardMaterial color="#704214" metalness={0.1} roughness={0.9} />
          </mesh>
        </group>;
      
      case 'Colosseum':
        return <group>
          {/* Multi-tiered arena structure */}
          {[0, 1, 2].map((tier) => (
            <mesh key={tier} position={[0, tier * 0.6 - 0.6, 0]} castShadow>
              <torusGeometry args={[2 - tier * 0.3, 0.5 - tier * 0.08, 16, 32, Math.PI * 1.8]} />
              <meshStandardMaterial 
                color={tier === 0 ? '#E8D4B8' : tier === 1 ? color : '#CD7F32'} 
                metalness={0.2} 
                roughness={0.7}
                emissive={color}
                emissiveIntensity={hovered ? 0.15 : 0.03}
              />
            </mesh>
          ))}
          {/* Arena floor */}
          <mesh position={[0, -0.8, 0]} receiveShadow>
            <cylinderGeometry args={[1.3, 1.3, 0.2, 32]} />
            <meshStandardMaterial color="#D4725B" metalness={0.1} roughness={0.8} />
          </mesh>
          {/* Arched openings */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.8;
            return (
              <mesh 
                key={i} 
                position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
                rotation={[0, -angle, 0]}
                castShadow
              >
                <boxGeometry args={[0.3, 0.8, 0.2]} />
                <meshStandardMaterial color="#5C3317" metalness={0.1} roughness={0.9} />
              </mesh>
            );
          })}
          {/* Top decorative ring */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <torusGeometry args={[1.4, 0.1, 8, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>;
      
      case 'Petra':
        return <group>
          {/* Main facade carved from rock */}
          <mesh position={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[3.5, 4, 0.8]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.1} 
              roughness={0.95}
              emissive="#CD7F32"
              emissiveIntensity={hovered ? 0.12 : 0.02}
            />
          </mesh>
          {/* Treasury entrance */}
          <mesh position={[0, -0.5, 0.2]} castShadow>
            <boxGeometry args={[1, 2, 0.3]} />
            <meshStandardMaterial color="#5C3317" metalness={0.1} roughness={1} />
          </mesh>
          {/* Columns */}
          {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.2]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 3, 12]} />
              <meshStandardMaterial color="#E8D4B8" metalness={0.2} roughness={0.8} />
            </mesh>
          ))}
          {/* Pediment (top triangular section) */}
          <mesh position={[0, 2, 0.2]} castShadow>
            <coneGeometry args={[1.8, 1, 4]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.1} 
              roughness={0.9}
              emissive="#CD7F32"
              emissiveIntensity={hovered ? 0.1 : 0.02}
            />
          </mesh>
          {/* Urn on top */}
          <mesh position={[0, 2.7, 0.2]} castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Side cliff walls */}
          <mesh position={[-2, 0, -0.5]} castShadow>
            <boxGeometry args={[1, 4.5, 1]} />
            <meshStandardMaterial color="#8B3A3A" metalness={0.1} roughness={1} />
          </mesh>
          <mesh position={[2, 0, -0.5]} castShadow>
            <boxGeometry args={[1, 4.5, 1]} />
            <meshStandardMaterial color="#8B3A3A" metalness={0.1} roughness={1} />
          </mesh>
        </group>;
      
      case 'Machu Picchu':
        return <group>
          {/* Terraced agricultural levels */}
          {[0, 1, 2, 3].map((level) => (
            <mesh 
              key={level} 
              position={[0, level * 0.4 - 0.6, level * 0.15]} 
              castShadow
            >
              <boxGeometry args={[3.5 - level * 0.4, 0.3, 2.5 - level * 0.3]} />
              <meshStandardMaterial 
                color={level % 2 === 0 ? color : '#5C3317'} 
                metalness={0.1} 
                roughness={0.9}
                emissive={color}
                emissiveIntensity={hovered ? 0.15 : 0.03}
              />
            </mesh>
          ))}
          {/* Intihuatana stone (ritual stone) */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshStandardMaterial color="#704214" metalness={0.2} roughness={0.9} />
          </mesh>
          {/* Temple structures */}
          <mesh position={[-0.8, 0.8, 0.2]} castShadow>
            <boxGeometry args={[0.8, 1, 0.8]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.1} roughness={0.8} />
          </mesh>
          <mesh position={[0.8, 0.8, 0.2]} castShadow>
            <boxGeometry args={[0.8, 1, 0.8]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.1} roughness={0.8} />
          </mesh>
          {/* Stone walls with precise masonry */}
          {[-1.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0.3, 0]} castShadow>
              <boxGeometry args={[0.3, 0.8, 2]} />
              <meshStandardMaterial color="#E8D4B8" metalness={0.1} roughness={0.9} />
            </mesh>
          ))}
          {/* Mountain peak behind */}
          <mesh position={[0, 1, -1]} castShadow>
            <coneGeometry args={[1.5, 2.5, 8]} />
            <meshStandardMaterial 
              color="#2C3E50" 
              metalness={0.2} 
              roughness={0.8}
              emissive="#2C3E50"
              emissiveIntensity={hovered ? 0.1 : 0.02}
            />
          </mesh>
        </group>;
      
      case 'Chichen Itza':
        return <group>
          {/* Stepped pyramid of Kukulkan */}
          {[0, 1, 2, 3, 4].map((step) => (
            <mesh 
              key={step} 
              position={[0, step * 0.5 - 1, 0]} 
              castShadow
            >
              <boxGeometry args={[3 - step * 0.5, 0.4, 3 - step * 0.5]} />
              <meshStandardMaterial 
                color={step % 2 === 0 ? color : '#E8D4B8'} 
                metalness={0.2} 
                roughness={0.8}
                emissive={color}
                emissiveIntensity={hovered ? 0.1 : 0.02}
              />
            </mesh>
          ))}
          {/* Temple on top */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <boxGeometry args={[1, 0.8, 1]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Temple roof */}
          <mesh position={[0, 2.4, 0]} castShadow>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#8B3A3A" metalness={0.2} roughness={0.7} />
          </mesh>
          {/* Four staircases */}
          {[
            [0, 0, 1.5], [0, 0, -1.5], [1.5, 0, 0], [-1.5, 0, 0]
          ].map((pos, i) => (
            <mesh key={i} position={pos} castShadow>
              <boxGeometry args={[0.6, 0.2, 0.6]} />
              <meshStandardMaterial color="#5C3317" metalness={0.1} roughness={0.9} />
            </mesh>
          ))}
          {/* Serpent heads at base */}
          {[
            [0, -1, 1.6], [0, -1, -1.6]
          ].map((pos, i) => (
            <group key={i}>
              <mesh position={pos} castShadow>
                <boxGeometry args={[0.5, 0.4, 0.5]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[pos[0], pos[1], pos[2] + (i === 0 ? 0.3 : -0.3)]} castShadow>
                <coneGeometry args={[0.3, 0.4, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>;
      
      case 'Christ Redeemer':
        return <group>
          {/* Pedestal/Base */}
          <mesh position={[0, -1.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1, 1, 8]} />
            <meshStandardMaterial color="#704214" metalness={0.2} roughness={0.7} />
          </mesh>
          {/* Body/Robe - detailed with folds */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.6, 3, 16]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.3} 
              roughness={0.4}
              emissive="#FFFFF0"
              emissiveIntensity={hovered ? 0.15 : 0.03}
            />
          </mesh>
          {/* Robe details */}
          <mesh position={[0, -0.5, 0.45]} castShadow>
            <boxGeometry args={[0.8, 2, 0.2]} />
            <meshStandardMaterial color="#E8D4B8" metalness={0.2} roughness={0.5} />
          </mesh>
          {/* Arms extended */}
          <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.22, 4, 16]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.3} 
              roughness={0.4}
              emissive="#FFFFF0"
              emissiveIntensity={hovered ? 0.12 : 0.02}
            />
          </mesh>
          {/* Hands */}
          {[-2, 2].map((x, i) => (
            <mesh key={i} position={[x, 1, 0]} castShadow>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
            </mesh>
          ))}
          {/* Head */}
          <mesh position={[0, 2, 0]} castShadow>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.3} 
              roughness={0.4}
              emissive="#FFFFF0"
              emissiveIntensity={hovered ? 0.1 : 0.02}
            />
          </mesh>
          {/* Crown/Halo */}
          <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 6, 0, 0]} castShadow>
            <torusGeometry args={[0.6, 0.08, 8, 16]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#D4AF37"
              emissiveIntensity={hovered ? 0.2 : 0.05}
            />
          </mesh>
          {/* Soapstone texture overlay */}
          <mesh position={[0, 0.3, 0.65]} castShadow>
            <boxGeometry args={[0.9, 3, 0.1]} />
            <meshStandardMaterial 
              color="#FFF8E7" 
              metalness={0.1} 
              roughness={0.3}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>;
      
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={isCenter ? 0.3 : 0.2}
    >
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => !faint && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick && onClick(wonderName)}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
        opacity={opacity}
      >
        <group opacity={faint ? 0.15 : opacity}>
          {getGeometry()}
        </group>
        
        {/* Wonder name label - only show if not faint */}
        {!faint && (
          <Center position={[0, isCenter ? -3.5 : -2.5, 0]}>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[3, 0.6]} />
              <meshStandardMaterial 
                color="#FFF8E7" 
                opacity={(hovered ? 0.95 : 0.85) * opacity} 
                transparent 
              />
            </mesh>
            <Text
              fontSize={0.25}
              color="#704214"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff"
              fontWeight={700}
            >
              {wonderName}
            </Text>
          </Center>
        )}
      </group>
    </Float>
  );
};

export default WonderModel;
