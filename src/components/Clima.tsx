// utils/basics
import { useEffect } from "react";
import { formatDate } from "../utils/utils";

// store
import useClimaStore from "../state/useClimaStore";

// componentes
import Spinner from "./Spinner";

// estilos
import styles from "../styles/Clima.module.css";

export default function Clima() {

  const { weather, geolocation, setWeather, isLoading } = useClimaStore();

  async function handleGetWeather() {
    await setWeather();
  }

  useEffect(() => {
    handleGetWeather();
    console.log(weather);
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
                <p>{formatDate(weather.forecastTomorrow.date)}</p>
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