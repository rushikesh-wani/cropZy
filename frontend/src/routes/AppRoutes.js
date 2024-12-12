import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import FarmerLogin from "../components/FarmerLogin";
import AddProduct from "../components/AddProduct";
import Dashboard from "../layouts/Dashboard";
import ProductTable from "../components/ProductTable";
import Summary from "../components/Summary";
import AllOrders from "../components/AllOrders";
import Signup from "../pages/Farmer/Signup";
import ManageOrders from "../components/ManageOrders";
import EditProduct from "../components/EditProduct";
import ViewOrder from "../components/ViewOrder";
import Profile from "../pages/Farmer/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Summary />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="view-order/:id" element={<ViewOrder />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="orders-received" element={<AllOrders />} />
          <Route path="manage-product" element={<AllOrders />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/login" element={<FarmerLogin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<FarmerDashboard />} /> */}
        {/* <Route
          path="/add-product"
          element={
            <>
              <div className="">
                <div className="m-10">
                  <div className="grid grid-flow-row grid-cols-3 gap-2">
                    <div className="col-span-1 p-4 border border-gray-500 rounded-xl">
                      <FarmerSummary />
                    </div>
                    <div className="col-span-2 p-4 border border-gray-500 rounded-xl">
                      <RouteNavigate />
                      <AddProduct />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
