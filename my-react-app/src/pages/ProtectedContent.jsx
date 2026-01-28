import React, { useState, useEffect } from 'react';
import { calculateDistance } from '../utils/geoUtils';

// 1. SET YOUR TARGET COORDINATES (Where the user must be)
const TARGET_COORDS = { lat: 11.314185390318, lon: 13.143583043175 };
const ALLOWED_RADIUS = 100; // Meters (100m tolerance for GPS accuracy)

const ProtectedContent = () => {
  const [status, setStatus] = useState('verifying'); // 'verifying', 'redirecting', 'denied'
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setStatus('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = calculateDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          TARGET_COORDS.lat,
          TARGET_COORDS.lon
        );

        if (dist <= ALLOWED_RADIUS) {
          // 2. LOCATION MATCHED! START REDIRECT
          setStatus('redirecting');
          setTimeout(() => {
            window.location.href = "https://www.google.com";
          }, 2000); // 2-second delay so they see the success message
        } else {
          setStatus('denied');
          setError(`You are ${Math.round(dist)}m away from the location.`);
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied. Please enable GPS.");
        setStatus('denied');
      }
    );
  }, []);

  // 3. THE UI FOR EACH STATE
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      {status === 'verifying' && (
        <div>
          <h2>🛰️ Checking your location...</h2>
          <p>Please allow location access when prompted.</p>
        </div>
      )}

      {status === 'redirecting' && (
        <div style={{ color: 'green' }}>
          <h1>✅ Location Verified!</h1>
          <p>Redirecting you to Google...</p>
          <div className="loader" style={{marginTop: '10px'}}>🔄</div>
        </div>
      )}

      {status === 'denied' && (
        <div style={{ color: 'red' }}>
          <h1>🚫 Access Denied</h1>
          <p>{error}</p>
          <p>You must be at the specific location to open this link.</p>
        </div>
      )}

    </div>
  );
};

export default ProtectedContent;