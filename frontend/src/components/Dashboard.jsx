import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './MapComponent';
import Chatbot from './Chatbot';
import { getAddressFromCoords, getNearbyPlaces, calculateDistance } from '../utils/api';

function Dashboard() {
  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem('userLocation');
    return saved ? JSON.parse(saved) : { lat: 12.9716, lng: 77.5946 };
  });
  const [userAddress, setUserAddress] = useState(() => localStorage.getItem('userAddress') || "Detecting location...");
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem('lastCategory') || 'tourist');
  const [pois, setPois] = useState(() => {
    const saved = localStorage.getItem(`pois_${activeCategory}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Force clear cache once for new naming logic
  useEffect(() => {
    const version = '11.0';
    if (localStorage.getItem('app_version') !== version) {
      localStorage.removeItem('pois_petrol');
      localStorage.removeItem('pois_tourist');
      localStorage.removeItem('pois_hotel');
      localStorage.removeItem('pois_restaurant');
      localStorage.removeItem('pois_mechanic');
      localStorage.setItem('app_version', version);
      window.location.reload();
    }
  }, []);

  // Persist category
  useEffect(() => {
    localStorage.setItem('lastCategory', activeCategory);
  }, [activeCategory]);

  const handleRefreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          localStorage.setItem('userLocation', JSON.stringify(loc));
          const addr = await getAddressFromCoords(loc.lat, loc.lng);
          setUserAddress(addr);
          localStorage.setItem('userAddress', addr);
        },
        (error) => alert("Please enable location permissions to see your current area.")
      );
    }
  };

  // Detect location on start
  useEffect(() => {
    handleRefreshLocation();
  }, []);

  const handleOptimizeRoute = () => {
    if (pois.length === 0) return;

    const optimized = [];
    let currentPos = { lat: userLocation.lat, lng: userLocation.lng };
    let remaining = [...pois];

    while (remaining.length > 0) {
      // Find nearest to currentPos
      let nearestIdx = 0;
      let minDist = Infinity;

      remaining.forEach((p, i) => {
        const dist = Math.sqrt(Math.pow(p.lat - currentPos.lat, 2) + Math.pow(p.lng - currentPos.lng, 2));
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = i;
        }
      });

      const next = remaining.splice(nearestIdx, 1)[0];
      optimized.push(next);
      currentPos = { lat: next.lat, lng: next.lng };
    }

    setPois(optimized);
  };

  // Update POIs when category or location changes
  useEffect(() => {
    const fetchPOIs = async () => {
      if (userLocation) {
        const cached = localStorage.getItem(`pois_${activeCategory}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Check if cached items are within 4 km of userLocation
          const isLocal = parsed.length > 0 && parsed.every(p => {
            const dist = calculateDistance(userLocation.lat, userLocation.lng, p.lat, p.lng);
            return dist <= 4.0;
          });
          if (isLocal) {
            setPois(parsed);
            return; // Skip fetch if we have cached data for INSTANT loads
          }
        }

        setIsLoading(true);
        const results = await getNearbyPlaces(userLocation.lat, userLocation.lng, activeCategory);
        setPois(results);
        localStorage.setItem(`pois_${activeCategory}`, JSON.stringify(results));
        setIsLoading(false);
      }
    };
    fetchPOIs();
  }, [userLocation, activeCategory]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-dark)', color: 'white' }}>
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        userLocation={userLocation}
        userAddress={userAddress}
        onOptimizeRoute={handleOptimizeRoute}
      />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {isLoading && pois.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
            background: 'var(--primary)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
          }}>
            Searching for {{
              petrol: 'Petrol Bunks',
              hotel: 'Lodges',
              restaurant: 'Restaurants',
              mechanic: 'Mechanic Shops',
              tourist: 'Tourist Places'
            }[activeCategory] || activeCategory}...
          </div>
        )}
        
        <button 
          onClick={handleRefreshLocation}
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            zIndex: 1000,
            background: 'var(--glass-bg)',
            color: 'white',
            border: '1px solid var(--glass-border)',
            padding: '10px 16px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          📍 Refresh Location
        </button>
        <MapComponent 
          userLocation={userLocation} 
          pointsOfInterest={pois} 
        />
      </main>

      <Chatbot />
    </div>
  );
}

export default Dashboard;
