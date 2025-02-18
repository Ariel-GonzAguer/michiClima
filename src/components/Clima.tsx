import { useEffect } from "react";
import { formatDate } from "../utils/utils";
import useClimaStore from "../state/useClimaStore";

// import styles from "../styles/Clima.module.css";

export default function Clima() {

  const { weather, geolocation, setWeather, isLoading } = useClimaStore();

  async function handleGetWeather() {
    await setWeather();
  }

  useEffect(() => {
    handleGetWeather();
    // console.log(weather);
  }, []);
  /* */
  return (

    <section /*className={styles.climaSection}*/>

      {isLoading ? (
        <p>Cargando datos del clima...</p>
      ) : (
        <>
          <section /* className={styles.ubicacionActual}*/>
            <h3>Tu ubicacion actual</h3>
            <p>{weather.location || "🌎"}</p>
            <p>Latitud: {geolocation.latitude || "✏️"}</p>
            <p>Longitud: {geolocation.longitude || "✍🏼"}</p>
          </section>

          <section /* className={styles.datosClimaActual}*/>
            <p>Condición: {weather.condition || "🌟"}</p>
            <p>Temperatura: {weather.temperature ? `${weather.temperature}°c` : "🌡️"}</p>
            <p>Viento: {weather.wind ? `${weather.wind}km/h` : "🍃"}</p>
            <p>Sensación térmica: {weather.feelsLike ? `${weather.feelsLike}°c` : "❄️"}</p>
            <p>Humedad: {weather.humidity ? `${weather.humidity}%` : "💧"}</p>
            <p>Calidad del aire: {weather.airQuality ? `${weather.airQuality}` : "🌫️"}</p>
            <p>Alertas: {weather.alerts || "🚨"}</p>
            {
              weather.img ? <img src={weather.img} alt="Weather icon" /> : null
            }
          </section>

          <section /* className={styles.pronosticoMañana}*/>
            {weather.forecastTomorrow && weather.forecastTomorrow.date && (
              <div>
                <h2>Pronóstico para mañana</h2>
                <p>Fecha: {formatDate(weather.forecastTomorrow.date)}</p>
                <p>Pronóstico: {weather.forecastTomorrow.day.condition.text}</p>
                <img src={weather.forecastTomorrow.day.condition.icon} alt="Weather icon" />
              </div>
            )}
          </section>
        </>
      )
      }

    </section>
  );
}