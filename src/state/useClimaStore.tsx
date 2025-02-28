import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ClimaStore } from "../types/types";
import { capitalize, formatDate2, formatHour, traducirFaseLunar } from "../utils/utils";

// scripts
import Michi from "../scripts/Michi";

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
      forecastTomorrow: { img: "", condition: "" },
      airQuality: { calidadDelAire: "No disponible", descripcion: "No disponible" },
      uv: { index: 0, text: "", recomendacion: "" },
      condicionHorasFijas: [],
      salidaDelSolMañana: "",
      puestaDelSolMañana: "",
      faseLunar: "",
      llovera: 0,
      horaActual: "",
      siguientes24Horas: [],
    },
    // estado geolocalización
    geolocation: { latitude: 0, longitude: 0 },
    // otros estados
    LavarRopa: { booleano: false, siguientesCuatroHoras: [] },
    errores: [],
    isLoading: false,
    modoMichi: false,

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
          // set((state) => { state.isLoading = true; });
          const response = await fetch(`/api/getWeather?lat=${lat}&lon=${lon}`);
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          } else { }
          const data = await response.json();
          const dataAirQuality = data.current.air_quality["us-epa-index"];

          let airQualityTotal = { calidadDelAire: "No disponible", descripcion: "No disponible" };
          switch (dataAirQuality) {
            case 1:
              airQualityTotal = { calidadDelAire: "Buena", descripcion: "La calidad del aire es satisfactoria y la contaminación atmosférica supone poco o ningún riesgo." };
              break;
            case 2:
              airQualityTotal = { calidadDelAire: "Moderada", descripcion: "La calidad del aire es aceptable. Sin embargo, puede suponer un riesgo para algunas personas, particularmente para aquellas que son sensibles a la contaminación del aire." };
              break;
            case 3:
              airQualityTotal = { calidadDelAire: "No saludable para grupos sensibles", descripcion: "Los miembros de grupos sensibles pueden sufrir efectos sobre la salud. El público en general tiene menos probabilidades de verse afectado." };
              break;
            case 4:
              airQualityTotal = { calidadDelAire: "No saludable", descripcion: "Algunos miembros del público en general pueden experimentar efectos sobre la salud; los miembros de grupos sensibles pueden experimentar efectos sobre la salud más graves." };
              break;
            case 5:
              airQualityTotal = { calidadDelAire: "Peligrosa", descripcion: "Alerta sanitaria: El riesgo de sufrir efectos sobre la salud aumenta para todas las personas." };
              break;
            case 6:
              airQualityTotal = { calidadDelAire: "MUY Peligrosa", descripcion: "Advertencia sanitaria sobre condiciones de emergencia: todas las personas tienen mayor probabilidad de verse afectados." };
              break;
            default:
              airQualityTotal = { calidadDelAire: "No disponible", descripcion: "No disponible" };
          }

          const currentUV: number = Math.round(data.current.uv);
          let dataUV;
          if (currentUV <= 2) {
            dataUV = { index: currentUV, text: "Bajo", recomendacion: "No necesita protección. Puede permanecer al aire libre con seguridad usando una protección solar mínima.." };
          } else if (currentUV >= 3 && currentUV <= 7) {
            dataUV = { index: currentUV, text: "Moderado a alto", recomendacion: "Se necesita protección. Busque la sombra desde la mañana hasta la media tarde. Cuando esté al aire libre, aplique generosamente protector solar de amplio espectro FPS-15 o superior sobre la piel expuesta y use ropa protectora, un sombrero de ala ancha y gafas de sol." };
          } else if (currentUV >= 8) {
            dataUV = { index: currentUV, text: "Muy alto a extremo", recomendacion: "Se necesita protección adicional. Tenga cuidado al aire libre, especialmente desde la mañana hasta la media tarde. Si su sombra es más corta que usted, busque la sombra y use ropa protectora, un sombrero de ala ancha y gafas de sol, y aplique generosamente un mínimo de protector solar de amplio espectro con FPS-15 sobre la piel expuesta." };
          } else {
            dataUV = { index: currentUV, text: "No disponible", recomendacion: "No disponible." };
          }

          let imgMichi = await Michi({ condicion: data.current.condition.text });
          let imgMichiMañana = await Michi(data.forecast.forecastday[1].day.condition.text);

          const { modoMichi } = get();

          set((state) => {
            state.weather = {
              condition: data.current.condition.text,
              temperature: data.current.temp_c,
              wind: data.current.wind_kph,
              location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
              img: modoMichi ? imgMichi : data.current.condition.icon,
              feelsLike: data.current.heatindex_c,
              humidity: data.current.humidity,
              alerts:
                data.alerts && data.alerts.alert && data.alerts.alert.length > 0
                  ? capitalize(data.alerts.alert[0].headline)
                  : "No hay alertas para esta ubicación hoy.",
              forecastTomorrow: {
                img: modoMichi ? imgMichiMañana : data.forecast.forecastday[1].day.condition.icon,
                condition: data.forecast.forecastday[1].day.condition.text,
              },
              airQuality: airQualityTotal,
              uv: dataUV,
              condicionHorasFijas: [
                data.forecast.forecastday[0].hour[8].condition.text,
                data.forecast.forecastday[0].hour[12].condition.text,
                data.forecast.forecastday[0].hour[16].condition.text,
                data.forecast.forecastday[0].hour[20].condition.text
              ],
              salidaDelSolMañana: data.forecast.forecastday[1].astro.sunrise,
              puestaDelSolMañana: data.forecast.forecastday[1].astro.sunset,
              faseLunar: traducirFaseLunar(data.forecast.forecastday[0].astro.moon_phase),
              llovera: data.forecast.forecastday[0].day.daily_will_it_rain,
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
      const siguientes24Horas: { time: string; condition: { text: string } }[] = weather.siguientes24Horas;

      const siguientesCuatroHoras: string[] = [];

      for (let i = 0; i <= siguientes24Horas.length; i++) {
        if (siguientes24Horas[i].time === horaActual) {
          siguientesCuatroHoras.push(`${formatHour(siguientes24Horas[i + 1].time)}: ${siguientes24Horas[i].condition.text}`);
          siguientesCuatroHoras.push(`${formatHour(siguientes24Horas[i + 2].time)}: ${siguientes24Horas[i + 1].condition.text}`);
          siguientesCuatroHoras.push(`${formatHour(siguientes24Horas[i + 3].time)}: ${siguientes24Horas[i + 2].condition.text}`);
          siguientesCuatroHoras.push(`${formatHour(siguientes24Horas[i + 4].time)}: ${siguientes24Horas[i + 3].condition.text}`);
          break;
        }
      }

      if (siguientesCuatroHoras.every(condicion => condicion.includes("Soleado")
        || condicion.includes("Despejado")
        || condicion.includes("Parcialmente nublado"))) {
        console.log("Siguientes cuatro horas:", siguientesCuatroHoras);
        set((state) => {
          state.LavarRopa = { booleano: true, siguientesCuatroHoras: siguientesCuatroHoras };
        });
      } else {
        set((state) => {
          state.LavarRopa = { booleano: false, siguientesCuatroHoras: siguientesCuatroHoras };
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
    setModoMichi: () => {
      set((state) => {
        state.modoMichi = !state.modoMichi;
      });
    }
  })),
  {
    name: "useClimaStore", // Nombre en el local storage
  }
)
);

export default useClimaStore;