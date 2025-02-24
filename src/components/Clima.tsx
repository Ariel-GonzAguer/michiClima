// utils/basics
import { useEffect } from "react";
// import { formatDate } from "../utils/utils";

// store
import useClimaStore from "../state/useClimaStore";

// componentes
import Spinner from "./Spinner";
import Boton from "./Boton";

// estilos
import styles from "../styles/Clima.module.css";

export default function Clima() {

  const { weather, geolocation, setWeather, isLoading, LavarRopa } = useClimaStore();

  async function handleGetWeather() {
    await setWeather();
  }

  useEffect(() => {
    handleGetWeather();
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
          {
            weather
              ? <>
                <section className={styles.ubicacionActual}>
                  <p>{weather.location}</p>
                  <p>Latitud: {geolocation.latitude}</p>
                  <p>Longitud: {geolocation.longitude}</p>
                </section>

                <section className={styles.datosClimaActual}>
                  <p>{weather.condition}</p>
                  <p>{`${weather.temperature}°c`}</p>
                  <p>Viento: {`${weather.wind}km/h`}</p>
                  {
                    weather.img ? <img src={weather.img} alt="Weather icon" /> : null
                  }

                  <section className={styles.lavarRopa}>
                    {
                      LavarRopa ? <p>¡Es un buen momento para lavar ropa! 🫧</p> : <p>No es un buen momento para lavar ropa 🐸</p>
                    }
                  </section>

                  <p>Sensación térmica: {`${weather.feelsLike}°c`}</p>
                  <p>Humedad: {`${weather.humidity}%`}</p>
                  <p>Calidad del aire: {`${weather.airQuality}`}</p>

                  {
                    weather.alerts !== "No hay alertas para esta ubicación hoy."
                      ? <p>Alertas 🚨 {weather.alerts}</p>
                      : null
                  }

                </section>

                <section className={styles.pronosticoMañana}>
                  {weather.forecastTomorrow && (
                    <div>
                      <h2>Pronóstico para mañana</h2>
                      <p>{weather.forecastTomorrow.condition}</p>
                      {
                        // clima mañana
                        weather.forecastTomorrow.img ? <img src={weather.forecastTomorrow.img} alt="Weather icon" /> : null
                      }
                    </div>
                  )}
                </section>

                <Boton componente="/otro-datos" texto="Más datos" />
              </>

              : <h2>Error al cargar los datos. Por favor intentarlo más tarde</h2>
          }
        </>
      )
      }
    </section>
  );
}