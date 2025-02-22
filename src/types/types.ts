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
  fullForecast: any;
  airQuality: string;
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
  isLoading: boolean;
  getGeolocation: () => void;
  getWeather: (lat: number, lon: number) => Promise<void>;
  setWeather: () => Promise<void>;
  setLavarRopa: () => void;
}
