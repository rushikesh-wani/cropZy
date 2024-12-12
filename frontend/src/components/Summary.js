import {
  ChevronRight,
  ClockAlert,
  FileEdit,
  ListOrdered,
  PlusSquareIcon,
  ShoppingCartIcon,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OrdersOverviewChart from "./charts/OrdersOverviewChart ";
import axios from "axios";
import RouteNavigate from "./RouteNavigate";
const Summary = () => {
  return (
    <>
      <RouteNavigate page={"Dashboard"} />
      <OrdersOverviewChart />

      {/* <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center p-4 bg-green-300 rounded-xl border border-green-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-green-900">
            <ListOrdered />
            View Orders
          </p>
          <Link
            className="p-2 text-green-950 rounded-full hover:bg-green-500/50 hover:duration-500"
            to={"/dashboard/orders-received"}
          >
            <ChevronRight />
          </Link>
        </div>
        <div className="flex justify-between items-center p-4 bg-fuchsia-300 rounded-xl border border-fuchsia-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-fuchsia-900">
            <Truck /> Manage Orders
          </p>
          <Link
            className="p-2 text-fuchsia-950 rounded-full hover:bg-fuchsia-500/50 hover:duration-500"
            to={"/dashboard/manage-orders"}
          >
            <ChevronRight />
          </Link>
        </div>
        <div className="flex justify-between items-center p-4 bg-orange-300 rounded-xl border border-orange-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-orange-900">
            <ShoppingCartIcon /> View Products
          </p>
          <Link
            className="p-2 text-orange-950 rounded-full hover:bg-orange-500/50 hover:duration-500"
            to={"/dashboard/products"}
          >
            <ChevronRight />
          </Link>
        </div>

        <div className="flex justify-between items-center p-4 bg-rose-300 rounded-xl border border-rose-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-rose-900">
            <FileEdit /> Manage Products
          </p>
          <Link
            className="p-2 text-rose-950 rounded-full hover:bg-rose-500/50 hover:duration-500"
            to={"/dashboard/edit"}
          >
            <ChevronRight />
          </Link>
        </div>
        <div className="flex justify-between items-center p-4 bg-sky-300 rounded-xl border border-sky-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-sky-900">
            <PlusSquareIcon /> Add Products
          </p>
          <Link
            className="p-2 text-sky-950 rounded-full hover:bg-sky-500/50 hover:duration-500"
            to={"/dashboard/add-product"}
          >
            <ChevronRight />
          </Link>
        </div>
        <div className="flex justify-between items-center p-4 bg-violet-300 rounded-xl border border-sky-900">
          <p className="flex items-center gap-x-2 text-lg font-medium text-violet-900">
            <ClockAlert /> Pending orders
          </p>
          <Link
            className="p-2 text-sky-950 rounded-full hover:bg-violet-500/50 hover:duration-500"
            to={"/dashboard/pending-order"}
          >
            <ChevronRight />
          </Link>
        </div>
      </div> */}
      {/* <h1 className="font-medium text-xl">Dashboard</h1> */}
    </>
  );
};

export default Summary;
