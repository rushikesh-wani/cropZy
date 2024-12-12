import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RouteNavigate from "./RouteNavigate";
const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    unit: "",
    value: "",
    stockQty: "",
    price: "",
    category: "",
    img: "",
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

  const handleSubmit = async (e) => {
    const loadingToast = toast.loading("Adding product... Please wait");
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/product/add`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      if (res.status === 201) {
        toast.update(loadingToast, {
          render: `${res?.data?.message}`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, {
        render: `${err?.response?.data?.message}` || "Something went wrong!",
        type: "warning",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };
  return (
    <>
      <RouteNavigate page={"Add Product"} />
      <div className="h-[500px] flex items-center justify-center">
        <div className="px-10 py-6 border rounded-xl">
          <form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="grid grid-flow-col grid-cols-2 gap-x-20">
              <div className="col-span-1 space-y-4">
                <div>
                  <label
                    htmlFor="itemName"
                    className="block text-lg font-medium"
                  >
                    Product name
                  </label>
                  <input
                    id="itemName"
                    onChange={handleInput}
                    className="w-80 border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter product name..."
                    value={formData.itemName}
                    name="itemName"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-lg font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    onChange={handleInput}
                    className="w-full resize-none border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter product description here..."
                    type="text"
                    value={formData.description}
                    name="description"
                  >
                    {formData.description}
                  </textarea>
                </div>
                <div>
                  <label htmlFor="unit" className="block text-lg font-medium">
                    Unit
                  </label>
                  <select
                    id="unit"
                    onChange={handleInput}
                    name="unit"
                    value={formData.unit}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-blue-500"
                  >
                    <option value={""}>-- Select --</option>
                    <option value={"kg"}>Kilograms (kg)</option>
                    <option value={"gm"}>Grams (gm)</option>
                    <option value={"liters"}>Liters (Li)</option>
                    <option value={"ml"}>Mililiters (ml)</option>
                    <option value={"Piece"}>Pieces</option>
                    <option value={"Combo"}>Combo</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="value" className="block text-lg font-medium">
                    Value
                  </label>
                  <input
                    id="value"
                    onChange={handleInput}
                    className="w-80 border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter product name..."
                    type="number"
                    value={formData.value}
                    name="value"
                  />
                </div>
              </div>
              <div className="col-span-1 space-y-4">
                <div>
                  <label
                    htmlFor="stockQty"
                    className="block text-lg font-medium"
                  >
                    Stock Quantity
                  </label>
                  <input
                    id="stockQty"
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter stock quantity"
                    onChange={handleInput}
                    type="number"
                    value={formData.stockQty}
                    name="stockQty"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-lg font-medium"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInput}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-blue-500"
                  >
                    <option value={""}>-- Select --</option>
                    <option value={"Recently Added"}>Recently Added</option>
                    <option value={"Fresh Fruits"}>Fruits</option>
                    <option value={"Vegetables"}>Vegetables</option>
                    <option value={"Cereals"}>Cereals</option>
                    <option value={"Dairy Product"}>Dairy Product</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-lg font-medium">
                    Price per unit
                  </label>
                  <input
                    id="price"
                    onChange={handleInput}
                    className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter product price per unit"
                    type="number"
                    value={formData.price}
                    name="price"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="img" className="block text-lg font-medium">
                Product Image
              </label>

              <input
                id="img"
                className="w-full border-b border-gray-600 focus:ring-0 focus:outline-none"
                placeholder="Select product image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="img"
              />
            </div>
            <div className="mt-4 w-full text-center ">
              <button
                type="submit"
                className="px-5 py-2 text-lg rounded-lg font-medium bg-green-600 text-white hover:bg-green-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
