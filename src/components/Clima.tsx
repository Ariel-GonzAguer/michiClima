// utils/basics
import { useEffect, useState } from "react";
// import { formatDate } from "../utils/utils";

// store
import useClimaStore from "../state/useClimaStore";

// componentes
import Spinner from "./Spinner";

// estilos
import styles from "../styles/Clima.module.css";

export default function Clima() {
  const [errorPermisosUbicacion] = useState<string>("Permisos de ubicación no otorgados. Por favor, habilite los permisos de ubicación.");

  const { weather, geolocation, setWeather, isLoading, LavarRopa, errores, getGeolocation } = useClimaStore();

  async function handleGetWeather() {
    await setWeather();
  }

  useEffect(() => {
    handleGetWeather();
    // console.log(weather.forecastTomorrow);
    const intervalId = setInterval(() => {
      handleGetWeather();
    }, 900000); // se ejecuta cada 15 minutos
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (

    <section className={styles.climaSection}>

      {isLoading ? (
        <>
          <p>Cargando datos del clima...</p>
          <Spinner />
        </>
      ) : (
        <>

          {errores.length > 0 && (
            <div className={styles.error}>
              <p>{errores[errores.length - 1]}</p>
              {errores.includes(errorPermisosUbicacion) && (
                <button onClick={getGeolocation} className={styles.boton}>
                  Solicitar Permisos de Ubicación
                </button>
              )}
            </div>
          )}

          <section className={styles.ubicacionActual}>
            <p>{weather.location || "🌎"}</p>
            <p>Latitud: {geolocation.latitude || "✏️"}</p>
            <p>Longitud: {geolocation.longitude || "✍🏼"}</p>

          </section>

          <section className={styles.datosClimaActual}>
            <p>{weather.condition || "🌟"}</p>
            <p>{weather.temperature ? `${weather.temperature}°c` : "🌡️"}</p>
            <p>Viento: {weather.wind ? `${weather.wind}km/h` : "🍃"}</p>
            {
              weather.img ? <img src={weather.img} alt="Weather icon" /> : null
            }

            <section className={styles.lavarRopa}>
              {
                LavarRopa ? <p>¡Hoy es un buen día para lavar ropa! 🫧</p> : <p>Hoy no es un buen día para lavar ropa 🐸</p>
              }
            </section>

            <p>Sensación térmica: {weather.feelsLike ? `${weather.feelsLike}°c` : "❄️"}</p>
            <p>Humedad: {weather.humidity ? `${weather.humidity}%` : "💧"}</p>
            <p>Calidad del aire: {weather.airQuality ? `${weather.airQuality}` : "🌫️"}</p>

            {
              weather.alerts !== "No hay alertas para esta ubicación hoy." ? <p>Alertas 🚨 {weather.alerts}</p> : null
            }

          </section>

          <section className={styles.pronosticoMañana}>
            {weather.forecastTomorrow && weather.forecastTomorrow.date && (
              <div>
                <h2>Pronóstico para mañana</h2>
                {/* <p>{formatDate(weather.forecastTomorrow.date)}</p> */}
                <p>{weather.forecastTomorrow.day.condition.text}</p>

                {
                  weather.forecastTomorrow.day.condition.icon ? <img src={weather.forecastTomorrow.day.condition.icon} alt="Weather icon" /> : null
                }
              </div>
            )}
          </section>
        </>
      )
      }

    </section>
  );
}