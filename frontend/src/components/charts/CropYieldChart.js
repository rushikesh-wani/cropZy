import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CropYieldChart = () => {
  const data = {
    labels: [
      "0",
      "28 Nov",
      "29 Nov",
      "30 Nov",
      "01 Dec",
      "02 Dec",
      "01 Dec",
      "02 Dec",
      "03 Dec",
      "04 Dec",
      "05 Dec",
      "06 Dec",
      "07 Dec",
      "08 Dec",
    ],
    datasets: [
      {
        label: "Orders received day wise",
        data: [0, 40, 35, 50, 55, 70, 45, 23, 84, 15, 26, 2, 1, 90],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-1">
      <Line data={data} options={options} />
    </div>
  );
};

export default CropYieldChart;
