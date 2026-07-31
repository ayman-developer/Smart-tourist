import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon shadow URL
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Generate custom SVG markers for different categories (cohesive sand-gold)
const getMarkerIcon = (category, isSelected = false, isHovered = false) => {
  const color = '#e2b865'; // Cohesive Sand Gold
  const size = isSelected ? 38 : (isHovered ? 34 : 28);
  const strokeColor = isSelected ? 'white' : '#070a13';
  const strokeWidth = isSelected ? 2.5 : 1.5;
  const shadow = isSelected 
    ? 'filter: drop-shadow(0 0 10px rgba(226, 184, 101, 0.85));' 
    : (isHovered ? 'filter: drop-shadow(0 0 6px rgba(226, 184, 101, 0.5));' : '');

  return new L.DivIcon({
    html: `<div style="${shadow} display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3.5" fill="#070a13"/>
      </svg>
    </div>`,
    className: 'custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

// Custom User Pin Icon
const getUserIcon = () => {
  return new L.DivIcon({
    html: `<div style="filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.8));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f43f5e" width="34" height="34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgba(244,63,94,0.3)"/>
        <circle cx="12" cy="12" r="6" fill="#f43f5e" stroke="white" stroke-width="2"/>
      </svg>
    </div>`,
    className: 'user-map-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

// Map Controller for auto-panning and zooming when items are selected
function MapController({ selectedPoi }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPoi) {
      map.setView([selectedPoi.lat, selectedPoi.lng], 15, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedPoi, map]);
  return null;
}

// POI Popup content component
const POIPopupContent = ({ poi, userLocation }) => {
  const [address, setAddress] = useState(poi.address);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (poi.address === 'Address available in navigation') {
      let isMounted = true;
      setLoading(true);
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${poi.lat}&lon=${poi.lng}&zoom=18&addressdetails=1`)
        .then(res => res.json())
        .then(data => {
          if (isMounted) {
            setAddress(data.display_name || 'Address not found');
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setAddress('Address not found');
            setLoading(false);
          }
        });
      return () => { isMounted = false; };
    }
  }, [poi]);

  return (
    <div style={{ padding: '6px', minWidth: '220px' }}>
      <img 
        src={poi.image} 
        alt={poi.name}
        style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
      />
      <h4 style={{ margin: '0 0 6px 0', color: 'white', fontSize: '0.95rem', fontWeight: 800 }}>{poi.name}</h4>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
          ★ {poi.rating}
        </span>
        {poi.distance !== undefined && (
          <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
            {poi.distance} km away
          </span>
        )}
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <p style={{ margin: '0 0 2px 0', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Address:</p>
        <p style={{ margin: '0', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.3' }}>
          {loading ? 'Fetching location details...' : address}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${poi.lat},${poi.lng}&travelmode=driving`;
            window.open(url, '_blank');
          }}
          style={{ 
            flex: 1,
            background: 'var(--primary)', 
            color: 'white', 
            border: 'none', 
            padding: '8px 12px', 
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(99, 102, 241, 0.3)'
          }}
        >
          Directions
        </button>
      </div>
    </div>
  );
};

const MapComponent = ({ 
  userLocation, 
  pointsOfInterest = [], 
  selectedPoi, 
  setSelectedPoi, 
  hoveredPoi, 
  activeCategory 
}) => {
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Bangalore default

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  return (
    <div style={{ flex: 1, position: 'relative', borderRadius: '24px', overflow: 'hidden', margin: '20px 20px 20px 10px', boxShadow: '0 12px 32px rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)' }}>
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* Sleek Dark Mode Tiles */}
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Location Pin */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={getUserIcon()}>
            <Popup>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>
                📍 You are here
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route connecting line */}
        {pointsOfInterest.length > 0 && userLocation && (
          <Polyline 
            positions={[
              [userLocation.lat, userLocation.lng],
              ...pointsOfInterest.map(p => [p.lat, p.lng])
            ]} 
            color="#e2b865" 
            dashArray="8, 12"
            weight={3.5}
            opacity={0.65}
          />
        )}

        {/* Points of Interest pins */}
        {pointsOfInterest.map((poi) => {
          const isSelected = selectedPoi?.id === poi.id;
          const isHovered = hoveredPoi?.id === poi.id;
          return (
            <Marker 
              key={poi.id} 
              position={[poi.lat, poi.lng]}
              icon={getMarkerIcon(activeCategory, isSelected, isHovered)}
              eventHandlers={{
                click: () => {
                  setSelectedPoi(poi);
                }
              }}
            />
          );
        })}

        {/* Active popup rendering anchored to selected POI */}
        {selectedPoi && (
          <Popup 
            position={[selectedPoi.lat, selectedPoi.lng]} 
            onClose={() => setSelectedPoi(null)}
            maxWidth={300}
          >
            <POIPopupContent poi={selectedPoi} userLocation={userLocation} />
          </Popup>
        )}

        {/* Auto panning/zooming helper */}
        <MapController selectedPoi={selectedPoi} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
