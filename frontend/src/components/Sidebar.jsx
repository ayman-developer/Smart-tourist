import React, { useState } from 'react';
import { 
  Fuel, 
  Hotel, 
  Utensils, 
  Wrench, 
  MapPin, 
  Navigation,
  Compass,
  HeartPulse,
  DollarSign,
  Train
} from 'lucide-react';
import WeatherWidget from './WeatherWidget';

const categories = [
  { id: 'petrol', label: 'Petrol Bunks', icon: Fuel },
  { id: 'hotel', label: 'Lodges', icon: Hotel },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils },
  { id: 'mechanic', label: 'Mechanics', icon: Wrench },
  { id: 'tourist', label: 'Tourist Spots', icon: MapPin },
  { id: 'hospital', label: 'Hospitals', icon: HeartPulse },
  { id: 'atm', label: 'ATMs & Banks', icon: DollarSign },
  { id: 'transit', label: 'Transit Hubs', icon: Train }
];

const Sidebar = ({ 
  activeCategory, 
  setActiveCategory, 
  userLocation, 
  userAddress, 
  onOptimizeRoute,
  pois = [],
  selectedPoi,
  onPoiSelect,
  onPoiHover
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter POIs based on search query
  const filteredPois = pois.filter(poi => 
    poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (poi.address && poi.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{
      width: '380px',
      height: '100vh',
      background: 'rgba(10, 14, 26, 0.95)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      padding: '24px',
      zIndex: 1000,
      flexShrink: 0,
      boxShadow: '10px 0 30px rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(20px)'
    }}>
      
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'var(--primary)',
          padding: '8px',
          borderRadius: '6px',
          display: 'flex',
          boxShadow: '0 4px 12px rgba(226, 184, 101, 0.3)'
        }}>
          <Compass size={20} color="#070a13" />
        </div>
        <div>
          <h1 style={{ 
            fontSize: '1.15rem', 
            fontWeight: 800, 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase',
            color: 'white',
            margin: 0
          }}>
            Tourist<span style={{ color: 'var(--primary)' }}>AI</span>
          </h1>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Smart Concierge Explorer
          </p>
        </div>
      </div>

      {/* Weather Widget */}
      <WeatherWidget location={userLocation} address={userAddress} />

      {/* 4x2 Category Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700, margin: '0 0 2px 0' }}>
          Explore Categories
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '8px'
        }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                  onPoiSelect(null);
                }}
                style={{
                  background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? '#070a13' : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(226, 184, 101, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
              >
                <Icon size={15} style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input 
          type="text"
          placeholder={`Filter ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(7, 10, 19, 0.6)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: 'white',
            fontSize: '0.8rem',
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Place List */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        paddingRight: '4px' 
      }}>
        {filteredPois.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            No spots found in this area.
          </div>
        ) : (
          filteredPois.map(poi => {
            const isActive = selectedPoi?.id === poi.id;
            return (
              <div 
                key={poi.id}
                className={`glass-card poi-card ${isActive ? 'active' : ''}`}
                onClick={() => onPoiSelect(isActive ? null : poi)}
                onMouseEnter={() => onPoiHover(poi)}
                onMouseLeave={() => onPoiHover(null)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderLeft: isActive ? '3px solid var(--primary)' : '1px solid var(--glass-border)',
                  background: isActive ? 'rgba(226, 184, 101, 0.06)' : 'rgba(18, 24, 43, 0.4)',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(226,184,101,0.1)' : 'none'
                }}
              >
                <img src={poi.image} alt={poi.name} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    margin: '0 0 3px 0', 
                    textOverflow: 'ellipsis', 
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap',
                    color: isActive ? 'var(--primary)' : '#f1f5f9'
                  }}>
                    {poi.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    <span style={{ color: '#f59e0b' }}>★ {poi.rating}</span>
                    <span>•</span>
                    <span>{poi.distance} km</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Route optimizer footer */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.06)', 
        paddingTop: '14px' 
      }}>
        <button 
          onClick={onOptimizeRoute}
          disabled={pois.length === 0}
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
            color: '#070a13',
            border: 'none',
            padding: '12px',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 14px rgba(226, 184, 101, 0.25)',
            transition: 'all 0.2s',
            opacity: pois.length === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (pois.length > 0) e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            if (pois.length > 0) e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Navigation size={14} />
          Optimize Route
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
