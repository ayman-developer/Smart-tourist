import React from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Share2, 
  MapPin, 
  X, 
  HeartPulse, 
  Navigation
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
    { title: 'National Helpline', num: '112', desc: 'All-in-one Emergency Rescue', color: '#F43F5E' },
    { title: 'Ambulance', num: '108', desc: '24/7 Medical Transit & Trauma', color: '#0EA5E9' },
    { title: 'Police Patrol', num: '100', desc: 'Immediate Response Unit', color: '#8B5CF6' },
    { title: 'Women Safety', num: '1091', desc: 'Tourist & Women Protection', color: '#EC4899' }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(8, 12, 20, 0.92)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid rgba(244, 63, 94, 0.4)',
        boxShadow: '0 0 50px rgba(244, 63, 94, 0.25)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)', 
              padding: '9px', 
              borderRadius: '12px', 
              color: 'white',
              boxShadow: '0 0 20px rgba(244, 63, 94, 0.6)'
            }}>
              <ShieldAlert size={24} className="animate-pulse" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'white' }}>
                Tourist Emergency Guard & SOS
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#FB7185', fontWeight: 700 }}>
                1-Tap Immediate Police, Trauma & Medical Safe Haven
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Current GPS Snapshot */}
        <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FB7185', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your Detected Coordinates
            </span>
            <p style={{ fontSize: '0.88rem', color: 'white', fontWeight: 700, margin: '2px 0 0 0' }}>
              {displayAddress}
            </p>
          </div>
          <button 
            onClick={shareLocationWhatsApp}
            style={{
              background: '#25D366',
              color: '#06080C',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '0.82rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
            }}
          >
            <Share2 size={16} /> WhatsApp Live GPS
          </button>
        </div>

        {/* 1-Tap Emergency Helplines */}
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            Instant Direct Helplines
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {emergencyContacts.map((c) => (
              <a
                key={c.num}
                href={`tel:${c.num}`}
                className="glass"
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: c.color }}>{c.num}</span>
                <strong style={{ fontSize: '0.78rem', color: 'white' }}>{c.title}</strong>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{c.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Closest Safe Havens */}
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            Nearby Medical & Police Safe Havens
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {emergencyPois.slice(0, 4).map((poi) => (
              <div key={poi.id} className="glass" style={{ padding: '14px 18px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={poi.image} alt={poi.name} style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: 'white' }}>{poi.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{poi.address} • {poi.distance} km away</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (onNavigateToPoi) onNavigateToPoi(poi);
                    onClose();
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Navigation size={13} /> Navigate
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencySosModal;
