import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './MapComponent';
import Chatbot from './Chatbot';
import ItineraryPlannerModal from './modals/ItineraryPlannerModal';
import AudioTourModal from './modals/AudioTourModal';
import EmergencySosModal from './modals/EmergencySosModal';
import RouteNavigationDrawer from './modals/RouteNavigationDrawer';
import VirtualPreviewModal from './modals/VirtualPreviewModal';
import ExpenseTrackerModal from './modals/ExpenseTrackerModal';
import { getNearbyPlaces, getAddressFromCoords, getDrivingRoute } from '../utils/api';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('tourist');
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState('Detecting location...');
  const [pois, setPois] = useState([]);
  const [emergencyPois, setEmergencyPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [hoveredPoi, setHoveredPoi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals and Drawers States
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isVirtualOpen, setIsVirtualOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  // Active target POI for modals
  const [activeAudioPoi, setActiveAudioPoi] = useState(null);
  const [activeVirtualPoi, setActiveVirtualPoi] = useState(null);
  const [activeNavPoi, setActiveNavPoi] = useState(null);
  const [routeData, setRouteData] = useState(null);

  // Auto-detect user geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          const addr = await getAddressFromCoords(loc.lat, loc.lng);
          setUserAddress(addr);
        },
        async (error) => {
          console.warn("Geolocation denied, using default Coimbatore center:", error);
          const defaultLoc = { lat: 11.0168, lng: 76.9558 };
          setUserLocation(defaultLoc);
          const addr = await getAddressFromCoords(defaultLoc.lat, defaultLoc.lng);
          setUserAddress(addr);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      const defaultLoc = { lat: 11.0168, lng: 76.9558 };
      setUserLocation(defaultLoc);
    }
  }, []);

  // Fetch places when category or location changes
  useEffect(() => {
    const fetchPlaces = async () => {
      if (userLocation) {
        setIsLoading(true);
        const places = await getNearbyPlaces(userLocation.lat, userLocation.lng, activeCategory);
        setPois(places);
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, [activeCategory, userLocation]);

  // Fetch emergency places for SOS modal in background
  useEffect(() => {
    const fetchEmergency = async () => {
      if (userLocation) {
        const medicals = await getNearbyPlaces(userLocation.lat, userLocation.lng, 'hospital');
        setEmergencyPois(medicals);
      }
    };
    fetchEmergency();
  }, [userLocation]);

  const handleRefreshLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          const addr = await getAddressFromCoords(loc.lat, loc.lng);
          setUserAddress(addr);
          const places = await getNearbyPlaces(loc.lat, loc.lng, activeCategory);
          setPois(places);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  };

  // Turn-by-Turn OSRM Route Navigation Trigger
  const handleOpenNavDrawer = async (poi) => {
    setActiveNavPoi(poi);
    setSelectedPoi(poi);
    if (userLocation && poi) {
      const route = await getDrivingRoute([userLocation, { lat: poi.lat, lng: poi.lng }]);
      setRouteData(route);
    }
    setIsNavDrawerOpen(true);
  };

  // Route Optimization (Connecting all nearest spots)
  const handleOptimizeRoute = async () => {
    if (pois.length > 0 && userLocation) {
      const sorted = [...pois].sort((a, b) => a.distance - b.distance);
      const topSpots = sorted.slice(0, 4);
      const waypoints = [userLocation, ...topSpots.map(p => ({ lat: p.lat, lng: p.lng }))];
      
      const route = await getDrivingRoute(waypoints);
      setRouteData(route);
      if (topSpots.length > 0) {
        setActiveNavPoi(topSpots[0]);
        setIsNavDrawerOpen(true);
      }
    }
  };

  const handlePlotItinerary = async (stops) => {
    if (stops.length > 0 && userLocation) {
      setPois(stops);
      const waypoints = [userLocation, ...stops.map(s => ({ lat: s.lat, lng: s.lng }))];
      const route = await getDrivingRoute(waypoints);
      setRouteData(route);
    }
  };

  const handleOpenAudio = (poi) => {
    setActiveAudioPoi(poi);
    setIsAudioOpen(true);
  };

  const handleOpenVirtual = (poi) => {
    setActiveVirtualPoi(poi);
    setIsVirtualOpen(true);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--bg-dark)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Mesh Gradient Glowing Background Blobs */}
      <div className="glowing-blob blob-purple"></div>
      <div className="glowing-blob blob-teal"></div>
      <div className="glowing-blob blob-pink"></div>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', height: '100%' }}>
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
          onOpenItinerary={() => setIsItineraryOpen(true)}
          onOpenSos={() => setIsSosOpen(true)}
          onOpenExpense={() => setIsExpenseOpen(true)}
          onOpenAudio={handleOpenAudio}
          onOpenVirtual={handleOpenVirtual}
          onOpenNavDrawer={handleOpenNavDrawer}
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
            routeGeometry={routeData?.geometry}
            onOpenAudio={handleOpenAudio}
            onOpenVirtual={handleOpenVirtual}
            onOpenNavDrawer={handleOpenNavDrawer}
          />
        </main>
      </div>

      {/* Feature Modals & Navigation Drawer */}
      <ItineraryPlannerModal 
        isOpen={isItineraryOpen} 
        onClose={() => setIsItineraryOpen(false)} 
        pois={pois}
        userLocation={userLocation}
        onPlotItinerary={handlePlotItinerary}
      />

      <AudioTourModal 
        isOpen={isAudioOpen} 
        onClose={() => setIsAudioOpen(false)} 
        poi={activeAudioPoi}
      />

      <EmergencySosModal 
        isOpen={isSosOpen} 
        onClose={() => setIsSosOpen(false)} 
        userLocation={userLocation}
        userAddress={userAddress}
        emergencyPois={emergencyPois}
        onNavigateToPoi={handleOpenNavDrawer}
      />

      <RouteNavigationDrawer 
        isOpen={isNavDrawerOpen} 
        onClose={() => setIsNavDrawerOpen(false)} 
        routeData={routeData}
        targetPoi={activeNavPoi}
        userLocation={userLocation}
      />

      <VirtualPreviewModal 
        isOpen={isVirtualOpen} 
        onClose={() => setIsVirtualOpen(false)} 
        poi={activeVirtualPoi}
      />

      <ExpenseTrackerModal 
        isOpen={isExpenseOpen} 
        onClose={() => setIsExpenseOpen(false)} 
      />

      <Chatbot 
        userLocation={userLocation} 
        userAddress={userAddress} 
        activeCategory={activeCategory}
        pois={pois}
        onSelectPoi={setSelectedPoi}
      />
    </div>
  );
};

export default Dashboard;
