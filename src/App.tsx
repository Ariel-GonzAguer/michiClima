import { useState, useEffect } from "react";

export default function App() {
  const [condicion, setCondicion] = useState<string>('');
  const [temperatura, setTemperatura] = useState<string>('');
  const [viento, setViento] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitud, setLongitud] = useState<number>(0);
  const [precition, setPreciticion] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [sensacionTermica, setSensacionTermica] = useState<number>(0);
  const [humedad, setHumedad] = useState<number>(0);
  const [alertas, setAlertas] = useState<string>('');
  const [faseLunar, setFaseLunar] = useState<string>('');
  const [climaMañana, setClimaMañana] = useState<any>('');

  function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


  function formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  }

  const moonPhaseTranslations: { [key: string]: string } = {
    "New Moon": "Luna Nueva",
    "Waxing Crescent": "Creciente Iluminante",
    "First Quarter": "Cuarto Creciente",
    "Waxing Gibbous": "Gibosa Iluminante",
    "Full Moon": "Luna Llena",
    "Waning Gibbous": "Gibosa Menguante",
    "Last Quarter": "Cuarto Menguante",
    "Waning Crescent": "Creciente Menguante"
  };

  async function getWeather(lat: number, lon: number) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=91b01f57936a4dddb49223735251402&q=${lat},${lon}&days=2&aqi=no&lang=es&alerts=yes`);
      const data = await response.json();
      setCondicion(data.current.condition.text);
      setTemperatura(data.current.temp_c);
      setViento(data.current.wind_kph);
      setUbicacion(`${data.location.name}, ${data.location.region}, ${data.location.country}`);
      setImg(data.current.condition.icon);
      setSensacionTermica(data.current.heatindex_c);
      setHumedad(data.current.humidity);
      setAlertas(capitalize(data.alerts.alert[0].headline));
      setFaseLunar(moonPhaseTranslations[data.forecast.forecastday[0].astro.moon_phase] || data.forecast.forecastday[0].astro.moon_phase);
      setClimaMañana(data.forecast.forecastday[1]);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function handleGetWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLatitude(latitude);
          setLongitud(longitude);
          setPreciticion(`${accuracy} metros`);
          getWeather(latitude, longitude);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true
        }

      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    handleGetWeather();
  }, []);

  return (
    <div>
      {/* <h1>Hello, React!</h1>
      <button onClick={handleGetWeather}>Get Weather</button> */}
      <p>Ubicación: {ubicacion || "🌎"}</p>
      <p>Latitud: {latitude || "✏️"}</p>
      <p>Longitud: {longitud || "✍🏼"}</p>
      <p>Precisión: {precition || "🔍"}</p>
      <br />
      <p>Condición: {condicion || "🌟"}</p>
      <p>Temperatura: {temperatura ? `${temperatura}°c` : "🌡️"}</p>
      <p>Viento: {viento ? `${viento}km/h` : "🍃"}</p>
      <p>Sensación térmica: {sensacionTermica ? `${sensacionTermica}°c` : "❄️"}</p>
      <p>Humedad: {humedad ? `${humedad}%` : "💧"}</p>
      <p>Alertas: {alertas || "🚨"}</p>
      <p>Fase lunar: {faseLunar || "🌕"}</p>

      {
        img ? <img src={img} alt="Weather icon" /> : null
      }

      {climaMañana && (
        <div>
          <h2>Pronóstico para mañana</h2>
          <p>Fecha: {formatDate(climaMañana.date)}</p>
          <p>Pronóstico: {climaMañana.day.condition.text}</p>
          <img src={climaMañana.day.condition.icon} alt="Weather icon" />
        </div>
      )}

      <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
      <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" /></a>
    </div>
  );
}