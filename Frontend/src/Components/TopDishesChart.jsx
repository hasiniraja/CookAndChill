import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopDishesChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.dish),
    datasets: [
      {
        label: "Downloads",
        data: data.map((item) => item.downloads),
        backgroundColor: "#fcbf49",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Dishes Downloaded 🍲</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopDishesChart;
