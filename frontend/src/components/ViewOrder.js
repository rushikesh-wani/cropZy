import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../helpers/HelperFunctions";
import { toast } from "react-toastify";
import RouteNavigate from "./RouteNavigate";
const ViewOrder = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { id } = useParams();

  const getOrderDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/farmer/view-order/${id}`,
        { withCredentials: true }
      );
      if (res?.status === 200) {
        setOrderDetails(res?.data?.data);
      } else if (res?.status === 400) {
        toast.warn(`${res?.response?.data?.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);
  console.log(orderDetails);
  return (
    <>
      <RouteNavigate page={"View Order"} />
      <div className="h-[500px] flex justify-center items-center">
        <div className="border px-10 py-6 rounded-xl">
          <p className="text-center text-rose-700 uppercase text-2xl font-bold">
            Order Receipt
          </p>
          <div className="mt-5 flex gap-x-4">
            <div className="w-2/4">
              <p className="text-md font-medium">
                Order id :{" "}
                <span className="text-gray-700">{orderDetails?._id}</span>
              </p>
              <p className="text-md font-medium">
                Customer Name :{" "}
                <span className="text-gray-700 uppercase">{`${orderDetails?.customerId?.firstName} ${orderDetails?.customerId?.lastName}`}</span>
              </p>
              <p className="text-md font-medium">
                Customer Phone :{" "}
                <span className="text-gray-700 uppercase">
                  {orderDetails?.customerId?.phone}
                </span>
              </p>
              <p className="text-md font-medium">
                Customer Address :{" "}
                <span className="text-gray-700 uppercase text-clip ">
                  {orderDetails?.customerId?.address}
                </span>
              </p>
            </div>
            <div className="w-2/4">
              <p className="text-md font-medium">
                Order Date :{" "}
                <span className="text-gray-700 uppercase">
                  {formatDate(orderDetails?.createdAt)}
                </span>
              </p>
              <p className="text-md font-medium">
                Status :{" "}
                <span className="bg-slate-200 px-2 text-gray-700 uppercase">
                  {orderDetails?.status}
                </span>
              </p>
              <p className="text-md font-medium">
                Seller Name :{" "}
                <span className="text-gray-700 uppercase">{`${orderDetails?.farmerId?.firstName} ${orderDetails?.farmerId?.lastName}`}</span>
              </p>
              <p className="text-md font-medium">
                Seller Phone :{" "}
                <span className="text-gray-700 uppercase">
                  {orderDetails?.farmerId?.phone}
                </span>
              </p>
            </div>
          </div>

          <table className="mt-5 w-full text-gray-700">
            <thead className="bg-emerald-50 uppercase text-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr. no.
                </th>
                <th scope="col" className="px-6 py-3">
                  Item name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price Per Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="">
              {orderDetails?.items?.map((order, idx) => (
                <tr
                  key={order._id}
                  className="text-center font-medium border-b"
                >
                  <td className="">{idx + 1}</td>
                  <td className="">{order?.item?.itemName}</td>
                  <td className="">{`${order?.quantity}`}</td>
                  <td className="">{`₹${order?.item?.price}`}</td>
                  <td className="">{`₹${order?.price}`}</td>
                </tr>
              ))}
              <tr className="text-center font-medium border-b">
                <td></td>
                <td></td>
                <td></td>
                <td className="bg-green-200 ">Total :</td>
                <td className="bg-green-200 ">{`₹${orderDetails?.totalPrice}`}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-1 text-md text-white font-medium bg-green-500 rounded-lg"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
