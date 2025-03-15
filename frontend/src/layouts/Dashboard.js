import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileView from "../components/ProfileView";

const Dashboard = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-24 pb-10 px-10 absolute top-0 h-screen">
        <div className="absolute -z-50 top-0 left-0 right-0 w-screen h-64 bg-slate-200/50"></div>
        <div className="grid grid-flow-row grid-cols-4 gap-2">
          <div className="h-[600px] col-span-1 p-4 rounded-xl bg-white shadow-lg">
            <ProfileView />
          </div>
          <div className="min-h-[600px] col-span-3 p-4 rounded-xl bg-white shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
