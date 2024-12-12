import axios from "axios";
import {
  ChevronRight,
  ClockAlert,
  FileEdit,
  ListOrdered,
  LogOut,
  PlusSquareIcon,
  Settings,
  ShoppingCartIcon,
  Truck,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileView = () => {
  const [farmerData, setFarmerData] = useState({});
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/logout`,
      {},
      { withCredentials: true }
    );
    if (res?.status === 200) {
      toast.success(`${res?.data?.message}`);
      navigate("/login");
    }
  };
  useEffect(() => {
    try {
      const getFarmerData = async () => {
        const res = await axios.get(
          "http://localhost:5000/api/v1/farmer/profileView",
          { withCredentials: true }
        );
        if (res?.status === 200) {
          setFarmerData(res?.data?.data);
        }
      };
      getFarmerData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(farmerData);
  return (
    <div className="relative h-[550px] overflow-y-scroll no-scrollbar">
      <p className="font-medium text-2xl">Profile</p>
      {/* {Profile} */}
      <div className="sticky top-0 my-2 p-2 flex gap-x-2 bg-gradient-to-r from-sky-100  to-orange-100 rounded-xl shadow">
        <div className="w-16 h-16 rounded-full border">
          <img
            className="w-full h-full rounded-full object-cover"
            src={farmerData?.profileImg}
            alt=""
          />
        </div>
        <div>
          <p className="text-xl font-medium">{`${farmerData?.firstName} ${farmerData?.lastName}`}</p>
          <p className="font-medium">{farmerData?.phone}</p>
        </div>
      </div>
      {/* {Tabs} */}
      <div className="my-4 p-2 bg-slate-100 rounded-xl grid grid-cols-2 gap-4">
        <Link to={"/dashboard/orders-received"}>
          <div className="flex justify-between items-center p-2 bg-green-300 rounded-xl border border-green-900">
            <p className="flex items-center gap-x-2 font-medium text-green-900">
              <ListOrdered />
              View Orders
            </p>
            <div className="p-1 text-green-950 rounded-full hover:bg-green-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/manage-orders"}>
          <div className="flex justify-between items-center p-2 bg-fuchsia-300 rounded-xl border border-fuchsia-900">
            <p className="flex items-center gap-x-2 font-medium text-fuchsia-900">
              <Truck /> Manage Orders
            </p>
            <div className="p-1 text-fuchsia-950 rounded-full hover:bg-fuchsia-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/products"}>
          <div className="flex justify-between items-center p-2 bg-orange-300 rounded-xl border border-orange-900">
            <p className="flex items-center gap-x-2 font-medium text-orange-900">
              <ShoppingCartIcon /> View Products
            </p>
            <div className="p-1 text-orange-950 rounded-full hover:bg-orange-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/edit"}>
          <div className="flex justify-between items-center p-2 bg-rose-300 rounded-xl border border-rose-900">
            <p className="flex items-center gap-x-2 font-medium text-rose-900">
              <FileEdit /> Manage Products
            </p>
            <div className="p-1 text-rose-950 rounded-full hover:bg-rose-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/add-product"}>
          <div className="flex justify-between items-center p-2 bg-sky-300 rounded-xl border border-sky-900">
            <p className="flex items-center gap-x-2 font-medium text-sky-900">
              <PlusSquareIcon /> Add Products
            </p>
            <div className="p-1 text-sky-950 rounded-full hover:bg-sky-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/pending-order"}>
          <div className="flex justify-between items-center p-2 bg-violet-300 rounded-xl border border-sky-900">
            <p className="flex items-center gap-x-2 font-medium text-violet-900">
              <ClockAlert /> Pending orders
            </p>
            <div className="p-1 text-sky-950 rounded-full hover:bg-violet-500/50 hover:duration-500">
              <ChevronRight className="size-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* {Buttons} */}
      <div className="my-2 p-2 bg-slate-100 rounded-xl">
        <Link
          to={"/dashboard/profile"}
          className="flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400"
        >
          <UserCircle className="text-black" /> My Profile
        </Link>
        <button
          onClick={logoutHandler}
          className="w-full flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400"
        >
          <LogOut className="text-black" /> Logout
        </button>
        <Link className="flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400">
          <Settings className="text-black" /> Settings
        </Link>
      </div>
      <div className="my-2 p-2 bg-slate-100 rounded-xl">
        <Link
          to={"/dashboard/profile"}
          className="flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400"
        >
          <UserCircle className="text-black" /> My Profile
        </Link>
        <button
          onClick={logoutHandler}
          className="w-full flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400"
        >
          <LogOut className="text-black" /> Logout
        </button>
        <Link className="flex gap-x-2 px-4 py-1 text-gray-800 text-lg border-b border-gray-400">
          <Settings className="text-black" /> Settings
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;
