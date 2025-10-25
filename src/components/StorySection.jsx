import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './StorySection.css';

const StorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section id="story" ref={containerRef} className="story-section">
      <motion.div 
        className="story-content"
        style={{ opacity, scale, y }}
      >
        <div className="story-quote">
          <motion.div
            className="quote-mark opening"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "
          </motion.div>
          
          <motion.p
            className="quote-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            These monuments are not merely stone and mortar.
            <br />
            They are testaments to human ambition, love, faith, and ingenuity.
            <br />
            Each tells a story that transcends time and culture.
          </motion.p>

          <motion.div
            className="quote-mark closing"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            "
          </motion.div>
        </div>

        <motion.div
          className="story-timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="timeline-line"></div>
          
          <div className="timeline-items">
            {[
              { era: '312 BC', event: 'Petra carved into sandstone', icon: '🏛️' },
              { era: '70-80 AD', event: 'Colosseum completed', icon: '⚔️' },
              { era: '1450', event: 'Machu Picchu constructed', icon: '⛰️' },
              { era: '1653', event: 'Taj Mahal dedicated', icon: '💎' },
              { era: '1931', event: 'Christ the Redeemer unveiled', icon: '✨' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-era">{item.era}</div>
                  <div className="timeline-event">{item.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="story-decorations">
        <motion.div
          className="decoration-circle"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="decoration-circle-2"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default StorySection;
