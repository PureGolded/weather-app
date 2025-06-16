# Weather App

A modern weather application built with TypeScript backend and React frontend featuring glassmorphism design.

## Features

- 🌍 Search weather by city name
- 📍 Get weather for current location (using geolocation)
- 🕐 12-hour forecast display
- 🎨 Modern glassmorphism UI with transparent effects
- 📱 Responsive design
- ⚡ TypeScript for type safety
- 🌡️ Temperature, humidity, and wind speed display

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js
- Open-Meteo API (no API key required)
- CORS enabled

### Frontend
- React with TypeScript
- Modern CSS with glassmorphism effects
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install root dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode (Both servers)
From the root directory:
```
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000) concurrently.

#### Individual Servers

**Backend only:**
```
cd backend
npm run dev
```

**Frontend only:**
```
cd frontend
npm start
```

### Building for Production

From the root directory:
```
npm run build
```

### Starting Production Server

From the root directory:
```
npm start
```

## API Endpoints

- `GET /api/weather/coordinates?latitude={lat}&longitude={lon}` - Get weather by coordinates
- `GET /api/weather/city?city={cityName}` - Get weather by city name
- `GET /health` - Health check endpoint

## Project Structure

```
weather-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── README.md
```

## Usage

1. **Search by City**: Enter a city name in the search bar and press enter or click the search button
2. **Use Current Location**: Click the "Use My Location" button to get weather for your current position
3. **View Forecast**: Scroll through the 12-hour forecast to see upcoming weather conditions

## Weather Data Source

This application uses the [Open-Meteo API](https://open-meteo.com/), which provides free weather data without requiring an API key.

## License

MIT License
