import { Router } from 'express';
import { getWeatherByCoordinates, getWeatherByCity } from '../controllers/weatherController';

const router = Router();

router.get('/coordinates', getWeatherByCoordinates);
router.get('/city', getWeatherByCity);

export default router;
