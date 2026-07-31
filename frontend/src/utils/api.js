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

// Weather Fetching using Open-Meteo
export const getCurrentWeather = async (lat, lng) => {
  try {
    const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
    const data = await response.json();
    
    if (!data.current) throw new Error("No weather data");

    const weatherCodes = {
      0: 'Sunny', 1: 'Sunny', 2: 'Cloudy', 3: 'Cloudy',
      45: 'Foggy', 48: 'Foggy',
      51: 'Rainy', 53: 'Rainy', 55: 'Rainy',
      61: 'Rainy', 63: 'Rainy', 65: 'Rainy',
      80: 'Rainy', 81: 'Rainy', 82: 'Rainy'
    };

    return {
      temp: Math.round(data.current.temperature_2m),
      condition: weatherCodes[data.current.weather_code] || 'Sunny',
      humidity: data.current.relative_humidity_2m,
      wind: Math.round(data.current.wind_speed_10m)
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return { temp: 28, condition: 'Sunny', humidity: 45, wind: 12 };
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
  const radius = category === 'tourist' ? 45000 : 4000; // 45km for tourist places, 4km for others

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

  // Optimize tag query for tourist category to avoid timeouts and generic items
  const tagQuery = category === 'tourist' 
    ? '"tourism"~"attraction|museum|viewpoint|theme_park|zoo|aquarium|gallery|picnic_site"' 
    : tag;

  // Overpass QL query
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
    
    const mapped = data.elements.map((element, idx) => {
      const tags = element.tags || {};
      
      // Define brands and their specific search tags
      const brands = [
        { key: 'bharat', name: 'Bharat Petroleum', tags: 'bharat,petroleum,station,india' },
        { key: 'bpcl', name: 'Bharat Petroleum', tags: 'bharat,petroleum,station,india' },
        { key: 'hp', name: 'HP Petroleum', tags: 'hindustan,petroleum,station,hp' },
        { key: 'hindustan', name: 'HP Petroleum', tags: 'hindustan,petroleum,station,hp' },
        { key: 'hpcl', name: 'HP Petroleum', tags: 'hindustan,petroleum,station,hp' },
        { key: 'indian oil', name: 'Indian Oil', tags: 'indian,oil,petrol,station' },
        { key: 'iocl', name: 'Indian Oil', tags: 'indian,oil,petrol,station' },
        { key: 'shell', name: 'Shell', tags: 'shell,gas,station,logo' },
        { key: 'reliance', name: 'Reliance', tags: 'reliance,petrol,station' },
        { key: 'jio', name: 'Jio-bp', tags: 'reliance,jio,petrol,station' },
        { key: 'nayara', name: 'Nayara Energy', tags: 'nayara,energy,petrol' },
        { key: 'essar', name: 'Essar', tags: 'essar,petrol' }
      ];

      // Aggressive brand detection: search in ALL tags
      let detectedBrand = null;
      const brandSearchKeys = brands.map(b => b.key);
      
      for (const [key, value] of Object.entries(tags)) {
        const lowerVal = String(value).toLowerCase();
        const found = brands.find(b => lowerVal.includes(b.key));
        if (found) {
          detectedBrand = found;
          break;
        }
      }

      // If we have a detected brand, we use its official name as priority if name is missing or generic
      const rawName = tags.name || tags['name:en'] || tags.short_name || tags.official_name;
      const isGenericName = !rawName || rawName.toLowerCase() === 'petrol station' || rawName.toLowerCase() === 'fuel';
      
      let defaultName = `${category.charAt(0).toUpperCase() + category.slice(1)} Spot`;
      if (category === 'petrol') defaultName = 'Bharat Petrol Bunk';
      else if (category === 'hospital') defaultName = tags.amenity === 'pharmacy' ? 'Local Pharmacy' : 'Medical Center';
      else if (category === 'atm') defaultName = tags.amenity === 'atm' ? 'ATM Cashpoint' : 'Bank Branch';
      else if (category === 'transit') defaultName = tags.railway === 'station' ? 'Railway Station' : 'Bus Stop';

      let name = (isGenericName && detectedBrand) ? detectedBrand.name :
                   (rawName || 
                   tags.brand || 
                   tags.operator || 
                   tags['brand:en'] || 
                   tags['operator:en'] || 
                   (detectedBrand ? detectedBrand.name : null) ||
                   defaultName);
      
      // Global rename for Hindustan Petroleum variations
      name = name.replace(/Hindustan Petroleum/gi, 'HP Petroleum');
      name = name.replace(/Hindustan/gi, 'HP Petroleum');
      if (name.toLowerCase() === 'hp' || name.toLowerCase() === 'hpcl') {
        name = 'HP Petroleum';
      }

      // Global rename for Bharat Petroleum variations
      if (name.toLowerCase().includes('bharat') || name.toLowerCase() === 'bp' || name.toLowerCase() === 'bpcl' || name.toLowerCase().includes('sundaram')) {
        name = 'Bharat Petroleum';
      }

      const id = element.id;
      let searchTags = `${category},station`;
      
      // Try to find a brand match in the name or tags for imagery
      const lowerName = name.toLowerCase();
      const matchedBrand = detectedBrand || brands.find(b => 
        lowerName.includes(b.key)
      );
      
      if (matchedBrand) {
        searchTags = matchedBrand.tags;
      } else {
        // Fallback to name if it's descriptive
        searchTags = `${category},${name.replace(/\s+/g, ',')}`;
      }

      const pLat = element.lat || (element.center && element.center.lat);
      const pLng = element.lon || (element.center && element.center.lon);
      const dist = calculateDistance(lat, lng, pLat, pLng);

      return {
        id,
        name,
        lat: pLat,
        lng: pLng,
        address: tags['addr:full'] || tags['addr:street'] || tags['addr:place'] || 'Address available in navigation',
        rating: (Math.random() * 2 + 3).toFixed(1),
        distance: parseFloat(dist.toFixed(1)),
        image: (name.toLowerCase().includes('bharat') || name.toLowerCase().includes('bpcl')) ? '/assets/images/bharat_petroleum.jpg' : 
               (name.toLowerCase().includes('hp') || name.toLowerCase().includes('hindustan')) ? '/assets/images/hp_petrol.jpg' :
               (name.toLowerCase().includes('indian oil') || name.toLowerCase().includes('iocl')) ? '/assets/images/indian_oil.jpg' :
               `https://loremflickr.com/400/250/${searchTags}?lock=${id % 1000}`
      };
    });

    // Filter strictly within the radius limit (45km for tourist places, 4km for others)
    const maxFilterDistance = category === 'tourist' ? 45.0 : 4.0;
    return mapped.filter(item => item.distance <= maxFilterDistance);
  } catch (error) {
    console.error("Overpass API error:", error);
    return [];
  }
};
