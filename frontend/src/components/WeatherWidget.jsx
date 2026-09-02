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
  AlertTriangle 
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
    if (cond.includes('rain') || cond.includes('drizzle')) return <CloudRain size={22} color="#00e5ff" />;
    if (cond.includes('cloud')) return <Cloud size={22} color="#94a3b8" />;
    return <Sun size={22} color="#f59e0b" />;
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
    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* Primary Weather Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: 0 }}>{weather.temp}°C</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Feels like {weather.feelsLike}°C
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginTop: '4px' }}>
            <MapPin size={12} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ 
              fontSize: '0.68rem', 
              color: 'var(--text-muted)', 
              lineHeight: '1.2', 
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {getIcon(weather.condition)}
          <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 700 }}>{weather.condition}</span>
        </div>
      </div>

      {/* Tourism Advisory Box (Idea 5) */}
      <div style={{ 
        background: 'rgba(0, 229, 255, 0.06)', 
        border: '1px solid rgba(0, 229, 255, 0.2)', 
        borderRadius: '10px', 
        padding: '8px 10px', 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '6px' 
      }}>
        <Sparkles size={14} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <p style={{ fontSize: '0.68rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
          {weather.advisory}
        </p>
      </div>

      {/* Atmospheric Micro Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <Wind size={11} />
          <span>{weather.wind} km/h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <Thermometer size={11} />
          <span>{weather.humidity}% Hum.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <Compass size={11} />
          <span>UV {weather.uvIndex}</span>
        </div>
      </div>

      {/* 3-Day Forecast Toggle */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px' }}>
          <button 
            onClick={() => setShowForecast(!showForecast)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              fontSize: '0.68rem', 
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
            {showForecast ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {showForecast && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '8px' }}>
              {weather.forecast.map((day, i) => (
                <div key={i} style={{ 
                  background: 'rgba(6, 8, 12, 0.6)', 
                  border: '1px solid rgba(255,255,255,0.06)', 
                  borderRadius: '8px', 
                  padding: '6px 4px', 
                  textAlign: 'center' 
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', display: 'block' }}>{day.date}</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--primary)', fontWeight: 700 }}>{day.maxTemp}° / {day.minTemp}°</span>
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
