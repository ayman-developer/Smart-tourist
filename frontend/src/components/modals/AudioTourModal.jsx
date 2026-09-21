import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  X
} from 'lucide-react';

const AudioTourModal = ({ isOpen, onClose, poi }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [speechRate, setSpeechRate] = useState(1.0);

  const languages = [
    { code: 'en-US', label: 'English (Global)' },
    { code: 'ta-IN', label: 'Tamil (தமிழ்)' },
    { code: 'hi-IN', label: 'Hindi (हिन्दी)' },
    { code: 'fr-FR', label: 'French (Français)' },
    { code: 'es-ES', label: 'Spanish (Español)' },
    { code: 'de-DE', label: 'German (Deutsch)' }
  ];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen || !poi) return null;

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(poi.audioStory || `Welcome to ${poi.name}. Enjoy your tour.`);
    utterance.lang = selectedLang;
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(8, 12, 20, 0.88)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '28px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--primary-gradient)', padding: '8px', borderRadius: '12px', color: 'white' }}>
              <Volume2 size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'white' }}>
                AI Voice Tour Guide
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#A78BFA', fontWeight: 700 }}>
                Multilingual Audio Storytelling
              </span>
            </div>
          </div>
          <button onClick={() => { handleStop(); onClose(); }} className="icon-btn" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Spot Thumbnail & Details */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <img src={poi.image} alt={poi.name} style={{ width: '68px', height: '68px', borderRadius: '12px', objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', margin: '0 0 4px 0' }}>{poi.name}</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{poi.address}</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '0.72rem', color: '#A78BFA' }}>
              <span style={{ color: '#F59E0B', fontWeight: 800 }}>★ {poi.rating}</span>
              <span>•</span>
              <span style={{ color: '#34D399', fontWeight: 700 }}>{poi.crowdStatus}</span>
            </div>
          </div>
        </div>

        {/* Wave Visualizer */}
        <div style={{
          height: '56px',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '14px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '0 20px'
        }}>
          {[30, 60, 45, 80, 25, 90, 50, 70, 35, 85, 40, 65, 30, 55, 75, 45].map((height, i) => (
            <div 
              key={i} 
              style={{
                width: '4px',
                height: isPlaying ? `${Math.max(12, (height * (Math.sin(Date.now() / 180 + i) + 1.2)) % 45)}px` : '5px',
                background: isPlaying ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                transition: 'height 0.15s ease'
              }}
            />
          ))}
        </div>

        {/* Language & Speed Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Narration Language
            </label>
            <select 
              value={selectedLang} 
              onChange={(e) => { handleStop(); setSelectedLang(e.target.value); }}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '9px 12px',
                color: 'white',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            >
              {languages.map(l => <option key={l.code} value={l.code} style={{ background: '#0F172A' }}>{l.label}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Speed
            </label>
            <select 
              value={speechRate} 
              onChange={(e) => { handleStop(); setSpeechRate(parseFloat(e.target.value)); }}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '9px 12px',
                color: 'white',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            >
              <option value="0.8" style={{ background: '#0F172A' }}>0.8x Slow</option>
              <option value="1.0" style={{ background: '#0F172A' }}>1.0x Normal</option>
              <option value="1.2" style={{ background: '#0F172A' }}>1.2x Fast</option>
            </select>
          </div>
        </div>

        {/* Story Text Box */}
        <div className="glass" style={{ padding: '14px 18px', maxHeight: '110px', overflowY: 'auto', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {poi.audioStory}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {!isPlaying ? (
            <button onClick={handlePlay} className="btn btn-primary" style={{ flex: 1 }}>
              <Play size={16} /> {isPaused ? 'Resume Guide' : 'Play Audio Tour'}
            </button>
          ) : (
            <button onClick={handlePause} className="btn btn-secondary" style={{ flex: 1, borderColor: '#8B5CF6', color: '#A78BFA' }}>
              <Pause size={16} /> Pause
            </button>
          )}

          <button onClick={handleStop} className="btn btn-secondary" style={{ padding: '0 20px' }} title="Stop Audio">
            <Square size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AudioTourModal;
