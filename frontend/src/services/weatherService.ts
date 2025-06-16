import { WeatherData, WeatherResponse, LocationData } from '../types/weather';

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
  async checkLocationPermission(): Promise<string> {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state;
    }
    
    return 'prompt';
  }

  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve, 
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location access denied. Please enable location permissions in your browser settings.'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable. Please try again.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out. Please try again.'));
              break;
            default:
              reject(new Error('An unknown error occurred while retrieving location.'));
              break;
          }
        }, 
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  async searchCities(query: string): Promise<LocationData[]> {
    if (query.length < 2) return [];
    
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to search cities');
    }
    
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((location: any) => ({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country
    }));
  }
}
