import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Compass, 
  Search, 
  Navigation, 
  Fuel, 
  Hotel, 
  Utensils, 
  Wrench, 
  HeartPulse, 
  DollarSign, 
  Train, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Star, 
  ArrowRight, 
  Mail, 
  ChevronRight, 
  ExternalLink,
  Globe,
  Radio
} from 'lucide-react';
import '../../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('about');
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect phrases matching portfolio style
  const phrases = [
    'Real-time Local POI Discovery',
    'AI GPS Route Optimization',
    'Multi-Mirror OSM Resilience',
    'Emergency & Amenity Mapping'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect loop
  useEffect(() => {
    const currentPhrase = phrases[typingIndex % phrases.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && typingText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typingText === '') {
        setIsDeleting(false);
        setTypingIndex(prev => prev + 1);
      } else {
        setTypingText(
          isDeleting
            ? currentPhrase.substring(0, typingText.length - 1)
            : currentPhrase.substring(0, typingText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, typingIndex]);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { 
      id: 'tourist', 
      title: 'Tourist Attractions', 
      desc: 'Historic landmarks, scenic viewpoints, cultural monuments, and parks.',
      tag: 'Heritage & Leisure',
      icon: MapPin 
    },
    { 
      id: 'hotel', 
      title: 'Lodges & Accommodations', 
      desc: 'Top-rated hotels, guest houses, and luxury resorts with verified reviews.',
      tag: 'Hospitality',
      icon: Hotel 
    },
    { 
      id: 'restaurant', 
      title: 'Dining & Restaurants', 
      desc: 'Local authentic cuisines, fine dining, cafes, and street food hubs.',
      tag: 'Gastronomy',
      icon: Utensils 
    },
    { 
      id: 'hospital', 
      title: 'Hospitals & Medical Care', 
      desc: '24/7 emergency clinics, specialized hospitals, and pharmacies nearby.',
      tag: 'Emergency Support',
      icon: HeartPulse 
    },
    { 
      id: 'petrol', 
      title: 'Petrol & Fuel Outposts', 
      desc: 'HP, Bharat Petroleum, Indian Oil, and EV fast-charging stations.',
      tag: 'Mobility & Fuel',
      icon: Fuel 
    },
    { 
      id: 'mechanic', 
      title: 'Mechanics & Repair Shops', 
      desc: 'Roadside assistance, tire repair outposts, and vehicle workshops.',
      tag: 'Breakdown Rescue',
      icon: Wrench 
    },
    { 
      id: 'atm', 
      title: 'ATMs & Cash Centers', 
      desc: 'Nationalized bank branches and 24-hour instant ATM terminals.',
      tag: 'Banking',
      icon: DollarSign 
    },
    { 
      id: 'transit', 
      title: 'Transit Hubs & Railways', 
      desc: 'Bus terminals, metro interchanges, and central railway stations.',
      tag: 'Public Transit',
      icon: Train 
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your feedback has been sent to our developer team.');
  };

  return (
    <div className="landing-page">
      
      {/* Floating Background Glow Blobs (Portfolio Signature) */}
      <div className="glow-blobs-container">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Fixed Header Navigation Bar */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="nav-container">
          
          {/* Logo with Cyan Glow */}
          <div className="logo" onClick={() => scrollToSection('about')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" width="34" height="34" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.4))' }}>
              <circle cx="50" cy="50" r="42" stroke="#00e5ff" strokeWidth="7" strokeLinecap="round" strokeDasharray="35 15 150 15" fill="rgba(0, 229, 255, 0.05)" />
              <path d="M50 24 L32 72 H43 L50 52 L57 52 L64 72 H75 Z" fill="#ffffff" />
              <rect x="45" y="47" width="10" height="4.5" fill="#00e5ff" />
            </svg>
            <span style={{ fontWeight: 900 }}>Tourist<span className="logo-accent">AI</span></span>
          </div>

          {/* Live System Indicator Badge */}
          <div style={{
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span className="pulse-indicator"></span>
            GPS Cluster Active
          </div>

          {/* Menu Items */}
          <nav className="nav-menu">
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('about')} className={`nav-btn ${activeNav === 'about' ? 'active' : ''}`}>About</button></li>
              <li><button onClick={() => scrollToSection('services')} className={`nav-btn ${activeNav === 'services' ? 'active' : ''}`}>Services</button></li>
              <li><button onClick={() => scrollToSection('architecture')} className={`nav-btn ${activeNav === 'architecture' ? 'active' : ''}`}>Architecture</button></li>
              <li><button onClick={() => scrollToSection('reviews')} className={`nav-btn ${activeNav === 'reviews' ? 'active' : ''}`}>Reviews</button></li>
              <li><button onClick={() => scrollToSection('contact')} className={`nav-btn ${activeNav === 'contact' ? 'active' : ''}`}>Contact</button></li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            <a 
              href="https://github.com/ayman-developer/Smart-tourist" 
              target="_blank" 
              rel="noreferrer" 
              className="icon-btn" 
              title="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <button className="btn btn-primary" onClick={() => navigate('/app')}>
              <Compass size={16} /> Launch App
            </button>
          </div>

        </div>
      </header>

      {/* SECTION 1: HERO / ABOUT */}
      <section id="about" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '130px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            
            {/* Left Hero Content */}
            <div>
              <span className="section-subtitle">Intelligent Concierge</span>
              <h1 className="hero-title">
                Smart Tourist<br />Assistant
              </h1>
              
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)', margin: '18px 0 24px 0' }}>
                Specializing in <span className="typing-text">{typingText}</span>
              </h2>

              <div className="glass" style={{ padding: '20px 24px', maxWidth: '580px', marginBottom: '28px', color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7 }}>
                An autonomous, AI-driven exploration assistant engineered to geocode essential services, optimize multi-stop travel routes, and ensure high availability with real-time multi-mirror Overpass OSM fallback.
              </div>

              {/* Counter Stats Bar */}
              <div style={{ display: 'flex', gap: '35px', marginBottom: '32px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>8+</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Service Clusters</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>100%</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live OSM Data</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>3-Tier</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mirror Failover</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('/app')}>
                  🚀 Launch Assistant
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>
                  📍 Explore Services
                </button>
                <a 
                  href="https://github.com/ayman-developer/Smart-tourist" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary"
                >
                  <ExternalLink size={16} /> GitHub Source
                </a>
              </div>
            </div>

            {/* Right Visual Graphic & Floating Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                
                {/* Visual Glass Frame */}
                <div className="glass" style={{ padding: '30px', borderRadius: '28px', border: '1px solid rgba(0, 229, 255, 0.25)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Radio size={18} color="var(--accent-cyan)" className="animate-pulse" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Real-time Radar</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Overpass v0.7.62</span>
                  </div>

                  {/* Dark Map Vector Preview */}
                  <div style={{ 
                    height: '240px', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 8, 12, 0.75)' }}></div>
                    
                    {/* Simulated Map Markers */}
                    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="pulse-indicator" style={{ width: '14px', height: '14px' }}></span>
                      <div style={{ background: 'var(--bg-primary)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', marginTop: '6px' }}>
                        Your Location
                      </div>
                    </div>

                    <div style={{ position: 'absolute', top: '25%', left: '70%', background: 'rgba(0, 229, 255, 0.15)', border: '1px solid var(--accent-cyan)', borderRadius: '50%', padding: '6px' }}>
                      <MapPin size={14} color="var(--accent-cyan)" />
                    </div>
                    <div style={{ position: 'absolute', bottom: '25%', left: '25%', background: 'rgba(0, 229, 255, 0.15)', border: '1px solid var(--accent-cyan)', borderRadius: '50%', padding: '6px' }}>
                      <Utensils size={14} color="var(--accent-cyan)" />
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Coordinates: Coimbatore, TN</span>
                    <button onClick={() => navigate('/app')} className="btn btn-primary btn-sm">
                      Open Live Map
                    </button>
                  </div>
                </div>

                {/* Floating Micro Glass Badges */}
                <div className="floating-badge badge-float-1" style={{ position: 'absolute', top: '-15px', left: '-20px' }}>
                  <Zap size={16} color="var(--accent-cyan)" />
                  <span>Sub-second Geocoding</span>
                </div>

                <div className="floating-badge badge-float-2" style={{ position: 'absolute', bottom: '40px', right: '-25px' }}>
                  <ShieldCheck size={16} color="var(--accent-cyan)" />
                  <span>100% Mirror Fallback</span>
                </div>

                <div className="floating-badge badge-float-3" style={{ position: 'absolute', bottom: '-20px', left: '20px' }}>
                  <Navigation size={16} color="var(--accent-cyan)" />
                  <span>Optimal Pathfinding AI</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES & MATRIX */}
      <section id="services" className="section" style={{ background: 'rgba(13, 17, 26, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">Categorized Intelligence</span>
            <h2 className="section-title">Essential Services Matrix</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Instant localized discovery of amenities and emergency rescue outposts, structured with clean geocoding filters.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="glass feature-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="feature-icon-wrapper">
                      <Icon size={24} />
                    </div>
                    <span className="feature-tag">{cat.tag}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>{cat.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
                  </div>
                  <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Instant Routing</span>
                    <button 
                      onClick={() => navigate('/app')}
                      style={{ 
                        color: 'var(--accent-cyan)', 
                        fontSize: '0.8rem', 
                        fontWeight: 700, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Locate <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: ARCHITECTURE & HIGH AVAILABILITY */}
      <section id="architecture" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">System Resilience</span>
            <h2 className="section-title">Multi-Mirror Architecture</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Built with zero single-point-of-failure routing to withstand rate-limits and network timeouts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            <div className="glass" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="feature-icon-wrapper"><Cpu size={22} /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: 0 }}>3-Tier Overpass Proxy</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Primary queries route through <code>overpass-api.de</code> with automated instantaneous failover to <code>overpass.kumi.systems</code> and <code>overpass.n.openstreetmap.de</code>.
              </p>
            </div>

            <div className="glass" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="feature-icon-wrapper"><Zap size={22} /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: 0 }}>Smart Radius Expansion</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Dynamic proximity scoping starts at 10km and dynamically queries wider city coordinates to guarantee results for tourist spots and lodging.
              </p>
            </div>

            <div className="glass" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="feature-icon-wrapper"><Globe size={22} /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: 0 }}>Leaflet Dark Engine</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                CartoDB dark vector tiles rendered with GPU-accelerated Leaflet map instances and custom glowing SVG marker pins.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: REVIEWS & REPUTATION */}
      <section id="reviews" className="section" style={{ background: 'rgba(13, 17, 26, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">User Testimonials</span>
            <h2 className="section-title">Trusted By Travelers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Diana Meadows', role: 'Explorer', text: 'The multi-mirror fallback and instant petrol station identification saved us hours during a road trip across Tamil Nadu.' },
              { name: 'Jacob Jones', role: 'Digital Nomad', text: 'The neon cyan UI and glassmorphism interface feels like a futuristic concierge. Everything loads fast with zero lag.' },
              { name: 'Albert Flores', role: 'Tech Enthusiast', text: 'The route optimization algorithm with interactive Leaflet polylines is brilliantly built. Super reliable.' }
            ].map((rev, idx) => (
              <div key={idx} className="glass" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '3px', color: 'var(--accent-cyan)', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--accent-cyan)" style={{ stroke: 'none' }} />)}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                  "{rev.text}"
                </p>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT & INQUIRY */}
      <section id="contact" className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Contact Developer</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Have suggestions or feature requests for TouristAI? Send a message directly.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="glass" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Your Name</label>
              <input type="text" placeholder="John Doe" required className="glass-input" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Your Email</label>
              <input type="email" placeholder="john@example.com" required className="glass-input" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Message / Suggestion</label>
              <textarea placeholder="Write your message here..." rows={4} required className="glass-input" style={{ resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <Mail size={16} /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '50px 0 30px', background: 'rgba(6, 8, 12, 0.95)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={22} color="var(--accent-cyan)" />
            <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white' }}>Tourist<span className="logo-accent">AI</span></span>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>About</button>
            <button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Services</button>
            <button onClick={() => scrollToSection('architecture')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Architecture</button>
            <button onClick={() => navigate('/app')} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: 700 }}>Open App</button>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Ayman A. Smart Tourist Assistant.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
