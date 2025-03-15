import { ArrowRight, Leaf, Sparkles, Truck, User } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <nav className="absolute top-0 bg-white w-full p-4 shadow-md">
        <div className="flex justify-around items-center">
          <p className="text-2xl font-bold">CropZy</p>
          <div className="flex justify-between gap-20">
            <ul className="flex gap-5 items-center text-lg font-medium">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"https://cropzy.vercel.app/"} target="_blank">
                  Customer
                </Link>
              </li>
              <li>Service</li>
              <li>Contact</li>
            </ul>
            <div className="flex items-center gap-5">
              <Link
                to={"/signup"}
                className="px-3 py-1 bg-violet-300/50 rounded-md text-violet-800 font-semibold"
              >
                Signup
              </Link>
              <Link
                to={"/login"}
                className="px-3 py-1 bg-violet-600 text-white rounded-md font-semibold"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;
