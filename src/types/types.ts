export interface WeatherData {
  condition: string;
  temperature: number;
  wind: number;
  location: string;
  img: string;
  feelsLike: number;
  humidity: number;
  alerts: string;
  forecastTomorrow: any;
  airQuality: number;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface ClimaStore {
  weather: WeatherData;
  geolocation: Geolocation;
  LavarRopa: boolean;
  errores: string[];
  getGeolocation: () => void;
  getWeather: (lat: number, lon: number) => Promise<void>;
  setLavarRopa: (value: boolean) => void;
  setWeather: () => Promise<void>;
}
