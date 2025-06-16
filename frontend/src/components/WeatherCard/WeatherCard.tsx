import React from 'react';
import { WeatherData, LocationData } from '../../types/weather';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherUtils';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
  location?: LocationData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, location }) => {
  const { current } = weather;
  
  return (
    <div className="weather-card">
      <div className="weather-header">
        {location && (
          <div className="location-info">
            <h2>{location.name}</h2>
            <p>{location.country}</p>
          </div>
        )}
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(current.weather_code)}
        </div>
        <div className="temperature">
          {Math.round(current.temperature_2m)}°C
        </div>
        <div className="weather-description">
          {getWeatherDescription(current.weather_code)}
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{current.wind_speed_10m} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
