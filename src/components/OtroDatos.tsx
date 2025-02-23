import { useEffect } from "react";

// store
import useClimaStore from "../state/useClimaStore";


export default function OtroDatos() {
  const { weather } = useClimaStore();

  useEffect(() => {
    console.log("weather →→→", weather.uv);
  }, [weather]);


  return (
    <section>
      <h2>Más datos sobre el clima en tu ubicación hoy</h2>
      <p>UV: {weather.uv.index} - {weather.uv.text} <br />
        {weather.uv.recomendacion} </p>
      <p>¿Es posible que llueva hoy? <br />
        {weather.llovera === 0 ? "No 😸" : "Si, puede que en algún momento llueva ☔"} </p>

      <h3>Clima esperado para las siguientes horas</h3>
      <ul>
        <li>8am: {weather.condicionHorasFijas[0]}</li>
        <li>12pm: {weather.condicionHorasFijas[1]}</li>
        <li>4pm: {weather.condicionHorasFijas[2]}</li>
        <li>8pm: {weather.condicionHorasFijas[3]}</li>
      </ul>

      <h2>Más datos sobre el clima en tu ubicación mañana</h2>
      <ul>


        <li>salida del sol: {weather.salidaDelSolMañana} </li>
        <li>atardecer: {weather.puestaDelSolMañana} </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  )
}