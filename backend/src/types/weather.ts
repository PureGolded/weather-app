export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export interface WeatherResponse {
  location: LocationData;
  weather: WeatherData;
}
