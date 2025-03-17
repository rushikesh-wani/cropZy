import React, { useEffect, useState } from "react";
import OrdersOverviewChart from "../components/charts/OrdersOverviewChart ";
import axios from "axios";

const DashboardGrid = () => {
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
  console.log(summary);

  return (
    <>
      <div className="grid grid-cols-8 gap-4 p-4">
        <div className="col-span-4 row-span-4 bg-neutral-100 border-2 border-slate-400/10 p-4 rounded-xl">
          <OrdersOverviewChart orderOverview={orderOverview} />
        </div>
        {summary?.map((item) => (
          <div
            key={item?.status + item?.count}
            className="col-span-2 row-span-2 place-content-center bg-neutral-100 border-2 border-slate-400/10 p-4 rounded-xl"
          >
            <p className="text-5xl text-center font-bold">{item?.count}</p>
            <p className="font-medium text-xl text-center uppercase">
              {item?.status}
            </p>
          </div>
        ))}

        {/* <div className="col-span-2 bg-neutral-100 border-2 border-slate-400/10 p-4 rounded-xl">
          Large Item
        </div>
        <div className="col-span-6 bg-neutral-100 border-2 border-slate-400/10 p-4 rounded-xl">
          Orders Trend Chart
        </div>
        <div className="bg-neutral-100 border-2 border-slate-400/10 p-4 rounded-xl">
          Large Item
        </div> */}
      </div>
    </>
  );
};

export default DashboardGrid;
