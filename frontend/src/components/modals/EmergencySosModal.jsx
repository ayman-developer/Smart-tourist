import React from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Share2, 
  MapPin, 
  X, 
  HeartPulse, 
  Navigation,
  Flame,
  AlertCircle
} from 'lucide-react';

const EmergencySosModal = ({ isOpen, onClose, userLocation, userAddress, emergencyPois = [], onNavigateToPoi }) => {
  if (!isOpen) return null;

  const displayAddress = typeof userAddress === 'object' && userAddress !== null
    ? (userAddress.full || userAddress.short || 'Coimbatore, TN')
    : (userAddress || 'Coimbatore, TN');

  const shareLocationWhatsApp = () => {
    if (!userLocation) return;
    const msg = encodeURIComponent(
      `🚨 EMERGENCY SOS ALERT!\nI need immediate assistance at this location:\n📍 Address: ${displayAddress}\n🗺️ GPS Coordinates: ${userLocation.lat}, ${userLocation.lng}\nGoogle Maps Link: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const emergencyContacts = [
    { title: 'National Emergency', num: '112', desc: 'All-in-one Emergency Support', color: '#ef4444' },
    { title: 'Ambulance & Medical', num: '108', desc: '24/7 Emergency Medical Transit', color: '#00e5ff' },
    { title: 'Police Control Room', num: '100', desc: 'Police Immediate Response', color: '#3b82f6' },
    { title: 'Women Helpline', num: '1091', desc: 'Tourist & Women Protection', color: '#ec4899' }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(6, 8, 12, 0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '650px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.25)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              background: '#ef4444', 
              padding: '8px', 
              borderRadius: '10px', 
              color: 'white',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
            }}>
              <ShieldAlert size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: 'white' }}>
                Tourist Emergency SOS
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700 }}>
                1-Tap Safe Haven & Immediate Police / Medical Assistance
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Current GPS Snapshot */}
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '14px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your Detected Coordinates
            </span>
            <p style={{ fontSize: '0.82rem', color: 'white', fontWeight: 700, margin: '2px 0 0 0' }}>
              {displayAddress}
            </p>
          </div>
          <button 
            onClick={shareLocationWhatsApp}
            style={{
              background: '#25D366',
              color: '#06080c',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)'
            }}
          >
            <Share2 size={14} /> WhatsApp Live GPS
          </button>
        </div>

        {/* 1-Tap Emergency Dials Grid */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            Direct Emergency Helplines
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {emergencyContacts.map((c) => (
              <a
                key={c.num}
                href={`tel:${c.num}`}
                className="glass"
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: c.color }}>{c.num}</span>
                <strong style={{ fontSize: '0.75rem', color: 'white' }}>{c.title}</strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{c.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Closest Safe Havens (Hospitals & Police Stations) */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            Nearby Medical & Safe Haven Outposts
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {emergencyPois.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Scanning for nearest emergency centers...
              </div>
            ) : (
              emergencyPois.slice(0, 4).map((poi) => (
                <div key={poi.id} className="glass" style={{ padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>{poi.name}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{poi.address} • {poi.distance} km away</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (onNavigateToPoi) onNavigateToPoi(poi);
                      onClose();
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Navigation size={12} /> Navigate
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencySosModal;
