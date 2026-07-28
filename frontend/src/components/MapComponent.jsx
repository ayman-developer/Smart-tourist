import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

let UserIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom hook to update map view
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

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
    <div style={{ padding: '4px' }}>
      <img 
        src={poi.image} 
        alt={poi.name}
        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
      />
      <h4 style={{ margin: '0 0 4px 0', color: 'var(--primary)', fontSize: '1rem', fontWeight: 700 }}>{poi.name}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
          ★ {poi.rating}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#666' }}>({Math.floor(Math.random() * 200)} reviews)</span>
        {poi.distance !== undefined && (
          <span style={{ background: '#6366f1', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, marginLeft: 'auto' }}>
            {poi.distance} km away
          </span>
        )}
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <p style={{ margin: '0', fontSize: '0.75rem', color: '#444', fontWeight: 600 }}>Address:</p>
        <p style={{ margin: '0', fontSize: '0.75rem', color: '#666' }}>
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
            padding: '8px', 
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Get Directions
        </button>
        <button 
          style={{ 
            background: '#f1f5f9', 
            color: '#1e293b', 
            border: '1px solid #e2e8f0', 
            padding: '8px', 
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Call
        </button>
      </div>
    </div>
  );
};

const MapComponent = ({ userLocation, pointsOfInterest }) => {
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default: Bangalore

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  return (
    <div style={{ flex: 1, position: 'relative', borderRadius: '20px', overflow: 'hidden', margin: '20px 20px 20px 0' }}>
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
        
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
            <Popup>
              <div style={{ color: '#333', fontWeight: 600 }}>
                You are here
              </div>
            </Popup>
          </Marker>
        )}

        {pointsOfInterest.length > 0 && (
          <Polyline 
            positions={[
              [userLocation.lat, userLocation.lng],
              ...pointsOfInterest.map(p => [p.lat, p.lng])
            ]} 
            color="#6366f1" 
            dashArray="10, 10"
            weight={3}
            opacity={0.4}
          />
        )}

        {pointsOfInterest.map((poi, idx) => (
          <Marker key={idx} position={[poi.lat, poi.lng]}>
            <Popup maxWidth={300}>
              <POIPopupContent poi={poi} userLocation={userLocation} />
            </Popup>
          </Marker>
        ))}

        <ChangeView center={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
