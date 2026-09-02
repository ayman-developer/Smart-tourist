import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.text()); // To accept raw Overpass QL query text

// Geocode proxy endpoint
app.get('/api/geocode', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SmartTouristAssistant/1.0'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({ error: 'Failed to reverse geocode' });
  }
});

// Enhanced Weather proxy endpoint (includes forecast & apparent temp)
app.get('/api/weather', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// OSRM Driving Route proxy endpoint
app.get('/api/route', async (req, res) => {
  const { coordinates } = req.query;
  if (!coordinates) {
    return res.status(400).json({ error: 'Coordinates param (lng,lat;lng,lat) is required' });
  }
  try {
    const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OSRM responded with status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('OSRM route error:', error.message);
    res.status(500).json({ error: 'Failed to calculate driving route' });
  }
});

const overpassInstances = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.n.openstreetmap.de/api/interpreter'
];

// Overpass API proxy endpoint
app.post('/api/places', async (req, res) => {
  const query = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Overpass query is required' });
  }

  for (const url of overpassInstances) {
    try {
      console.log(`Trying Overpass instance: ${url}`);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SmartTouristAssistant/1.0'
        },
        body: `data=${encodeURIComponent(query)}`
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Successfully fetched from ${url}`);
        return res.json(data);
      }
      console.warn(`Instance ${url} returned status: ${response.status}`);
    } catch (err) {
      console.error(`Failed to fetch from ${url}:`, err.message);
    }
  }

  res.status(502).json({ error: 'All public Overpass API instances timed out or failed.' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
