import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Compass, Navigation, Sun, Moon, 
  Shield, Zap, Star, ChevronDown, CheckCircle, 
  Mail, ArrowRight, Phone, HeartPulse, Wrench,
  Search, ListChecks
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

  const features = [
    { icon: MapPin, title: 'Precision Navigation', desc: 'Pinpoint exact locations with our advanced routing algorithms.' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Instantly load POIs with our heavily optimized caching system.' },
    { icon: Shield, title: 'Reliable Data', desc: 'Sourced from OpenStreetMap with custom smart-tag resolution.' }
  ];

  const faqs = [
    { q: 'Is TouristAI free to use?', a: 'Yes! TouristAI is completely free and open-source.' },
    { q: 'How accurate is the location data?', a: 'We use real-time GPS and OpenStreetMap data to provide highly accurate location mapping.' },
    { q: 'Do I need an account?', a: 'No account is required to start exploring.' }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className={`landing-page ${isDark ? 'dark' : 'light'}`}>
      
      {/* Navbar */}
      <nav className="lp-navbar" style={{ padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', transition: 'padding 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--lp-primary), var(--lp-secondary))', padding: '8px', borderRadius: '12px', display: 'flex' }}>
            <Compass size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            Tourist<span style={{ color: 'var(--lp-secondary)' }}>AI</span>
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')}>
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Navigate the World with <span className="text-gradient">Intelligence</span>
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Your ultimate smart tourist companion. Discover hidden gems, find essential services, and optimize your travel routes in real-time.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="lp-btn lp-btn-primary" onClick={() => navigate('/app')} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Start Exploring <ArrowRight size={20} />
              </button>
              <button className="lp-btn lp-btn-outline" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-section">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="lp-section-title">Why Choose Tourist<span className="text-gradient">AI</span>?</h2>
          <div className="lp-grid">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                className="lp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div style={{ background: 'rgba(99,102,241,0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--lp-primary)' }}>
                  <feat.icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{feat.title}</h3>
                <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="lp-section" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: '30px' }}>
        <h2 className="lp-section-title">How It <span className="text-gradient">Works</span></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { step: '1', icon: Search, title: 'Discover Local Gems', desc: 'Select categories like Lodges, Petrol Bunks, or Tourist Attractions. We instantly scan your radius for the best spots.' },
            { step: '2', icon: ListChecks, title: 'Review & Select', desc: 'Read precise details, exact brand names, and authentic ratings. No more guessing where you are going.' },
            { step: '3', icon: Navigation, title: 'Optimize Your Route', desc: 'Hit "Optimize Route" to perfectly sequence your stops and get one-click Google Maps directions.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: isDark ? 'rgba(255,255,255,0.05)' : 'white', padding: '2rem', borderRadius: '20px', border: '1px solid var(--lp-glass-border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <div style={{ background: 'var(--lp-primary)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
                {item.step}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                  <item.icon size={24} color="var(--lp-secondary)" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency Toolkit */}
      <section className="lp-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '8px 16px', borderRadius: '50px', fontWeight: 700, marginBottom: '1rem' }}>
            <Phone size={18} /> Emergency Toolkit
          </div>
          <h2 className="lp-section-title" style={{ marginBottom: 0 }}>Safety <span style={{ color: '#f43f5e' }}>First</span></h2>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0' }}>When traveling, safety is paramount. TouristAI ensures you are never stranded.</p>
        </div>
        
        <div className="lp-grid">
          {[
            { icon: HeartPulse, title: 'Nearby Hospitals', color: '#f43f5e', desc: 'Instantly locate emergency medical services and pharmacies in your immediate vicinity.' },
            { icon: Shield, title: 'Police Stations', color: '#3b82f6', desc: 'Find local law enforcement outposts quickly for safety and reporting.' },
            { icon: Wrench, title: 'Mechanic Shops', color: '#f59e0b', desc: 'Vehicle breakdown? Find verified mechanics and towing services in one click.' }
          ].map((item, idx) => (
            <div key={idx} className="lp-card" style={{ borderTop: `4px solid ${item.color}` }}>
              <item.icon size={32} color={item.color} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ opacity: 0.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="lp-section">
        <h2 className="lp-section-title">Simple <span className="text-gradient">Pricing</span></h2>
        <div className="lp-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="lp-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Basic Explorer</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>$0<span style={{ fontSize: '1rem', opacity: 0.5 }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              {['Nearby Discovery', 'Real-time Weather', 'Basic Routing'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <CheckCircle size={18} color="var(--lp-primary)" /> {item}
                </li>
              ))}
            </ul>
            <button className="lp-btn lp-btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Current Plan</button>
          </div>

          <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--lp-primary)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--lp-primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>PRO</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Global Nomad</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>$9<span style={{ fontSize: '1rem', opacity: 0.5 }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              {['Advanced AI Chatbot', 'Unlimited Saved Routes', 'Offline Maps Support', 'Priority API Access'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <CheckCircle size={18} color="var(--lp-primary)" /> {item}
                </li>
              ))}
            </ul>
            <button className="lp-btn lp-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Upgrade Now</button>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="lp-section" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: '30px' }}>
        <h2 className="lp-section-title">What Travelers <span className="text-gradient">Say</span></h2>
        <div className="lp-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="lp-card">
              <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', opacity: 0.8 }}>
                "Absolutely incredible app. The real-time optimization saved us hours on our trip to Coimbatore. Finding specific brands like Bharat Petroleum was a breeze!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--lp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                  T{item}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>Traveler {item}</h4>
                  <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>Explorer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section" style={{ maxWidth: '800px' }}>
        <h2 className="lp-section-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
        <div>
          {faqs.map((faq, idx) => (
            <div key={idx} className="lp-faq-item" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{faq.q}</h4>
                <ChevronDown size={20} style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
              </div>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ marginTop: '1rem', opacity: 0.7, lineHeight: 1.6 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="lp-section" style={{ maxWidth: '600px' }}>
        <h2 className="lp-section-title">Get in <span className="text-gradient">Touch</span></h2>
        <form onSubmit={handleContactSubmit} className="lp-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" placeholder="Your Name" required className="lp-input" />
          <input type="email" placeholder="Your Email" required className="lp-input" />
          <textarea placeholder="Your Message" required className="lp-input" rows="4" style={{ resize: 'vertical' }}></textarea>
          <button type="submit" className="lp-btn lp-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <Mail size={18} /> Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: isDark ? '1px solid var(--lp-glass-border-dark)' : '1px solid var(--lp-glass-border-light)', padding: '3rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Compass size={24} color="var(--lp-primary)" />
              <h2 style={{ margin: 0, fontWeight: 700 }}>TouristAI</h2>
            </div>
            <p style={{ opacity: 0.6, maxWidth: '300px' }}>Your ultimate smart companion for modern travel discovery.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Socials</h4>
              <div style={{ display: 'flex', gap: '1rem', opacity: 0.7 }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5, fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} TouristAI. All rights reserved.
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              background: 'var(--lp-primary)',
              color: 'white',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100,
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
          >
            <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
