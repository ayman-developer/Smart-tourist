import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Compass, Navigation, Sun, Moon, 
  Shield, Zap, Star, ChevronDown, CheckCircle, 
  Mail, ArrowRight, Phone, HeartPulse, Wrench,
  Search, ListChecks, DollarSign, Fuel, Hotel, Utensils, Train
} from 'lucide-react';
import '../../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const travelCategories = [
    { 
      id: 'tourist', 
      title: 'Tourist Attractions', 
      desc: 'Discover historic monuments, viewpoints, and must-visit spots.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      icon: MapPin,
      color: '#ec4899'
    },
    { 
      id: 'hotel', 
      title: 'Luxury Lodging', 
      desc: 'Find premium hotels, cozy lodges, and guest houses near you.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
      icon: Hotel,
      color: '#3b82f6'
    },
    { 
      id: 'restaurant', 
      title: 'Fine Dining', 
      desc: 'Locate local restaurants, food spots, and cafes instantly.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
      icon: Utensils,
      color: '#10b981'
    },
    { 
      id: 'hospital', 
      title: 'Emergency Medical', 
      desc: 'Quick access to local hospitals, clinics, and pharmacies.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
      icon: HeartPulse,
      color: '#f43f5e'
    },
    { 
      id: 'atm', 
      title: 'ATMs & Banking', 
      desc: 'Never run out of cash with localized bank and ATM mapping.',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&q=80',
      icon: DollarSign,
      color: '#06b6d4'
    },
    { 
      id: 'transit', 
      title: 'Transit & Hubs', 
      desc: 'Find nearby bus stops, taxi ranks, and railway stations.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
      icon: Train,
      color: '#e11d48'
    },
    { 
      id: 'petrol', 
      title: 'Petrol Stations', 
      desc: 'Locate Bharat Petroleum, HP, and Indian Oil bunk stations.',
      image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&q=80',
      icon: Fuel,
      color: '#f59e0b'
    },
    { 
      id: 'mechanic', 
      title: 'Breakdown Repairs', 
      desc: 'Vehicle repair and mechanic outposts for roadside rescue.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&q=80',
      icon: Wrench,
      color: '#6366f1'
    }
  ];

  const faqs = [
    { q: 'Is TouristAI free to use?', a: 'Yes! TouristAI is completely free and open-source.' },
    { q: 'How accurate is the location data?', a: 'We use real-time GPS coordinates and Overpass OpenStreetMap engines with automated mirror fallbacks to guarantee uptime.' },
    { q: 'Do I need an account?', a: 'No signup is required. Click "Launch App" to start exploring immediately.' }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our travel team will contact you shortly.');
  };

  return (
    <div className={`landing-page ${isDark ? 'dark' : 'light'}`}>
      
      {/* Navbar */}
      <nav className="lp-navbar" style={{ padding: scrolled ? '1rem 3rem' : '1.8rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--lp-primary)', padding: '8px', borderRadius: '4px', display: 'flex' }}>
            <Compass size={22} color="#070a13" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Tourist<span style={{ color: 'var(--lp-primary)' }}>AI</span>
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', padding: '4px' }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')}>
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="lp-hero"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')` 
        }}
      >
        <div className="lp-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              color: 'var(--lp-primary)', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              letterSpacing: '0.25em', 
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Discover the art of travel
            </span>
            <h1 className="font-serif" style={{ fontSize: '4.2rem', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.15 }}>
              Explore the World <br />With <span className="text-gradient">True Intelligence</span>
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
              Your ultimate travel companion. Pinpoint local amenities, search emergency medical hubs, plan optimized routes, and navigate seamlessly using smart geocoded data.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }}>
              <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')}>
                Start Journey <ArrowRight size={16} />
              </button>
              <button className="lp-btn lp-btn-outline" onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}>
                Explore Features
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacious Grid Section - Poveda travel magazine portfolio style */}
      <section id="explore" className="lp-section">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--lp-primary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
            Curated Services
          </span>
          <h2 className="font-serif" style={{ fontSize: '3rem', marginTop: '0.5rem', fontWeight: 400 }}>
            Everything You Need, <span style={{ fontStyle: 'italic' }}>Mapped</span>
          </h2>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '1rem auto 0', lineHeight: 1.6 }}>
            Locate crucial travel necessities on the go. Scoped by distance, verified by ratings, and structured for ease.
          </p>
        </div>

        <div className="lp-grid">
          {travelCategories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              className="lp-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Photo Box */}
              <div style={{ overflow: 'hidden', height: '240px', position: 'relative' }}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(7, 10, 19, 0.85)',
                  backdropFilter: 'blur(4px)',
                  padding: '8px',
                  borderRadius: '4px',
                  display: 'flex',
                  color: cat.color,
                  border: '1px solid var(--lp-glass-border-dark)'
                }}>
                  <cat.icon size={18} />
                </div>
              </div>
              {/* Card content */}
              <div style={{ 
                padding: '24px', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                background: isDark ? 'rgba(10, 15, 30, 0.4)' : 'rgba(253, 251, 247, 0.4)'
              }}>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 400 }}>{cat.title}</h3>
                <p style={{ opacity: 0.7, fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>{cat.desc}</p>
                <button 
                  onClick={() => navigate('/app')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--lp-primary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '8px 0 0 0',
                    width: 'fit-content'
                  }}
                >
                  Locate Now <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editorial / Testimonial Showcase - Clean single column text layout */}
      <section className="lp-section" style={{ 
        background: isDark ? 'rgba(226, 184, 101, 0.03)' : 'rgba(226, 184, 101, 0.05)', 
        borderTop: '1px solid var(--lp-glass-border-dark)',
        borderBottom: '1px solid var(--lp-glass-border-dark)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '3rem 0' }}>
          <Star size={32} color="var(--lp-primary)" style={{ marginBottom: '2rem' }} />
          <p className="font-serif" style={{ 
            fontSize: '2.2rem', 
            fontStyle: 'italic', 
            lineHeight: 1.5, 
            color: isDark ? '#f1f5f9' : '#1c1917',
            marginBottom: '2rem',
            fontWeight: 300
          }}>
            "This travel assistant completely changed how we explore cities. The route optimization and precise brand name sorting for bunks let us travel without stress. It is a masterpiece of design and functionality."
          </p>
          <span style={{ fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--lp-primary)' }}>
            Victoria Thorne &mdash; Travel Journalist
          </span>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="lp-section" style={{ maxWidth: '850px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--lp-primary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
            Inquiries
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400, marginTop: '0.5rem' }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div>
          {faqs.map((faq, idx) => (
            <div key={idx} className="lp-faq-item" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>{faq.q}</h4>
                <ChevronDown size={18} style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
              </div>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ marginTop: '1.2rem', opacity: 0.7, lineHeight: 1.7, fontSize: '0.95rem' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Contact Form */}
      <section className="lp-section" style={{ maxWidth: '650px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400 }}>Plan Your Trip</h2>
          <p style={{ opacity: 0.7, fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Have a custom travel project in mind? Contact our developers.
          </p>
        </div>
        <form onSubmit={handleContactSubmit} className="lp-card" style={{ padding: '40px', background: isDark ? 'rgba(10, 15, 30, 0.4)' : 'white' }}>
          <input type="text" placeholder="Your Name" required className="lp-input" />
          <input type="email" placeholder="Your Email" required className="lp-input" />
          <textarea placeholder="Your Travel Inquiry" required className="lp-input" rows="4" style={{ resize: 'vertical' }}></textarea>
          <button type="submit" className="lp-btn lp-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <Mail size={16} /> Send Inquiry
          </button>
        </form>
      </section>

      {/* Poveda Minimalist Footer */}
      <footer style={{ 
        borderTop: isDark ? '1px solid var(--lp-glass-border-dark)' : '1px solid var(--lp-glass-border-light)', 
        padding: '4rem 3rem 2rem', 
        marginTop: '6rem',
        background: isDark ? 'rgba(7, 10, 19, 0.9)' : 'rgba(253, 251, 247, 0.9)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Compass size={22} color="var(--lp-primary)" />
              <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>TouristAI</span>
            </div>
            <p style={{ opacity: 0.5, maxWidth: '280px', fontSize: '0.85rem', lineHeight: 1.6 }}>
              A high-end visual mapping assistant for modern travelers, designed with aesthetic elegance and clean functional interfaces.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ marginBottom: '1.2rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.6, fontSize: '0.85rem' }}>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#explore" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.2rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.6, fontSize: '0.85rem' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                <a href="https://github.com/ayman-developer/Smart-tourist" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '4rem', 
          opacity: 0.4, 
          fontSize: '0.75rem', 
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          borderTop: '1px solid rgba(255,255,255,0.03)',
          paddingTop: '20px'
        }}>
          &copy; {new Date().getFullYear()} TouristAI. Made with precision and elegance.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
