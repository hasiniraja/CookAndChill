// routes/weather.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    console.log("❌ Missing lat or lon");
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  if (!API_KEY) {
    console.log("❌ OPENWEATHER_API_KEY is undefined");
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    console.log("🔍 Sending request to OpenWeather API with:", { lat, lon, key: API_KEY });

    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    console.log("✅ OpenWeather response received:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ OpenWeather API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

export default router;
