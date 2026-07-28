import React from 'react';
import { 
  Fuel, 
  Hotel, 
  Utensils, 
  Wrench, 
  MapPin, 
  Navigation,
  Compass
} from 'lucide-react';
import WeatherWidget from './WeatherWidget';

const categories = [
  { id: 'petrol', label: 'Petrol Bunks', icon: Fuel, color: '#f59e0b' },
  { id: 'hotel', label: 'Lodges', icon: Hotel, color: '#3b82f6' },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils, color: '#10b981' },
  { id: 'mechanic', label: 'Mechanic Shops', icon: Wrench, color: '#6366f1' },
  { id: 'tourist', label: 'Tourist Places', icon: MapPin, color: '#ec4899' },
];

const Sidebar = ({ activeCategory, setActiveCategory, userLocation, userAddress, onOptimizeRoute }) => {
  return (
    <div className="glass-panel" style={{ 
      width: '300px', 
      height: 'calc(100vh - 40px)', 
      margin: '20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex'
        }}>
          <Compass size={24} color="white" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Tourist<span style={{ color: 'var(--secondary)' }}>AI</span>
        </h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
          Nearby Discovery
        </p>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon size={20} color={isActive ? cat.color : 'currentColor'} />
              <span style={{ fontWeight: isActive ? 600 : 400 }}>{cat.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <WeatherWidget location={userLocation} address={userAddress} />
        
        <button 
          onClick={onOptimizeRoute}
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
          <Navigation size={18} />
          Optimize Route
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
