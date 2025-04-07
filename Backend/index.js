import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";
import mapsRoutes from "./routes/maps.js";
import booksRoutes from "./routes/books.js";
import newsRoutes from "./routes/news.js"; // 👈 Added

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = process.env.SPOON_API_KEY;

// ✅ Use routes
app.use("/api/weather", weatherRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/news", newsRoutes); // 👈 Mounted

// ✅ Random recipes endpoint
app.get("/api/recipes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=9&apiKey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// ✅ Search recipes
app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching recipes:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to search recipes" });
  }
});

// ✅ Recipe details
app.get("/api/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

// ✅ Root test
app.get("/", (req, res) => {
  res.send("CookAndChill API is running 🍳");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
