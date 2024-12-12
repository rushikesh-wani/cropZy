import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersOverviewChart = () => {
  const [orderOverview, setOrderOverView] = useState(null);
  const [summary, setSummary] = useState(null);
  const statusColorMapping = {
    rejected: "#FF5722",
    delivered: "#FFC107",
    approved: "#4CAF50",
    pending: "#2196F3",
  };

  const getOrderOview = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/farmer/getOrderSummary`,
        {
          withCredentials: true,
        }
      );
      const counts = res?.data?.data?.map((item) => item.count);
      const statuses = res?.data?.data?.map((item) => item.status);
      const colors = statuses.map((status) => statusColorMapping[status]);
      setSummary(res?.data?.data);
      setOrderOverView({
        labels: statuses,
        datasets: [
          {
            label: "Order Status Overview",
            data: counts,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderOview();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: "50%",
  };

  console.log(orderOverview);
  console.log(summary);
  return (
    <div className="my-2 grid grid-cols-2 gap-2 items-center">
      {orderOverview?.length === 0 ? (
        <div className="col-span-2">
          <p className="text-center">{"No data to show yet! :)"}</p>
        </div>
      ) : (
        <>
          <div className="p-1 min-h-56">
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
          <div className="p-4 grid grid-cols-2 gap-5 rounded-xl">
            {summary ? (
              summary?.map((value, index) => (
                <div className="flex flex-col text-center p-2 text-gray-800 bg-slate-100 rounded-xl">
                  <p className="font-bold text-5xl">{value?.count}</p>
                  <p className=" font-medium text-xl uppercase">
                    {value?.status}
                  </p>
                </div>
              ))
            ) : (
              <p>Loading</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersOverviewChart;
