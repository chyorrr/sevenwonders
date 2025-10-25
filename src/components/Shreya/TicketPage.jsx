import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RetroTicket from './RetroTicket';
import MouseAwakening from './MouseAwakening';
import './TicketPage.css';

export default function TicketPage() {
  const [booking, setBooking] = useState(null);

  const handleBack = () => {
    window.location.hash = '#home';
  };

  const handleArtisans = () => {
    window.location.hash = '#artisans';
  };

  return (
    <MouseAwakening>
      <div className="ticket-page-wrapper">
      {/* Header Navigation */}
      <header className="ticket-header">
        <div className="header-content">
          <h1 className="site-title">Taj Mahal</h1>
          <nav className="header-nav">
            <button className="nav-link" onClick={handleBack}>Story</button>
            <button className="nav-link">View in 3D</button>
            <button className="nav-link" onClick={handleArtisans}>Artisans</button>
            <button className="nav-link active">Tickets</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="ticket-hero"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Plan Your Visit</h1>
          <p className="hero-subtitle">
            Step into history and witness the eternal symbol of love
          </p>
        </div>
        <div className="hero-decoration">
          <div className="lotus-pattern"></div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="ticket-main">
        <div className="ticket-content-grid">
          {/* Ticket Form */}
          <motion.div 
            className="ticket-form-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RetroTicket onSave={(data) => setBooking(data)} />
          </motion.div>

          {/* Information Sidebar */}
          <aside className="ticket-info-sidebar">
            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(212, 175, 55, 0.3)" }}
            >
              <div className="info-icon">🕐</div>
              <h3 className="info-title">Visiting Hours</h3>
              <p className="info-text">
                Saturday - Thursday: 6:00 AM - 7:00 PM<br />
                Friday: Closed<br />
                Full Moon Nights: 8:30 PM - 12:30 AM
              </p>
            </motion.div>

            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(212, 175, 55, 0.3)" }}
            >
              <div className="info-icon">💰</div>
              <h3 className="info-title">Entry Fees</h3>
              <ul className="info-list">
                <li><strong>Indian Visitors:</strong> ₹50</li>
                <li><strong>Foreign Visitors:</strong> ₹1100</li>
                <li><strong>SAARC/BIMSTEC:</strong> ₹540</li>
                <li><strong>Children (below 15):</strong> Free</li>
              </ul>
            </motion.div>

            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(212, 175, 55, 0.3)" }}
            >
              <div className="info-icon">📍</div>
              <h3 className="info-title">Location</h3>
              <p className="info-text">
                Dharmapuri, Forest Colony,<br />
                Tajganj, Agra, Uttar Pradesh 282001<br />
                India
              </p>
              <motion.button 
                className="directions-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Directions →
              </motion.button>
            </motion.div>

            <motion.div 
              className="info-card highlight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(212, 175, 55, 0.4)" }}
            >
              <div className="info-icon">✨</div>
              <h3 className="info-title">Best Time to Visit</h3>
              <p className="info-text">
                October to March offers the most pleasant weather. 
                Sunrise and sunset provide the most magical views of the monument.
              </p>
            </motion.div>

            <motion.div 
              className="info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(212, 175, 55, 0.3)" }}
            >
              <div className="info-icon">ℹ️</div>
              <h3 className="info-title">Important Guidelines</h3>
              <ul className="info-list">
                <li>Photography allowed (no tripods inside)</li>
                <li>No food or smoking inside complex</li>
                <li>Dress modestly and respectfully</li>
                <li>Shoes must be removed or covered</li>
                <li>Security check at entrance</li>
              </ul>
            </motion.div>
          </aside>
        </div>

        {booking && (
          <motion.section 
            className="booking-confirmation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div 
              className="confirmation-card"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="confirmation-icon">✅</div>
              <h2 className="confirmation-title">Booking Confirmed!</h2>
              <p className="confirmation-text">
                Your visit details have been recorded. Please save this confirmation for your records.
              </p>
              <div className="confirmation-details">
                <pre>{JSON.stringify(booking, null, 2)}</pre>
              </div>
              <motion.button 
                className="confirmation-btn" 
                onClick={() => setBooking(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Another Ticket
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="ticket-footer">
        <p>© 2025 Taj Mahal Experience • A Monument of Eternal Love</p>
      </footer>
    </div>
    </MouseAwakening>
  );
}
