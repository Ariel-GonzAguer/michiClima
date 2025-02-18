import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ClimaStore } from "../types/types";
import { capitalize } from "../utils/utils";



const useClimaStore = create<ClimaStore>()(persist(
  immer((set, get) => ({
    // estado clima
    weather: {
      condition: "",
      temperature: 0,
      wind: 0,
      location: "",
      img: "",
      feelsLike: 0,
      humidity: 0,
      alerts: "",
      forecastTomorrow: [],
      airQuality: 0,
    },
    // estado geolocalización
    geolocation: { latitude: 0, longitude: 0 },
    // otros estados
    LavarRopa: false,
    errores: [],
    isLoading: false,

    // acciones 
    getGeolocation: () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              set((state) => {
                state.geolocation = { latitude, longitude };
              });
              resolve(position);
            },
            (error) => {
              set((state) => {
                state.errores.push(error.message);
              });
              reject(error);
            },
            {
              enableHighAccuracy: true,
            }
          );
        }
      });
    },

    getWeather: async (lat: number, lon: number) => {
      {
        try {
          const response = await fetch(`/api/getWeather?lat=${lat}&lon=${lon}`);
          const data = await response.json();

          set((state) => {
            state.weather = {
              condition: data.current.condition.text,
              temperature: data.current.temp_c,
              wind: data.current.wind_kph,
              location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
              img: data.current.condition.icon,
              feelsLike: data.current.heatindex_c,
              humidity: data.current.humidity,
              alerts:
                data.alerts && data.alerts.alert && data.alerts.alert.length > 0
                  ? capitalize(data.alerts.alert[0].headline)
                  : "No hay alertas para esta ubicación hoy.",
              forecastTomorrow: data.forecast.forecastday[1],
              airQuality: data.current.air_quality["gb-defra-index"],
            };
          });
        } catch (error: any) {
          set((state) => {
            state.errores.push(error.message);
          });
        }
      }
    },

    setLavarRopa: (value: boolean) => {
      set((state: any) => {
        state.LavarRopa = value;
      });
    },
    setWeather: async () => {
      set(state => { state.isLoading = true; });

      const { getGeolocation } = get();
      await getGeolocation();
      const { geolocation } = get();
      const { latitude, longitude } = geolocation;
      const { getWeather } = get();
      await getWeather(latitude, longitude);

      set(state => { state.isLoading = false; });

    },
  })),
  {
    name: "useClimaStore", // Nombre de la clave en el local storage
  }
)
);

export default useClimaStore;