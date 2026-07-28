import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin } from 'lucide-react';
import { getCurrentWeather } from '../utils/api';

const WeatherWidget = ({ location, address }) => {
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem('cachedWeather');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(!weather);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        // Only show loading if we don't have cached data
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
    switch (condition) {
      case 'Sunny': return <Sun size={20} color="#f59e0b" />;
      case 'Cloudy': return <Cloud size={20} color="#94a3b8" />;
      case 'Rainy': return <CloudRain size={20} color="#3b82f6" />;
      default: return <Sun size={20} color="#f59e0b" />;
    }
  };

  if (loading || !weather) {
    return (
      <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{weather.temp}°C</h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginTop: '4px' }}>
            <MapPin size={12} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.2', fontWeight: 500 }}>
              {address || 'Detecting address...'}
            </p>
          </div>
        </div>
        {getIcon(weather.condition)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Wind size={12} />
          <span>{weather.wind} km/h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Thermometer size={12} />
          <span>{weather.humidity}% Hum.</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
