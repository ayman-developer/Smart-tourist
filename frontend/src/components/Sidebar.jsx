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
  { id: 'petrol', label: 'Petrol Bunks', icon: Fuel, color: '#f59e0b' },
  { id: 'hotel', label: 'Lodges', icon: Hotel, color: '#3b82f6' },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils, color: '#10b981' },
  { id: 'mechanic', label: 'Mechanic Shops', icon: Wrench, color: '#6366f1' },
  { id: 'tourist', label: 'Tourist Places', icon: MapPin, color: '#ec4899' },
  { id: 'hospital', label: 'Hospitals', icon: HeartPulse, color: '#f43f5e' },
  { id: 'atm', label: 'ATMs & Banks', icon: DollarSign, color: '#06b6d4' },
  { id: 'transit', label: 'Transit Hubs', icon: Train, color: '#e11d48' }
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
    <div style={{ display: 'flex', gap: '0px', height: '100vh', zIndex: 1000, flexShrink: 0 }}>
      
      {/* Left Dock (Category Navigation Bar) */}
      <div className="glass-panel" style={{
        width: '80px',
        height: 'calc(100vh - 40px)',
        margin: '20px 10px 20px 20px',
        padding: '24px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        borderRadius: '20px',
        background: 'rgba(15, 23, 42, 0.7)'
      }}>
        {/* App Logo */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          padding: '10px',
          borderRadius: '12px',
          display: 'flex',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          <Compass size={24} color="white" />
        </div>

        {/* Navigation Categories */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '14px', 
          flex: 1, 
          width: '100%', 
          overflowY: 'auto',
          paddingTop: '10px'
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
                title={cat.label}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? cat.color : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  margin: '0 auto',
                  boxShadow: isActive ? `0 0 12px rgba(${isActive ? '255, 255, 255' : ''}, 0.1)` : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Details Panel Drawer */}
      <div className="glass-panel" style={{
        width: '330px',
        height: 'calc(100vh - 40px)',
        margin: '20px 20px 20px 10px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(15, 23, 42, 0.55)'
      }}>
        {/* Header */}
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {categories.find(c => c.id === activeCategory)?.label || 'Places'}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {filteredPois.length} places available
          </span>
        </div>

        {/* Weather widget */}
        <WeatherWidget location={userLocation} address={userAddress} />

        {/* Live Search filter */}
        <div style={{ position: 'relative' }}>
          <input 
            type="text"
            placeholder={`Search ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all 0.3s',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Places scroll list */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          paddingRight: '4px' 
        }}>
          {filteredPois.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No spots found. Try moving or refreshing location.
            </div>
          ) : (
            filteredPois.map(poi => {
              const isActive = selectedPoi?.id === poi.id;
              const catColor = categories.find(c => c.id === activeCategory)?.color || 'var(--primary)';
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
                    borderLeft: isActive ? `4px solid ${catColor}` : '1px solid var(--glass-border)',
                    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(30, 41, 59, 0.4)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                  }}
                >
                  <img src={poi.image} alt={poi.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      margin: '0 0 4px 0', 
                      textOverflow: 'ellipsis', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap',
                      color: isActive ? 'white' : '#f1f5f9'
                    }}>
                      {poi.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
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

        {/* Footer controls & Optimize button */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px', 
          borderTop: '1px solid rgba(255,255,255,0.06)', 
          paddingTop: '16px' 
        }}>
          <button 
            onClick={onOptimizeRoute}
            disabled={pois.length === 0}
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              width: '100%',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s',
              opacity: pois.length === 0 ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (pois.length > 0) e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              if (pois.length > 0) e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Navigation size={16} />
            Optimize Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
