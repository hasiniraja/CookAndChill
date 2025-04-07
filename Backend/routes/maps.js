// routes/maps.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/grocery", async (req, res) => {
  try {
    const { lat = "37.7749", lng = "-122.4194" } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type: "supermarket",
        key: apiKey,
      },
    });

    // ✅ Send only the results array to the frontend
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching grocery stores:", error.message);
    res.status(500).json({ error: "Failed to fetch grocery stores" });
  }
});

export default router;
