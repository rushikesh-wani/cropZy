import axios from "axios";
import { useEffect, useState } from "react";
import RouteNavigate from "./RouteNavigate";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [productData, setProductData] = useState([]);

  const productDeleteHandler = async (itemId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/product/delete/${itemId}`,
        { withCredentials: true }
      );
      console.log(res);
      if (res?.status === 200) {
        // setProductData(); // write here logic to refresh the product data after deletion of product from list
        // setProductData((prev) => prev.filter((product) => product._id != itemId));
        toast.success(`${res?.data?.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.warn(`${err?.response?.data?.message}`);
    }
  };
  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/getAllItems`,
          {
            withCredentials: true,
          }
        );
        setProductData(res?.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(productData);
  return (
    <>
      <RouteNavigate page={"All Products"} />
      <div className="relative h-[500px] overflow-y-auto no-scrollbar bg-white pb-6 border rounded-lg">
        {/* <h2 className="text-lg font-medium mb-4 pl-6 pt-4 text-green-600">
          Product Table
        </h2> */}
        <div className="">
          <table className="w-full text-sm text-gray-500">
            <thead className="sticky top-0 z-10 text-md text-gray-800 uppercase bg-opacity-75 backdrop-filter backdrop-blur-lg bg-emerald-300">
              <tr className="text-nowrap">
                <th scope="col" className="px-6 py-3">
                  Sr.no.
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3">
                  StockQty
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price per Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            {productData ? (
              <tbody className="h-44 overflow-auto">
                {productData?.data?.map((product, index) => (
                  <tr
                    key={product._id}
                    className="odd:bg-white even:bg-emerald-50 border-b hover:bg-gradient-to-r hover:from-green-200 hover:via-green-100 hover:to-green-50"
                  >
                    <td className="px-6 py-4 text-center font-medium text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-600">
                      <div className="w-24 h-12 rounded-xl">
                        <img
                          className="w-full h-full object-cover rounded-xl"
                          src={product?.img}
                          alt={product?.itemName}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {product?.itemName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {product?.stockQty}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {product?.category}
                    </td>
                    <td className="text-nowrap px-6 py-4 font-medium text-gray-600">
                      {`₹ ${product?.price} / ${product?.weight?.value} ${product?.weight?.unit}`}
                    </td>
                    <td className="max-w-48 max-h-16 line-clamp-3 py-1 font-medium text-gray-600">
                      {product?.description}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      <div className="flex justify-center gap-x-2">
                        <Link to={`/dashboard/edit-product/${product?._id}`}>
                          <div className="w-fit p-2 bg-blue-600 text-white rounded-full">
                            <Edit />
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            productDeleteHandler(product?._id);
                          }}
                          to={`/dashboard/edit-product/${product?._id}`}
                        >
                          <div className="w-fit p-2 bg-rose-600 text-white rounded-full">
                            <Trash2 />
                          </div>
                        </button>
                      </div>
                    </td>
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
      </div>
    </>
  );
};

export default ProductTable;
