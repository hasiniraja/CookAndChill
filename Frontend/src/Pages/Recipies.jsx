import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ClipLoader } from "react-spinners";

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setRecipes(res.data.results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#fdf7ee] min-h-screen ml-15">
        <h2 className="text-3xl font-bold mb-6">Search Recipes</h2>

        {/* Search Input */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="e.g. pasta, salad, chicken..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full md:w-3/4"
          />
          <button
            onClick={handleSearch}
            className="bg-[#fcbf49] px-6 py-2 rounded text-white font-bold w-full md:w-auto"
          >
            Search
          </button>
        </div>

        {/* Loader or Recipe Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#fcbf49" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <Link
                  to={`/recipe/${r.id}`}
                  key={r.id}
                  className="bg-white p-4 rounded shadow-md hover:shadow-xl transition"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                {query
                  ? "No recipes found. Try a different keyword."
                  : "Search for recipes to see results."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
