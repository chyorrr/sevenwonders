import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, StreetViewPanorama, Marker } from '@react-google-maps/api';
import './TajMahalStreetView.css';

const tajmahal = { lat: 27.1751, lng: 78.0421 };

const libraries = ['places'];

const defaultViewpoints = [
  { id: 0, name: 'Main Gate', position: { lat: 27.1754, lng: 78.0419 }, pov: { heading: 30, pitch: 5 } },
  { id: 1, name: 'Front Garden', position: { lat: 27.1750, lng: 78.0423 }, pov: { heading: 210, pitch: 2 } },
  { id: 2, name: 'Rear View', position: { lat: 27.1746, lng: 78.0420 }, pov: { heading: 120, pitch: 3 } },
];

export default function TajMahalStreetView() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Debug logging
  console.log('=== Street View Debug ===');
  console.log('API Key exists:', !!apiKey);
  console.log('API Key value:', apiKey);
  console.log('Environment:', import.meta.env);
  
  const { isLoaded, loadError } = useLoadScript({ 
    googleMapsApiKey: apiKey, 
    libraries 
  });

  // UI state
  const [viewMode, setViewMode] = useState('street'); // 'street' | 'aerial' | 'satellite'
  const [showMap, setShowMap] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  // Street View state
  const [viewpoints] = useState(defaultViewpoints);
  const [currentViewpoint, setCurrentViewpoint] = useState(0);
  const [pov, setPov] = useState(viewpoints[0].pov);
  const [zoom, setZoom] = useState(1);

  const panoramaRef = useRef(null);
  const rotationInterval = useRef(null);
  const mapRef = useRef(null);

  // Auto-rotate effect
  useEffect(() => {
    if (autoRotate && viewMode === 'street') {
      rotationInterval.current = setInterval(() => {
        setPov(prev => ({ ...prev, heading: (prev.heading + 0.25) % 360 }));
      }, 60);
    } else if (rotationInterval.current) {
      clearInterval(rotationInterval.current);
      rotationInterval.current = null;
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
        rotationInterval.current = null;
      }
    };
  }, [autoRotate, viewMode]);

  // Switch viewpoint
  const switchViewpoint = (index) => {
    const vp = viewpoints[index];
    if (!vp) return;
    setCurrentViewpoint(index);
    setPov(vp.pov);
  };

  const nextViewpoint = () => switchViewpoint((currentViewpoint + 1) % viewpoints.length);
  const prevViewpoint = () => switchViewpoint((currentViewpoint - 1 + viewpoints.length) % viewpoints.length);

  // Masked key for diagnostics
  const maskedKey = apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-6)}` : 'missing';

  // Console log for debugging
  useEffect(() => {
    console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
    console.log('Maps loaded:', isLoaded);
    console.log('Load error:', loadError);
  }, [apiKey, isLoaded, loadError]);

  // Show loader or error explicitly instead of blank screen
  if (loadError) {
    return (
      <div className="tajmahal-experience" style={{ background: 'var(--vintage-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-content vintage-frame" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--vintage-burgundy)', marginBottom: '1rem' }}>Maps Loading Error</h2>
          <p style={{ color: 'var(--vintage-sepia)', marginBottom: '1rem' }}>{loadError.message}</p>
          <p style={{ color: 'var(--vintage-bronze)', fontSize: '0.9rem' }}>
            API Key: {maskedKey}
          </p>
          <p style={{ color: 'var(--vintage-bronze)', fontSize: '0.8rem', marginTop: '1rem' }}>
            Please check your Google Maps API key and billing status.
          </p>
          <button 
            onClick={() => window.location.hash = '#home'}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--vintage-gold)',
              border: '2px solid var(--vintage-bronze)',
              color: 'var(--vintage-mahogany)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="tajmahal-experience" style={{ background: 'var(--vintage-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-content vintage-frame" style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ color: 'var(--vintage-gold)', marginBottom: '1rem' }}>Loading Maps…</h1>
          <div className="loading-bar" style={{ width: '300px', height: '4px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '2px', overflow: 'hidden', margin: '0 auto' }}>
            <div className="loading-progress" style={{ height: '100%', background: 'var(--vintage-gold)', animation: 'loading 2s ease-in-out infinite' }} />
          </div>
          <p style={{ color: 'var(--vintage-sand)', marginTop: '1rem' }}>Preparing your journey...</p>
        </div>
      </div>
    );
  }

  // Main render when maps are loaded
  return (
    <div className="tajmahal-experience">
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Diagnostics overlay - Vintage styled */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 9999 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(139, 58, 58, 0.95), rgba(92, 51, 23, 0.95))', 
          color: 'var(--vintage-ivory)', 
          padding: '12px 16px', 
          borderRadius: '12px',
          border: '2px solid var(--vintage-gold)',
          fontSize: '11px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Georgia, serif'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--vintage-gold)', marginBottom: '6px', letterSpacing: '0.1rem' }}>⚙ DIAGNOSTICS</div>
          <div style={{ marginBottom: '3px' }}>API: <code style={{ color: 'var(--vintage-sand)', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{maskedKey}</code></div>
          <div style={{ marginBottom: '3px' }}>Maps: <strong style={{ color: isLoaded ? '#90EE90' : '#FFB6C1' }}>{String(!!isLoaded)}</strong></div>
          <div>Google: <strong style={{ color: (typeof window !== 'undefined' && window.google) ? '#90EE90' : '#FFB6C1' }}>{String(typeof window !== 'undefined' && !!window.google)}</strong></div>
        </div>
      </div>

      {/* Top bar - Enhanced Vintage */}
      <div className="top-bar" style={{ background: 'linear-gradient(180deg, rgba(139, 58, 58, 0.95) 0%, rgba(92, 51, 23, 0.7) 100%)', borderBottom: '2px solid var(--vintage-gold)' }}>
        <div className="date-stamp" style={{ color: 'var(--vintage-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => window.location.hash = '#home'}
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              border: '2px solid var(--vintage-gold)',
              color: 'var(--vintage-gold)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              marginRight: '1rem'
            }}
          >
            ← Back to Home
          </button>
          <span style={{ fontSize: '1.2rem' }}>🕌</span>
          <span>TAJ MAHAL EXPLORER</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`mode-toggle ${viewMode === 'street' ? 'active' : ''}`} 
            onClick={() => setViewMode('street')}
            style={{ 
              background: viewMode === 'street' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.15)',
              color: viewMode === 'street' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
              border: `2px solid ${viewMode === 'street' ? 'var(--vintage-gold)' : 'var(--vintage-bronze)'}`,
              fontWeight: viewMode === 'street' ? 700 : 400
            }}
          >
            🚶 Street
          </button>
          <button 
            className={`mode-toggle ${viewMode === 'aerial' ? 'active' : ''}`} 
            onClick={() => setViewMode('aerial')}
            style={{ 
              background: viewMode === 'aerial' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.15)',
              color: viewMode === 'aerial' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
              border: `2px solid ${viewMode === 'aerial' ? 'var(--vintage-gold)' : 'var(--vintage-bronze)'}`,
              fontWeight: viewMode === 'aerial' ? 700 : 400
            }}
          >
            🛩️ Aerial
          </button>
          <button 
            className={`mode-toggle ${viewMode === 'satellite' ? 'active' : ''}`} 
            onClick={() => setViewMode('satellite')}
            style={{ 
              background: viewMode === 'satellite' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.15)',
              color: viewMode === 'satellite' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
              border: `2px solid ${viewMode === 'satellite' ? 'var(--vintage-gold)' : 'var(--vintage-bronze)'}`,
              fontWeight: viewMode === 'satellite' ? 700 : 400
            }}
          >
            🛰️ Satellite
          </button>
        </div>
      </div>

      {/* Map / Panoramas */}
      {viewMode === 'street' ? (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <GoogleMap 
            mapContainerStyle={{ width: '100%', height: '100%' }} 
            center={viewpoints[currentViewpoint].position} 
            zoom={17} 
            options={{ 
              disableDefaultUI: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            <StreetViewPanorama
              position={viewpoints[currentViewpoint].position}
              visible={true}
              pov={pov}
              onLoad={(panorama) => { 
                panoramaRef.current = panorama;
                console.log('Street View loaded:', panorama);
                try { 
                  panorama.setPov(pov); 
                  panorama.setZoom(zoom);
                } catch (e) {
                  console.error('Error setting POV:', e);
                }
              }}
              onPovChanged={() => {
                try {
                  if (panoramaRef.current && !autoRotate) {
                    const newPov = panoramaRef.current.getPov();
                    setPov({ heading: newPov.heading, pitch: newPov.pitch });
                  }
                } catch (e) {
                  console.error('Error on POV change:', e);
                }
              }}
              onZoomChanged={() => {
                try {
                  if (panoramaRef.current) {
                    setZoom(panoramaRef.current.getZoom());
                  }
                } catch (e) {}
              }}
              options={{ 
                addressControl: false, 
                linksControl: true, 
                panControl: true, 
                zoomControl: true,
                enableCloseButton: false,
                fullscreenControl: false
              }}
            />
          </GoogleMap>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100vh' }}
          center={tajmahal}
          zoom={18}
          options={{ 
            mapTypeId: viewMode === 'satellite' ? 'satellite' : 'hybrid', 
            rotateControl: true, 
            tilt: 45, 
            streetViewControl: false 
          }}
          onLoad={(map) => { 
            mapRef.current = map;
            console.log('Map loaded:', map);
          }}
        >
          <Marker position={tajmahal} title="Taj Mahal" />
        </GoogleMap>
      )}

      {/* Mini map (overlay) - Enhanced Vintage */}
      {showMap && (
        <div className="mini-map-container" style={{ 
          background: 'linear-gradient(135deg, rgba(139, 58, 58, 0.98), rgba(92, 51, 23, 0.98))',
          border: '3px solid var(--vintage-gold)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(212, 175, 55, 0.2)'
        }}>
          <div className="mini-map-header" style={{ 
            background: 'rgba(212, 175, 55, 0.25)',
            borderBottom: '2px solid var(--vintage-gold)',
            color: 'var(--vintage-gold)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🗺️</span>
              <span>OVERVIEW MAP</span>
            </span>
            <button className="mini-map-close" onClick={() => setShowMap(false)} style={{ color: 'var(--vintage-gold)' }}>×</button>
          </div>
          <div style={{ width: '100%', height: 140, border: '2px solid rgba(212, 175, 55, 0.3)', borderRadius: '0 0 8px 8px' }}>
            <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={tajmahal} zoom={15} options={{ disableDefaultUI: true, mapTypeId: 'satellite' }} />
          </div>
        </div>
      )}

      {/* Control panel - Enhanced Vintage */}
      <div className="control-panel" style={{
        background: 'linear-gradient(135deg, rgba(139, 58, 58, 0.98), rgba(92, 51, 23, 0.98))',
        border: '3px solid var(--vintage-gold)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(212, 175, 55, 0.15)'
      }}>
        <div className="control-section">
          <h4 style={{ color: 'var(--vintage-gold)', borderBottom: '2px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>🎥 VIEW MODE</h4>
          <div className="button-group">
            <button 
              className={viewMode === 'street' ? 'active' : ''} 
              onClick={() => setViewMode('street')}
              style={{
                background: viewMode === 'street' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.08)',
                border: `2px solid ${viewMode === 'street' ? 'var(--vintage-gold)' : 'rgba(212, 175, 55, 0.3)'}`,
                color: viewMode === 'street' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
                fontWeight: viewMode === 'street' ? 700 : 500
              }}
            >
              🚶 Street
            </button>
            <button 
              className={viewMode === 'aerial' ? 'active' : ''} 
              onClick={() => setViewMode('aerial')}
              style={{
                background: viewMode === 'aerial' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.08)',
                border: `2px solid ${viewMode === 'aerial' ? 'var(--vintage-gold)' : 'rgba(212, 175, 55, 0.3)'}`,
                color: viewMode === 'aerial' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
                fontWeight: viewMode === 'aerial' ? 700 : 500
              }}
            >
              🛩️ Aerial
            </button>
            <button 
              className={viewMode === 'satellite' ? 'active' : ''} 
              onClick={() => setViewMode('satellite')}
              style={{
                background: viewMode === 'satellite' ? 'var(--vintage-gold)' : 'rgba(255, 255, 255, 0.08)',
                border: `2px solid ${viewMode === 'satellite' ? 'var(--vintage-gold)' : 'rgba(212, 175, 55, 0.3)'}`,
                color: viewMode === 'satellite' ? 'var(--vintage-mahogany)' : 'var(--vintage-ivory)',
                fontWeight: viewMode === 'satellite' ? 700 : 500
              }}
            >
              🛰️ Satellite
            </button>
          </div>
        </div>

        {viewMode === 'street' && (
          <>
            <div className="control-section">
              <h4 style={{ color: 'var(--vintage-gold)', borderBottom: '2px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>📍 VIEWPOINTS</h4>
              <div className="viewpoint-controls">
                <button onClick={prevViewpoint} style={{ 
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--vintage-bronze)',
                  color: 'var(--vintage-gold)'
                }}>◀</button>
                <span className="viewpoint-name" style={{ color: 'var(--vintage-gold)', fontWeight: 700 }}>{viewpoints[currentViewpoint].name}</span>
                <button onClick={nextViewpoint} style={{ 
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--vintage-bronze)',
                  color: 'var(--vintage-gold)'
                }}>▶</button>
              </div>
            </div>

            <div className="control-section">
              <h4 style={{ color: 'var(--vintage-gold)', borderBottom: '2px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>⚙️ CONTROLS</h4>
              <label className="toggle-label" style={{ color: 'var(--vintage-ivory)' }}>
                <input 
                  type="checkbox" 
                  checked={autoRotate} 
                  onChange={(e) => setAutoRotate(e.target.checked)}
                  style={{ accentColor: 'var(--vintage-gold)' }}
                /> 
                <span style={{ color: 'var(--vintage-ivory)' }}>🔄 Auto-Rotate</span>
              </label>
              <div className="zoom-controls">
                <label style={{ color: 'var(--vintage-gold)', fontWeight: 600 }}>🔍 Zoom Level</label>
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  style={{ 
                    background: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid var(--vintage-bronze)'
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {!showMap && (
        <button className="toggle-map-btn" onClick={() => setShowMap(true)} style={{
          background: 'linear-gradient(135deg, rgba(139, 58, 58, 0.9), rgba(92, 51, 23, 0.9))',
          border: '3px solid var(--vintage-gold)',
          color: 'var(--vintage-gold)',
          fontWeight: 700
        }}>
          🗺️ Show Map
        </button>
      )}

      <div className="info-badge" style={{
        background: 'linear-gradient(135deg, rgba(139, 58, 58, 0.95), rgba(92, 51, 23, 0.95))',
        border: '3px solid var(--vintage-gold)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(212, 175, 55, 0.2)'
      }}>
        <h3 style={{ color: 'var(--vintage-gold)' }}>🕌 Taj Mahal</h3>
        <p style={{ color: 'var(--vintage-ivory)' }}>Vintage Street + Aerial Explorer</p>
        <div className="coords" style={{ color: 'var(--vintage-sand)', fontFamily: '"Courier New", monospace' }}>
          {tajmahal.lat.toFixed(4)}, {tajmahal.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
