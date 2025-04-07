import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipe/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSaveRecipe = () => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const alreadySaved = saved.find((r) => r.id === recipe.id);

    if (!alreadySaved) {
      saved.push({ id: recipe.id, title: recipe.title, image: recipe.image });
      localStorage.setItem("savedRecipes", JSON.stringify(saved));
      alert("Recipe saved! 💾");
    } else {
      alert("You've already saved this recipe.");
    }
  };

  if (!recipe) return <p className="p-8 text-lg">Loading recipe...</p>;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back to Recipes
      </button>

      <div className="flex flex-col md:flex-row md:gap-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full md:w-1/2 rounded mb-4 md:mb-0"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
          <p className="text-gray-600 mb-2">
            🕒 {recipe.readyInMinutes} mins | 🍽️ {recipe.servings} servings
          </p>
          <button
            onClick={handleSaveRecipe}
            className="mb-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
          >
            💾 Save Recipe
          </button>

          <h3 className="text-2xl font-semibold mt-4 mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {recipe.extendedIngredients.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-8 mb-2">Instructions</h3>
<div
  className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800"
  dangerouslySetInnerHTML={{
    __html: recipe.instructions || "<p>Instructions not available 😔</p>",
  }}
/>

    </div>
  );
}
