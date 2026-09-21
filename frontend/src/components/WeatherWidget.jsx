import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Compass,
  SunMedium
} from 'lucide-react';
import { getCurrentWeather } from '../utils/api';

const WeatherWidget = ({ location, address }) => {
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem('cachedWeather');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(!weather);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        if (!weather) setLoading(true);
        const data = await getCurrentWeather(location.lat, location.lng);
        setWeather(data);
        localStorage.setItem('cachedWeather', JSON.stringify(data));
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  const getIcon = (condition) => {
    const cond = (condition || '').toLowerCase();
    if (cond.includes('rain') || cond.includes('drizzle')) return <CloudRain size={26} color="#38BDF8" />;
    if (cond.includes('cloud')) return <Cloud size={26} color="#CBD5E1" />;
    return <Sun size={26} color="#F59E0B" className="animate-spin-slow" />;
  };

  if (loading || !weather) {
    return (
      <div className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Detecting atmospheric data...</p>
      </div>
    );
  }

  const displayAddress = typeof address === 'object' && address !== null
    ? (address.short || address.full || 'Detecting address...')
    : (address || 'Detecting address...');

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '18px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      
      {/* Primary Weather Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
              {weather.temp}°C
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Feels like {weather.feelsLike}°C
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginTop: '4px' }}>
            <MapPin size={13} color="#8B5CF6" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ 
              fontSize: '0.72rem', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.3', 
              fontWeight: 600,
              maxHeight: '2.4em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              margin: 0
            }}>
              {displayAddress}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          {getIcon(weather.condition)}
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>{weather.condition}</span>
        </div>
      </div>

      {/* Tourism Advisory Box */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)', 
        border: '1px solid rgba(99, 102, 241, 0.25)', 
        borderRadius: '12px', 
        padding: '9px 12px', 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '8px' 
      }}>
        <Sparkles size={15} color="#A78BFA" style={{ marginTop: '2px', flexShrink: 0 }} />
        <p style={{ fontSize: '0.72rem', color: 'white', margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
          {weather.advisory}
        </p>
      </div>

      {/* Atmospheric Micro Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Wind size={12} color="#38BDF8" />
          <span>{weather.wind} km/h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Thermometer size={12} color="#F43F5E" />
          <span>{weather.humidity}% Hum.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Compass size={12} color="#F59E0B" />
          <span>UV {weather.uvIndex}</span>
        </div>
      </div>

      {/* 3-Day Forecast Expander */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
          <button 
            onClick={() => setShowForecast(!showForecast)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#A78BFA', 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              width: '100%', 
              cursor: 'pointer',
              padding: '2px 0'
            }}
          >
            <span>3-Day Tourism Outlook</span>
            {showForecast ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showForecast && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '8px' }}>
              {weather.forecast.map((day, i) => (
                <div key={i} style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '10px', 
                  padding: '7px 4px', 
                  textAlign: 'center' 
                }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'white', display: 'block' }}>{day.date}</span>
                  <span style={{ fontSize: '0.65rem', color: '#8B5CF6', fontWeight: 800 }}>{day.maxTemp}° / {day.minTemp}°</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default WeatherWidget;
