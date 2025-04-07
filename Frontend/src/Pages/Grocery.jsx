import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Grocery = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {const res = await fetch(`/api/maps/grocery?lat=${latitude}&lng=${longitude}`);


          // Check if response is okay before parsing JSON
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await res.json();

          // `result.results` is the actual data array returned from Google Maps API
          if (Array.isArray(result.results) && result.results.length > 0) {
            setStores(result.results);
          } else {
            setErrorMessage("No grocery stores found nearby.");
          }
        } catch (error) {
          console.error("Failed to fetch grocery stores", error);
          setErrorMessage("Failed to load grocery stores. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setErrorMessage("Location permission denied.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="flex bg-[#fdf7ee] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">🛒 Nearby Grocery Stores</h2>
        {loading ? (
          <p>Loading nearby stores...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul className="space-y-4">
            {stores.map((store) => (
              <li
                key={store.place_id}
                className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{store.name}</h3>
                <p>{store.vicinity}</p>
                {store.rating && <p>⭐ {store.rating}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Grocery;
