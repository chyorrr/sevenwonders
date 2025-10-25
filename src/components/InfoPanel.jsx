import { motion, AnimatePresence } from 'framer-motion';
import './InfoPanel.css';

const InfoPanel = ({ wonder, isOpen, onClose }) => {
  if (!wonder) return null;

  const wonderDetails = {
    'Taj Mahal': {
      fullName: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh, India',
      built: '1632-1653',
      builder: 'Emperor Shah Jahan',
      description: 'An immaculate white marble mausoleum commissioned by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. It stands as an eternal symbol of love and is considered the jewel of Muslim art in India.',
      facts: [
        'Took 22 years and 20,000 artisans to build',
        'Made from white Makrana marble',
        'Changes color depending on time of day',
        'Perfect symmetry in design'
      ],
      dimensions: 'Height: 73m (240 ft), Base: 95m × 95m'
    },
    'Great Wall': {
      fullName: 'The Great Wall of China',
      location: 'Northern China',
      built: '7th century BC - 17th century AD',
      builder: 'Multiple Chinese dynasties',
      description: 'A series of fortifications built across the historical northern borders of ancient Chinese states. It spans over 13,000 miles and represents one of the most impressive architectural feats in history.',
      facts: [
        'Total length: over 21,000 km (13,000 mi)',
        'Built over 2,000+ years',
        'Not visible from space with naked eye',
        'Made from stone, brick, tamped earth, and wood'
      ],
      dimensions: 'Average height: 6-7m, Width: 4-5m'
    },
    'Colosseum': {
      fullName: 'The Colosseum (Flavian Amphitheatre)',
      location: 'Rome, Italy',
      built: '70-80 AD',
      builder: 'Emperors Vespasian and Titus',
      description: 'The largest ancient amphitheater ever built and still the largest standing amphitheater in the world. It hosted gladiatorial contests, animal hunts, executions, and dramatic performances.',
      facts: [
        'Could hold 50,000-80,000 spectators',
        'Had retractable awning (velarium)',
        'Underground chambers (hypogeum) for animals and gladiators',
        'Used for nearly 400 years'
      ],
      dimensions: 'Height: 48m, Length: 189m, Width: 156m'
    },
    'Petra': {
      fullName: 'Petra (Al-Khazneh)',
      location: 'Ma\'an Governorate, Jordan',
      built: '312 BC (approximately)',
      builder: 'Nabataean Kingdom',
      description: 'An archaeological city famous for its rock-cut architecture and water conduit system. Known as the "Rose City" due to the color of the stone, it was the capital of the Nabataean Kingdom.',
      facts: [
        'Carved directly into rose-red cliffs',
        'Advanced water management system',
        'Featured in Indiana Jones film',
        'Remained unknown to western world until 1812'
      ],
      dimensions: 'Treasury (Al-Khazneh): 40m high, 25m wide'
    },
    'Machu Picchu': {
      fullName: 'Machu Picchu',
      location: 'Cusco Region, Peru',
      built: '1450 AD',
      builder: 'Inca Emperor Pachacuti',
      description: 'A 15th-century Inca citadel located on a mountain ridge above the Sacred Valley. Built in the classical Inca style with polished dry-stone walls, it was abandoned during the Spanish Conquest.',
      facts: [
        'Built without wheels, iron tools, or draft animals',
        'Precise stonework without mortar',
        'Earthquake-resistant construction',
        'Rediscovered by Hiram Bingham in 1911'
      ],
      dimensions: 'Altitude: 2,430m (7,970 ft), Area: 32,500 hectares'
    },
    'Chichen Itza': {
      fullName: 'Chichen Itza (El Castillo)',
      location: 'Yucatán, Mexico',
      built: '600-1200 AD',
      builder: 'Maya civilization',
      description: 'A large pre-Columbian city built by the Maya people. The pyramid of Kukulkan (El Castillo) demonstrates the Maya\'s advanced knowledge of astronomy and mathematics.',
      facts: [
        'Pyramid has 365 steps (days in a year)',
        'Equinox creates serpent shadow effect',
        'Advanced astronomical observatory (El Caracol)',
        'Largest ball court in Mesoamerica'
      ],
      dimensions: 'Pyramid height: 30m (98 ft), Base: 55m × 55m'
    },
    'Christ Redeemer': {
      fullName: 'Christ the Redeemer',
      location: 'Rio de Janeiro, Brazil',
      built: '1922-1931',
      builder: 'Paul Landowski (sculptor)',
      description: 'An Art Deco statue of Jesus Christ standing atop Corcovado mountain. It has become a cultural icon of Brazil and a symbol of Christianity worldwide.',
      facts: [
        'Made of reinforced concrete and soapstone',
        'Arms span 28 meters (92 ft)',
        'Struck by lightning regularly',
        'Chosen as one of New Seven Wonders in 2007'
      ],
      dimensions: 'Height: 30m (98 ft) + 8m pedestal, Arm span: 28m'
    }
  };

  const details = wonderDetails[wonder] || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="info-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="info-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className="close-button" onClick={onClose}>✕</button>
            
            <div className="panel-content">
              <div className="panel-header">
                <h2 className="panel-title">{details.fullName}</h2>
                <div className="panel-location">📍 {details.location}</div>
              </div>

              <div className="panel-section">
                <h3>Overview</h3>
                <p className="panel-description">{details.description}</p>
              </div>

              <div className="panel-info-grid">
                <div className="info-item">
                  <strong>Built:</strong>
                  <span>{details.built}</span>
                </div>
                <div className="info-item">
                  <strong>Builder:</strong>
                  <span>{details.builder}</span>
                </div>
                <div className="info-item">
                  <strong>Dimensions:</strong>
                  <span>{details.dimensions}</span>
                </div>
              </div>

              <div className="panel-section">
                <h3>Fascinating Facts</h3>
                <ul className="facts-list">
                  {details.facts?.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
