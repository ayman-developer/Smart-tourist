import React from 'react';
import { Globe, X, ExternalLink, Camera, Eye } from 'lucide-react';

const VirtualPreviewModal = ({ isOpen, onClose, poi }) => {
  if (!isOpen || !poi) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(8, 12, 20, 0.9)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '700px',
        padding: '28px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--primary-gradient)', padding: '8px', borderRadius: '12px', color: 'white' }}>
              <Globe size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'white' }}>
                360° Virtual Sights Preview
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#A78BFA', fontWeight: 700 }}>
                Immersive Street View & Panoramic Viewpoints
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* 360 Image Simulation Frame */}
        <div style={{
          height: '300px',
          borderRadius: '18px',
          overflow: 'hidden',
          position: 'relative',
          background: `url("${poi.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '22px'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8, 12, 20, 0.9) 0%, rgba(8, 12, 20, 0.3) 60%, transparent 100%)' }}></div>
          
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(8, 12, 20, 0.8)', border: '1px solid #8B5CF6', borderRadius: '20px', padding: '5px 14px', fontSize: '0.74rem', color: '#C4B5FD', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={14} color="#8B5CF6" /> 360° Panoramic Mode
          </div>

          <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: 0 }}>{poi.name}</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{poi.address}</span>
            </div>
            <a 
              href={poi.streetViewUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> Full Google 360° Sights
            </a>
          </div>
        </div>

        {/* Tip Box */}
        <div className="glass" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem' }}>
          <Camera size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            <strong>Photography Recommendation:</strong> Best natural lighting and viewpoint capture occurs during <strong style={{ color: 'white' }}>{poi.bestTimeSlot}</strong>.
          </span>
        </div>

      </div>
    </div>
  );
};

export default VirtualPreviewModal;
