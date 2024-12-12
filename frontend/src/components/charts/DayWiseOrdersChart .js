import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DayWiseOrdersChart = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ], // Days of the week
    datasets: [
      {
        label: "Orders Received",
        data: [120, 150, 180, 100, 200, 90, 140], // Example data for received orders
        backgroundColor: "#4CAF50", // Green
      },
      {
        label: "Orders Delivered",
        data: [100, 140, 160, 90, 180, 80, 130], // Example data for delivered orders
        backgroundColor: "#2196F3", // Blue
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows control of container dimensions
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Day-Wise Orders Overview",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Orders",
        },
      },
    },
  };

  return (
    <div className="p-1 w-full h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DayWiseOrdersChart;
