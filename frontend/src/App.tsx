import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import LocationButton from './components/LocationButton/LocationButton';
import WeatherCard from './components/WeatherCard/WeatherCard';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { WeatherService } from './services/weatherService';
import { WeatherData, LocationData, HourlyForecast as HourlyForecastType } from './types/weather';

const weatherService = new WeatherService();

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processHourlyData = (weatherData: WeatherData): HourlyForecastType[] => {
    const { hourly } = weatherData;
    return hourly.time.map((time, index) => ({
      time,
      temperature: hourly.temperature_2m[index],
      humidity: hourly.relative_humidity_2m[index],
      weatherCode: hourly.weather_code[index]
    }));
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await weatherService.getWeatherByCity(city);
      setWeather(result.weather);
      setLocation(result.location);
      setHourlyForecast(processHourlyData(result.weather));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setLocation(null);
      setHourlyForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const permissionState = await weatherService.checkLocationPermission();
      
      if (permissionState === 'denied') {
        setError('Location access is denied. Please enable location permissions in your browser settings and try again.');
        setLoading(false);
        return;
      }

      const position = await weatherService.getCurrentLocation();
      const weatherData = await weatherService.getWeatherByCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      
      setWeather(weatherData);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        name: 'Current Location',
        country: ''
      });
      setHourlyForecast(processHourlyData(weatherData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location or weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Weather App</h1>
          <p>Get current weather and hourly forecast</p>
        </header>

        <main className="app-main">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <LocationButton onLocationRequest={handleLocationRequest} loading={loading} />

          {error && <div className="error-message">{error}</div>}

          {loading && <LoadingSpinner />}

          {weather && !loading && (
            <>
              <WeatherCard weather={weather} location={location || undefined} />
              {hourlyForecast.length > 0 && (
                <HourlyForecast hourlyData={hourlyForecast} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
