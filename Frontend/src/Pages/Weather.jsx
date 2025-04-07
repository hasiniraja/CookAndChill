import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopDishesChart from "../components/TopDishesChart";

const weatherToDishes = {
  Rain: ["hot soup", "pakoras", "masala chai"],
  Clear: ["salads", "grilled sandwich", "lemonade"],
  Snow: ["hot chocolate", "mac and cheese", "stew"],
  Clouds: ["pasta", "noodles", "stuffed paratha"],
  Drizzle: ["tea", "samosa"],
  Thunderstorm: ["comfort food", "biryani"],
};

const WeatherSuggestions = () => {
  const [weather, setWeather] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static top dishes data for chart
  const topDishesData = [
    { dish: "Biryani", downloads: 120 },
    { dish: "Masala Chai", downloads: 95 },
    { dish: "Pasta", downloads: 85 },
    { dish: "Pakoras", downloads: 70 },
    { dish: "Hot Chocolate", downloads: 60 },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const weatherRes = await axios.get(
            `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`
          );
          const weatherData = weatherRes.data;
          setWeather(weatherData);

          toast.success(`Weather in ${weatherData.name} fetched!`);

          const condition = weatherData.weather[0].main;
          const suggestions = weatherToDishes[condition] || ["dal", "rice", "curd"];
          const randomDish = suggestions[Math.floor(Math.random() * suggestions.length)];

          const recipeRes = await axios.get(
            `http://localhost:5000/api/search?q=${randomDish}`
          );
          setRecipes(recipeRes.data.results || []);

          toast.info(`Suggested dish: ${randomDish}`);
        } catch (error) {
          console.error("Failed to fetch weather or recipes:", error);
          toast.error("Oops! Something went wrong fetching suggestions.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Location access denied. Please allow it for suggestions.");
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center min-h-screen bg-[#fdf7ee]">
          <ClipLoader color="#fcbf49" size={60} />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#fdf7ee] min-h-screen ml-14">
        <ToastContainer position="top-right" autoClose={3000} />

        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          🌤️ Weather-Based Dish Suggestions
        </motion.h1>

        {weather && (
          <motion.div
            className="mb-6 p-4 bg-blue-100 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold">
              Current Weather in {weather.name}
            </h2>
            <p>
              {weather.weather[0].description} | 🌡️ {weather.main.temp}°C
            </p>
          </motion.div>
        )}

        {/* 🔥 Chart Section */}
        <div className="mb-10">
          <TopDishesChart data={topDishesData} />
        </div>

        {/* 🍽️ Recipes Section */}
        <h2 className="text-2xl font-semibold mb-4">🍽️ You might enjoy:</h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="rounded mb-2 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold">{recipe.title}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">No recipes found. Try refreshing!</p>
        )}
      </div>
    </div>
  );
};

export default WeatherSuggestions;
