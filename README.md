# Smart Tourist Assistant

An AI-powered, real-time travel companion designed to help users navigate cities, discover essential points of interest (POIs), optimize travel routes, and check current local weather conditions.

The application is structured as a fullstack app with a React frontend and an Express backend proxy to handle API requests securely.

---

## Features

- 📍 **Precision POI Discovery**: Locate Petrol Bunks, Lodges, Restaurants, and Mechanic Shops. All searches are strictly restricted to a **4 km radius** of the user's current coordinates.
- ⚡ **Location-Aware Caching**: Automatically invalidates the local storage cache if the user's location changes by checking coordinates before loading cached data.
- 🗺️ **Interactive Maps**: Powered by OpenStreetMap (CartoDB Dark Matter tiles) and Leaflet, displaying custom-styled markers for user location and POIs.
- 🧭 **Route Optimization**: Features a one-click route optimizer that sequences stops based on the nearest-neighbor algorithm to plan your trip efficiently.
- 🚨 **Emergency Toolkit**: Provides single-tap shortcuts to locate nearby Hospitals, Police Stations, and Mechanics.
- 🌤️ **Real-Time Weather Widget**: Shows local temperature, wind speed, humidity, and condition forecasts.
- 🤖 **Interactive Travel Chatbot**: A responsive chatbot with fluid micro-animations powered by Framer Motion.

---

## Tech Stack

### Frontend
- **Framework**: React 19 (JavaScript)
- **Build Tool**: Vite
- **Routing**: React Router DOM 7
- **Styling**: Vanilla CSS, Glassmorphic Panels
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Map Library**: Leaflet & React Leaflet 5

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Middleware**: CORS, Express JSON & Text parsers

### API Sourcing
- **Overpass API**: Sourced for geographic POI data.
- **Nominatim API**: Sourced for reverse geocoding (coordinates to addresses).
- **Open-Meteo**: Sourced for real-time weather forecasts.

---

## Project Structure

```text
Smart Tourist Assistant/
├── frontend/                 # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # UI Components (Sidebar, Map, Chatbot, Weather)
│   │   ├── styles/           # CSS files (Landing page, Glassmorphism styles)
│   │   ├── utils/            # API helpers and Haversine distance calculator
│   │   ├── App.jsx           # App routing setup
│   │   └── main.jsx          # App entry point
│   ├── package.json          # Frontend configuration and scripts
│   └── vite.config.js        # Vite config with API backend proxying
├── backend/                  # Express proxy backend application
│   ├── server.js             # Main server logic and endpoints
│   └── package.json          # Backend configuration and scripts
├── package.json              # Root package.json for concurrent scripts
├── .gitignore                # Git ignore configuration
└── README.md                 # Project documentation
```

---

## Design System

The application implements a premium, modern design language:
- **Color Palette**:
  - Primary Indigo (`#6366f1` / `rgb(99, 102, 241)`)
  - Secondary Rose (`#ec4899`)
  - Dark Background (`#090d16` / `#0f172a`)
- **Aesthetics**:
  - Glassmorphic panels featuring translucent backgrounds (`rgba(255, 255, 255, 0.03)`) and subtle border glares.
  - Custom scrollbars, fluid micro-animations, and hover transitions.
- **Typography**: Uses clean, geometric sans-serif fonts to ensure maximum legibility and responsiveness across devices.

---

## Key Core Implementations

### 1. Strict 4 km Radius Filter (Haversine Formula)
To guarantee that users only see POIs within their immediate vicinity, the app calculates the geodesic distance in kilometers between the user's location and each POI using the Haversine formula:

$$\text{distance} = 2 R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta \text{lng}}{2}\right)}\right)$$

Any POI with a calculated distance $> 4.0$ km is strictly excluded from the results before rendering.

### 2. Smart Location-Aware Caching
To maintain fast load times without showing stale data when the user moves:
- Before loading from the localStorage cache, the application checks if every item in the cache lies within 4 km of the user's *current* coordinates.
- If the user has moved, the cache is automatically bypassed, and a fresh query is dispatched to the Overpass API to fetch local points.

---

## Quick Start

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 2. Installation
From the root directory, run the helper command to install dependencies for both the frontend and backend:
```bash
npm run install-all
```

### 3. Running in Development
Start both the React development server and the Express backend proxy concurrently:
```bash
npm run dev
```
- **Frontend** will be running at [http://localhost:5173/](http://localhost:5173/)
- **Backend** will be running at [http://localhost:5000/](http://localhost:5000/)

### 4. Building for Production
Build the frontend for production:
```bash
npm run build
```
The output will be generated in `frontend/dist/`.
