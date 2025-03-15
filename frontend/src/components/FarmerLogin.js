import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FarmerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        formData,
        {
          withCredentials: true, // Important for sending and receiving cookies
        }
      );
      console.log(res);
      if (res.status === 200 && res.data?.data?.role === "farmer") {
        toast.success(res?.data?.message, {
          position: "top-center",
          theme: "colored",
        });
        navigate("/dashboard");
      } else if (res.status === 200 && res.data?.data?.role === "customer") {
        navigate("/");
      } else {
        toast.error(res?.data?.message, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="h-screen bg-violet-50 flex justify-center items-center">
      <div className="w-2/6 bg-white px-10 py-6 border rounded-xl shadow-lg">
        {/* <h1 className="text-2xl font-bold text-center text-green-600">
          cropZy
        </h1> */}
        <h1 className="my-3 text-xl font-medium text-center">Farmer Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                onChange={handleChange}
                placeholder="Enter email"
                value={formData.email}
                name="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <input
                className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                onChange={handleChange}
                placeholder="Enter email"
                type="password"
                value={formData.password}
                name="password"
              />
            </div>
            <div className="mx-auto">
              <button className="px-5 py-1 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-500">
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-violet-600">
                Register here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerLogin;
