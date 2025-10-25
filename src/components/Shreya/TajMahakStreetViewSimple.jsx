import React from 'react';
import { GoogleMap, useLoadScript, StreetViewPanorama } from '@react-google-maps/api';

const tajmahal = { lat: 27.1751, lng: 78.0421 };

export default function TajMahalStreetViewSimple() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // Debugging logs to help verify API loading in devtools
  React.useEffect(() => {
    console.log('[TajMahalStreetView_SIMPLE] API Key:', apiKey ? 'LOADED' : 'MISSING');
    console.log('[TajMahalStreetView_SIMPLE] isLoaded=', isLoaded, 'loadError=', loadError);
  }, [isLoaded, loadError, apiKey]);

  if (loadError) {
    return (
      <div style={{ padding: '2rem', color: 'red', background: '#1a1a2e', minHeight: '100vh' }}>
        <h2>Error loading Google Maps</h2>
        <p>{loadError.message}</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          API Key: {apiKey ? `${apiKey.substring(0, 8)}...` : 'MISSING'}
        </p>
        <button 
          onClick={() => window.location.hash = '#home'}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ 
        padding: '2rem', 
        color: 'white', 
        background: '#1a1a2e', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2>Loading Google Maps...</h2>
        <p>API Key: {apiKey ? 'Loaded ✓' : 'Missing ✗'}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Back button */}
      <button
        onClick={() => window.location.hash = '#home'}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 10000,
          padding: '0.75rem 1.5rem',
          background: 'rgba(212, 175, 55, 0.9)',
          border: '2px solid #D4AF37',
          borderRadius: '8px',
          color: '#5C3317',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        ← Back to Home
      </button>
      
      {/* Diagnostics overlay */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 9999, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 10px', borderRadius: 8, fontFamily: 'Georgia, serif', fontSize: 12 }}>
        <div><strong>Maps loaded:</strong> {String(!!isLoaded)}</div>
        <div><strong>window.google:</strong> {String(typeof window !== 'undefined' && !!window.google)}</div>
        <div><strong>API Key:</strong> {apiKey ? '✓' : '✗'}</div>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={tajmahal}
        zoom={15}
      >
        <StreetViewPanorama
          position={tajmahal}
          visible={true}
          pov={{ heading: 0, pitch: 0 }}
          options={{
            addressControl: false,
            linksControl: true,
            panControl: true,
            zoomControl: true,
          }}
        />
      </GoogleMap>
    </div>
  );
}