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
      // Build dynamic schedule based on days and available POIs
      const touristPois = pois.filter(p => p.category === 'tourist');
      const foodPois = pois.filter(p => p.category === 'restaurant');
      const hotelPois = pois.filter(p => p.category === 'hotel');

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
    }, 600);
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
      background: 'rgba(6, 8, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', color: '#06080c' }}>
              <Calendar size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'white' }}>
                AI Day-by-Day Itinerary Planner
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Tailored Travel Schedule & Budget Generator
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Input Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'rgba(6, 8, 12, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          
          {/* Days Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Duration</label>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>{days} Days</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={days} 
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          {/* Budget Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Budget</label>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>₹{budget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="30000" 
              step="1000"
              value={budget} 
              onChange={(e) => setBudget(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

        </div>

        {/* Travel Vibe Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Choose Travel Vibe
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {vibes.map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                style={{
                  background: vibe === v ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                  color: vibe === v ? '#06080c' : 'var(--text-secondary)',
                  border: vibe === v ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          <Sparkles size={16} /> {isGenerating ? 'Synthesizing Itinerary...' : 'Generate Optimized Itinerary'}
        </button>

        {/* Output Itinerary Schedule (Printable Area) */}
        {itinerary && (
          <div id="printable-itinerary" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>
                ✨ {days}-Day Customized Plan ({vibe})
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handlePlot} className="btn btn-secondary btn-sm">
                  <Compass size={14} /> Plot Waypoints on Map
                </button>
                <button onClick={handlePrint} className="btn btn-primary btn-sm">
                  <Printer size={14} /> Export PDF Pass
                </button>
              </div>
            </div>

            {itinerary.map((dayPlan) => (
              <div key={dayPlan.day} className="glass" style={{ padding: '16px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', margin: 0 }}>
                    {dayPlan.title}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    Est. Daily Budget: ₹{dayPlan.dailyEstimate}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {dayPlan.stops.map((stop, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.78rem' }}>
                      <div style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '6px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {stop.time}
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: 'white', display: 'block' }}>{stop.title}</strong>
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
