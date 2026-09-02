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
      short = local || city || data.display_name || "Location detected";
      if (short.length > 30) {
        short = short.split(',').slice(0, 2).join(',').trim();
      }
    }

    return {
      full: data.display_name || "Unknown Location",
      short: short
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      full: "Location detected",
      short: "Location detected"
    };
  }
};

// Enhanced Weather Fetching using Open-Meteo with Forecast and Advisory
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

    // Contextual Tourism & Travel Advisory Logic
    let advisory = 'Great weather for outdoor exploration & sightseeing.';
    let iconType = 'sun';
    if (data.current.weather_code >= 51 && data.current.weather_code <= 82) {
      advisory = 'Rainy weather: Carry an umbrella or explore indoor museums & temples.';
      iconType = 'rain';
    } else if (temp > 35) {
      advisory = 'High temperature: Stay hydrated and visit viewpoints before 11 AM or after 4 PM.';
      iconType = 'hot';
    } else if (temp < 18) {
      advisory = 'Pleasant cool breeze: Perfect time for hilltop treks & scenic walks.';
      iconType = 'cool';
    } else if (condition.includes('Cloudy') || condition.includes('Clear')) {
      advisory = 'Clear skies & mild breeze: Ideal time for photography & heritage monuments.';
      iconType = 'clear';
    }

    // Process 3-Day Daily Forecast
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
      iconType,
      forecast: dailyForecast
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return { 
      temp: 28, 
      feelsLike: 29, 
      condition: 'Sunny', 
      humidity: 48, 
      wind: 12, 
      uvIndex: 5,
      advisory: 'Pleasant weather for sightseeing & visiting nearby heritage spots.',
      iconType: 'sun',
      forecast: []
    };
  }
};

// Calculate distance in km between two lat/lng coordinates (Haversine formula)
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

// Turn-by-Turn Driving Route via OSRM
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
      
      // Extract turn-by-turn maneuvers
      const steps = [];
      primaryRoute.legs.forEach((leg, legIdx) => {
        leg.steps.forEach(step => {
          if (step.maneuver && step.maneuver.instruction) {
            steps.push({
              instruction: step.maneuver.instruction,
              distance: (step.distance / 1000).toFixed(1),
              name: step.name || 'Road'
            });
          } else {
            const type = step.maneuver.type;
            const modifier = step.maneuver.modifier || '';
            steps.push({
              instruction: `${type.charAt(0).toUpperCase() + type.slice(1)} ${modifier} onto ${step.name || 'route'}`,
              distance: (step.distance / 1000).toFixed(1),
              name: step.name || 'Road'
            });
          }
        });
      });

      // Decode GeoJSON coordinates into [lat, lng] array
      const geometry = primaryRoute.geometry.coordinates.map(coord => [coord[1], coord[0]]);

      return {
        distanceKm: parseFloat(distanceKm),
        durationMins,
        steps: steps.slice(0, 15), // Top steps
        geometry
      };
    }
    return null;
  } catch (err) {
    console.error("OSRM Route fetching error:", err);
    return null;
  }
};

// Signature dishes and cuisines for restaurants
const signatureDishes = [
  { dish: 'Ghee Roast Sambar Dosa', price: '₹120', diet: 'Pure Veg', type: 'South Indian' },
  { dish: 'Kongu Style Mutton Biryani', price: '₹280', diet: 'Non-Veg', type: 'Authentic Local' },
  { dish: 'Traditional Filter Kaapi & Vada', price: '₹60', diet: 'Pure Veg', type: 'Cafe' },
  { dish: 'Pallipalayam Chicken & Parotta', price: '₹220', diet: 'Non-Veg', type: 'Chettinad' },
  { dish: 'Jigarthanda & Falooda Bowl', price: '₹90', diet: 'Pure Veg', type: 'Dessert' },
  { dish: 'Butter Paneer & Tandoori Roti', price: '₹210', diet: 'Pure Veg', type: 'North Indian' }
];

// Nearby Search using Overpass API (OpenStreetMap)
export const getNearbyPlaces = async (lat, lng, category) => {
  const categoryMap = {
    petrol: 'amenity=fuel',
    hotel: 'tourism=hotel',
    restaurant: 'amenity=restaurant',
    mechanic: 'amenity=car_repair',
    tourist: 'tourism',
    hospital: 'amenity=hospital',
    atm: 'amenity=atm',
    transit: 'amenity=bus_station'
  };

  const tag = categoryMap[category] || 'amenity=fuel';
  const radius = category === 'tourist' ? 45000 : 4000;

  let extraNodes = '';
  if (category === 'hotel') {
    extraNodes = `
      node["tourism"="guest_house"](around:${radius},${lat},${lng});
      way["tourism"="guest_house"](around:${radius},${lat},${lng});
      node["tourism"="hostel"](around:${radius},${lat},${lng});
      way["tourism"="hostel"](around:${radius},${lat},${lng});
      node["tourism"="motel"](around:${radius},${lat},${lng});
      way["tourism"="motel"](around:${radius},${lat},${lng});
      node["tourism"="lodge"](around:${radius},${lat},${lng});
      way["tourism"="lodge"](around:${radius},${lat},${lng});
      node["tourism"="resort"](around:${radius},${lat},${lng});
      way["tourism"="resort"](around:${radius},${lat},${lng});
      node["building"="hotel"](around:${radius},${lat},${lng});
      node["name"~"lodge|hotel|inn|resort|residency",i](around:${radius},${lat},${lng});
      way["name"~"lodge|hotel|inn|resort|residency",i](around:${radius},${lat},${lng});
    `;
  } else if (category === 'hospital') {
    extraNodes = `
      node["amenity"="pharmacy"](around:${radius},${lat},${lng});
      way["amenity"="pharmacy"](around:${radius},${lat},${lng});
      node["amenity"="clinic"](around:${radius},${lat},${lng});
      way["amenity"="clinic"](around:${radius},${lat},${lng});
      node["amenity"="doctors"](around:${radius},${lat},${lng});
      node["amenity"="police"](around:${radius},${lat},${lng});
    `;
  } else if (category === 'atm') {
    extraNodes = `
      node["amenity"="bank"](around:${radius},${lat},${lng});
      way["amenity"="bank"](around:${radius},${lat},${lng});
    `;
  } else if (category === 'transit') {
    extraNodes = `
      node["railway"="station"](around:${radius},${lat},${lng});
      way["railway"="station"](around:${radius},${lat},${lng});
      node["amenity"="taxi"](around:${radius},${lat},${lng});
      node["highway"="bus_stop"](around:${radius},${lat},${lng});
    `;
  }

  const tagQuery = category === 'tourist' 
    ? '"tourism"~"attraction|museum|viewpoint|theme_park|zoo|aquarium|gallery|picnic_site"' 
    : tag;

  const query = `
    [out:json];
    (
      node[${tagQuery}](around:${radius},${lat},${lng});
      way[${tagQuery}](around:${radius},${lat},${lng});${extraNodes}
    );
    out center;
  `;

  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: query
    });
    const data = await response.json();
    if (!data || !data.elements) {
      console.warn("Invalid data returned from Overpass proxy:", data);
      return [];
    }
    
    const mapped = data.elements.map((element, idx) => {
      const tags = element.tags || {};
      
      const brands = [
        { key: 'bharat', name: 'Bharat Petroleum' },
        { key: 'bpcl', name: 'Bharat Petroleum' },
        { key: 'hp', name: 'HP Petroleum' },
        { key: 'hindustan', name: 'HP Petroleum' },
        { key: 'hpcl', name: 'HP Petroleum' },
        { key: 'indian oil', name: 'Indian Oil' },
        { key: 'iocl', name: 'Indian Oil' },
        { key: 'shell', name: 'Shell' },
        { key: 'reliance', name: 'Reliance' },
        { key: 'jio', name: 'Jio-bp' },
        { key: 'nayara', name: 'Nayara Energy' }
      ];

      let detectedBrand = null;
      for (const [key, value] of Object.entries(tags)) {
        const lowerVal = String(value).toLowerCase();
        const found = brands.find(b => lowerVal.includes(b.key));
        if (found) {
          detectedBrand = found;
          break;
        }
      }

      const rawName = tags.name || tags['name:en'] || tags.short_name || tags.official_name;
      const isGenericName = !rawName || rawName.toLowerCase() === 'petrol station' || rawName.toLowerCase() === 'fuel';
      
      let defaultName = `${category.charAt(0).toUpperCase() + category.slice(1)} Spot`;
      if (category === 'petrol') defaultName = 'Bharat Petrol Bunk';
      else if (category === 'hospital') defaultName = tags.amenity === 'police' ? 'Police Outpost' : (tags.amenity === 'pharmacy' ? '24/7 Pharmacy' : 'Medical Hospital');
      else if (category === 'atm') defaultName = tags.amenity === 'atm' ? 'ATM Cashpoint' : 'Bank Branch';
      else if (category === 'transit') defaultName = tags.railway === 'station' ? 'Railway Station' : 'Bus Stop';

      let name = (isGenericName && detectedBrand) ? detectedBrand.name :
                   (rawName || 
                   tags.brand || 
                   tags.operator || 
                   (detectedBrand ? detectedBrand.name : null) ||
                   defaultName);
      
      if (category === 'petrol') {
        name = name.replace(/Hindustan Petroleum/gi, 'HP Petroleum');
        name = name.replace(/Hindustan/gi, 'HP Petroleum');
        if (name.toLowerCase() === 'hp' || name.toLowerCase() === 'hpcl') name = 'HP Petroleum';
        if (name.toLowerCase().includes('bharat') || name.toLowerCase() === 'bp' || name.toLowerCase() === 'bpcl') name = 'Bharat Petroleum';
      }

      const id = element.id;
      const pLat = element.lat || (element.center && element.center.lat);
      const pLng = element.lon || (element.center && element.center.lon);
      const dist = calculateDistance(lat, lng, pLat, pLng);

      // Random assignment for dishes, crowd status, and virtual 360 preview
      const dishMeta = signatureDishes[id % signatureDishes.length];
      const crowdLevels = ['Low Crowd (Best Time)', 'Moderate Crowd', 'Peak Rush'];
      const crowdStatus = crowdLevels[id % crowdLevels.length];
      const bestSlots = ['8:00 AM - 10:30 AM', '4:00 PM - 6:30 PM', '11:00 AM - 2:00 PM'];
      const bestTimeSlot = bestSlots[id % bestSlots.length];

      let imageUrl = '';
      if (category === 'petrol') {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('bharat') || lowerName.includes('bpcl')) {
          imageUrl = '/assets/images/bharat_petroleum.jpg';
        } else if (lowerName.includes('hp') || lowerName.includes('hindustan')) {
          imageUrl = '/assets/images/hp_petrol.jpg';
        } else if (lowerName.includes('indian oil') || lowerName.includes('iocl')) {
          imageUrl = '/assets/images/indian_oil.jpg';
        } else {
          imageUrl = `https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=400&q=80`;
        }
      } else {
        const imageCategoryMap = {
          hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
          restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
          mechanic: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&q=80',
          tourist: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
          hospital: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&q=80',
          atm: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=80',
          transit: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=400&q=80'
        };
        imageUrl = imageCategoryMap[category] || `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80`;
      }

      return {
        id,
        name,
        lat: pLat,
        lng: pLng,
        category,
        address: tags['addr:full'] || tags['addr:street'] || tags['addr:place'] || 'Accessible via GPS route',
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        distance: parseFloat(dist.toFixed(1)),
        image: imageUrl,
        signatureDish: category === 'restaurant' ? dishMeta.dish : null,
        dishPrice: category === 'restaurant' ? dishMeta.price : null,
        dietType: category === 'restaurant' ? dishMeta.diet : null,
        crowdStatus,
        bestTimeSlot,
        streetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${pLat},${pLng}`,
        audioStory: `Welcome to ${name}. Located in this vibrant tourism region, this landmark is celebrated for its unique cultural ambiance, stunning surroundings, and authentic hospitality. The best time to visit is during ${bestTimeSlot}. Be sure to experience the local sights and capture memorable viewpoints.`
      };
    });

    const maxFilterDistance = category === 'tourist' ? 45.0 : 4.0;
    return mapped.filter(item => item.distance <= maxFilterDistance);
  } catch (error) {
    console.error("Overpass API error:", error);
    return [];
  }
};
