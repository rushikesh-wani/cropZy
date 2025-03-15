import {
  LayoutDashboard,
  LayoutGrid,
  Search,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 bg-white p-3 shadow-md">
      <div className="container mx-auto flex justify-around items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          cropZy
        </h1>
        <div className="relative">
          <Search className="absolute left-2 top-2 text-slate-600" />
          <input
            className="w-72 pl-9 py-2 border border-gray-500 rounded-xl focus:outline-none"
            placeholder="Search for product"
          />
        </div>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="hover:text-green-600 focus:text-green-500"
          >
            <div className="flex gap-x-2 justify-center items-center">
              <LayoutGrid />
              <p className="text-lg">Dashboard</p>
            </div>
          </Link>
          <Link
            to={"/dashboard/orders-received"}
            className="hover:text-green-600 focus:text-green-500"
          >
            <div className="flex gap-x-2 justify-center items-center">
              <ShoppingCart />
              <p className="text-lg">All orders</p>
            </div>
          </Link>

          <Link
            to="/dashboard/profile"
            className="hover:text-green-600 focus:text-green-500"
          >
            <div className="flex gap-x-2 justify-center items-center">
              <UserCircle />
              <p className="text-lg">Account</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
