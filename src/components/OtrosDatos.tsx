import { useEffect } from "react";

// store
import useClimaStore from "../state/useClimaStore";

// estilos
import styles from "../styles/OtrosDatos.module.css";


export default function OtroDatos() {
  const { weather } = useClimaStore();

  useEffect(() => {
    console.log("weather →→→", weather.uv);
  }, [weather]);


  return (
    <section className={styles.otrosDatos}>
      <h2>Más datos sobre el clima en tu ubicación hoy</h2>
      <h3>Índice UV </h3>
      <p>{weather.uv.index} → {weather.uv.text}. <br />
        {weather.uv.recomendacion} </p>
      <h3>¿Es posible que llueva hoy más tarde? </h3>
      <p>{weather.llovera === 0 ? "No 😸" : "Si, puede que en algún momento llueva ☔"} </p>

      <h3>Clima esperado para las siguientes horas</h3>
      <ul>
        <li>8am: {weather.condicionHorasFijas[0]}</li>
        <li>12pm: {weather.condicionHorasFijas[1]}</li>
        <li>4pm: {weather.condicionHorasFijas[2]}</li>
        <li>8pm: {weather.condicionHorasFijas[3]}</li>
      </ul>

      <h3>Más datos sobre el clima en tu ubicación mañana</h3>
      <ul>


        <li>Salida del sol: {weather.salidaDelSolMañana} </li>
        <li>Puesta del sol: {weather.puestaDelSolMañana} </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  )
}