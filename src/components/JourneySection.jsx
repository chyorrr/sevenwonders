import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './JourneySection.css';

const JourneySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const journeys = [
    {
      wonder: 'Taj Mahal',
      location: 'Agra, India',
      story: 'A symphony of love carved in marble',
      description: 'Experience the moonlit beauty of this ivory-white mausoleum, where Emperor Shah Jahan immortalized his eternal love for Mumtaz Mahal.',
      culture: 'Mughal Architecture',
      insight: 'The Taj changes color throughout the day - pink in morning, white in afternoon, and golden under moonlight.',
      color: '#FFFFF0',
      icon: '🕌'
    },
    {
      wonder: 'Machu Picchu',
      location: 'Peru',
      story: 'Lost city in the clouds',
      description: 'Ascend through ancient Incan terraces to discover a sacred sanctuary hidden for centuries in the misty peaks of the Andes.',
      culture: 'Incan Heritage',
      insight: 'Built without wheels, iron tools, or draft animals - a masterpiece of engineering and astronomy.',
      color: '#8B3A3A',
      icon: '⛰️'
    },
    {
      wonder: 'Petra',
      location: 'Jordan',
      story: 'The rose-red city carved by time',
      description: 'Walk through the narrow Siq canyon to witness Al-Khazneh emerge from rose-colored cliffs, a testament to Nabataean ingenuity.',
      culture: 'Nabataean Kingdom',
      insight: 'An advanced water management system allowed this desert city to thrive for centuries.',
      color: '#CD7F32',
      icon: '🏛️'
    }
  ];

  return (
    <section ref={containerRef} className="journey-section">
      <motion.div
        className="journey-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="journey-title">Embark on a Journey</h2>
        <p className="journey-subtitle">
          Through Time • Culture • Wonder
        </p>
      </motion.div>

      <div className="journey-cards">
        {journeys.map((journey, index) => (
          <motion.div
            key={index}
            className="journey-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: index * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="journey-card-bg" style={{ background: `linear-gradient(135deg, ${journey.color}33 0%, ${journey.color}11 100%)` }}></div>
            
            <div className="journey-icon" style={{ color: journey.color }}>
              {journey.icon}
            </div>

            <div className="journey-card-content">
              <motion.h3 
                className="journey-wonder"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {journey.wonder}
              </motion.h3>
              
              <div className="journey-location">
                <span className="location-pin">📍</span>
                {journey.location}
              </div>

              <div className="journey-story">{journey.story}</div>

              <p className="journey-description">{journey.description}</p>

              <div className="journey-meta">
                <div className="meta-item">
                  <strong>Culture</strong>
                  <span>{journey.culture}</span>
                </div>
                <div className="meta-item">
                  <strong>Did you know?</strong>
                  <span className="insight">{journey.insight}</span>
                </div>
              </div>

              <motion.button
                className="journey-button"
                style={{ borderColor: journey.color }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 10px 30px ${journey.color}66`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore This Wonder</span>
                <span className="button-arrow">→</span>
              </motion.button>
            </div>

            <div className="journey-card-overlay" style={{ borderColor: journey.color }}></div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic background elements */}
      <div className="journey-background">
        <motion.div
          className="bg-glow"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default JourneySection;
