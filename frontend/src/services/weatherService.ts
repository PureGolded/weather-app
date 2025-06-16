import { WeatherData, WeatherResponse } from '../types/weather';

const API_BASE_URL = 'http://localhost:5000/api';

export class WeatherService {
  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
    const response = await fetch(`${API_BASE_URL}/weather/coordinates?latitude=${latitude}&longitude=${longitude}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
  }

  async getWeatherByCity(city: string): Promise<WeatherResponse> {
    const response = await fetch(`${API_BASE_URL}/weather/city?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch weather data');
    }
    
    return response.json();
  }

  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      });
    });
  }
}
