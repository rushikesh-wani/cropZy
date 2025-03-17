import axios from "axios";
import { toast } from "react-toastify";

export const getData = async (setOrderData) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/farmer/orders/excludeDelivered`,
    {
      withCredentials: true,
    }
  );
  if (res?.status === 200) {
    setOrderData(res?.data?.data);
    console.log(res?.data?.message);
  }
};

export const manageOrder = async (_id, status, setOrderData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/order/${status}/${_id}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res);
    if (res.status === 202) {
      if (status === "approved") {
        toast.success(`${res?.data?.message}`);
      } else if (status === "rejected") {
        toast.error(`${res?.data?.message}`);
      } else if (status === "delivered") {
        toast.success(`${res?.data?.message}`);
      }
      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === _id ? { ...order, status } : order
        )
      );
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Could not update the status! Try again.");
  }
};
