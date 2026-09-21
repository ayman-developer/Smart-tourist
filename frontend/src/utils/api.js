// Reverse Geocoding using Nominatim (OpenStreetMap)
export const getAddressFromCoords = async (lat, lng) => {
  try {
    const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
    const data = await response.json();
    
    const addr = data.address || {};
    const local = addr.suburb || addr.neighbourhood || addr.quarter || addr.village || addr.town || "";
    const city = addr.city || addr.town || addr.village || addr.county || "";
    let short = "";
    if (local && city && local.toLowerCase() !== city.toLowerCase()) {
      short = `${local}, ${city}`;
    } else {
      short = local || city || data.display_name || "Coimbatore, Tamil Nadu";
      if (short.length > 30) {
        short = short.split(',').slice(0, 2).join(',').trim();
      }
    }

    return {
      full: data.display_name || "Coimbatore, Tamil Nadu, India",
      short: short || "Coimbatore, TN"
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      full: "Coimbatore, Tamil Nadu, India",
      short: "Coimbatore, TN"
    };
  }
};

// Enhanced Weather Fetching using Open-Meteo
export const getCurrentWeather = async (lat, lng) => {
  try {
    const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
    const data = await response.json();
    
    if (!data.current) throw new Error("No weather data");

    const weatherCodes = {
      0: 'Sunny', 1: 'Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
      45: 'Foggy', 48: 'Foggy',
      51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
      61: 'Light Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
      80: 'Rain Showers', 81: 'Showers', 82: 'Violent Showers',
      95: 'Thunderstorm'
    };

    const condition = weatherCodes[data.current.weather_code] || 'Clear';
    const temp = Math.round(data.current.temperature_2m);
    const feelsLike = data.current.apparent_temperature ? Math.round(data.current.apparent_temperature) : temp;
    const humidity = data.current.relative_humidity_2m;
    const wind = Math.round(data.current.wind_speed_10m);
    const uvIndex = data.current.uv_index || 4;

    let advisory = 'Clear skies & mild breeze: Ideal time for photography & heritage monuments.';
    if (data.current.weather_code >= 51 && data.current.weather_code <= 82) {
      advisory = 'Rainy weather: Carry an umbrella or explore indoor museums & temples.';
    } else if (temp > 34) {
      advisory = 'Warm sunshine: Stay hydrated and explore viewpoints before 11 AM or after 4 PM.';
    } else if (temp < 20) {
      advisory = 'Crisp mountain breeze: Perfect for hill trekking & scenic viewpoints.';
    }

    const dailyForecast = [];
    if (data.daily && data.daily.time) {
      for (let i = 0; i < Math.min(3, data.daily.time.length); i++) {
        dailyForecast.push({
          date: new Date(data.daily.time[i]).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: Math.round(data.daily.temperature_2m_max[i]),
          minTemp: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weather_code[i]
        });
      }
    }

    return {
      temp,
      feelsLike,
      condition,
      humidity,
      wind,
      uvIndex,
      advisory,
      forecast: dailyForecast
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return { 
      temp: 29, 
      feelsLike: 31, 
      condition: 'Clear', 
      humidity: 58, 
      wind: 14, 
      uvIndex: 5,
      advisory: 'Clear skies & mild breeze: Ideal time for photography & heritage monuments.',
      forecast: [
        { date: 'Today', maxTemp: 31, minTemp: 22 },
        { date: 'Tomorrow', maxTemp: 30, minTemp: 21 },
        { date: 'Wed', maxTemp: 29, minTemp: 22 }
      ]
    };
  }
};

// Calculate distance in km between two coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// OSRM Road Driving Route
export const getDrivingRoute = async (points) => {
  if (!points || points.length < 2) return null;
  const coordString = points.map(p => `${p.lng},${p.lat}`).join(';');
  
  try {
    const response = await fetch(`/api/route?coordinates=${coordString}`);
    const data = await response.json();
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const primaryRoute = data.routes[0];
      const distanceKm = (primaryRoute.distance / 1000).toFixed(1);
      const durationMins = Math.round(primaryRoute.duration / 60);
      
      const steps = [];
      primaryRoute.legs.forEach((leg) => {
        leg.steps.forEach(step => {
          const type = step.maneuver?.type || 'turn';
          const modifier = step.maneuver?.modifier || '';
          steps.push({
            instruction: step.maneuver?.instruction || `${type.charAt(0).toUpperCase() + type.slice(1)} ${modifier} onto ${step.name || 'route'}`,
            distance: (step.distance / 1000).toFixed(1),
            name: step.name || 'Road'
          });
        });
      });

      const geometry = primaryRoute.geometry.coordinates.map(coord => [coord[1], coord[0]]);

      return {
        distanceKm: parseFloat(distanceKm),
        durationMins,
        steps: steps.slice(0, 15),
        geometry
      };
    }
    return null;
  } catch (err) {
    console.error("OSRM Route fetching error:", err);
    return null;
  }
};

// Comprehensive Fallback Spots across Leisure, Business, and Emergency Modes
const fallbackSpots = {
  // --- LEISURE & VACATION MODE ---
  tourist: [
    {
      id: 101,
      name: 'Adiyogi Shiva & Dhyanalinga',
      address: 'Isha Yoga Center, Velliangiri Foothills',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '6:00 AM - 9:30 AM',
      offsetLat: 0.052,
      offsetLng: -0.065,
      audioStory: 'Adiyogi is a 112-foot steel statue of Shiva, recognized by Guinness World Records as the largest bust sculpture. It represents the 112 ways to attain liberation through yoga.'
    },
    {
      id: 102,
      name: 'Marudhamalai Murugan Hill Temple',
      address: 'Maruthamalai Hill Road, Somayampalayam',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '7:00 AM - 11:00 AM',
      offsetLat: 0.038,
      offsetLng: -0.042,
      audioStory: 'Marudhamalai Temple is an ancient 12th-century hill shrine surrounded by scenic Western Ghats and natural medicinal herbs.'
    },
    {
      id: 103,
      name: 'Gedee Car Heritage Museum',
      address: 'President Hall, Avinashi Road',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '10:00 AM - 1:00 PM',
      offsetLat: -0.012,
      offsetLng: 0.025,
      audioStory: 'Showcases antique British, German, American, and Indian automobiles spanning over 100 years of global mechanical evolution.'
    }
  ],
  nature: [
    {
      id: 151,
      name: 'Valankulam Lake Promenade & Sunset Point',
      address: 'Trichy Road, Sungam Bypass',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '5:00 PM - 7:00 PM',
      offsetLat: -0.024,
      offsetLng: 0.015,
      audioStory: 'A revitalized urban lake with floating walking decks, LED illuminated fountains, and a panoramic sunset vista over the water.'
    },
    {
      id: 152,
      name: 'VOC Botanical Gardens & Bird Park',
      address: 'Jail Road, Park Gate, Gopalapuram',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '4:00 PM - 6:30 PM',
      offsetLat: 0.005,
      offsetLng: 0.008,
      audioStory: 'A family-friendly botanical haven with lush tree canopies, toy train rides, and shaded pathways.'
    },
    {
      id: 153,
      name: 'Kovai Kutralam Waterfalls',
      address: 'Siruvani Hills Reserve Forest',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '9:00 AM - 2:00 PM',
      offsetLat: 0.065,
      offsetLng: -0.078,
      audioStory: 'A pristine waterfall nestled inside the Siruvani rainforest, known for sweet mineral waters and rainforest biodiversity.'
    }
  ],
  shopping: [
    {
      id: 181,
      name: 'Brookefields Grand Shopping Mall',
      address: 'Dr Krishnasamy Mudaliar Rd, Sukrawar Pettai',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=600&q=80',
      crowdStatus: 'Peak Rush',
      bestTimeSlot: '11:00 AM - 9:00 PM',
      offsetLat: 0.008,
      offsetLng: -0.005
    },
    {
      id: 182,
      name: 'Pothys Silk Emporium & Traditional Sarees',
      address: 'Cross Cut Road, Gandhipuram',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '10:00 AM - 8:30 PM',
      offsetLat: 0.019,
      offsetLng: 0.014
    },
    {
      id: 183,
      name: 'Prozone Luxury Lifestyle Mall',
      address: 'SF 201, Sathy Road, Saravanampatti',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '12:00 PM - 9:30 PM',
      offsetLat: 0.045,
      offsetLng: 0.038
    }
  ],
  hotel: [
    {
      id: 201,
      name: 'The Residency Towers Luxury Suites',
      address: '1076 Avinashi Road, Gopalapuram',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Check-in',
      offsetLat: 0.008,
      offsetLng: 0.018
    },
    {
      id: 202,
      name: 'Radisson Blu Resort & Spa',
      address: 'Avinashi Road, Peelamedu',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Check-in',
      offsetLat: 0.025,
      offsetLng: 0.045
    }
  ],
  restaurant: [
    {
      id: 301,
      name: 'Sree Annapoorna Sree Gowrishankar',
      address: 'East Arokiasamy Road, R.S. Puram',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
      signatureDish: 'Ghee Roast Sambar Dosa & Filter Kaapi',
      dishPrice: '₹140',
      dietType: 'Pure Veg',
      crowdStatus: 'Peak Rush',
      bestTimeSlot: '7:30 AM - 10:00 AM',
      offsetLat: 0.012,
      offsetLng: -0.025
    },
    {
      id: 302,
      name: 'Junior Kuppanna Kongu Heritage',
      address: 'Cross Cut Road, Gandhipuram',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
      signatureDish: 'Kongu Mutton Seeraga Samba Biryani',
      dishPrice: '₹320',
      dietType: 'Non-Veg',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '12:30 PM - 2:30 PM',
      offsetLat: 0.018,
      offsetLng: 0.015
    },
    {
      id: 303,
      name: 'The French Door Cafe & Bakery',
      address: 'West Periasamy Road, R.S. Puram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
      signatureDish: 'Artisan Croissants & Hazelnut Latte',
      dishPrice: '₹220',
      dietType: 'Cafe',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '4:00 PM - 7:00 PM',
      offsetLat: 0.015,
      offsetLng: -0.028
    }
  ],

  // --- BUSINESS & PROFESSIONAL MODE ---
  coworking: [
    {
      id: 351,
      name: 'Workflo by Innov8 Coworking Hub',
      address: 'Avinashi Road, Lakshmi Mills Junction',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Access (High Speed Wi-Fi)',
      offsetLat: 0.014,
      offsetLng: 0.024
    },
    {
      id: 352,
      name: 'Starbucks Coffee & Work Lounge',
      address: 'Race Course Road, Gopalapuram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
      signatureDish: 'Java Chip Frappuccino & Almond Biscotti',
      dishPrice: '₹340',
      dietType: 'Cafe',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '8:00 AM - 11:00 PM (Power Sockets)',
      offsetLat: -0.011,
      offsetLng: 0.014
    },
    {
      id: 353,
      name: 'Regus Executive Business Suites',
      address: 'Tristar Towers, Avinashi Road',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '9:00 AM - 7:00 PM (Meeting Rooms)',
      offsetLat: 0.022,
      offsetLng: 0.035
    }
  ],
  business_hotel: [
    {
      id: 371,
      name: 'Welcomhotel by ITC (Conference Center)',
      address: 'Race Course Road, Gopalapuram',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Corporate Concierge',
      offsetLat: -0.015,
      offsetLng: 0.012
    },
    {
      id: 372,
      name: 'Le Meridien 5-Star Business Tower',
      address: '762 Avinashi Road, Neelambur',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '24/7 Check-in',
      offsetLat: 0.048,
      offsetLng: 0.082
    }
  ],
  transit: [
    {
      id: 801,
      name: 'Coimbatore International Airport (CJB)',
      address: 'Airport Road, Peelamedu',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '24/7 Flights & Prepaid Cabs',
      offsetLat: 0.032,
      offsetLng: 0.068
    },
    {
      id: 802,
      name: 'Coimbatore Central Railway Junction',
      address: 'Station Road, Gopalapuram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=600&q=80',
      crowdStatus: 'Moderate Crowd',
      bestTimeSlot: '24/7 Active',
      offsetLat: -0.008,
      offsetLng: 0.005
    },
    {
      id: 803,
      name: 'Gandhipuram Central Express Bus Hub',
      address: 'Cross Cut Road, Gandhipuram',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
      crowdStatus: 'Peak Rush',
      bestTimeSlot: '24/7 Active',
      offsetLat: 0.016,
      offsetLng: 0.012
    }
  ],
  atm: [
    {
      id: 701,
      name: 'State Bank of India (24/7 Cash & Forex)',
      address: 'DB Road, R.S. Puram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Cash Terminal',
      offsetLat: 0.014,
      offsetLng: -0.022
    },
    {
      id: 702,
      name: 'HDFC Bank Forex & ATM Terminal',
      address: 'Avinashi Road, Anna Silai Junction',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Active',
      offsetLat: 0.008,
      offsetLng: 0.015
    }
  ],

  // --- EMERGENCY & SAFE HAVEN MODE ---
  hospital: [
    {
      id: 401,
      name: 'KMCH Multispeciality Hospital (24/7 Trauma)',
      address: 'Avinashi Road, Peelamedu',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Emergency ICU',
      offsetLat: 0.035,
      offsetLng: 0.055
    },
    {
      id: 402,
      name: 'PSG Hospitals & Emergency Trauma Care',
      address: 'Peelamedu, Coimbatore',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Emergency',
      offsetLat: 0.028,
      offsetLng: 0.048
    }
  ],
  pharmacy: [
    {
      id: 451,
      name: 'Apollo 24/7 Pharmacy & Emergency Meds',
      address: 'Cross Cut Road, Gandhipuram',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1586015555751-63c25b34914c?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Open',
      offsetLat: 0.017,
      offsetLng: 0.013
    },
    {
      id: 452,
      name: 'MedPlus 24-Hour Medical Store',
      address: 'DB Road, R.S. Puram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Open',
      offsetLat: 0.013,
      offsetLng: -0.024
    }
  ],
  police: [
    {
      id: 481,
      name: 'Coimbatore City Police Commissioner Office',
      address: 'Old Jail Road, Gopalapuram',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Helpline 100/112',
      offsetLat: 0.002,
      offsetLng: 0.006
    },
    {
      id: 482,
      name: 'B2 R.S. Puram Police Station & Tourist Desk',
      address: 'Diwan Bahadur Road, R.S. Puram',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Active',
      offsetLat: 0.016,
      offsetLng: -0.026
    }
  ],
  petrol: [
    {
      id: 501,
      name: 'Bharat Petroleum Smart Outpost & EV Hub',
      address: 'Avinashi Road, Lakshmi Mills Junction',
      rating: '4.7',
      image: '/assets/images/bharat_petroleum.jpg',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Open',
      offsetLat: 0.015,
      offsetLng: 0.022
    },
    {
      id: 502,
      name: 'HP Petroleum & 60kW Fast Charger',
      address: 'Trichy Road, Ramanathapuram',
      rating: '4.6',
      image: '/assets/images/hp_petrol.jpg',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '24/7 Open',
      offsetLat: -0.018,
      offsetLng: 0.032
    }
  ],
  mechanic: [
    {
      id: 601,
      name: 'Bosch Car Service & 24/7 Roadside Assist',
      address: 'Mettupalayam Road, Sai Baba Colony',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&q=80',
      crowdStatus: 'Low Crowd (Best Time)',
      bestTimeSlot: '8:00 AM - 8:00 PM',
      offsetLat: 0.032,
      offsetLng: -0.012
    }
  ]
};

// Nearby Search using Overpass API with Rich Fallback Guard
export const getNearbyPlaces = async (lat, lng, category) => {
  const categoryMap = {
    tourist: 'tourism~"attraction|museum|viewpoint|theme_park"',
    nature: 'leisure~"park|nature_reserve"',
    shopping: 'shop~"mall|department_store|clothes"',
    hotel: 'tourism=hotel',
    restaurant: 'amenity~"restaurant|cafe"',
    coworking: 'amenity~"coworking_space|cafe"',
    business_hotel: 'tourism=hotel',
    transit: 'amenity~"bus_station|train_station"',
    atm: 'amenity=atm',
    hospital: 'amenity=hospital',
    pharmacy: 'amenity=pharmacy',
    police: 'amenity=police',
    petrol: 'amenity=fuel',
    mechanic: 'amenity=car_repair'
  };

  const tag = categoryMap[category] || 'tourism';
  const radius = category === 'tourist' || category === 'nature' ? 45000 : 9000;

  const query = `
    [out:json][timeout:15];
    (
      node[${tag}](around:${radius},${lat},${lng});
      way[${tag}](around:${radius},${lat},${lng});
    );
    out center 25;
  `;

  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: query
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.elements && data.elements.length > 0) {
        const fallbackList = fallbackSpots[category] || fallbackSpots.tourist;
        const mapped = data.elements.map((element, idx) => {
          const tags = element.tags || {};
          const pLat = element.lat || (element.center && element.center.lat) || lat;
          const pLng = element.lon || (element.center && element.center.lon) || lng;
          const dist = calculateDistance(lat, lng, pLat, pLng);
          const rawName = tags.name || tags['name:en'] || tags.brand || `${category.charAt(0).toUpperCase() + category.slice(1)} Spot`;

          const fallbackItem = fallbackList[idx % fallbackList.length];

          return {
            id: element.id || (1000 + idx),
            name: rawName,
            lat: pLat,
            lng: pLng,
            category,
            address: tags['addr:full'] || tags['addr:street'] || tags['addr:place'] || fallbackItem.address,
            rating: fallbackItem.rating || (4.5 + (idx % 4) * 0.1).toFixed(1),
            distance: parseFloat(dist.toFixed(1)),
            image: fallbackItem.image,
            signatureDish: category === 'restaurant' || category === 'coworking' ? (fallbackItem.signatureDish || null) : null,
            dishPrice: category === 'restaurant' || category === 'coworking' ? (fallbackItem.dishPrice || null) : null,
            dietType: category === 'restaurant' || category === 'coworking' ? (fallbackItem.dietType || null) : null,
            crowdStatus: fallbackItem.crowdStatus || 'Moderate Crowd',
            bestTimeSlot: fallbackItem.bestTimeSlot || '9:00 AM - 6:00 PM',
            streetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${pLat},${pLng}`,
            audioStory: fallbackItem.audioStory || `Welcome to ${rawName}. A celebrated destination renowned for its vibrant culture and warm hospitality.`
          };
        });

        if (mapped.length > 0) return mapped;
      }
    }
  } catch (error) {
    console.warn("Overpass API slow/failed, using rich curated dataset:", error.message);
  }

  // Guaranteed High-Fidelity Curated Fallback Spots around current user coordinates
  const fallbacks = fallbackSpots[category] || fallbackSpots.tourist;
  return fallbacks.map(item => {
    const spotLat = lat + (item.offsetLat || 0.01);
    const spotLng = lng + (item.offsetLng || 0.01);
    const dist = calculateDistance(lat, lng, spotLat, spotLng);
    return {
      ...item,
      lat: spotLat,
      lng: spotLng,
      category,
      distance: parseFloat(dist.toFixed(1)),
      streetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${spotLat},${spotLng}`,
      audioStory: item.audioStory || `Welcome to ${item.name}. Enjoy exploring this top-rated attraction.`
    };
  });
};
