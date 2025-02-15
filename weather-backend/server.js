const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configura CORS para permitir solicitudes desde tu origen frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto al origen de tu frontend
  })
);

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  console.log(`Received lat: ${lat}, lon: ${lon}`);
  console.log(`Using API key: ${process.env.WEATHER_API_KEY}`);
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${lat},${lon}`,
          days: 2,
          aqi: "no",
          lang: "es",
          alerts: "yes",
        },
      }
    );
    console.log("WeatherAPI response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        error: "Error fetching weather data",
        details: error.response ? error.response.data : error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
