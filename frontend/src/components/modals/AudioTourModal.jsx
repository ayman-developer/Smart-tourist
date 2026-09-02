import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Languages, 
  X, 
  Sparkles,
  Compass,
  Radio
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

  // Stop speech when modal closes
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
      background: 'rgba(6, 8, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '520px',
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
              <Volume2 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'white' }}>
                AI Voice Tour Guide
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Multilingual Landmark Narration
              </span>
            </div>
          </div>
          <button onClick={() => { handleStop(); onClose(); }} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Spot Thumbnail & Details */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'rgba(6, 8, 12, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <img src={poi.image} alt={poi.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white', margin: '0 0 3px 0' }}>{poi.name}</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{poi.address}</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '0.68rem', color: 'var(--accent-cyan)' }}>
              <span>★ {poi.rating}</span>
              <span>•</span>
              <span>{poi.crowdStatus}</span>
            </div>
          </div>
        </div>

        {/* Audio Wave Visualizer Simulation */}
        <div style={{
          height: '60px',
          background: 'rgba(6, 8, 12, 0.8)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '0 20px'
        }}>
          {[30, 60, 45, 80, 25, 90, 50, 70, 35, 85, 40, 65, 30, 55, 75, 45].map((height, i) => (
            <div 
              key={i} 
              style={{
                width: '4px',
                height: isPlaying ? `${Math.max(15, (height * (Math.sin(Date.now() / 200 + i) + 1.2)) % 50)}px` : '6px',
                background: isPlaying ? 'var(--primary)' : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                transition: 'height 0.15s ease',
                boxShadow: isPlaying ? '0 0 8px var(--accent-cyan)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Language & Speed Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Guide Language
            </label>
            <select 
              value={selectedLang} 
              onChange={(e) => { handleStop(); setSelectedLang(e.target.value); }}
              style={{
                width: '100%',
                background: 'rgba(6, 8, 12, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            >
              {languages.map(l => <option key={l.code} value={l.code} style={{ background: '#06080c' }}>{l.label}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Speed
            </label>
            <select 
              value={speechRate} 
              onChange={(e) => { handleStop(); setSpeechRate(parseFloat(e.target.value)); }}
              style={{
                width: '100%',
                background: 'rgba(6, 8, 12, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            >
              <option value="0.8" style={{ background: '#06080c' }}>0.8x Slow</option>
              <option value="1.0" style={{ background: '#06080c' }}>1.0x Normal</option>
              <option value="1.2" style={{ background: '#06080c' }}>1.2x Fast</option>
            </select>
          </div>
        </div>

        {/* Story Text Excerpt */}
        <div className="glass" style={{ padding: '12px 16px', maxHeight: '100px', overflowY: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {poi.audioStory}
        </div>

        {/* Audio Control Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {!isPlaying ? (
            <button onClick={handlePlay} className="btn btn-primary" style={{ flex: 1 }}>
              <Play size={16} /> {isPaused ? 'Resume Guide' : 'Play Audio Tour'}
            </button>
          ) : (
            <button onClick={handlePause} className="btn btn-secondary" style={{ flex: 1, borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              <Pause size={16} /> Pause
            </button>
          )}

          <button onClick={handleStop} className="btn btn-secondary" style={{ padding: '0 18px' }} title="Stop Audio">
            <Square size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AudioTourModal;
