// estado
import useClimaStore from '../state/useClimaStore'

// estilos
import styles from '../styles/GuiaUso.module.css'
import stylesB from '../styles/Boton.module.css'

export default function GuiaUsuario() {
  const { setModoMichi, modoMichi } = useClimaStore()

  return (
    <>
      <section className={styles.guiaUsuario}>
        <h2>Guía de uso</h2>
        <p>Gracias por usar MichiClima para conocer el estado del tiempo 🐱</p>
        <p>Al usar la web app acepta los <a href="/tyc">TyC</a>.</p>

        <p>Este proyecto es una PWA(Aplicación Web Progresiva, en español) por lo que puede instalarla facilmente en su dispositivo móvil.</p>
        <p>Con MichiClima puede tener a mano los datos más relevantes sobre el tiempo atmosférico de la zona en la que se encuentra, gracias a la geolocalización que de manera nativa su dispositivo posee. Al ingresar por primera vez a la página, se solicita el permiso para obtener su ubicación, si no se otorga este permiso, la web app no funcionará. Para cambiar esto, debe borrar los datos de su navegador y volver a entrar a <a href="michi-clima.vercel.app">MichiClima</a>.</p>
        <p>Los datos del tiempo se actualizan cada vez que se refresque la página o cada 15 minutos.</p>

        <h3>Modo Michi</h3>
        <p>Al activar el Modo Michi, ocurre lo siguiente:</p>
        <ul>
          <li>1. El spinner de carga cambiará por uno felino.</li>
          <li>2. En lugar de aparecer los clásicos íconos del clima, aparecerán dos imágenes de un lindo gatito llamado Sundae, con un fondo relacionado con el clima.</li>
          <li>3. Al hacer click sobre Sundae, podrá escuchar maullidos.</li>
          <li></li>
        </ul>


        <button onClick={() => setModoMichi()}
          className={stylesB.boton}
          style={{ marginBottom: '1rem' }}>
          {modoMichi ? 'Desactivar Modo Michi' : 'Activar Modo Michi'}
        </button>

        <h3>Cómo interpretar los datos</h3>
        <h4>Calidad del aire 🍃</h4>
        <p>El valor mostrado es específico para su ubicación actual.</p>
        <p>Para generar este valor este proyecto usa la escala de <a href="https://www.airnow.gov/aqi/aqi-basics/" rel="noopener noreferrer">U.S. AQI</a>, de la Agencia de Protección Ambiental de los Estados Unidos.</p>
        <table>
          <thead>
            <tr>
              <th>Contaminación del aire</th>
              <th>Valor en números <sup>2</sup></th>
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
        <p><sup>2 </sup>En la sección de <a href="/otros-datos">Más datos</a> se da una descripción más detallada de la calidad del aire.</p>

        <h4>Sensación térmica 🌡️</h4>
        <p>El valor de la sensación térmica se define mediante una combinación de la temperatura del aire y la humedad relativa para estimar cómo se siente realmente el calor en el cuerpo humano.</p>
        <p>Cuando la humedad es alta, el sudor no se evapora tan fácilmente, lo que dificulta la regulación de la temperatura corporal y hace que el calor se sienta más intenso.</p>

        <h4>Humedad 💧</h4>
        <p>Indica la cantidad de vapor de agua presente en el aire en comparación con la cantidad máxima que el aire podría contener a esa temperatura.</p>
        <p>Interpretación de los valores:</p>
        <table>
          <thead>
            <tr>
              <th>Porcentaje</th>
              <th>Interpretación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0-30%</td>
              <td>Aire seco, típico de climas desérticos o de invierno en interiores con calefacción.</td>
            </tr>
            <tr>
              <td>30-60%</td>
              <td>Humedad confortable, común en climas templados.</td>
            </tr>
            <tr>
              <td>60-100%</td>
              <td>Aire húmedo, puede sentirse bochornoso o propenso a lluvias, neblina o condensación.</td>
            </tr>
          </tbody>
        </table>

        <h4>¿Es un buen día para lavar? 🫧</h4>
        <p>Este dato se obtiene según las condiciones actuales del tiempo y un pronóstico para las siguientes cuatro horas desde el momento actual. Si el tiempo es soleado, despejado o parcialmente nublado durante las siguientes cuatro será un buen día para lavar. Por favor tomar en cuenta que el clima puede cambiar de un momento a otro por su propia naturaleza.</p>
        <p>En otras condiciones de tiempo, bajo ciertas circustancias (usar secadora, tender bajo techo, etc.) también sería un buen día para lavar ropa, pero al ser condiciones que dependen de cada persona, no se toman en cuenta para este proyecto.</p>

        <h4>Índice UV ☀️</h4>
        <p>La escala del índice UV (Índice Ultravioleta) es una medida de la intensidad de la radiación ultravioleta del sol en la superficie terrestre. Ayuda a determinar el nivel de exposición a los rayos UV y el riesgo de daño para la piel y los ojos.</p>
        <p>El número que se muestra es el índice en la escala que va de 0 a 11+. La siguiente palabra que se muestra significa el nivel de riesgo, que va de Bajo (0) a Extremo (+11). Y el texto debajo, es una recomendación.</p>

        <h4>¿Es posible que llueva hoy? ☔</h4>
        <p>Este valor se obtiene directamente del pronóstico del tiempo de Weatherapi.</p>

        <h5>Créditos ✨</h5>
        <p>El gato que aparece como spinner cuando el Modo Michi está activado, es de <a href="https://giphy.com/lordtofucat" rel="noopener noreferrer">LordTofuAnimation</a> y se obtuvo mediante <a href="https://giphy.com/" rel="noopener noreferrer">GIPHY</a>.</p>
        <p>Los sonidos de gatitos son de <a href="https://pixabay.com/es/users/freesound_community-46691455/" rel="noopener noreferrer">Freesound Commnunity</a>, y se obtuvieron a través de <a href="https://pixabay.com/es/" rel="noopener noreferrer">Pixabay</a>.</p>
        <p>El gato blanco que aparece en la sección <a href="/otros-datos">Más datos</a> es de <a href="https://giphy.com/Kennymays" rel="noopener noreferrer">Kennysgifs</a> y se obtuvo mediante <a href="https://giphy.com/" rel="noopener noreferrer">GIPHY</a>.</p>
        <p>La idea de la funcionalidad de "¿Es un buen día para lavar" es original de mi hermosa esposa Liany VV 💖</p>
        <p>La data del clima se obtiene gracias a <a href="https://www.weatherapi.com/" title="Free Weather API" rel="noopener noreferrer">WeatherAPI.com</a></p>
      </section>
    </>
  )
}
