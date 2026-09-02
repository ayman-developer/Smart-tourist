import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon shadow URL
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Generate custom SVG markers in Portfolio Cyan Palette
const getMarkerIcon = (category, isSelected = false, isHovered = false) => {
  const color = '#00e5ff'; // Electric Neon Cyan from Portfolio
  const size = isSelected ? 38 : (isHovered ? 34 : 28);
  const strokeColor = isSelected ? '#ffffff' : '#06080c';
  const strokeWidth = isSelected ? 2.5 : 1.5;
  const shadow = isSelected 
    ? 'filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.95));' 
    : (isHovered ? 'filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.65));' : '');

  return new L.DivIcon({
    html: `<div style="${shadow} display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3.5" fill="#06080c"/>
      </svg>
    </div>`,
    className: 'custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

// Custom User Pin Icon with Radar Pulse
const getUserIcon = () => {
  return new L.DivIcon({
    html: `<div style="filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.8)); display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00e5ff" width="34" height="34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgba(0, 229, 255, 0.25)"/>
        <circle cx="12" cy="12" r="5" fill="#00e5ff" stroke="white" stroke-width="2"/>
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
      map.flyTo([selectedPoi.lat, selectedPoi.lng], 15, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedPoi, map]);

  return null;
}

// Map Auto-Fit bounds controller
function BoundsController({ pointsOfInterest, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (pointsOfInterest.length > 0 && userLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        ...pointsOfInterest.map(p => [p.lat, p.lng])
      ]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [pointsOfInterest, userLocation, map]);

  return null;
}

const MapComponent = ({ 
  userLocation, 
  pointsOfInterest = [], 
  selectedPoi, 
  setSelectedPoi, 
  hoveredPoi, 
  activeCategory 
}) => {
  const [mapCenter, setMapCenter] = useState([11.0168, 76.9558]); // Default center

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  return (
    <div style={{ 
      flex: 1, 
      position: 'relative', 
      borderRadius: '20px', 
      overflow: 'hidden', 
      margin: '20px 20px 20px 10px', 
      boxShadow: '0 20px 50px rgba(0,0,0,0.6)', 
      border: '1px solid var(--glass-border)' 
    }}>
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* Sleek Dark Mode Vector Tiles */}
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Location Pin */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={getUserIcon()}>
            <Popup>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>
                📍 You Are Here
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route connecting line in Neon Cyan */}
        {pointsOfInterest.length > 0 && userLocation && (
          <Polyline 
            positions={[
              [userLocation.lat, userLocation.lng],
              ...pointsOfInterest.map(p => [p.lat, p.lng])
            ]} 
            color="#00e5ff" 
            dashArray="8, 12"
            weight={3.5}
            opacity={0.75}
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
                },
              }}
            >
              <Popup>
                <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <img 
                    src={poi.image} 
                    alt={poi.name} 
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px' }} 
                  />
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 800, color: 'white' }}>
                      {poi.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>★ {poi.rating}</span>
                      <span>{poi.distance} km away</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapController selectedPoi={selectedPoi} />
        <BoundsController pointsOfInterest={pointsOfInterest} userLocation={userLocation} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
