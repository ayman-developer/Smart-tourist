import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Play, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import '../../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');

  const tourCategories = [
    { title: 'Adventure Tours', image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=500&q=80' },
    { title: 'Cultural Tours', image: 'https://images.unsplash.com/photo-1518638150341-db70061e8551?w=500&q=80' },
    { title: 'Beach Getaways', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
    { title: 'Luxury Escapes', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80' },
    { title: 'Family Vacations', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80' },
    { title: 'Wildlife Expeditions', image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=500&q=80' }
  ];

  const popularTours = [
    {
      title: 'Romantic Getaway to Paris',
      desc: 'Experience timeless romance and elegance in the iconic settings of Paris, the City of Love.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
      rating: '4.8',
      days: '5 Days, 4 Nights'
    },
    {
      title: 'Santorini Escape',
      desc: "Soak in the sun, white houses, and blue domes of Santorini, Greece's paradise.",
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&q=80',
      rating: '4.8',
      days: '5 Days, 4 Nights'
    },
    {
      title: 'Tokyo Cultural Immersion',
      desc: "Immerse yourself in Tokyo's hyper-modern tech streets and tranquil shrine gardens.",
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80',
      rating: '4.8',
      days: '5 Days, 4 Nights'
    }
  ];

  const inspiredOffers = [
    { discount: '15%', title: 'Exclusive Hotel Deals Just For You', date: 'Valid till 30 Aug' },
    { discount: '25%', title: 'Flight & Resort Packages Combined', date: 'Valid till 15 Sep' },
    { discount: '35%', title: 'Last Minute Weekend Staycations', date: 'Valid till 05 Oct' }
  ];

  const blogPosts = [
    { title: 'The Ultimate Guide to Packing Light', date: '30 Jan', author: 'By Admin', image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=500&q=80' },
    { title: 'Best Times of Year to Visit Popular Destinations', date: '28 Jan', author: 'By Admin', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&q=80' },
    { title: 'How to Travel Like a Local: Insider Tips', date: '25 Jan', author: 'By Admin', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&q=80' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
    'https://images.unsplash.com/photo-1472214222541-d510753a4707?w=400&q=80',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&q=80'
  ];

  const handleNavLinkClick = (link, targetId) => {
    setActiveTab(link);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Destination', id: 'destination' },
    { label: 'About Us', id: 'about-us' },
    { label: 'Tour', id: 'tour' },
    { label: 'Testimonial', id: 'testimonial' },
    { label: 'Blog', id: 'blog' }
  ];

  return (
    <div className="landing-outer-wrapper">
      <div className="landing-page">
        
        {/* Navbar Container */}
        <nav className="lp-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              background: 'var(--lp-primary)', 
              padding: '8px', 
              borderRadius: '50%', 
              display: 'flex',
              boxShadow: '0 4px 10px rgba(0, 167, 181, 0.3)'
            }}>
              <Compass size={22} color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'capitalize', letterSpacing: '-0.02em', color: '#0f172a' }}>
              Travel<span style={{ color: 'var(--lp-primary)' }}>Go</span>
            </span>
          </div>

          {/* Center menu links */}
          <div className="lp-nav-links">
            {menuItems.map((item) => (
              <span 
                key={item.label} 
                className="lp-nav-link"
                onClick={() => handleNavLinkClick(item.label, item.id)}
                style={{ color: activeTab === item.label ? 'var(--lp-primary)' : '#0f172a' }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Right book button */}
          <div>
            <button className="lp-btn-pill-outline" onClick={() => navigate('/app')}>
              Book Now
            </button>
          </div>
        </nav>

        {/* Hero Section Container */}
        <div className="lp-hero-wrapper" id="home">
          <div 
            className="lp-hero-container"
            style={{ 
              backgroundImage: `url('/assets/dribbble_hero.jpg')`
            }}
          >
            <div className="lp-hero-text-block">
              <h1 style={{ fontSize: '3.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: '1.2rem' }}>
                Explore the World,<br />One Trip at a Time
              </h1>
              <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500 }}>
                Discover unforgettable adventures, explore breathtaking destinations, and create lifelong memories with Trip Travel — your trusted partner for unique, expertly curated global travel experiences.
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className="lp-btn-pill-primary" onClick={() => navigate('/app')}>
                  Start Your Journey
                </button>
                <button 
                  className="lp-btn-pill-outline" 
                  style={{ background: 'white' }}
                  onClick={() => alert('Opening visual travel presentation video...')}
                >
                  <Play size={14} fill="var(--lp-primary)" style={{ stroke: 'none' }} />
                  Play Video
                </button>
              </div>
            </div>

            {/* Floating Search Bar */}
            <div className="lp-search-bar">
              <div className="search-field">
                <span className="search-label">Located In</span>
                <select className="search-value">
                  <option value="coimbatore">Coimbatore, TN</option>
                  <option value="chennai">Chennai, TN</option>
                  <option value="bengaluru">Bengaluru, KA</option>
                </select>
              </div>
              <div className="search-field">
                <span className="search-label">From - To</span>
                <select className="search-value">
                  <option>Jan 12 - Jan 25</option>
                  <option>Feb 05 - Feb 18</option>
                  <option>Mar 10 - Mar 24</option>
                </select>
              </div>
              <div className="search-field">
                <span className="search-label">Filter</span>
                <select className="search-value">
                  <option>All Activities</option>
                  <option>Adventure Sports</option>
                  <option>Luxury Resorts</option>
                  <option>Cultural Sightseeing</option>
                </select>
              </div>
              <button 
                onClick={() => navigate('/app')}
                style={{
                  background: 'var(--lp-primary)',
                  border: 'none',
                  width: '50px',
                  height: '50px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0,167,181,0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* spacer for floating search bar */}
        <div style={{ height: '70px' }}></div>

        {/* Tour Categories Section */}
        <section id="destination" style={{ padding: '80px 6%' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="font-script">Wonderful place for You</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
              Tour Categories
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
            {tourCategories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ 
                    width: '100%', 
                    height: '140px', 
                    borderRadius: '24px 6px 24px 6px', 
                    objectFit: 'cover',
                    marginBottom: '14px'
                  }} 
                />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {cat.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Most Popular Tour Section */}
        <section id="tour" style={{ padding: '80px 6%', background: 'var(--lp-bg-alt)' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="font-script">Wonderful place for You</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
              Most Popular Tour
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {popularTours.map((tour, idx) => (
              <div key={idx} className="tour-card">
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={tour.image} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--lp-primary)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    {tour.days}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    {tour.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {tour.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: '#eab308' }}>
                      <Star size={16} fill="#eab308" style={{ stroke: 'none' }} />
                      {tour.rating}
                    </div>
                    <button 
                      onClick={() => navigate('/app')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--lp-primary)',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Adventure & Travels Section */}
        <section id="about-us" style={{ padding: '100px 6%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            
            {/* Left Text details */}
            <div>
              <span className="font-script">Adventure & Travels</span>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 16px 0', lineHeight: 1.15 }}>
                Explore the World's Wonders With Us
              </h2>
              <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '30px' }}>
                Embark on a journey filled with breathtaking landscapes, thrilling experiences, and unforgettable memories. Whether you're an explorer or a leisure traveler, this is the perfect opportunity to discover the world's wonders.
              </p>

              {/* Experience and details grid */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
                <div style={{ 
                  background: 'rgba(0, 167, 181, 0.1)', 
                  color: 'var(--lp-primary)', 
                  padding: '20px', 
                  borderRadius: '20px',
                  textAlign: 'center',
                  minWidth: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900 }}>25+</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years of Experience</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <ShieldCheck size={18} color="var(--lp-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Trusted travel guide</h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--lp-text-muted)' }}>We supply high-end guide systems for safe exploration.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Eye size={18} color="var(--lp-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Mission & Vision</h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--lp-text-muted)' }}>Delivering localized intelligence and pathfinding globally.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button className="lp-btn-pill-primary" onClick={() => navigate('/app')}>
                  Start Your Journey
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" 
                    alt="Co-Founder" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Albert Flores</h5>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--lp-text-muted)', fontWeight: 700 }}>Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image & Stats group */}
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" 
                alt="Travel Adventure" 
                style={{ width: '100%', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
              {/* Stats list overlay box */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '30px',
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                border: '1px solid var(--lp-border)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                minWidth: '280px'
              }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: 'var(--lp-primary)' }}>30K+</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--lp-text-muted)', fontWeight: 700 }}>Tour Success</p>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: 'var(--lp-primary)' }}>5480+</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--lp-text-muted)', fontWeight: 700 }}>Happy Traveler</p>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: 'var(--lp-primary)' }}>6,562+</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--lp-text-muted)', fontWeight: 700 }}>Awards Won</p>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: 'var(--lp-primary)' }}>25+</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--lp-text-muted)', fontWeight: 700 }}>Our Experience</p>
                </div>
              </div>

              {/* Floating text circle overlay */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '-20px',
                background: '#0ea5e9',
                color: 'white',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: 800,
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(14,165,233,0.3)',
                lineHeight: 1.2,
                padding: '10px'
              }}>
                Travel is a Journey
              </div>
            </div>

          </div>
        </section>

        {/* spacer for floating stats bar */}
        <div style={{ height: '50px' }}></div>

        {/* Special Offers Section */}
        <section style={{ padding: '80px 6%', background: 'var(--lp-bg-alt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span className="font-script">Special Offers</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                Offers To Inspire You
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronLeft size={16} />
              </button>
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--lp-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="offers-grid">
            {inspiredOffers.map((off, idx) => (
              <div key={idx} className="offer-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--lp-primary)' }}>{off.discount} Off</span>
                  <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '10px', fontSize: '0.65rem', textTransform: 'uppercase' }}>
                    {off.date}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 10px 0' }}>
                  {off.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>Terms and conditions apply.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonial" style={{ padding: '80px 6%' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="font-script">Our Testimonials</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
              What They Are Talking About
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Diana Meadows', desc: 'The route mapping and live search saved us hours during our road trip in Coimbatore. Highly recommended!', role: 'Tourist' },
              { name: 'Jacob Jones', desc: 'Fabulous UX layout, super professional, fast and easy to navigate all categories in one click.', role: 'Explorer' },
              { name: 'Albert Flores', desc: 'The offline mirrors and Leaflet geolocators worked beautifully even on local roads.', role: 'Traveler' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'white', border: '1px solid var(--lp-border)', borderRadius: '20px', padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#f59e0b" style={{ stroke: 'none' }} />)}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  "{item.desc}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={`https://images.unsplash.com/photo-${1534528741775 + idx}-53994a69daeb?w=80&q=80`} 
                    alt={item.name} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>{item.name}</h5>
                    <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--lp-text-muted)' }}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles Section */}
        <section id="blog" style={{ padding: '80px 6%', background: 'var(--lp-bg-alt)' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="font-script">Our Blog Offer</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
              Recent Articles & Posts
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {blogPosts.map((post, idx) => (
              <div key={idx} className="blog-card">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'var(--lp-primary)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}>
                    {post.date}
                  </span>
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--lp-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                    {post.author}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 14px 0', lineHeight: 1.4 }}>
                    {post.title}
                  </h4>
                  <button 
                    onClick={() => navigate('/app')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--lp-primary)',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Read More <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tour Gallery Section */}
        <section style={{ padding: '80px 6%' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="font-script">Our Tour Photo Gallery</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
              Recent Gallery
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} style={{ height: '180px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <img 
                  src={img} 
                  alt="Travel Gallery" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer Container */}
        <footer style={{ 
          borderTop: '1px solid var(--lp-border)', 
          padding: '5rem 6% 2rem', 
          background: 'white'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Compass size={22} color="var(--lp-primary)" />
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>TravelGo</span>
              </div>
              <p style={{ color: 'var(--lp-text-muted)', maxWidth: '280px', fontSize: '0.82rem', lineHeight: 1.6 }}>
                A high-end visual mapping assistant for modern travelers, designed with aesthetic elegance and clean functional interfaces.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '4rem' }}>
              <div>
                <h4 style={{ marginBottom: '1.2rem', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                  <li><span style={{ cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>Home</span></li>
                  <li><span style={{ cursor: 'pointer' }} onClick={() => navigate('/app')}>Launch Dashboard</span></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '1.2rem', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                  <a href="https://github.com/ayman-developer/Smart-tourist" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            opacity: 0.5, 
            fontSize: '0.72rem', 
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '20px',
            color: 'var(--lp-text-muted)'
          }}>
            &copy; {new Date().getFullYear()} TravelGo. Made with precision and elegance.
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;
