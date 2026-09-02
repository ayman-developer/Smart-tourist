import React from 'react';
import { Globe, X, ExternalLink, Camera, Eye } from 'lucide-react';

const VirtualPreviewModal = ({ isOpen, onClose, poi }) => {
  if (!isOpen || !poi) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(6, 8, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        padding: '28px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', color: '#06080c' }}>
              <Globe size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'white' }}>
                360° Virtual Preview
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Immersive Street View & Panoramic Sights
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* 360 Image Simulation Frame */}
        <div style={{
          height: '280px',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          background: `url("${poi.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '20px'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6, 8, 12, 0.85) 0%, transparent 70%)' }}></div>
          
          {/* Badge */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(6, 8, 12, 0.75)', border: '1px solid var(--accent-cyan)', borderRadius: '20px', padding: '4px 12px', fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={12} /> 360° Panoramic Mode
          </div>

          <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', margin: 0 }}>{poi.name}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{poi.address}</span>
            </div>
            <a 
              href={poi.streetViewUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={13} /> Full Google 360°
            </a>
          </div>
        </div>

        {/* Best Spot Tip */}
        <div className="glass" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem' }}>
          <Camera size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            <strong>Photography Recommendation:</strong> Best natural lighting and viewpoint capture occurs during <strong style={{ color: 'white' }}>{poi.bestTimeSlot}</strong>.
          </span>
        </div>

      </div>
    </div>
  );
};

export default VirtualPreviewModal;
