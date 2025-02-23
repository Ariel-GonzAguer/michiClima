import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ClimaStore } from "../types/types";
import { capitalize, formatDate2 } from "../utils/utils";

const useClimaStore = create<ClimaStore>()(persist(
  immer<ClimaStore>((set, get) => ({
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
      fullForecast: [],
      airQuality: "No disponible",
      horaActual: "",
      siguientes24Horas: [],
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
                // Eliminar el mensaje de error específico del array de errores
                state.errores = state.errores.filter(
                  (error) => error !== "Permisos de ubicación no otorgados. Por favor, habilite los permisos de ubicación."
                );
              });
              resolve(position);
            },
            (error) => {
              set((state) => {
                state.errores.push("Permisos de ubicación no otorgados. Por favor, habilite los permisos de ubicación.");
              });
              reject({ error, mensaje: "Permisos de ubicación no otorgados. Por favor, habilite los permisos de ubicación." });
            },
            {
              enableHighAccuracy: true,
            }
          );
        } else {
          set((state) => {
            state.errores.push("Geolocalización no es soportada por este navegador.");
          });
          reject(new Error("Geolocalización no es soportada por este navegador."));
        }
      });
    },

    getWeather: async (lat: number, lon: number) => {
      {
        try {
          const response = await fetch(`/api/getWeather?lat=${lat}&lon=${lon}`);
          const data = await response.json();
          const dataAirQuality = data.current.air_quality["us-epa-index"];

          let airQualityDescription;
          switch (dataAirQuality) {
            case 1:
              airQualityDescription = "Buena";
              break;
            case 2:
              airQualityDescription = "Moderada";
              break;
            case 3:
              airQualityDescription = "No saludable para grupos sensibles";
              break;
            case 4:
              airQualityDescription = "No saludable";
              break;
            case 5:
              airQualityDescription = "Peligrosa";
              break;
            case 6:
              airQualityDescription = "MUY Peligrosa";
              break;
            default:
              airQualityDescription = "disponible";
          }

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
              fullForecast: data.forecast.forecastday,
              airQuality: airQualityDescription,
              horaActual: formatDate2(new Date(data.current.last_updated)),
              siguientes24Horas: data.forecast.forecastday[0].hour,
            };
          });

          get().setLavarRopa();
        } catch (error: any) {
          set((state) => {
            state.errores.push(error.message);
          });
        }
      }
    },

    setLavarRopa: () => {
      const { weather } = get();

      const horaActual: string = weather.horaActual;
      const condicionActual: string = weather.condition;
      const siguientes24Horas: { time: string; condition: { text: string } }[] = weather.siguientes24Horas;

      const siguientesCuatroHoras: string[] = [];
      siguientesCuatroHoras.push(condicionActual);

      for (let i = 0; i <= siguientes24Horas.length; i++) {
        if (siguientes24Horas[i].time === horaActual) {
          siguientesCuatroHoras.push(siguientes24Horas[i + 1].condition.text);
          siguientesCuatroHoras.push(siguientes24Horas[i + 2].condition.text);
          siguientesCuatroHoras.push(siguientes24Horas[i + 3].condition.text);
          break;
        }
      }

      if (siguientesCuatroHoras.every(condicion => condicion.includes("Soleado")
        || condicion.includes("Despejado")
        || condicion.includes("Parcialmente nublado"))) {
        // console.log("Siguientes cuatro horas:", siguientesCuatroHoras); 
        set((state) => {
          state.LavarRopa = true;
        });
      }
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
    name: "useClimaStore", // Nombre en el local storage
  }
)
);

export default useClimaStore;