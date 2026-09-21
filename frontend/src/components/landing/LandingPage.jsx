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
  Radio,
  Sparkles,
  Calendar,
  Volume2,
  Eye,
  CheckCircle2
} from 'lucide-react';
import '../../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('about');
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Real-time Local POI Discovery',
    'AI GPS Route Optimization',
    'Multilingual Voice Tour Stories',
    'Instant 1-Tap Emergency SOS'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const destinations = [
    {
      title: 'Adiyogi Shiva & Dhyanalinga',
      location: 'Velliangiri Foothills, Coimbatore',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
      tag: 'Spiritual Heritage',
      rating: '4.9'
    },
    {
      title: 'Nilgiri Mountain Railway & Ooty Hills',
      location: 'Western Ghats Scenic Escapes',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      tag: 'Nature & Hilltops',
      rating: '4.9'
    },
    {
      title: 'Marudhamalai Ancient Murugan Temple',
      location: 'Somayampalayam Ridge',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      tag: 'Cultural Monument',
      rating: '4.8'
    },
    {
      title: 'Valparai Cloud Tea Estates',
      location: 'Anamalai Tiger Reserve Region',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
      tag: 'Tea Trails & Wildlife',
      rating: '4.8'
    },
    {
      title: 'Authentic Kongu & Sree Annapoorna Dining',
      location: 'R.S. Puram, Coimbatore',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
      tag: 'Local Gastronomy',
      rating: '4.9'
    },
    {
      title: 'Valankulam Promenade & Sunset Decks',
      location: 'Trichy Road Lakefront',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      tag: 'Urban Leisure',
      rating: '4.7'
    }
  ];

  const categories = [
    { 
      id: 'tourist', 
      title: 'Tourist Attractions', 
      desc: 'Ancient temples, scenic hill stations, heritage car museums, and lake promenades.',
      tag: 'Heritage & Leisure',
      icon: MapPin,
      color: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80'
    },
    { 
      id: 'hotel', 
      title: 'Luxury Resorts & Stays', 
      desc: 'Top-rated business suites, heritage guest houses, and hillside nature villas.',
      tag: 'Hospitality',
      icon: Hotel,
      color: '#F59E0B',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80'
    },
    { 
      id: 'restaurant', 
      title: 'Authentic Local Dining', 
      desc: 'Kongu style biryani, Ghee Roast dosas, artisanal bakeries, and filter coffee.',
      tag: 'Gastronomy',
      icon: Utensils,
      color: '#F43F5E',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80'
    },
    { 
      id: 'hospital', 
      title: '24/7 Emergency Medical', 
      desc: 'Multispecialty trauma centers, critical care clinics, and instant pharmacies.',
      tag: 'Emergency Rescue',
      icon: HeartPulse,
      color: '#10B981',
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&q=80'
    },
    { 
      id: 'petrol', 
      title: 'Fuel Outposts & EV Fast-Chargers', 
      desc: 'Bharat Petroleum, HP, Indian Oil, Shell, and 60kW DC fast EV charging hubs.',
      tag: 'Mobility & Energy',
      icon: Fuel,
      color: '#0EA5E9',
      image: '/assets/images/bharat_petroleum.jpg'
    },
    { 
      id: 'mechanic', 
      title: 'Roadside Assistance & Garages', 
      desc: '24/7 breakdown recovery, multi-brand auto repair, and emergency tyre centers.',
      tag: 'Breakdown Support',
      icon: Wrench,
      color: '#F97316',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&q=80'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your feedback has been sent to our developer team.');
  };

  return (
    <div className="landing-page">
      
      {/* Floating Multi-Color Aurora Glow Mesh */}
      <div className="glow-blobs-container">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Fixed Navigation Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="nav-container">
          
          <div className="logo" onClick={() => scrollToSection('about')}>
            <div style={{ background: 'var(--primary-gradient)', padding: '7px', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}>
              <Compass size={22} color="white" />
            </div>
            <span style={{ fontWeight: 900, color: 'white' }}>
              Tourist<span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="nav-menu">
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('about')} className={`nav-btn ${activeNav === 'about' ? 'active' : ''}`}>About</button></li>
              <li><button onClick={() => scrollToSection('destinations')} className={`nav-btn ${activeNav === 'destinations' ? 'active' : ''}`}>Destinations</button></li>
              <li><button onClick={() => scrollToSection('services')} className={`nav-btn ${activeNav === 'services' ? 'active' : ''}`}>Services</button></li>
              <li><button onClick={() => scrollToSection('features')} className={`nav-btn ${activeNav === 'features' ? 'active' : ''}`}>10 AI Features</button></li>
              <li><button onClick={() => scrollToSection('reviews')} className={`nav-btn ${activeNav === 'reviews' ? 'active' : ''}`}>Reviews</button></li>
              <li><button onClick={() => scrollToSection('contact')} className={`nav-btn ${activeNav === 'contact' ? 'active' : ''}`}>Contact</button></li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <Navigation size={16} /> Launch App
            </button>
          </div>

        </div>
      </header>

      {/* SECTION 1: HERO / ABOUT */}
      <section id="about" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '130px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '50px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div>
              <span className="section-subtitle">Autonomous Travel Intelligence</span>
              <h1 className="hero-title">
                Smart Tourist<br />Assistant
              </h1>
              
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-secondary)', margin: '18px 0 24px 0' }}>
                Specializing in <span className="typing-text">{typingText}</span>
              </h2>

              <div className="glass" style={{ padding: '22px 26px', maxWidth: '580px', marginBottom: '30px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                Your complete next-generation tourism companion. Discover local attractions, generate day-by-day AI itineraries, listen to audio guide stories, calculate fuel travel costs, and trigger 1-tap SOS emergency rescue.
              </div>

              {/* Counter Stats Bar */}
              <div style={{ display: 'flex', gap: '35px', marginBottom: '32px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: 'white' }}>10+</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pro AI Features</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: '#8B5CF6' }}>100%</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Realtime OSM Data</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: '#10B981' }}>3-Tier</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mirror Failover</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('/app')}>
                  🚀 Launch Assistant
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('destinations')}>
                  🏞️ Explore Sights
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('features')}>
                  ⚡ 10 AI Tools
                </button>
              </div>
            </div>

            {/* Right Graphic: Hero Showcase with Real Visual Card */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
                
                {/* Main Hero Card */}
                <div className="glass" style={{ padding: '24px', borderRadius: '26px', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.25)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Radio size={18} color="#8B5CF6" className="animate-pulse" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Travel Radar</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '3px 10px', borderRadius: '12px' }}>
                      ● Active GPS
                    </span>
                  </div>

                  {/* High-res Hero Image Preview */}
                  <div style={{ 
                    height: '240px', 
                    borderRadius: '18px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    background: 'url("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8, 12, 20, 0.9) 0%, rgba(8, 12, 20, 0.2) 60%, transparent 100%)' }}></div>
                    
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 800 }}>★ 4.9 • Top Heritage Attraction</span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', margin: '2px 0 0 0' }}>Adiyogi Shiva & Dhyanalinga</h4>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Location Scoped</span>
                      <strong style={{ fontSize: '0.88rem', color: 'white' }}>Coimbatore, Tamil Nadu</strong>
                    </div>
                    <button onClick={() => navigate('/app')} className="btn btn-primary btn-sm">
                      Open Live Map
                    </button>
                  </div>
                </div>

                {/* Floating Badges */}
                <div style={{ position: 'absolute', top: '-15px', left: '-20px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #8B5CF6', borderRadius: '16px', padding: '10px 16px', fontSize: '0.8rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
                  <Volume2 size={16} color="#8B5CF6" />
                  <span>Multilingual Voice Tour</span>
                </div>

                <div style={{ position: 'absolute', bottom: '50px', right: '-25px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10B981', borderRadius: '16px', padding: '10px 16px', fontSize: '0.8rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
                  <ShieldCheck size={16} color="#10B981" />
                  <span>1-Tap SOS Guard</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TOP DESTINATIONS WITH HIGH-RES PHOTOS */}
      <section id="destinations" className="section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">Featured Highlights</span>
            <h2 className="section-title">Explore Iconic Destinations</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
              Handpicked heritage shrines, mountain hill stations, and cultural landmarks ready for instant turn navigation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {destinations.map((dest, i) => (
              <div key={i} className="dest-card">
                <img src={dest.image} alt={dest.title} />
                <div className="dest-card-overlay">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ background: 'rgba(99, 102, 241, 0.3)', border: '1px solid #8B5CF6', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', color: 'white', fontWeight: 800 }}>
                      {dest.tag}
                    </span>
                    <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.82rem' }}>
                      ★ {dest.rating}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', margin: '0 0 4px 0' }}>
                    {dest.title}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    📍 {dest.location}
                  </span>
                  <button 
                    onClick={() => navigate('/app')}
                    style={{
                      background: 'var(--primary-gradient)',
                      border: 'none',
                      color: 'white',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    View in Live Map <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES MATRIX WITH RICH PHOTOS */}
      <section id="services" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">Comprehensive Matrix</span>
            <h2 className="section-title">All Essential Services</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
              Instant localized discovery of amenities, medical rescue, fuel outposts, and workshops.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="glass" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                    <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 80%)' }}></div>
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(8, 12, 20, 0.8)', padding: '8px', borderRadius: '10px', color: cat.color }}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {cat.tag}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', margin: '2px 0 6px 0' }}>
                        {cat.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {cat.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Real-time GPS Radius</span>
                      <button 
                        onClick={() => navigate('/app')}
                        style={{ background: 'none', border: 'none', color: cat.color, fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        Discover <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: 10 ADVANCED AI FEATURES SHOWCASE */}
      <section id="features" className="section" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">Cutting-Edge Capabilities</span>
            <h2 className="section-title">10 Advanced Pro Features</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
              Engineered with advanced algorithms, OSRM routing, speech synthesis, and live exchange rates.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { title: 'AI Itinerary Planner', desc: 'Synthesizes custom multi-day schedules with cost budgets and map plotting.', icon: Calendar, color: '#8B5CF6' },
              { title: 'Multilingual Audio Guide', desc: 'Speaks historic landmark stories in English, Tamil, Hindi, French, and Spanish.', icon: Volume2, color: '#F43F5E' },
              { title: '1-Tap SOS Safe Haven', desc: 'Finds nearest 24/7 hospitals and sends WhatsApp live GPS alerts instantly.', icon: ShieldCheck, color: '#10B981' },
              { title: 'OSRM Route & Fuel Calculator', desc: 'Turn-by-turn road navigation with Bike, Car, and EV fuel cost estimators.', icon: Navigation, color: '#0EA5E9' },
              { title: 'Smart Weather Advisory', desc: 'Real-time tourism travel advice, rain warnings, and 3-day forecast outlook.', icon: Sparkles, color: '#F59E0B' },
              { title: 'Signature Dish Finder', desc: 'Recommends must-try local delicacies and dietary filters for restaurants.', icon: Utensils, color: '#F43F5E' },
              { title: '1-Click PDF Travel Pass', desc: 'Downloads a formatted printable travel pass with itinerary & emergency info.', icon: CheckCircle2, color: '#8B5CF6' },
              { title: 'Live Crowd Density Meter', desc: 'Displays peak hours, low-crowd visiting slots, and best photography times.', icon: Eye, color: '#10B981' },
              { title: '360° Sights Preview', desc: 'Panoramic viewpoint viewer and direct Google Street View integration.', icon: Globe, color: '#0EA5E9' },
              { title: 'Currency & Expense Tracker', desc: 'Live foreign exchange rates and categorized trip spending tracker.', icon: DollarSign, color: '#F59E0B' }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '18px' }}>
                  <div style={{ background: `${f.color}20`, border: `1px solid ${f.color}40`, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'white', margin: 0 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: REVIEWS WITH TRAVELER PHOTOS */}
      <section id="reviews" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle">Real Experiences</span>
            <h2 className="section-title">Loved by Travelers Worldwide</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                name: 'Ananya Sharma',
                role: 'Solo Explorer & Photographer',
                text: 'The multilingual audio guide and 360 preview gave me rich historical insights on Marudhamalai and Adiyogi that I would have missed.',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
              },
              {
                name: 'Marcus Vance',
                role: 'Digital Nomad',
                text: 'The currency converter and OSRM fuel cost estimator made planning road trips across Tamil Nadu effortless and reliable.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
              },
              {
                name: 'Kavitha Raman',
                role: 'Family Vacationer',
                text: 'The 1-tap SOS and curated vegetarian restaurant specialties saved us so much time during our Coimbatore trip. Fantastic app!',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80'
              }
            ].map((rev, i) => (
              <div key={i} className="glass" style={{ padding: '26px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="#F59E0B" stroke="none" />)}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  "{rev.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                  <img src={rev.avatar} alt={rev.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 900, color: 'white' }}>{rev.name}</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT & INQUIRY */}
      <section id="contact" className="section" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Contact & Feedback</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Have feedback, partnership ideas, or want to contribute to TouristAI? Drop a message below.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="glass" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Your Name</label>
              <input type="text" placeholder="John Doe" required style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Email Address</label>
              <input type="email" placeholder="john@example.com" required style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Message</label>
              <textarea placeholder="Write your message here..." rows={4} required style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              <Mail size={16} /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '50px 0 30px', background: 'rgba(8, 12, 20, 0.98)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary-gradient)', padding: '6px', borderRadius: '10px' }}>
              <Compass size={18} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Tourist<span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span></span>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>About</button>
            <button onClick={() => scrollToSection('destinations')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Destinations</button>
            <button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Services</button>
            <button onClick={() => navigate('/app')} style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontWeight: 800 }}>Open App</button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Ayman A. Smart Tourist Assistant.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
