import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, Eye, Table, Truck, XCircle } from "lucide-react";
import { formatDate } from "../helpers/HelperFunctions";
import RouteNavigate from "./RouteNavigate";
const AllOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState("all");

  const filterButtonHandler = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          status === "all"
            ? `${process.env.REACT_APP_SERVER_URL}/farmer/getOrders`
            : `${process.env.REACT_APP_SERVER_URL}/farmer/orders/${status}`,
          {
            withCredentials: true,
          }
        );
        if (res?.status === 200) {
          setOrderData(res?.data?.data);
          console.log(res?.data?.message);
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [status]);

  console.log(orderData);
  return (
    <>
      <RouteNavigate page={"All orders"} />
      {/* {Filter Tabs} */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium mb-4 pl-6 pt-4 text-green-600">
          Orders Table
        </h2>
        <div className="flex px-4 gap-x-4">
          <button
            onClick={() => {
              filterButtonHandler("all");
            }}
            className={
              "px-4 py-1 border rounded-lg" +
              (status === "all"
                ? " bg-sky-100 text-sky-800 border-sky-800"
                : "")
            }
          >
            All
          </button>
          <button
            onClick={() => {
              filterButtonHandler("pending");
            }}
            className={
              "px-4 py-1 border rounded-lg " +
              (status === "pending" ? "bg-slate-100 border-gray-800" : "")
            }
          >
            Pending
          </button>
          <button
            onClick={() => {
              filterButtonHandler("approved");
            }}
            className={
              " px-4 py-1 border  rounded-lg " +
              (status === "approved"
                ? "bg-green-100 border-green-800 text-green-600"
                : "")
            }
          >
            Approved
          </button>
          <button
            onClick={() => {
              filterButtonHandler("rejected");
            }}
            className={
              "px-4 py-1 border rounded-lg " +
              (status === "rejected"
                ? "bg-rose-100 border-red-800 text-rose-600 "
                : "")
            }
          >
            Rejected
          </button>
          <button
            onClick={() => {
              filterButtonHandler("delivered");
            }}
            className={
              "px-4 py-1 border rounded-lg " +
              (status === "delivered"
                ? "bg-yellow-100 border-yellow-600 text-yellow-500 "
                : "")
            }
          >
            Delivered
          </button>
        </div>
      </div>
      {/* {Table Container} */}
      <div className="relative max-h-[440px] overflow-x-auto overflow-y-auto no-scrollbar bg-white pb-6 border rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="sticky top-0 z-10 text-md text-gray-800 uppercase bg-opacity-75 backdrop-filter backdrop-blur-lg bg-emerald-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.no.
              </th>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Image
              </th> */}
              <th scope="col" className="px-6 py-3 text-nowrap">
                Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
            </tr>
          </thead>
          {orderData.length === 0 ? (
            <tr className="">
              <td colSpan="9" className="py-10">
                <p className="text-center text-xl">
                  No orders to show right now...
                </p>
              </td>
            </tr>
          ) : orderData ? (
            <tbody className="h-24 overflow-auto">
              {orderData?.map((order, index) => (
                <tr
                  key={order._id}
                  className="odd:bg-white even:bg-emerald-50 border-b hover:bg-gradient-to-r hover:from-green-200 hover:via-green-100 hover:to-green-50"
                >
                  <td className="px-6 py-4 text-center font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-600">
                    {order?._id}
                    {order?.status === "pending" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium px-2 rounded-lg text-center bg-slate-100 border border-gray-600">
                        {order?.status}
                      </p>
                    ) : order?.status === "approved" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium text-green-600 px-2 rounded-lg text-center bg-green-100 border border-green-800">
                        {order?.status}
                      </p>
                    ) : order?.status === "delivered" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium text-yellow-600 px-2 rounded-lg text-center bg-yellow-100 border border-yellow-800">
                        {order?.status}
                      </p>
                    ) : (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium px-2 text-red-600 rounded-lg text-center bg-red-100 border border-red-800">
                        {order?.status}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {order?.customerId?.firstName} {order?.customerId?.lastName}
                  </td>
                  {/* <td className="px-6 py-4 font-medium text-gray-600">
                    <div className="w-24 h-12 rounded-xl">
                      <img
                        className="w-full h-full object-cover rounded-xl"
                        src={order?.item?.img}
                        alt={order?.item?.itemName}
                      />
                    </div>
                  </td> */}
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {order?.items
                      ?.map((item) => item?.item?.itemName)
                      .join(", ")}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-600">
                    {formatDate(order?.createdAt)}
                  </td>
                  <td className="text-nowrap px-6 py-4 font-medium text-gray-600">
                    <p>{`₹${order?.totalPrice}`}</p>
                  </td>
                  {/* <td className="text-nowrap px-6 py-4 font-medium text-gray-600">
                    {order?.status === "pending" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium px-2 rounded-lg text-center bg-slate-100 border border-gray-600">
                        {order?.status}
                      </p>
                    ) : order?.status === "approved" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium text-green-600 px-2 rounded-lg text-center bg-green-100 border border-green-800">
                        {order?.status}
                      </p>
                    ) : order?.status === "delivered" ? (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium text-yellow-600 px-2 rounded-lg text-center bg-yellow-100 border border-yellow-800">
                        {order?.status}
                      </p>
                    ) : (
                      <p className="mt-2 mx-auto uppercase w-fit text-xs font-medium px-2 text-red-600 rounded-lg text-center bg-red-100 border border-red-800">
                        {order?.status}
                      </p>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="font-medium bg-white text-gray-600 border text-center">
              <tr role="status" className="">
                <td colSpan="9" className="py-10">
                  <div className="">
                    <svg
                      aria-hidden="true"
                      className="inline w-10 h-10 text-emerald-200 animate-spin dark:text-gray-600 fill-emerald-700"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <p>Loading data...</p>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default AllOrders;
