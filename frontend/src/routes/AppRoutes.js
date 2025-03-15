import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
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
import DashboardGrid from "../pages/DashboardGrid";
import HeroSection from "../components/HeroSection";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HeroSection />,
      },
      {
        path: "login",
        element: <FarmerLogin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardGrid /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-orders", element: <ManageOrders /> },
      { path: "view-order/:id", element: <ViewOrder /> },
      { path: "products", element: <ProductTable /> },
      { path: "orders-received", element: <AllOrders /> },
      { path: "manage-product", element: <AllOrders /> },
      { path: "edit-product/:id", element: <EditProduct /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />}>
//           {/* <Route index element={<Summary />} /> */}
//           <Route index element={<DashboardGrid />} />
//           <Route path="add-product" element={<AddProduct />} />
//           <Route path="manage-orders" element={<ManageOrders />} />
//           <Route path="view-order/:id" element={<ViewOrder />} />
//           <Route path="products" element={<ProductTable />} />
//           <Route path="orders-received" element={<AllOrders />} />
//           <Route path="manage-product" element={<AllOrders />} />
//           <Route path="edit-product/:id" element={<EditProduct />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Route>

//         <Route path="/login" element={<FarmerLogin />} />
//         <Route path="/signup" element={<Signup />} />
//         {/* <Route path="/dashboard" element={<FarmerDashboard />} /> */}
//         {/* <Route
//           path="/add-product"
//           element={
//             <>
//               <div className="">
//                 <div className="m-10">
//                   <div className="grid grid-flow-row grid-cols-3 gap-2">
//                     <div className="col-span-1 p-4 border border-gray-500 rounded-xl">
//                       <FarmerSummary />
//                     </div>
//                     <div className="col-span-2 p-4 border border-gray-500 rounded-xl">
//                       <RouteNavigate />
//                       <AddProduct />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           }
//         /> */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </Router>
//   );
// };

export default appRouter;
