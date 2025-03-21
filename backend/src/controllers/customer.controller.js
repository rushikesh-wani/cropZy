const Order = require("../models/orders");
const Product = require("../models/product");
const validator = require("validator");
const User = require("../models/users");
const Farmer = require("../models/farmers");
const { default: mongoose } = require("mongoose");
const { isMongoId } = validator;
const PRODUCT_FIELDS =
  "itemName stockQty weight img price category description farmerId addedAt";
const FARMER_POPULATED_FIELDS = "firstName lastName email phone profileImg";

const profileViewController = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, phone, role, profileImg } =
      req.userData;

    if (role !== "customer") {
      res.status(400).json({
        statusCode: "400",
        success: false,
        err: "Unauthorized access",
        message: "User logged in does not have access to customer role.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: `Welcome back, ${firstName} ${lastName}!`,
        data: req.userData,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};
const getCustomerHomepage = async (req, res) => {
  // const { _id } = req.userData; // Customer ID
  try {
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by the 'category' field
          products: { $push: "$$ROOT" }, // Collect all documents in each category
          count: { $sum: 1 }, // Count the number of products in each category
        },
      },
      {
        $project: {
          _id: 0, // Hide the default `_id` field
          category: "$_id", // Rename `_id` to `category`
          products: 1, // Include the array of products
          count: 1, // Include the count of products
        },
      },
      {
        $sort: { category: 1 }, // Sort categories alphabetically
      },
    ]);
    const bestSellerData = await User.find({ role: "farmer" }).select(
      "firstName lastName phone profileImg"
    );
    const farmData = await Farmer.find({}).populate(
      "userId",
      "firstName lastName profileImg phone"
    );
    const productData = await Product.find({}).populate(
      "farmerId",
      "firstName lastName profileImg phone"
    );

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Home page details fetched successfully.",
      data: [
        {
          headLine: "Shop by Category",
          categories: [
            {
              categoryName: "Fresh Fruits",
              img: "https://res.cloudinary.com/rushikeshwani/image/upload/v1734157025/cropZy/category/fzkiiruumcmglusrkzpd.avif",
            },
            {
              categoryName: "Vegetables",
              img: "https://res.cloudinary.com/rushikeshwani/image/upload/v1734157025/cropZy/category/pkoey1enez0qwdoqojkn.avif",
            },
            {
              categoryName: "Dairy Product",
              img: "https://res.cloudinary.com/rushikeshwani/image/upload/v1734156809/cropZy/category/oxij5i4sbcmvwwrff618.avif",
            },
            {
              categoryName: "Cereals",
              img: "https://res.cloudinary.com/rushikeshwani/image/upload/v1734156809/cropZy/category/ghep78ltvqsmnn6gibhr.avif",
            },
            {
              categoryName: "Spices & Chutney",
              img: "https://res.cloudinary.com/rushikeshwani/image/upload/v1734156809/cropZy/category/oz47gfyvc6xvsrqn1eah.avif",
            },
          ],
        },
        {
          headLine: "Category based Products",
          data: categoryData,
        },
        {
          headLine: "Best Sellers",
          data: bestSellerData,
        },
        {
          headLine: "Shop by Farm",
          data: farmData,
        },
        {
          headLine: "Shop Farm Fresh Products",
          data: productData,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "INTERNAL SERVER ERROR",
      err: err.message,
    });
  }
};

const myOrderController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const myOrders = await Order.find({ customerId: _id })
      .populate("farmerId", "firstName lastName email phone profileImg")
      .populate("items.item", "itemName description img weight price");
    if (myOrders.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "No orders to show you right now.",
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Orders fetched successfully!",
      data: myOrders,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "INTERNAL SERVER ERROR : Error fetching the order.",
      err: `${err.message}`,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const productsData = await Product.find()
      .select(PRODUCT_FIELDS)
      .populate("farmerId", FARMER_POPULATED_FIELDS);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Data fetched successfully",
      data: productsData,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "INTERNAL SERVER ERROR : Error fetching the products.",
      err: `${err.message}`,
    });
  }
};

const getOrdersByStatus = async (req, res) => {
  try {
    const { orderStatus } = req.params;
    const { _id, firstName, lastName } = req.userData;
    const allowedOrderStatus = [
      "pending",
      "approved",
      "rejected",
      "delivered",
      "cancel",
    ];
    const isOrderStatusValid = allowedOrderStatus.includes(orderStatus);
    if (!isOrderStatusValid) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `${orderStatus} is not the valid status`,
      });
    }
    const getOrders = await Order.find({
      customerId: _id,
      status: orderStatus,
    });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `${firstName} ${lastName}'s ${orderStatus} orders fetched successfully`,
      data: getOrders,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: `INTERNAL SERVER ERROR: ${err.message}`,
    });
  }
};

const cancelOrderInPendingState = async (req, res) => {
  try {
    // Check if orderID is present
    // Check if order._id : orderID, order.customerId : _id, order.status : "Pending" is valid -Find in DB
    // If yes => then change order.status = "cancel"
    const { orderID } = req.params;
    const { _id } = req.userData; // customer userId : user._id
    if (!orderID) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Order id not found`,
      });
    }
    const isOrderIdObjId = isMongoId(orderID);
    if (!isOrderIdObjId) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: `Order id is not a mongo ObjectId`,
      });
    }
    const orderData = await Order.findOne({
      _id: orderID,
      status: "pending",
      customerId: _id,
    });
    if (!orderData) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Order is not valid to be edited`,
      });
    }
    orderData.status = "cancel";
    const updatedOrderData = await orderData.save();
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Order- ${orderData._id} cancelled by customer`,
      data: updatedOrderData,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: `INTERNAL SERVER ERROR: ${err.message}`,
    });
  }
};

const getFarmerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // const farmerId = new mongoose.Types.ObjectId(id);
    const isIdValid = isMongoId(id);
    if (!isIdValid) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Id provided is not the valid mongo ObjectId",
      });
    }
    const isFarmerValid = await Farmer.findOne({ userId: id }).populate(
      "userId",
      "firstName lastName phone profileImg"
    );
    if (!isFarmerValid) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Farmer not found!",
      });
    }
    const categoriesData = await Product.aggregate([
      {
        $match: {
          farmerId: new mongoose.Types.ObjectId(id), // Filter products by the provided farmerId
        },
      },
      {
        $group: {
          _id: "$category", // Group products by the "category" field
          totalCount: { $sum: 1 }, // Count the total number of products in each category
          products: {
            $push: {
              _id: "$_id",
              itemName: "$itemName", // Push product details into the "products" array
              stockQty: "$stockQty",
              category: "$category",
              price: "$price",
              img: "$img",
              weight: "$weight",
              description: "$description",
            },
          },
        },
      },
      {
        $sort: { totalCount: -1 }, // Sort categories by totalCount in descending order
      },
    ]);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `${isFarmerValid.userId.firstName} ${isFarmerValid.userId.lastName}'s Farmer details fetched successfully...`,
      data: {
        farmerData: isFarmerValid,
        product: categoriesData,
      },
    });
  } catch (err) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "INTERNAL SERVER ERROR",
      err: err.message,
    });
  }
};

module.exports = {
  getCustomerHomepage,
  myOrderController,
  getAllProduct,
  getOrdersByStatus,
  cancelOrderInPendingState,
  getFarmerDetails,
  profileViewController,
};
