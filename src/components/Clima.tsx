// utils
import { maullido } from "../utils/utils";


import { useEffect } from "react";

// store
import useClimaStore from "../state/useClimaStore";

// componentes
import Spinner from "./spinners/Spinner";
import Boton from "./Boton";

// estilos
import styles from "../styles/Clima.module.css";
import stylesB from "../styles/Boton.module.css";

export default function Clima() {

  const { weather, geolocation, setWeather, isLoading, LavarRopa, modoMichi } = useClimaStore();

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
          {
            modoMichi
              ? <img src="/public/CatSpinner.gif"
                alt="Spinner de gato. Un gato rojizo girando en círculo."
                style={{ width: "100px", height: "100px" }}
              />
              : <Spinner />
          }

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
                    weather.img
                      ? <img src={weather.img}
                        alt={modoMichi
                          ? 'Imagen de un gatito, con un fondo relacionado al estado actual del clima'
                          : 'Ícono representando el clima actual'}
                        onClick={() => maullido("/public/shari_meow_by_freesound_community.mp3")}
                      />
                      : null
                  }

                  <section className={styles.lavarRopa}>
                    {
                      LavarRopa.booleano
                        ?
                        <>
                          <p>¡Es un buen momento para lavar ropa! 🫧</p>
                          <details>
                            <summary className={stylesB.boton}>
                              <p className={styles.siguientes4Horas}>Condiciones para las siguientes cuatro horas</p>
                            </summary>
                            <ul>
                              {
                                LavarRopa.siguientesCuatroHoras && LavarRopa.siguientesCuatroHoras.map((hora, index) => (
                                  <li key={index}>{hora}</li>
                                ))
                              }
                            </ul>
                          </details>
                        </>
                        :
                        <>
                          <p>No es un buen momento para lavar ropa 🐸</p>
                          <details>
                            <summary className={stylesB.boton}>
                              <p className={styles.siguientes4Horas}>Condiciones para las siguientes cuatro horas</p>
                            </summary>
                            <ul>
                              {
                                LavarRopa.siguientesCuatroHoras && LavarRopa.siguientesCuatroHoras.map((hora, index) => (
                                  <li key={index}>{hora}</li>
                                ))
                              }
                            </ul>
                          </details>
                        </>
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
                        weather.forecastTomorrow.img ? <img src={weather.forecastTomorrow.img}  alt={modoMichi
                          ? 'Imagen de un gatito, con un fondo relacionado al estado actual del clima'
                          : 'Ícono representando el clima actual'}
                          onClick={() => maullido("/public/cat_begging_by_freesound_community.mp3")}
                          /> : null
                      }
                    </div>
                  )}
                </section>

                <Boton componente="/otros-datos" texto="Más datos" />
              </>

              : <h2>Error al cargar los datos. Por favor intentarlo más tarde</h2>
          }
        </>
      )
      }
    </section>
  );
}