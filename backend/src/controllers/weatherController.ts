import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';

const weatherService = new WeatherService();

export const getWeatherByCoordinates = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const weather = await weatherService.getWeatherByCoordinates(lat, lon);
    res.json(weather);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

export const getWeatherByCity = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const result = await weatherService.getWeatherByCity(city as string);
    res.json(result);
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    
    if (error instanceof Error && error.message === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
