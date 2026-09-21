import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Volume2, Globe, Navigation, Star, MapPin } from 'lucide-react';

const categoryColorMap = {
  tourist: '#8B5CF6',
  nature: '#10B981',
  restaurant: '#F43F5E',
  shopping: '#EC4899',
  hotel: '#F59E0B',
  coworking: '#0EA5E9',
  business_hotel: '#F59E0B',
  transit: '#8B5CF6',
  atm: '#14B8A6',
  hospital: '#10B981',
  pharmacy: '#06B6D4',
  police: '#6366F1',
  petrol: '#0EA5E9',
  mechanic: '#F97316'
};

// Generate multi-colored custom SVG markers
const getMarkerIcon = (category, isSelected = false, isHovered = false) => {
  const color = categoryColorMap[category] || '#6366F1';
  const size = isSelected ? 40 : (isHovered ? 36 : 30);
  const strokeColor = isSelected ? '#FFFFFF' : '#080C14';
  const strokeWidth = isSelected ? 2.5 : 1.5;
  const shadow = isSelected 
    ? `filter: drop-shadow(0 0 16px ${color});` 
    : (isHovered ? `filter: drop-shadow(0 0 10px ${color});` : `filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));`);

  return new L.DivIcon({
    html: `<div style="${shadow} display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3.5" fill="#080C14"/>
      </svg>
    </div>`,
    className: 'custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

// User Location Pin with Multi-Ring Radar Halo
const getUserIcon = () => {
  return new L.DivIcon({
    html: `<div style="filter: drop-shadow(0 0 14px rgba(99, 102, 241, 0.9)); display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6366F1" width="36" height="36" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgba(99, 102, 241, 0.35)"/>
        <circle cx="12" cy="12" r="5" fill="#8B5CF6" stroke="white" stroke-width="2"/>
      </svg>
    </div>`,
    className: 'user-map-pin',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

function MapController({ selectedPoi }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPoi) {
      map.flyTo([selectedPoi.lat, selectedPoi.lng], 15, { animate: true, duration: 1.2 });
    }
  }, [selectedPoi, map]);
  return null;
}

function BoundsController({ pointsOfInterest, userLocation, routeGeometry }) {
  const map = useMap();
  useEffect(() => {
    if (routeGeometry && routeGeometry.length > 0) {
      const bounds = L.latLngBounds(routeGeometry);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (pointsOfInterest.length > 0 && userLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        ...pointsOfInterest.map(p => [p.lat, p.lng])
      ]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [pointsOfInterest, userLocation, routeGeometry, map]);
  return null;
}

const MapComponent = ({ 
  userLocation, 
  pointsOfInterest = [], 
  selectedPoi, 
  setSelectedPoi, 
  hoveredPoi, 
  activeCategory,
  routeGeometry = null,
  onOpenAudio,
  onOpenVirtual,
  onOpenNavDrawer
}) => {
  const [mapCenter, setMapCenter] = useState([11.0168, 76.9558]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  return (
    <div style={{ 
      flex: 1, 
      position: 'relative', 
      borderRadius: '24px', 
      overflow: 'hidden', 
      margin: '20px 20px 20px 10px', 
      boxShadow: '0 25px 60px rgba(0,0,0,0.7)', 
      border: '1px solid rgba(255, 255, 255, 0.08)' 
    }}>
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Location */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={getUserIcon()}>
            <Popup>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>
                📍 You Are Here
              </div>
            </Popup>
          </Marker>
        )}

        {/* Real OSRM Road Geometry Route Line */}
        {routeGeometry && routeGeometry.length > 0 ? (
          <Polyline 
            positions={routeGeometry} 
            color="#8B5CF6" 
            weight={5.5}
            opacity={0.95}
          />
        ) : (
          pointsOfInterest.length > 0 && userLocation && (
            <Polyline 
              positions={[
                [userLocation.lat, userLocation.lng],
                ...pointsOfInterest.map(p => [p.lat, p.lng])
              ]} 
              color="#6366F1" 
              dashArray="8, 12"
              weight={3}
              opacity={0.7}
            />
          )
        )}

        {/* POI Markers with Rich Image Popups */}
        {pointsOfInterest.map((poi) => {
          const isSelected = selectedPoi?.id === poi.id;
          const isHovered = hoveredPoi?.id === poi.id;
          const categoryColor = categoryColorMap[poi.category || activeCategory] || '#8B5CF6';

          return (
            <Marker 
              key={poi.id} 
              position={[poi.lat, poi.lng]}
              icon={getMarkerIcon(poi.category || activeCategory, isSelected, isHovered)}
              eventHandlers={{
                click: () => setSelectedPoi(poi),
              }}
            >
              <Popup>
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <img 
                    src={poi.image} 
                    alt={poi.name} 
                    style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '12px' }} 
                  />
                  <div>
                    <h3 style={{ margin: '0 0 3px 0', fontSize: '0.95rem', fontWeight: 900, color: 'white' }}>
                      {poi.name}
                    </h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {poi.address}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#F59E0B', fontWeight: 800 }}>★ {poi.rating}</span>
                      <span>{poi.distance} km away</span>
                    </div>

                    <div style={{ fontSize: '0.7rem', marginTop: '4px', color: (poi.crowdStatus || '').includes('Low') ? '#34D399' : '#FBBF24', fontWeight: 700 }}>
                      • {poi.crowdStatus || 'Moderate Crowd'}
                    </div>

                    {poi.signatureDish && (
                      <div style={{ fontSize: '0.7rem', color: '#FDA4AF', marginTop: '3px' }}>
                        🍲 {poi.signatureDish}
                      </div>
                    )}
                  </div>

                  {/* Popup Actions Bar */}
                  <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                    {onOpenAudio && (
                      <button 
                        onClick={() => onOpenAudio(poi)}
                        style={{ flex: 1, background: 'rgba(139, 92, 246, 0.15)', color: '#C4B5FD', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '5px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Audio
                      </button>
                    )}
                    {onOpenVirtual && (
                      <button 
                        onClick={() => onOpenVirtual(poi)}
                        style={{ flex: 1, background: 'rgba(6, 182, 212, 0.15)', color: '#67E8F9', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '5px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        360° Sights
                      </button>
                    )}
                    {onOpenNavDrawer && (
                      <button 
                        onClick={() => onOpenNavDrawer(poi)}
                        style={{ flex: 1, background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: '5px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Navigate
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapController selectedPoi={selectedPoi} />
        <BoundsController pointsOfInterest={pointsOfInterest} userLocation={userLocation} routeGeometry={routeGeometry} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
