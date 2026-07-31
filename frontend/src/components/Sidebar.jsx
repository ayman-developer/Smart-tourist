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
  { id: 'tourist', label: 'Attractions', icon: MapPin },
  { id: 'hotel', label: 'Lodgings', icon: Hotel },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils },
  { id: 'hospital', label: 'Hospitals', icon: HeartPulse },
  { id: 'atm', label: 'ATMs & Cash', icon: DollarSign },
  { id: 'transit', label: 'Transit', icon: Train },
  { id: 'petrol', label: 'Petrol Bunks', icon: Fuel },
  { id: 'mechanic', label: 'Mechanics', icon: Wrench }
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
    <div className="glass-panel" style={{
      width: '380px',
      height: 'calc(100vh - 40px)',
      margin: '20px 10px 20px 20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10
    }}>
      
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'var(--primary)',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          boxShadow: '0 4px 15px rgba(226, 184, 101, 0.25)'
        }}>
          <Compass size={20} color="#05070e" />
        </div>
        <div>
          <h1 style={{ 
            fontSize: '1.2rem', 
            fontWeight: 900, 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase',
            color: 'white',
            margin: 0
          }}>
            Tourist<span style={{ color: 'var(--primary)' }}>AI</span>
          </h1>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
            Premium Travel Finder
          </p>
        </div>
      </div>

      {/* Weather Widget */}
      <WeatherWidget location={userLocation} address={userAddress} />

      {/* Horizontal Slider Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: 800 }}>
          Categories
        </span>
        <div className="category-slider">
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
                  background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? '#05070e' : 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
              >
                <Icon size={13} />
                {cat.label}
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
            background: 'rgba(5, 7, 14, 0.5)',
            border: '1px solid var(--glass-border)',
            borderRadius: '14px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '0.82rem',
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Places List */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        paddingRight: '2px' 
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
                  padding: '12px',
                  cursor: 'pointer',
                  borderLeft: isActive ? '3px solid var(--primary)' : '1px solid var(--glass-border)',
                  background: isActive ? 'rgba(226, 184, 101, 0.05)' : 'rgba(18, 24, 43, 0.45)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  borderRadius: '16px',
                  transition: 'all 0.25s ease'
                }}
              >
                <img 
                  src={poi.image} 
                  alt={poi.name} 
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '10px', 
                    objectFit: 'cover', 
                    flexShrink: 0 
                  }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ 
                    fontSize: '0.82rem', 
                    fontWeight: 800, 
                    margin: '0 0 3px 0', 
                    textOverflow: 'ellipsis', 
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap',
                    color: isActive ? 'var(--primary)' : '#f8fafc'
                  }}>
                    {poi.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      ★ {poi.rating}
                    </span>
                    <span>•</span>
                    <span>{poi.distance} km</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Optimize Route action block */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.06)', 
        paddingTop: '16px' 
      }}>
        <button 
          onClick={onOptimizeRoute}
          disabled={pois.length === 0}
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
            color: '#05070e',
            border: 'none',
            padding: '12px',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 8px 20px rgba(226, 184, 101, 0.25)',
            transition: 'all 0.25s',
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
