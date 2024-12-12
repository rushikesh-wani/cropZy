import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const getFarmerData = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/farmer/profileView`,
      { withCredentials: true }
    );
    if (res?.status !== 200) {
      console.log(`Error while making API call`);
    }
    return res?.data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutHandler = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/logout`,
    {},
    { withCredentials: true }
  );
  if (res?.status === 200) {
    toast.success(`${res?.data?.message}`);
  }
};
