// import styles from './GuiaUsuario.module.css'

export default function GuiaUsuario() {
  return (
    <section /*className={styles.guiaUsuario}*/>
      <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
      <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" /></a>
    </section>
  )
}