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
  Train,
  Calendar,
  ShieldAlert,
  Volume2,
  Globe,
  Sparkles,
  Eye,
  Filter
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
  onPoiHover,
  onOpenItinerary,
  onOpenSos,
  onOpenExpense,
  onOpenAudio,
  onOpenVirtual,
  onOpenNavDrawer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('All'); // 'All', 'Pure Veg', 'Non-Veg', 'Cafe'

  // Filter POIs based on search query and dietary filter
  const filteredPois = pois.filter(poi => {
    const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (poi.address && poi.address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'restaurant' && dietFilter !== 'All') {
      return matchesSearch && (poi.dietType === dietFilter);
    }
    return matchesSearch;
  });

  return (
    <div className="glass-panel" style={{
      width: '380px',
      height: 'calc(100vh - 40px)',
      margin: '20px 10px 20px 20px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10
    }}>
      
      {/* Brand Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'var(--primary)',
            padding: '7px',
            borderRadius: '10px',
            display: 'flex',
            boxShadow: '0 4px 15px rgba(0, 229, 255, 0.4)'
          }}>
            <Compass size={18} color="#06080c" />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.15rem', 
              fontWeight: 900, 
              letterSpacing: '0.04em', 
              color: 'white',
              margin: 0
            }}>
              Tourist<span style={{ color: 'var(--primary)' }}>AI</span>
            </h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontWeight: 700 }}>
              AI Travel Concierge
            </p>
          </div>
        </div>

        {/* 1-Tap SOS Button (Idea 3) */}
        <button 
          onClick={onOpenSos}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
          }}
          title="Emergency Safe Haven & SOS"
        >
          <ShieldAlert size={13} className="animate-pulse" /> SOS
        </button>
      </div>

      {/* Feature Quick-Action Buttons (AI Itinerary & Currency/Expense) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button 
          onClick={onOpenItinerary}
          className="btn btn-secondary btn-sm"
          style={{ padding: '7px 10px', fontSize: '0.72rem', gap: '5px' }}
        >
          <Calendar size={13} color="var(--primary)" /> AI Itinerary
        </button>
        <button 
          onClick={onOpenExpense}
          className="btn btn-secondary btn-sm"
          style={{ padding: '7px 10px', fontSize: '0.72rem', gap: '5px' }}
        >
          <DollarSign size={13} color="var(--primary)" /> Currency & Exp.
        </button>
      </div>

      {/* Weather Widget (Enhanced) */}
      <WeatherWidget location={userLocation} address={userAddress} />

      {/* Categories Horizontal Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 800 }}>
          Service Clusters
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
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isActive ? '#06080c' : 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 12px rgba(0, 229, 255, 0.35)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Icon size={12} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Sub-filter for Restaurants (Idea 6) */}
      {activeCategory === 'restaurant' && (
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['All', 'Pure Veg', 'Non-Veg', 'Cafe'].map((diet) => (
            <button
              key={diet}
              onClick={() => setDietFilter(diet)}
              style={{
                background: dietFilter === diet ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                color: dietFilter === diet ? 'var(--primary)' : 'var(--text-muted)',
                border: dietFilter === diet ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '3px 8px',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {diet}
            </button>
          ))}
        </div>
      )}

      {/* Search Filter Input */}
      <div style={{ position: 'relative' }}>
        <input 
          type="text"
          placeholder={`Search ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(6, 8, 12, 0.6)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '9px 14px',
            color: 'white',
            fontSize: '0.78rem',
            outline: 'none',
            transition: 'all 0.3s'
          }}
        />
      </div>

      {/* Places List (With Crowd Badges, Food Specials, Audio Stories & 360 preview) */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        paddingRight: '2px' 
      }}>
        {filteredPois.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
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
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderLeft: isActive ? '3px solid var(--primary)' : '1px solid var(--glass-border)',
                  background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(13, 17, 26, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderRadius: '12px',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img 
                    src={poi.image} 
                    alt={poi.name} 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '8px', 
                      objectFit: 'cover', 
                      flexShrink: 0 
                    }} 
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 800, 
                        margin: '0 0 2px 0', 
                        textOverflow: 'ellipsis', 
                        overflow: 'hidden', 
                        whiteSpace: 'nowrap',
                        color: isActive ? 'var(--primary)' : '#f8fafc'
                      }}>
                        {poi.name}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <span style={{ color: 'var(--primary)' }}>★ {poi.rating}</span>
                      <span>•</span>
                      <span>{poi.distance} km</span>
                      <span>•</span>
                      {/* Live Crowd Density Indicator (Idea 8) */}
                      <span style={{ 
                        color: (poi.crowdStatus || '').includes('Low') ? '#4ade80' : ((poi.crowdStatus || '').includes('Mod') ? '#facc15' : '#f87171'),
                        fontWeight: 700 
                      }}>
                        {poi.crowdStatus || 'Moderate Crowd'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature Dish Badge for Restaurants (Idea 6) */}
                {poi.signatureDish && (
                  <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.15)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.65rem', color: 'var(--accent-cyan)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>🍲 Must Try: <strong>{poi.signatureDish}</strong></span>
                    <span style={{ fontWeight: 800 }}>{poi.dishPrice}</span>
                  </div>
                )}

                {/* Card Quick Action Bar (Audio Guide, 360 View, Turn Directions) */}
                <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px' }} onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onOpenAudio(poi)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, padding: '4px 6px', fontSize: '0.65rem', gap: '4px' }}
                    title="Play Multilingual Audio Story"
                  >
                    <Volume2 size={11} color="var(--primary)" /> Audio Guide
                  </button>

                  <button 
                    onClick={() => onOpenVirtual(poi)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, padding: '4px 6px', fontSize: '0.65rem', gap: '4px' }}
                    title="View 360° Street View & Photos"
                  >
                    <Globe size={11} color="var(--primary)" /> 360° View
                  </button>

                  <button 
                    onClick={() => onOpenNavDrawer(poi)}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.65rem' }}
                    title="Turn-by-turn Navigation"
                  >
                    <Navigation size={11} />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Optimize Route action block */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.06)', 
        paddingTop: '10px' 
      }}>
        <button 
          onClick={onOptimizeRoute}
          disabled={pois.length === 0}
          style={{
            background: 'var(--primary)',
            color: '#06080c',
            border: 'none',
            padding: '11px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 5px 20px rgba(0, 229, 255, 0.4)',
            transition: 'all 0.25s',
            opacity: pois.length === 0 ? 0.5 : 1
          }}
        >
          <Navigation size={14} />
          Optimize Route AI
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
