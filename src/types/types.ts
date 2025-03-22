export interface WeatherData {
  condition: string;
  temperature: number;
  wind: number;
  location: string;
  img: string;
  feelsLike: number;
  humidity: number;
  alerts: string;
  forecastTomorrow: { img: string; condition: string };
  airQuality: {calidadDelAire: string, descripcion: string};
  uv: { index: number; text: string; recomendacion: string };
  condicionHorasFijas: string[];
  salidaDelSolMañana: string;
  puestaDelSolMañana: string;
  faseLunar: string;
  llovera: number;
  horaActual: string;
  siguientes24Horas: any[];
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface ClimaStore {
  weather: WeatherData;
  geolocation: Geolocation;
  LavarRopa: { booleano: boolean, siguientesCuatroHoras: string[] };
  errores: string[];
  isLoading: boolean;
  modoMichi: boolean;
  getGeolocation: () => void;
  getWeather: (lat: number, lon: number) => Promise<void>;
  setWeather: () => Promise<void>;
  setLavarRopa: () => void;
  setModoMichi: () => void;
}

export interface BotonProps {
  componente: string;
  texto: string;
}
