import React from 'react';
import { HourlyForecast } from '../../types/weather';
import { getWeatherIcon, formatTime } from '../../utils/weatherUtils';
import './HourlyForecast.css';

interface HourlyForecastProps {
  hourlyData: HourlyForecast[];
}

const HourlyForecastComponent: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const next12Hours = hourlyData.slice(0, 12);

  return (
    <div className="hourly-forecast">
      <h3 className="forecast-title">12-Hour Forecast</h3>
      <div className="forecast-container">
        {next12Hours.map((hour, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-time">
              {formatTime(hour.time)}
            </div>
            <div className="forecast-icon">
              {getWeatherIcon(hour.weatherCode)}
            </div>
            <div className="forecast-temp">
              {Math.round(hour.temperature)}°
            </div>
            <div className="forecast-humidity">
              {hour.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastComponent;
