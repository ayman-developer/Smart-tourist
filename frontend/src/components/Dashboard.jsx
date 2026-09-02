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
  const [userAddress, setUserAddress] = useState(() => {
    const saved = localStorage.getItem('userAddress');
    if (!saved) return { full: "Detecting location...", short: "Detecting location..." };
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.full) {
        return parsed;
      }
      return { full: saved, short: saved };
    } catch {
      return { full: saved, short: saved };
    }
  });
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem('lastCategory') || 'tourist');
  const [pois, setPois] = useState(() => {
    const saved = localStorage.getItem(`pois_${activeCategory}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [hoveredPoi, setHoveredPoi] = useState(null);

  // Force clear cache once for new naming logic
  useEffect(() => {
    const version = '12.0';
    if (localStorage.getItem('app_version') !== version) {
      localStorage.removeItem('pois_petrol');
      localStorage.removeItem('pois_tourist');
      localStorage.removeItem('pois_hotel');
      localStorage.removeItem('pois_restaurant');
      localStorage.removeItem('pois_mechanic');
      localStorage.removeItem('pois_hospital');
      localStorage.removeItem('pois_atm');
      localStorage.removeItem('pois_transit');
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
          localStorage.setItem('userAddress', JSON.stringify(addr));
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
          // Check if cached items are within limits (45 km for tourist, 4 km for others)
          const maxDist = activeCategory === 'tourist' ? 45.0 : 4.0;
          const isLocal = parsed.length > 0 && parsed.every(p => {
            const dist = calculateDistance(userLocation.lat, userLocation.lng, p.lat, p.lng);
            return dist <= maxDist;
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Background Glowing Blobs for Dribbble Mesh Gradient */}
      <div className="glowing-blob blob-purple"></div>
      <div className="glowing-blob blob-teal"></div>
      <div className="glowing-blob blob-pink"></div>

      {/* Main Glassmorphic Dashboard Layout */}
      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
        <Sidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          userLocation={userLocation}
          userAddress={userAddress}
          onOptimizeRoute={handleOptimizeRoute}
          pois={pois}
          selectedPoi={selectedPoi}
          onPoiSelect={setSelectedPoi}
          hoveredPoi={hoveredPoi}
          onPoiHover={setHoveredPoi}
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
              color: '#06080c',
              padding: '12px 24px',
              borderRadius: '50px',
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(0, 229, 255, 0.45)'
            }}>
              Searching for {{
                petrol: 'Petrol Bunks',
                hotel: 'Lodges',
                restaurant: 'Restaurants',
                mechanic: 'Mechanic Shops',
                tourist: 'Tourist Places',
                hospital: 'Hospitals & Clinics',
                atm: 'ATMs & Banks',
                transit: 'Transit Hubs'
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
              background: 'rgba(13, 17, 26, 0.75)',
              color: 'white',
              border: '1px solid var(--glass-border)',
              padding: '10px 18px',
              borderRadius: '14px',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            📍 Refresh Location
          </button>
          
          <MapComponent 
            userLocation={userLocation} 
            pointsOfInterest={pois} 
            selectedPoi={selectedPoi}
            setSelectedPoi={setSelectedPoi}
            hoveredPoi={hoveredPoi}
            activeCategory={activeCategory}
          />
        </main>
      </div>

      <Chatbot />
    </div>
  );
}

export default Dashboard;
