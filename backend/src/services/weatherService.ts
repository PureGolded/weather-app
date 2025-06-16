import axios from 'axios';
import { WeatherData, LocationData } from '../types/weather';

export class WeatherService {
  private async getCoordinates(city: string): Promise<LocationData> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const response = await axios.get(url);
    
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('City not found');
    }

    const location = response.data.results[0];
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country
    };
  }

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=auto&forecast_days=1`;
    
    const response = await axios.get(url);
    return response.data;
  }

  async getWeatherByCity(city: string) {
    const location = await this.getCoordinates(city);
    const weather = await this.getWeatherByCoordinates(location.latitude, location.longitude);
    
    return {
      location,
      weather
    };
  }
}
