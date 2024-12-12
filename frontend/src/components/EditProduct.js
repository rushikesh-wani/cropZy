import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RouteNavigate from "./RouteNavigate";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // itemId
  const [productData, setProductData] = useState({
    itemName: "",
    description: "",
    unit: "",
    value: "",
    stockQty: "",
    price: "",
    category: "",
    img: "",
    weight: {
      value: "",
      unit: "",
    },
  });
  const [updatedData, setUpdatedData] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;

    // For nested fields like "weight.value" or "weight.unit"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setProductData((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // For normal fields
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setProductData({ ...productData, img: files[0] });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/product/edit/${id}`,
        productData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(`${response?.data?.message}`);
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/getProduct/${id}`,
          { withCredentials: true }
        );
        setProductData(response?.data?.data);
        const { _id, ...remainigData } = productData;
        setUpdatedData(remainigData);
      } catch (err) {
        console.error("Error fetching product data:", err);
        alert("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <>
      <RouteNavigate page={`Edit Product : ${id}`} />
      <div className="flex justify-center items-center">
        <div className="max-w-fit px-10 py-6 border rounded-xl shadow-lg">
          <form
            onSubmit={handleFormSubmit}
            method="PATCH"
            encType="multipart/form-data"
          >
            <div className="grid grid-flow-col grid-cols-3 gap-x-10">
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
                    value={productData?.itemName}
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
                    className="w-full h-16 max-h-24 resize-y border-b border-gray-600 focus:ring-0 focus:outline-none"
                    placeholder="Enter product description here..."
                    type="text"
                    value={productData?.description}
                    name="description"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="unit" className="block text-lg font-medium">
                    Unit
                  </label>
                  <select
                    id="unit"
                    onChange={handleInput}
                    name="unit"
                    value={productData?.weight?.unit}
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
                    value={productData?.weight?.value}
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
                    value={productData?.stockQty}
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
                    value={productData?.category}
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
                    value={productData?.price}
                    name="price"
                  />
                </div>
              </div>
              <div className="col-span-1 w-full h-56 border rounded-lg">
                <img
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                  src={productData?.img}
                  alt={productData?.itemName}
                />
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
