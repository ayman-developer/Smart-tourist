import React, { useState, useEffect } from 'react';
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
  ShoppingBag,
  Laptop,
  Briefcase,
  Trees,
  ShieldCheck,
  Building2,
  Pill,
  Search,
  ChevronRight,
  Sun
} from 'lucide-react';
import WeatherWidget from './WeatherWidget';

// 3 Core Tourist Trip Modes
const tripModes = [
  { id: 'leisure', label: '🌴 Leisure', desc: 'Vacation, Sights & Culture', color: '#8B5CF6' },
  { id: 'business', label: '💼 Business', desc: 'Work, Cafes & Transit', color: '#0EA5E9' },
  { id: 'emergency', label: '🚨 Safe Haven', desc: '24/7 Medical, Police & Auto', color: '#F43F5E' }
];

// Mode-Specific Category Definitions
const modeCategories = {
  leisure: [
    { id: 'tourist', label: 'Attractions', icon: MapPin, color: '#8B5CF6' },
    { id: 'nature', label: 'Nature & Views', icon: Trees, color: '#10B981' },
    { id: 'restaurant', label: 'Dining & Cafes', icon: Utensils, color: '#F43F5E' },
    { id: 'shopping', label: 'Shopping & Silk', icon: ShoppingBag, color: '#EC4899' },
    { id: 'hotel', label: 'Resorts & Stays', icon: Hotel, color: '#F59E0B' }
  ],
  business: [
    { id: 'coworking', label: 'Cowork & Cafes', icon: Laptop, color: '#0EA5E9' },
    { id: 'business_hotel', label: 'Business Hotels', icon: Building2, color: '#F59E0B' },
    { id: 'transit', label: 'Air & Rail Transit', icon: Train, color: '#8B5CF6' },
    { id: 'atm', label: 'Cash & Forex', icon: DollarSign, color: '#14B8A6' }
  ],
  emergency: [
    { id: 'hospital', label: '24/7 Hospitals', icon: HeartPulse, color: '#10B981' },
    { id: 'pharmacy', label: 'Pharmacies', icon: Pill, color: '#06B6D4' },
    { id: 'police', label: 'Police Stations', icon: ShieldCheck, color: '#8B5CF6' },
    { id: 'petrol', label: 'Fuel & EV Fast', icon: Fuel, color: '#0EA5E9' },
    { id: 'mechanic', label: 'Auto Mechanics', icon: Wrench, color: '#F97316' }
  ]
};

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
  const [currentMode, setCurrentMode] = useState('leisure');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('All');

  const availableCategories = modeCategories[currentMode] || modeCategories.leisure;

  // Handle Mode Change
  const handleModeChange = (modeId) => {
    setCurrentMode(modeId);
    const newCategories = modeCategories[modeId];
    if (newCategories && newCategories.length > 0) {
      setActiveCategory(newCategories[0].id);
    }
    setSearchQuery('');
    onPoiSelect(null);
  };

  const filteredPois = pois.filter(poi => {
    const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (poi.address && poi.address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'restaurant' && dietFilter !== 'All') {
      return matchesSearch && (poi.dietType === dietFilter);
    }
    return matchesSearch;
  });

  const activeCategoryMeta = availableCategories.find(c => c.id === activeCategory) || availableCategories[0] || { color: '#8B5CF6', label: 'Places' };

  return (
    <div className="glass-panel" style={{
      width: '410px',
      height: 'calc(100vh - 40px)',
      margin: '20px 10px 20px 20px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      border: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      
      {/* Brand Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'var(--primary-gradient)',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.45)'
          }}>
            <Compass size={20} color="white" />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 900, 
              color: 'white',
              margin: 0,
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              Tourist<span style={{ 
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>AI</span>
            </h1>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontWeight: 700 }}>
              Autonomous Travel Concierge
            </p>
          </div>
        </div>

        {/* Quick SOS Trigger */}
        <button 
          onClick={onOpenSos}
          style={{
            background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.74rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(244, 63, 94, 0.55)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Emergency Safe Haven & SOS"
        >
          <ShieldAlert size={14} className="animate-pulse" /> SOS Guard
        </button>
      </div>

      {/* 🧭 3-MODE TRIP PERSONA SWITCHER */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '14px',
        padding: '4px',
        border: '1px solid var(--border-color)',
        gap: '4px'
      }}>
        {tripModes.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              style={{
                background: isActive ? 'var(--primary-gradient)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '10px',
                padding: '7px 4px',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* Top Action Pills (AI Itinerary & Currency/Budget) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button 
          onClick={onOpenItinerary}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            padding: '8px 10px',
            color: 'white',
            fontSize: '0.74rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'}
        >
          <Calendar size={14} color="#8B5CF6" /> AI Itinerary Planner
        </button>

        <button 
          onClick={onOpenExpense}
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '8px 10px',
            color: 'white',
            fontSize: '0.74rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F59E0B'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)'}
        >
          <DollarSign size={14} color="#F59E0B" /> Currency & Budget
        </button>
      </div>

      {/* Modern Gradient Weather Widget */}
      <WeatherWidget location={userLocation} address={userAddress} />

      {/* Dynamic Category Slider based on Selected Mode */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', fontWeight: 800 }}>
            {tripModes.find(m => m.id === currentMode)?.desc}
          </span>
          <span style={{ fontSize: '0.68rem', color: activeCategoryMeta.color, fontWeight: 700 }}>
            {filteredPois.length} spots
          </span>
        </div>

        <div className="category-slider">
          {availableCategories.map((cat) => {
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
                  background: isActive 
                    ? `linear-gradient(135deg, ${cat.color} 0%, rgba(15, 23, 42, 0.85) 120%)` 
                    : 'rgba(30, 41, 59, 0.5)',
                  border: isActive ? `1px solid ${cat.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '7px 13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? `0 4px 15px ${cat.color}40` : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <Icon size={14} color={isActive ? 'white' : cat.color} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Sub-filter for Dining */}
      {activeCategory === 'restaurant' && (
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          {['All', 'Pure Veg', 'Non-Veg', 'Cafe'].map((diet) => (
            <button
              key={diet}
              onClick={() => setDietFilter(diet)}
              style={{
                background: dietFilter === diet ? 'linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)' : 'rgba(255,255,255,0.04)',
                color: dietFilter === diet ? 'white' : 'var(--text-muted)',
                border: dietFilter === diet ? 'none' : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '4px 10px',
                fontSize: '0.7rem',
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
          placeholder={`Search ${activeCategoryMeta.label.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '9px 14px',
            color: 'white',
            fontSize: '0.82rem',
            outline: 'none',
            transition: 'all 0.3s'
          }}
        />
      </div>

      {/* Rich POI Discovery Cards */}
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
            No spots found in this radius.
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
                  border: isActive ? `1px solid ${activeCategoryMeta.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                  background: isActive ? 'rgba(30, 41, 59, 0.85)' : 'rgba(15, 23, 42, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  borderRadius: '16px',
                  boxShadow: isActive ? `0 8px 25px ${activeCategoryMeta.color}30` : '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img 
                    src={poi.image} 
                    alt={poi.name} 
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '12px', 
                      objectFit: 'cover', 
                      flexShrink: 0,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }} 
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ 
                      fontSize: '0.88rem', 
                      fontWeight: 800, 
                      margin: '0 0 3px 0', 
                      textOverflow: 'ellipsis', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap',
                      color: isActive ? 'white' : '#F8FAFC'
                    }}>
                      {poi.name}
                    </h4>

                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                      {poi.address}
                    </span>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span style={{ color: '#F59E0B', fontWeight: 800 }}>★ {poi.rating}</span>
                      <span>•</span>
                      <span>{poi.distance} km</span>
                      <span>•</span>
                      <span style={{ 
                        color: (poi.crowdStatus || '').includes('Low') ? '#34D399' : ((poi.crowdStatus || '').includes('Mod') ? '#FBBF24' : '#FB7185'),
                        fontWeight: 700 
                      }}>
                        {poi.crowdStatus || 'Moderate Crowd'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature Dish Badge */}
                {poi.signatureDish && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 146, 60, 0.08) 100%)', 
                    border: '1px solid rgba(244, 63, 94, 0.25)', 
                    borderRadius: '8px', 
                    padding: '5px 10px', 
                    fontSize: '0.72rem', 
                    color: '#FDA4AF', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>🍲 Highlight: <strong style={{ color: 'white' }}>{poi.signatureDish}</strong></span>
                    <span style={{ fontWeight: 800, color: '#FBBF24' }}>{poi.dishPrice}</span>
                  </div>
                )}

                {/* Card Quick Action Bar */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onOpenAudio(poi)}
                    style={{
                      flex: 1,
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#C4B5FD',
                      padding: '5px 8px',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                    title="Play Multilingual Audio Story"
                  >
                    <Volume2 size={12} color="#8B5CF6" /> Audio Guide
                  </button>

                  <button 
                    onClick={() => onOpenVirtual(poi)}
                    style={{
                      flex: 1,
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      color: '#67E8F9',
                      padding: '5px 8px',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                    title="View 360° Sights"
                  >
                    <Globe size={12} color="#06B6D4" /> 360° Sights
                  </button>

                  <button 
                    onClick={() => onOpenNavDrawer(poi)}
                    style={{
                      background: 'var(--primary-gradient)',
                      border: 'none',
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
                    }}
                    title="Turn-by-turn Navigation"
                  >
                    <Navigation size={12} /> Go
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Optimize Route AI Bar */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.08)', 
        paddingTop: '12px' 
      }}>
        <button 
          onClick={onOptimizeRoute}
          disabled={pois.length === 0}
          className="btn-shimmer"
          style={{
            padding: '13px',
            borderRadius: '14px',
            fontSize: '0.85rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            opacity: pois.length === 0 ? 0.5 : 1
          }}
        >
          <Navigation size={16} />
          Optimize Route AI
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
