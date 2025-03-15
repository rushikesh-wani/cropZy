import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  // Write logic for => if user selects customer role then he must redirect to customer sign up form
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "farmer",
    profileImg: "",
    password: "",
    farmName: "",
    farmLocation: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, img: files[0] });
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing up... Please wait");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);
      if (res?.status === 201) {
        toast.update(loadingToast, {
          render: `${res?.data?.message}`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, {
        render: `${err?.response?.data?.message}`,
        type: "warning",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-screen bg-violet-50 flex justify-center items-center">
      <div className="bg-white w-3/6 px-10 py-6 border rounded-xl shadow-lg">
        {/* <h1 className="text-2xl font-bold text-center text-green-600">
          cropZy
        </h1> */}
        <h1 className="my-3 text-xl font-medium text-center">Farmer Signup</h1>
        <form onSubmit={onSubmitForm}>
          <div className="grid grid-flow-col grid-cols-2 gap-x-10">
            <div className="col-span-1">
              <div className="flex flex-col gap-y-4">
                <div>
                  <label htmlFor="firstName" className="block font-medium">
                    FirstName<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter your firstname"
                    type="text"
                    value={formData.firstName}
                    name="firstName"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-medium">
                    Phone no.<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter yor mobile no."
                    value={formData.phone}
                    name="phone"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    name="email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block font-medium">
                    Password<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                    name="password"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col gap-y-4">
                <div>
                  <label htmlFor="lastName" className="block font-medium">
                    LastName<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter your lastname"
                    type="text"
                    value={formData.lastName}
                    name="lastName"
                  />
                </div>

                <div>
                  <label htmlFor="farmName" className="block font-medium">
                    Farm Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="farmName"
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter yor farm name"
                    value={formData.farmName}
                    name="farmName"
                  />
                </div>
                <div>
                  <label htmlFor="farmLocation" className="block font-medium">
                    Farm location<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="farmLocation"
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter yor farm location"
                    value={formData.farmLocation}
                    name="farmLocation"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    onChange={handleInput}
                    placeholder="Enter your password again"
                    type="password"
                    value={formData.confirm}
                    name="confirm-password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block font-medium">
              Role<span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              onChange={handleInput}
              name="role"
              value={formData.role}
              className="w-44 border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-blue-500"
            >
              <option value={"farmer"}>Farmer</option>
              <option value={"customer"}>Customer</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="profileImg" className="block font-medium">
              Profile Image
            </label>

            <input
              id="profileImg"
              className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
              placeholder="Select profile image"
              type="file"
              accept="image/*"
              name="profileImg"
            />
          </div>
          <div className="text-center mt-4">
            <button className="px-5 py-1 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-500">
              Signup
            </button>
            <p>
              Already registered as farmer!{" "}
              <Link to={"/login"} className="text-violet-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
