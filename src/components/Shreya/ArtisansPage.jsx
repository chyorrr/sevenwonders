import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MouseAwakening from './MouseAwakening';
import './ArtisansPage.css';

export default function ArtisansPage() {
  const [activeBlueprint, setActiveBlueprint] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(50); // 0-100 slider
  const [zoomPosition, setZoomPosition] = useState(null);
  const scrollContainerRef = useRef(null);
  const artisanSectionRef = useRef(null);
  const lightSectionRef = useRef(null);

  // Scroll-based artisan reveal
  const { scrollYProgress: artisanProgress } = useScroll({
    target: artisanSectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll-based time of day
  const { scrollYProgress: lightProgress } = useScroll({
    target: lightSectionRef,
    offset: ["start end", "end end"]
  });

  const smoothLightProgress = useSpring(lightProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll to time value (0-100)
  const scrollTimeOfDay = useTransform(smoothLightProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const unsubscribe = scrollTimeOfDay.onChange(v => setTimeOfDay(v));
    return () => unsubscribe();
  }, [scrollTimeOfDay]);

  const handleBack = () => {
    window.location.hash = '#home';
  };

  const handleTickets = () => {
    window.location.hash = '#ticket';
  };

  // Blueprint sections
  const blueprintSections = [
    {
      id: 'dome',
      name: 'Double Dome',
      x: 300, y: 80, width: 200, height: 120,
      fact: 'The perfect double-dome structure—mastered by Ismail Khan from the Ottoman Empire. The outer dome reaches 73m height.'
    },
    {
      id: 'pietra',
      name: 'Pietra Dura',
      x: 200, y: 200, width: 400, height: 100,
      fact: 'Over 28 types of precious and semi-precious stones imported from Afghanistan, Tibet, China, and Sri Lanka for intricate floral inlays.'
    },
    {
      id: 'foundation',
      name: 'Foundation',
      x: 150, y: 450, width: 500, height: 50,
      fact: 'Built on timber wells that draw moisture from the Yamuna River, keeping the foundation stable for 400 years.'
    },
    {
      id: 'minarets',
      name: 'Minarets',
      x: 100, y: 150, width: 60, height: 300,
      fact: 'Tilted slightly outward—a genius engineering trick to ensure they fall away from the main tomb in an earthquake.'
    },
    {
      id: 'minarets-right',
      name: 'Minarets',
      x: 640, y: 150, width: 60, height: 300,
      fact: 'Each minaret is 40m tall with three-tiered balconies and crowned with a lotus-capped pavilion.'
    }
  ];

  // Artisans data
  const artisans = [
    {
      name: 'Ustad Ahmad Lahauri',
      role: 'Chief Architect',
      origin: 'Lahore, Mughal Empire',
      contribution: 'Designed the entire complex, blending Persian, Timurid, and Indian architectural styles into perfect symmetry.',
      quote: '"Let marble testify to the permanence of our devotion."',
      icon: '📐'
    },
    {
      name: 'Ismail Khan',
      role: 'Dome Master',
      origin: 'Ottoman Empire',
      contribution: 'Engineered the revolutionary double-dome structure that creates the perfect acoustic chamber and visual grandeur.',
      quote: '"The dome shall touch the heavens, yet stand firm for eternity."',
      icon: '⛏️'
    },
    {
      name: 'Amanat Khan',
      role: 'Master Calligrapher',
      origin: 'Shiraz, Persia',
      contribution: 'Inscribed Quranic verses in Thuluth script on the entrance. Only artist to sign his work on the monument.',
      quote: '"Words of God shall adorn these gates forever."',
      icon: '✍️'
    },
    {
      name: 'Chiranjilal',
      role: 'Pietra Dura Master',
      origin: 'Delhi, India',
      contribution: 'Led the team creating intricate stone inlays using 28 types of precious stones—lapis lazuli, jade, crystal, turquoise.',
      quote: '"Each flower carved in stone blooms eternal."',
      icon: '💎'
    },
    {
      name: 'Muhammad Hanif',
      role: 'Master Mason',
      origin: 'Bukhara, Central Asia',
      contribution: 'Supervised the marble work and structural integrity. Ensured perfect white marble alignment across 42 acres.',
      quote: '"From Makrana\'s quarries, we shaped eternity."',
      icon: '🔨'
    },
    {
      name: 'Qazim Khan',
      role: 'Gold Finial Creator',
      origin: 'Samarkand',
      contribution: 'Cast the gold finial that crowns the central dome, standing as the monument\'s highest point.',
      quote: '"Gold shall mark where earth meets sky."',
      icon: '⚱️'
    },
    {
      name: 'Mir Abdul Karim',
      role: 'Garden Designer',
      origin: 'Shiraz, Persia',
      contribution: 'Designed the Charbagh (four gardens) representing Paradise, with precise water channels and symmetrical plantings.',
      quote: '"Paradise is a garden; we built one on earth."',
      icon: '🌿'
    }
  ];

  // Calculate time of day name and colors
  const getTimeData = (value) => {
    if (value < 25) return { name: 'Sunrise', color: '#FFE5B4', sky: '#FF9E7A', shadow: '#C97A5F' };
    if (value < 50) return { name: 'Morning', color: '#FFF8E7', sky: '#87CEEB', shadow: '#B8906D' };
    if (value < 75) return { name: 'Sunset', color: '#FFD4A3', sky: '#FF6B4A', shadow: '#8B4513' };
    return { name: 'Moonlight', color: '#D4E5F7', sky: '#1C2A3A', shadow: '#4A5F7F' };
  };

  const timeData = getTimeData(timeOfDay);

  const handleInlayHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <MouseAwakening>
      <div className="artisans-page">
      {/* Navigation Header */}
      <header className="artisans-header">
        <div className="header-content">
          <h1 className="site-title">Taj Mahal</h1>
          <nav className="header-nav">
            <button className="nav-link" onClick={handleBack}>Story</button>
            <button className="nav-link">View in 3D</button>
            <button className="nav-link active">Artisans</button>
            <button className="nav-link" onClick={handleTickets}>Tickets</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="artisans-hero">
        <div className="hero-content">
          <h1 className="hero-title">Masters of Paradise</h1>
          <p className="hero-subtitle">The Blueprint, The Artisans, The Eternal Light</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="artisans-main">

        {/* ACT III: Blueprint of Paradise */}
        <section className="blueprint-section">
          <div className="section-header">
            <h2 className="section-title">Act III: The Blueprint of Paradise</h2>
            <p className="section-subtitle">Hover over sections to reveal the hidden genius</p>
          </div>

          <div className="blueprint-container">
            <svg className="blueprint-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              {/* Background */}
              <rect width="800" height="600" fill="#1a1f2e" opacity="0.95"/>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)"/>

              {/* Main Structure Outline */}
              <g className="blueprint-structure">
                {/* Central Dome */}
                <ellipse cx="400" cy="140" rx="100" ry="60" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.7"/>
                <path d="M 300 140 Q 400 80, 500 140" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.7"/>
                
                {/* Main Building */}
                <rect x="200" y="200" width="400" height="250" fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.8"/>
                
                {/* Entrance Arch */}
                <path d="M 350 300 Q 400 250, 450 300" fill="none" stroke="#CD7F32" strokeWidth="2"/>
                <rect x="350" y="300" width="100" height="100" fill="none" stroke="#CD7F32" strokeWidth="2"/>
                
                {/* Minarets - Left */}
                <rect x="100" y="150" width="60" height="300" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.7"/>
                <circle cx="130" cy="130" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                
                {/* Minarets - Right */}
                <rect x="640" y="150" width="60" height="300" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.7"/>
                <circle cx="670" cy="130" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                
                {/* Foundation */}
                <rect x="150" y="450" width="500" height="50" fill="none" stroke="#8B3A3A" strokeWidth="2.5" opacity="0.6"/>
                <line x1="150" y1="475" x2="650" y2="475" stroke="#8B3A3A" strokeWidth="1" strokeDasharray="5,5"/>
                
                {/* Detail lines */}
                <line x1="400" y1="200" x2="400" y2="450" stroke="#CD7F32" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
                <line x1="200" y1="325" x2="600" y2="325" stroke="#CD7F32" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
              </g>

              {/* Interactive Hover Areas */}
              {blueprintSections.map((section) => (
                <rect
                  key={section.id}
                  x={section.x}
                  y={section.y}
                  width={section.width}
                  height={section.height}
                  fill={activeBlueprint === section.id ? 'rgba(212, 175, 55, 0.2)' : 'transparent'}
                  stroke={activeBlueprint === section.id ? '#D4AF37' : 'transparent'}
                  strokeWidth="3"
                  className="blueprint-hotspot"
                  onMouseEnter={() => setActiveBlueprint(section.id)}
                  onMouseLeave={() => setActiveBlueprint(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <title>{section.name}</title>
                </rect>
              ))}

              {/* Glowing highlight effect */}
              {activeBlueprint && (
                <g className="blueprint-glow">
                  {blueprintSections
                    .filter(s => s.id === activeBlueprint)
                    .map(section => (
                      <rect
                        key={`glow-${section.id}`}
                        x={section.x}
                        y={section.y}
                        width={section.width}
                        height={section.height}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        opacity="0.8"
                        className="glow-pulse"
                      />
                    ))}
                </g>
              )}
            </svg>

            {/* Fact Bubble */}
            {activeBlueprint && (
              <div className="blueprint-fact-bubble">
                <h3>{blueprintSections.find(s => s.id === activeBlueprint)?.name}</h3>
                <p>{blueprintSections.find(s => s.id === activeBlueprint)?.fact}</p>
              </div>
            )}
          </div>
        </section>

        {/* The Artisan Scroll */}
        <section className="artisan-scroll-section" ref={artisanSectionRef}>
          <div className="section-header">
            <h2 className="section-title">The Master Artisans</h2>
            <p className="section-subtitle">Scroll to meet the global team</p>
          </div>

          <div className="artisan-grid">
            {artisans.map((artisan, index) => {
              const progress = useTransform(
                artisanProgress,
                [index * 0.12, (index + 1) * 0.12],
                [0, 1]
              );
              
              return (
                <motion.div
                  key={index}
                  className="artisan-card"
                  initial={{ opacity: 0, y: 50, rotateY: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="artisan-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {artisan.icon}
                  </motion.div>
                  <h3 className="artisan-name">{artisan.name}</h3>
                  <p className="artisan-role">{artisan.role}</p>
                  <p className="artisan-origin">📍 {artisan.origin}</p>
                  <p className="artisan-contribution">{artisan.contribution}</p>
                  <blockquote className="artisan-quote">{artisan.quote}</blockquote>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ACT IV: The Shifting Light */}
        <section className="shifting-light-section" ref={lightSectionRef}>
          <div className="section-header">
            <h2 className="section-title">Act IV: The Shifting Light</h2>
            <p className="section-subtitle">Scroll to see the Taj transform through time</p>
          </div>

          <motion.div 
            className="time-slider-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="taj-image-container" 
              style={{
                backgroundColor: timeData.sky,
              }}
              animate={{
                backgroundColor: timeData.sky
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div 
                className="taj-silhouette" 
                style={{
                  filter: `drop-shadow(0 20px 40px ${timeData.shadow})`,
                }}
                animate={{
                  filter: `drop-shadow(0 20px 40px ${timeData.shadow})`
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Simplified Taj Mahal SVG */}
                <svg viewBox="0 0 400 300" className="taj-svg">
                  <motion.g 
                    style={{ fill: timeData.color }}
                    animate={{ fill: timeData.color }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {/* Central Dome */}
                    <ellipse cx="200" cy="80" rx="60" ry="40"/>
                    <path d="M 140 80 Q 200 30, 260 80"/>
                    
                    {/* Main Building */}
                    <rect x="120" y="120" width="160" height="120"/>
                    
                    {/* Minarets */}
                    <rect x="60" y="100" width="30" height="140"/>
                    <circle cx="75" cy="90" r="10"/>
                    <rect x="310" y="100" width="30" height="140"/>
                    <circle cx="325" cy="90" r="10"/>
                    
                    {/* Entrance Arch */}
                    <path d="M 170 180 Q 200 150, 230 180" fill={timeData.sky}/>
                    
                    {/* Reflection in water */}
                    <g opacity="0.3" transform="translate(0, 240) scale(1, -1)">
                      <ellipse cx="200" cy="80" rx="60" ry="20"/>
                      <rect x="120" y="120" width="160" height="60"/>
                    </g>
                  </motion.g>
                </svg>
              </motion.div>

              <motion.div 
                className="time-label"
                key={timeData.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {timeData.name}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Inlay Magnification */}
        <section className="inlay-section">
          <div className="section-header">
            <h2 className="section-title">Pietra Dura: Art at Microscopic Scale</h2>
            <p className="section-subtitle">Hover over the arch to zoom into intricate details</p>
          </div>

          <motion.div
            className="inlay-container"
            onMouseMove={handleInlayHover}
            onMouseLeave={() => setZoomPosition(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="arch-image">
              <svg viewBox="0 0 400 500" className="arch-svg">
                <defs>
                  <pattern id="floral1" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="8" fill="#8B4513"/>
                    <circle cx="20" cy="20" r="4" fill="#D4AF37"/>
                  </pattern>
                  <pattern id="floral2" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 15 5 Q 20 10, 15 15 Q 10 10, 15 5" fill="#2E8B57"/>
                    <circle cx="15" cy="10" r="2" fill="#FF6347"/>
                  </pattern>
                </defs>
                
                {/* Main Arch */}
                <rect x="50" y="100" width="300" height="400" fill="#FFF8E7" stroke="#D4AF37" strokeWidth="3"/>
                <path d="M 50 200 Q 200 50, 350 200" fill="#E8D4B8" stroke="#D4AF37" strokeWidth="3"/>
                
                {/* Inlay Patterns */}
                <rect x="70" y="120" width="260" height="30" fill="url(#floral1)"/>
                <rect x="70" y="420" width="260" height="30" fill="url(#floral1)"/>
                <rect x="60" y="200" width="20" height="200" fill="url(#floral2)"/>
                <rect x="320" y="200" width="20" height="200" fill="url(#floral2)"/>
                
                {/* Calligraphy band */}
                <rect x="70" y="160" width="260" height="25" fill="#704214" opacity="0.3"/>
                <text x="200" y="177" textAnchor="middle" fill="#D4AF37" fontSize="12" fontFamily="serif">
                  ✦ Quranic Verses ✦
                </text>
              </svg>
            </div>

            {zoomPosition && (
              <motion.div
                className="zoom-lens"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div 
                  className="zoom-detail"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="detail-pattern">
                    🌸 Carnation - Lapis Lazuli<br/>
                    🌿 Leaf - Green Jade<br/>
                    ✨ Center - Mother of Pearl<br/>
                    🔶 Border - Red Jasper
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          <div className="inlay-info">
            <p>Each floral motif required up to 50 pieces of stone, hand-cut and polished to fit together perfectly—a technique that remains unmatched even today.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="artisans-footer">
        <p>© 2025 Taj Mahal Experience • Celebrating the Masters of Eternity</p>
      </footer>
      </div>
    </MouseAwakening>
  );
}
