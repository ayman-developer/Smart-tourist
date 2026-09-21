import React, { useState } from 'react';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  X, 
  Fuel, 
  Zap, 
  Bike, 
  Car, 
  CornerUpLeft, 
  CornerUpRight, 
  ArrowUp 
} from 'lucide-react';

const RouteNavigationDrawer = ({ isOpen, onClose, routeData, targetPoi, userLocation }) => {
  const [vehicle, setVehicle] = useState('car');

  if (!isOpen || !targetPoi) return null;

  const distance = routeData?.distanceKm || targetPoi.distance || 0;
  const duration = routeData?.durationMins || Math.round(distance * 2.5);

  const calculateFuel = () => {
    const petrolRate = 102.5;
    const electricityRate = 9.0;
    
    if (vehicle === 'bike') {
      const liters = (distance / 40).toFixed(2);
      const cost = Math.round(liters * petrolRate);
      return { liters: `${liters} L`, cost: `₹${cost}`, mileage: '40 km/L (Avg Bike)' };
    } else if (vehicle === 'ev') {
      const units = (distance / 8).toFixed(2);
      const cost = Math.round(units * electricityRate);
      return { liters: `${units} kWh`, cost: `₹${cost}`, mileage: '8 km/kWh (EV Eco)' };
    } else {
      const liters = (distance / 14).toFixed(2);
      const cost = Math.round(liters * petrolRate);
      return { liters: `${liters} L`, cost: `₹${cost}`, mileage: '14 km/L (Standard Car)' };
    }
  };

  const fuelStats = calculateFuel();

  const getStepIcon = (instruction) => {
    const text = (instruction || '').toLowerCase();
    if (text.includes('left')) return <CornerUpLeft size={16} color="#8B5CF6" />;
    if (text.includes('right')) return <CornerUpRight size={16} color="#8B5CF6" />;
    return <ArrowUp size={16} color="#8B5CF6" />;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9990,
      width: '100%',
      maxWidth: '430px',
      maxHeight: '85vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary-gradient)', padding: '7px', borderRadius: '10px', color: 'white' }}>
              <Navigation size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, color: 'white' }}>
                Turn-by-Turn GPS Route
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#A78BFA', fontWeight: 700 }}>
                Live OSRM Road Pathfinding
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={15} />
          </button>
        </div>

        {/* Destination Box */}
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'white' }}>{targetPoi.name}</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{targetPoi.address}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#8B5CF6', display: 'block' }}>
              {duration} min
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
              {distance} km
            </span>
          </div>
        </div>

        {/* Vehicle & Fuel Estimator */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fuel Cost Estimator
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                onClick={() => setVehicle('bike')}
                style={{ 
                  background: vehicle === 'bike' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 9px',
                  cursor: 'pointer'
                }}
                title="Bike / Scooter"
              >
                <Bike size={14} />
              </button>
              <button 
                onClick={() => setVehicle('car')}
                style={{ 
                  background: vehicle === 'car' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 9px',
                  cursor: 'pointer'
                }}
                title="Car"
              >
                <Car size={14} />
              </button>
              <button 
                onClick={() => setVehicle('ev')}
                style={{ 
                  background: vehicle === 'ev' ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 9px',
                  cursor: 'pointer'
                }}
                title="Electric Vehicle"
              >
                <Zap size={14} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Cost: <strong style={{ color: '#F59E0B' }}>{fuelStats.cost}</strong> ({fuelStats.liters})</span>
            <span style={{ color: '#A78BFA', fontWeight: 600 }}>{fuelStats.mileage}</span>
          </div>
        </div>

        {/* Turn-by-Turn Steps List */}
        <div>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            Maneuver Directions
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {routeData?.steps && routeData.steps.length > 0 ? (
              routeData.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.78rem', padding: '8px 10px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px' }}>
                  <div style={{ marginTop: '2px' }}>{getStepIcon(step.instruction)}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: 'white', fontWeight: 600 }}>{step.instruction}</p>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>for {step.distance} km</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', padding: '10px' }}>
                Follow GPS path directly to destination.
              </div>
            )}
          </div>
        </div>

        {/* External Launcher */}
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${targetPoi.lat},${targetPoi.lng}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', textDecoration: 'none' }}
        >
          Open in Google Maps App
        </a>

      </div>
    </div>
  );
};

export default RouteNavigationDrawer;
