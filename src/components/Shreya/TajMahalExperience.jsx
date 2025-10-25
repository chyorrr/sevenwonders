import React, { useState, useEffect, useRef } from 'react';
import RetroScroll from './RetroScroll';
import MouseAwakening from './MouseAwakening';
import './RetroScroll.css';
import './TajMahalExperience.css';

export default function TajMahalExperience() {
  const story = [
    'In the heart of Agra stands a monument of love carved in white marble.',
    'Built by Shah Jahan in memory of Mumtaz Mahal, its beauty draws seekers of wonder.',
    'Walk through time and feel the stories etched into its walls and gardens.'
  ];

  const [visibleCards, setVisibleCards] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const cards = timelineRef.current.querySelectorAll('.timeline-event');
      const newVisibleCards = [];

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Card is visible when it's in the viewport
        if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
          newVisibleCards.push(index);
        }
      });

      setVisibleCards(newVisibleCards);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = () => {
    // placeholder for when scroll completes
    // currently no-op
  };

  const handleBookTicket = () => {
    window.location.hash = '#ticket';
  };

  const handleArtisans = () => {
    window.location.hash = '#artisans';
  };

  return (
    <MouseAwakening>
      <div className="experience-wrapper">
        {/* Navigation Header */}
      <header className="experience-header">
        <div className="header-content">
          <h1 className="site-title">Taj Mahal</h1>
          <nav className="header-nav">
            <button className="nav-link active">Story</button>
            <button className="nav-link">View in 3D</button>
            <button className="nav-link" onClick={handleArtisans}>Artisans</button>
            <button className="nav-link" onClick={handleBookTicket}>Tickets</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="experience-main">
        <RetroScroll story={story} onComplete={handleComplete} />
        
        {/* Timeline Section */}
        <section className="timeline-section" ref={timelineRef}>
          <div className="timeline-header">
            <h2 className="timeline-title">Journey Through Time</h2>
            <p className="timeline-subtitle">The Tale of Shah Jahan and Mumtaz Mahal</p>
          </div>

          <div className="timeline-container">
            <svg className="timeline-path" viewBox="0 0 1200 2200" preserveAspectRatio="xMidYMid meet">
              {/* Main curved path */}
              <path
                d="M 200 50 Q 350 100, 400 200 Q 450 300, 600 350 Q 750 400, 800 500 Q 850 600, 700 700 Q 550 800, 600 900 Q 650 1000, 800 1100 Q 950 1200, 900 1300 Q 850 1400, 700 1450 Q 550 1500, 600 1600 Q 650 1700, 800 1800 Q 900 1900, 750 2000"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                opacity="0.5"
              />
              
              {/* Branch lines to cards */}
              <line x1="200" y1="50" x2="150" y2="80" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="600" y1="350" x2="950" y2="350" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="700" y1="700" x2="150" y2="700" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="800" y1="1100" x2="950" y2="1050" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="600" y1="1600" x2="150" y2="1500" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="800" y1="1800" x2="950" y2="1750" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              <line x1="750" y1="2000" x2="150" y2="1950" stroke="#D4AF37" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
              
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#CD7F32" />
                  <stop offset="100%" stopColor="#8B3A3A" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timeline Events */}
            <div className="timeline-events">
              
              {/* Event 1: Birth */}
              <div className={`timeline-event ${visibleCards.includes(0) ? 'visible flipped' : ''}`} style={{ top: '30px', left: '5%' }} data-index="0">
                <div className={`timeline-marker ${visibleCards.includes(0) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1592</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">👑</div>
                  <h3 className="card-title">Birth and Early Life</h3>
                  <p className="card-date">1592–1612</p>
                  <p className="card-description">
                    Born in Lahore as Prince Khurram. Educated in Persian, Arabic, and military arts. Showed early passion for architecture.
                  </p>
                </div>
              </div>

              {/* Event 2: Marriage */}
              <div className={`timeline-event right ${visibleCards.includes(1) ? 'visible flipped' : ''}`} style={{ top: '310px', right: '5%' }} data-index="1">
                <div className={`timeline-marker ${visibleCards.includes(1) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1612</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">💕</div>
                  <h3 className="card-title">Marriage to Mumtaz</h3>
                  <p className="card-date">1612</p>
                  <p className="card-description">
                    Married Arjumand Banu Begum, later Mumtaz Mahal. Their bond was inseparable and deeply affectionate.
                  </p>
                </div>
              </div>

              {/* Event 3: Becomes Emperor */}
              <div className={`timeline-event ${visibleCards.includes(2) ? 'visible flipped' : ''}`} style={{ top: '650px', left: '5%' }} data-index="2">
                <div className={`timeline-marker ${visibleCards.includes(2) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1628</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">⚜️</div>
                  <h3 className="card-title">Ascension to Power</h3>
                  <p className="card-date">1628</p>
                  <p className="card-description">
                    Ascended the Mughal throne. Consolidated empire and patronized arts and architecture extensively.
                  </p>
                </div>
              </div>

              {/* Event 4: Mumtaz's Death */}
              <div className={`timeline-event right ${visibleCards.includes(3) ? 'visible flipped' : ''}`} style={{ top: '1000px', right: '5%' }} data-index="3">
                <div className={`timeline-marker ${visibleCards.includes(3) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1631</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">🕊️</div>
                  <h3 className="card-title">Mumtaz's Passing</h3>
                  <p className="card-date">1631</p>
                  <p className="card-description">
                    Mumtaz died during childbirth in Burhanpur. Her death devastated Shah Jahan, inspiring the monument.
                  </p>
                </div>
              </div>

              {/* Event 5: Taj Mahal Construction */}
              <div className={`timeline-event ${visibleCards.includes(4) ? 'visible flipped' : ''}`} style={{ top: '1420px', left: '5%' }} data-index="4">
                <div className={`timeline-marker ${visibleCards.includes(4) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1632</div>
                </div>
                <div className="timeline-card highlight">
                  <div className="card-icon">🕌</div>
                  <h3 className="card-title">Taj Mahal Built</h3>
                  <p className="card-date">1632–1653</p>
                  <p className="card-description">
                    Construction began in Agra. White marble mausoleum with Persian gardens—a symbol of eternal love.
                  </p>
                </div>
              </div>

              {/* Event 6: Family Conflicts */}
              <div className={`timeline-event right ${visibleCards.includes(5) ? 'visible flipped' : ''}`} style={{ top: '1700px', right: '5%' }} data-index="5">
                <div className={`timeline-marker ${visibleCards.includes(5) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1658</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">⚔️</div>
                  <h3 className="card-title">Deposed & Imprisoned</h3>
                  <p className="card-date">1658</p>
                  <p className="card-description">
                    Deposed by son Aurangzeb. Imprisoned in Agra Fort with a view of the Taj Mahal.
                  </p>
                </div>
              </div>

              {/* Event 7: Death & Legacy */}
              <div className={`timeline-event ${visibleCards.includes(6) ? 'visible flipped' : ''}`} style={{ top: '1900px', left: '5%' }} data-index="6">
                <div className={`timeline-marker ${visibleCards.includes(6) ? 'active' : ''}`}>
                  <div className="marker-dot"></div>
                  <div className="marker-year">1666</div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">✨</div>
                  <h3 className="card-title">Eternal Legacy</h3>
                  <p className="card-date">1666</p>
                  <p className="card-description">
                    Died at 74 and buried with Mumtaz. Their love story immortalized in marble and memory.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CTA at bottom of timeline */}
          <div className="timeline-cta">
            <button className="timeline-cta-button" onClick={handleBookTicket}>
              <span className="cta-icon">🎫</span>
              Book Your Visit
              <span className="cta-arrow">→</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="experience-footer">
        <p>© 2025 Taj Mahal Experience • A Monument of Eternal Love</p>
      </footer>
      </div>
    </MouseAwakening>
  );
}
