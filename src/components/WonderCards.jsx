import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { GiAncientRuins } from 'react-icons/gi';
import './WonderCards.css';

const WonderCard = ({ wonder, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="wonder-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className="card-inner">
        <div className="card-ornament top"></div>
        <div className="card-number" style={{ color: wonder.color }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="card-title">{wonder.name}</h3>
        <p className="card-location">
          <FaMapMarkerAlt className="card-icon" />
          {wonder.location}
        </p>
        <p className="card-description">{wonder.description}</p>
        <div className="card-year">
          <FaCalendarAlt className="card-icon" />
          {wonder.year}
        </div>
        <motion.button
          className="card-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
          <FaArrowRight className="button-arrow" />
        </motion.button>
        <div className="card-ornament bottom"></div>
      </div>
    </motion.div>
  );
};

const WonderCards = () => {
  const wonders = [
    {
      name: 'Taj Mahal',
      location: 'Agra, India',
      description: 'An ivory-white marble mausoleum, a testament to eternal love and Mughal architecture.',
      year: '1653',
      color: '#FFFFF0'
    },
    {
      name: 'Great Wall of China',
      location: 'China',
      description: 'A series of fortifications stretching across mountains and deserts for thousands of miles.',
      year: '7th Century BC',
      color: '#D4725B'
    },
    {
      name: 'Colosseum',
      location: 'Rome, Italy',
      description: 'The largest ancient amphitheater ever built, a monument to Roman engineering.',
      year: '80 AD',
      color: '#E8D4B8'
    },
    {
      name: 'Petra',
      location: 'Jordan',
      description: 'An ancient city carved into rose-red cliffs, the jewel of the Nabataean Kingdom.',
      year: '312 BC',
      color: '#CD7F32'
    },
    {
      name: 'Machu Picchu',
      location: 'Peru',
      description: 'A mystical Incan citadel set high in the Andes Mountains, lost to time.',
      year: '1450',
      color: '#8B3A3A'
    },
    {
      name: 'Chichen Itza',
      location: 'Mexico',
      description: 'A Maya pyramid temple complex showcasing advanced astronomical knowledge.',
      year: '600 AD',
      color: '#D4AF37'
    },
    {
      name: 'Christ the Redeemer',
      location: 'Rio de Janeiro, Brazil',
      description: 'An Art Deco statue of Jesus Christ overlooking the city with open arms.',
      year: '1931',
      color: '#5C3317'
    }
  ];

  return (
    <section className="wonder-cards-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <GiAncientRuins className="section-icon" />
        <h2 className="section-title">The Seven Wonders</h2>
        <p className="section-subtitle">
          Discover the magnificence of human achievement
        </p>
      </motion.div>

      <div className="cards-grid">
        {wonders.map((wonder, index) => (
          <WonderCard key={wonder.name} wonder={wonder} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WonderCards;
