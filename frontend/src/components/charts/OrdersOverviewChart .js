import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  SubTitle,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const OrdersOverviewChart = ({ orderOverview }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Orders Summary",
        position: "top",
        font: { size: 24 },
        color: "#00000",
        align: "center",
      },
      legend: {
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="">
      {orderOverview?.length === 0 ? (
        <div className="col-span-2">
          <p className="text-center">{"No data to show yet! :)"}</p>
        </div>
      ) : (
        <>
          <div className="min-h-64">
            {orderOverview ? (
              <Doughnut
                key={"order-overview-chart"}
                data={orderOverview}
                options={options}
              />
            ) : (
              <h1>No data to show</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersOverviewChart;
