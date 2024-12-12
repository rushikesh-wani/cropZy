import React, { useEffect, useState } from "react";
import RouteNavigate from "../../components/RouteNavigate";
import { Link } from "react-router-dom";
import { MailCheck, Phone, User } from "lucide-react";
import { getFarmerData } from "../../services/FarmerServices";
import axios from "axios";

const Profile = () => {
  const [farmerDetails, setFarmerDetails] = useState(null);
  const getFarmerData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/farmer/profileView`,
        { withCredentials: true }
      );
      if (res?.status !== 200) {
        console.log(`Error while making API call`);
      }
      setFarmerDetails(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFarmerData();
  }, []);
  console.log(farmerDetails);
  return (
    <>
      <RouteNavigate page={"Profile"} />
      <div className="relative">
        <div className="px-10 py-6 border rounded-xl">
          <div className="absolute top-0 left-0 right-0 rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-sky-200/50  to-orange-100 w-full h-36"></div>
          {/* {Profile Top} */}
          <div className="flex justify-between item-center">
            <div className="z-50 flex gap-x-4 items-center">
              <div className="w-28 h-28 rounded-full">
                <img
                  className="w-full h-full rounded-full border border-gray-500 object-cover"
                  loading="lazy"
                  alt="profile-img"
                  src={farmerDetails?.profileImg}
                />
              </div>
              <div className="text-slate-900">
                <p className="text-3xl font-semibold">{`${farmerDetails?.firstName} ${farmerDetails?.lastName}`}</p>
                <p className="font-medium">{farmerDetails?.email}</p>
                <p className="text-sm font-medium">
                  Role : {farmerDetails?.role}
                </p>
              </div>
            </div>
            <div className="z-50 flex items-center gap-x-4">
              <button className="px-4 py-1 font-medium bg-blue-600 text-white rounded-lg">
                Edit Profile
              </button>
              <button className="px-4 py-1 font-medium bg-rose-600 text-white rounded-lg">
                Logout
              </button>
            </div>
          </div>

          <div className="my-4 flex flex-col gap-y-2">
            {/* {Personal Info Section} */}
            <div>
              <p className="text-xl font-bold">Personal Info</p>
              <div className="grid grid-flow-col grid-cols-2 gap-x-20">
                <div className="col-span-1">
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <label htmlFor="firstName" className="block font-medium">
                        FirstName
                      </label>
                      <input
                        disabled
                        className="w-full px-2 py-2 border-b border-gray-600 focus:ring-0 focus:outline-none"
                        placeholder="Enter your firstname"
                        type="text"
                        name="firstName"
                        value={farmerDetails?.firstName}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block font-medium">
                        LastName
                      </label>
                      <input
                        disabled
                        className="w-full px-2 py-2 border-b border-gray-600 focus:ring-0 focus:outline-none"
                        placeholder="Enter your lastname"
                        type="text"
                        name="lastName"
                        value={farmerDetails?.lastName}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-medium">
                        Email
                      </label>
                      <input
                        disabled
                        className="w-full px-2 py-2 border-b border-gray-600 focus:ring-0 focus:outline-none"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={farmerDetails?.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <label htmlFor="phone" className="block font-medium">
                        Phone no.
                      </label>
                      <input
                        disabled
                        className="w-full px-2 py-2 border-b border-gray-600 focus:ring-0 focus:outline-none"
                        placeholder="Enter yor mobile no."
                        name="phone"
                        value={farmerDetails?.phone}
                      />
                    </div>

                    <div>
                      <label htmlFor="farmName" className="block font-medium">
                        Farm Name
                      </label>
                      <input
                        disabled
                        id="farmName"
                        className="w-full px-2 py-2 border-b border-gray-600 focus:ring-0 focus:outline-none"
                        placeholder="Enter yor farm name"
                        name="farmName"
                        value={farmerDetails?.farmName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {Email Section} */}
            <div>
              <p className="text-xl font-bold">My Email Address</p>
              <div>
                <div className="flex items-center gap-x-2">
                  <div className="w-fit p-2 bg-sky-300/50 rounded-full">
                    <MailCheck />
                  </div>
                  <p className="text-lg">{farmerDetails?.email}</p>
                </div>
              </div>
            </div>
            {/* {Farm Details} */}
            <div>
              <p className="text-xl font-bold">Farm Details</p>
            </div>
          </div>
          {/* <form>
            <div className="grid grid-flow-col grid-cols-3 gap-x-20">
              <div className="col-span-1">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label htmlFor="firstName" className="block font-medium">
                      FirstName
                    </label>
                    <input
                      className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                      placeholder="Enter your firstname"
                      type="text"
                      name="firstName"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-medium">
                      LastName
                    </label>
                    <input
                      className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                      placeholder="Enter your lastname"
                      type="text"
                      name="lastName"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <input
                      className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label htmlFor="phone" className="block font-medium">
                      Phone no.
                    </label>
                    <input
                      className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                      placeholder="Enter yor mobile no."
                      name="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-blue-500"
                    >
                      <option value={"farmer"}>Farmer</option>
                      <option value={"customer"}>Customer</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="farmName" className="block font-medium">
                      Farm Name
                    </label>
                    <input
                      id="farmName"
                      className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                      placeholder="Enter yor farm name"
                      name="farmName"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="farmLocation" className="block font-medium">
                Farm location
              </label>
              <input
                id="farmLocation"
                className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                placeholder="Enter yor farm location"
                name="farmLocation"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="profileImg" className="block font-medium">
                Product Image
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
              <button className="px-5 py-1 rounded-lg font-medium bg-green-600 text-white hover:bg-green-500">
                Login
              </button>
              <p>
                Already registered as farmer!{" "}
                <Link to={"/login"} className="text-green-600">
                  Login
                </Link>
              </p>
            </div>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
