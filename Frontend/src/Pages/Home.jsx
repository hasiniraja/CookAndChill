import React from "react";
import { FaSearch, FaUserFriends } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Lottie from "lottie-react";
import foodChoice from "../assets/animations/food-choice.json"; // ✅ Lottie JSON import

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-[#fdf7ee] text-gray-800 font-sans ml-15">
        <Header />

        <section className="flex justify-between items-center px-12 py-16 bg-[#fcbf49] text-black rounded-b-3xl">
  <div className="flex-1 pr-8">
    <h2 className="text-5xl font-semibold leading-snug">
      From stormy stews to sunny salads – we’ve got your plate and your palette covered.
    </h2>
  </div>

  <div className="flex-1 flex justify-center items-center max-w-[500px]">
    <Lottie animationData={foodChoice} loop autoplay />
  </div>
</section>

        {/* Recipes Section */}
        <section className="px-12 py-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-semibold">Recipes</h3>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search recipes and more..."
                className="outline-none"
              />
            </div>
            <select className="px-4 py-2 rounded-full shadow-md font-medium">
              <option>Sort by: Newest</option>
              <option>Cook Time</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="flex gap-8">
            {/* Category Sidebar inside recipes */}
            <aside className="flex flex-col gap-4 w-1/5">
              {["Pizza", "Salad", "Noodle", "Cocktails", "Dessert"].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-left shadow-md font-medium ${
                    i === 1 ? "bg-[#fcbf49] text-white" : "bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </aside>

            {/* Main Cards */}
            <main className="flex-1 grid grid-cols-2 gap-6">
              {/* Featured Recipe */}
              <div className="bg-white p-6 rounded-2xl shadow-lg col-span-2 flex gap-6 items-center">
                <img
                  src="salad.jpg"
                  alt="Citrus Salad"
                  className="h-40 w-40 object-cover rounded-xl"
                />
                <div>
                  <h4 className="text-2xl font-semibold mb-2">Citrus Salad with Berries</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    In the season of fresh strawberries, we suggest making a very tasty and simple pie with this wonderful berry.
                  </p>
                  <div className="flex items-center gap-6 text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUserFriends /> Serving
                    </span>
                    <span className="flex items-center gap-1">
                      <MdTimer /> 1h 15m
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Recipes */}
              {[
                {
                  title: "Avocado Salad",
                  time: "1h 30m",
                  image: "salad2.jpg",
                },
                {
                  title: "Green Chicken Pasta",
                  time: "1h 50m",
                  image: "salad1.jpg",
                },
              ].map((recipe) => (
                <div
                  key={recipe.title}
                  className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-4"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-20 w-20 object-cover rounded-xl"
                  />
                  <div>
                    <h5 className="font-semibold text-lg">{recipe.title}</h5>
                    <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <FaUserFriends /> Serving
                      </span>
                      <span className="flex items-center gap-1">
                        <MdTimer /> {recipe.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}