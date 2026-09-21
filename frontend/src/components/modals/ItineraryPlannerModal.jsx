import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  Clock, 
  Sparkles, 
  Download, 
  X, 
  CheckCircle2, 
  Compass, 
  Printer,
  ShieldAlert
} from 'lucide-react';

const ItineraryPlannerModal = ({ isOpen, onClose, pois = [], userLocation, onPlotItinerary }) => {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [vibe, setVibe] = useState('Heritage & Culture');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  if (!isOpen) return null;

  const vibes = [
    'Heritage & Culture',
    'Nature & Hilltops',
    'Foodie & Cafes',
    'Family & Leisure',
    'Adventure & Trekking'
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const touristPois = pois.filter(p => p.category === 'tourist');
      const foodPois = pois.filter(p => p.category === 'restaurant');

      const generatedDays = [];
      for (let d = 1; d <= days; d++) {
        const morningSpot = touristPois[(d * 2) % (touristPois.length || 1)] || { name: `Scenic Monument Point ${d}`, address: 'Heritage Road' };
        const lunchSpot = foodPois[(d) % (foodPois.length || 1)] || { name: `Authentic Annapoorna Delicacy ${d}`, address: 'Main Bazaar' };
        const eveningSpot = touristPois[(d * 2 + 1) % (touristPois.length || 1)] || { name: `Sunset Viewpoint ${d}`, address: 'Hilltop Circle' };

        generatedDays.push({
          day: d,
          title: `Day ${d}: ${d === 1 ? 'City Heritage & Local Flavors' : (d === 2 ? 'Scenic Nature & Viewpoints' : 'Cultural Exploration')}`,
          stops: [
            { time: '09:00 AM - 11:30 AM', title: morningSpot.name, type: 'Morning Sightseeing', cost: '₹150 (Entry)', poi: morningSpot },
            { time: '12:30 PM - 02:00 PM', title: lunchSpot.name, type: 'Local Authentic Lunch', cost: '₹350 (Food)', poi: lunchSpot },
            { time: '04:00 PM - 06:30 PM', title: eveningSpot.name, type: 'Evening Sunset & Walk', cost: '₹50 (Parking/Entry)', poi: eveningSpot }
          ],
          dailyEstimate: Math.round(budget / days)
        });
      }

      setItinerary(generatedDays);
      setIsGenerating(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePlot = () => {
    if (itinerary && onPlotItinerary) {
      const allStops = [];
      itinerary.forEach(d => {
        d.stops.forEach(s => {
          if (s.poi && s.poi.lat && s.poi.lng) allStops.push(s.poi);
        });
      });
      onPlotItinerary(allStops);
      onClose();
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
        maxWidth: '760px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              background: 'var(--primary-gradient)', 
              padding: '8px', 
              borderRadius: '12px', 
              color: 'white',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}>
              <Calendar size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: 'white' }}>
                AI Day-by-Day Itinerary Planner
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#A78BFA', fontWeight: 700 }}>
                Smart Travel Schedule & Budget Generator
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Sliders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Duration</label>
              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#8B5CF6' }}>{days} Days</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={days} 
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#8B5CF6' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Budget</label>
              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#F59E0B' }}>₹{budget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="30000" 
              step="1000"
              value={budget} 
              onChange={(e) => setBudget(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#F59E0B' }}
            />
          </div>

        </div>

        {/* Travel Vibe Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Choose Travel Vibe
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {vibes.map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                style={{
                  background: vibe === v ? 'var(--primary-gradient)' : 'rgba(30, 41, 59, 0.6)',
                  color: 'white',
                  border: vibe === v ? 'none' : '1px solid var(--border-color)',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: vibe === v ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
                  transition: 'all 0.25s'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-shimmer"
          style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '0.9rem' }}
        >
          <Sparkles size={16} /> {isGenerating ? 'Synthesizing Plan...' : 'Generate Itinerary Plan'}
        </button>

        {/* Itinerary Output Schedule */}
        {itinerary && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>
                ✨ {days}-Day Schedule ({vibe})
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handlePlot} className="btn btn-secondary btn-sm">
                  <Compass size={14} color="#8B5CF6" /> Plot on Map
                </button>
                <button onClick={handlePrint} className="btn btn-primary btn-sm">
                  <Printer size={14} /> Export PDF
                </button>
              </div>
            </div>

            {itinerary.map((dayPlan) => (
              <div key={dayPlan.day} className="glass" style={{ padding: '18px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'white', margin: 0 }}>
                    {dayPlan.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 800 }}>
                    Est. Daily Budget: ₹{dayPlan.dailyEstimate}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dayPlan.stops.map((stop, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.82rem' }}>
                      <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#A78BFA', padding: '5px 10px', borderRadius: '8px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {stop.time}
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: 'white', display: 'block', fontSize: '0.88rem' }}>{stop.title}</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{stop.type} • {stop.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ItineraryPlannerModal;
