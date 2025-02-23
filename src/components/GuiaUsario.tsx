import { useEffect } from 'react'

// estado
import useClimaStore from '../state/useClimaStore'

// estilos
import styles from '../styles/GuiaUsuario.module.css'
import stylesB from '../styles/Boton.module.css'

export default function GuiaUsuario() {
  const { setModoMichi, modoMichi } = useClimaStore()

  useEffect(() => {
    console.log(modoMichi);
  }, [modoMichi]);

  return (
    <>
      <section className={styles.guiaUsuario}>
        <h2>Guía de uso</h2>
        <p>Gracias por usar MichiClima para conocer el estado del tiempo 🐱</p>
        <p>Al usar la página acepta los <a href="/tyc">TyC</a>.</p>

        <h3>Modo Michi</h3>
        <p>Al activar el Modo Michi, en lugar de aparecer los clásicos íconos del clima, aparecerán dos imágenes de un lindo gatito llamado Sundae, con un fondo relacionado con el clima</p>
        <button onClick={() => setModoMichi()}
          className={stylesB.boton}
          style={{ marginBottom: '1rem' }}>
          {modoMichi ? 'Desactivar modo Michi' : 'Activar modo Michi'}
        </button>

        <p>Este proyecto es una PWA(Aplicación Web Progresiva, en español) por lo que puede instalarla facilmente en su dispositivo móvil.</p>
        <p>Con MichiClima puede tener a mano los datos más relevantes sobre el tiempo atmosférico de la zona en la que se encuentra, gracias a la geolocalización que de manera nativa su dispositivo posee. Si no se otorga este permiso al ingresar a la página por primera vez, no se podrá acceder a la ubicación precisa, lo que implica que la página web no funcionará. Para cambiar esto, debe borrar los datos de su navegador y volver a entrar a MichiClima.</p>
        <p>Los datos del tiempo se actualizan cada vez que se refresque la página y/o cada 15 minutos.</p>

        <h3>Cómo interpretar los datos</h3>
        <h4>Calidad del aire</h4>
        <p>El valor mostrado es específico para su ubicación actual.</p>
        <p>Para generar este valor este proyecto usa la escala de <a href="https://www.airnow.gov/aqi/aqi-basics/" rel="noopener noreferrer">U.S. AQI</a>, de la Agencia de Protección Ambiental de los Estados Unidos.</p>
        <table>
          <thead>
            <tr>
              <th>Contaminación del aire</th>
              <th>Valor en números</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Baja</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Moderada</td>
              <td>2</td>

            </tr>
            <tr>
              <td>No saludable para grupos sensibles <sup>1</sup></td>
              <td>3</td>
            </tr>
            <tr>
              <td>No saludable</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Peligrosa</td>
              <td>5</td>
            </tr>
            <tr>
              <td>MUY Peligrosa</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
        <p><sup>1</sup> Personas con enfermedades respiratorias (como asma o EPOC), personas adultas mayores, niños y niñas, personas con enfermedades cardíacas.</p>

        <h4>Sensación térmica</h4>
        <p>El valor de la sensación térmica se define mediante una combinación de la temperatura del aire y la humedad relativa para estimar cómo se siente realmente el calor en el cuerpo humano.</p>
        <p>Cuando la humedad es alta, el sudor no se evapora tan fácilmente, lo que dificulta la regulación de la temperatura corporal y hace que el calor se sienta más intenso.</p>

        <h4>¿Es un buen día para lavar?</h4>
        <p>Este dato se obtiene según las condiciones actuales del tiempo y un pronóstico para las siguientes cuatro horas desde el momento actual. Si el tiempo es soleado, despejado o parcialmente nublado durante las siguientes cuatro será un buen día para lavar. Por favor tomar en cuenta que el clima puede cambiar de un momento a otro por su propia naturaleza.</p>
        <p>En otras condiciones de tiempo, bajo ciertas circustancias (usar secadora, tender bajo techo, etc.) también sería un buen día para lavar ropa, pero al ser condiciones que dependen de cada persona, no se toman en cuenta para este proyecto.</p>
        <p className={styles.WALink}>Desarrollado gracias a los datos de <a href="https://www.weatherapi.com/" title="Free Weather API" rel="noopener noreferrer">WeatherAPI.com</a> ✨</p>
      </section>
    </>
  )
}