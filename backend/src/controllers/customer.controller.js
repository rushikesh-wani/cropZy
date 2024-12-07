const Order = require("../models/orders");
const Product = require("../models/product");
const validator = require("validator");
const { isMongoId } = validator;
const PRODUCT_FIELDS =
  "itemName stockQty weight img price category description farmerId addedAt";
const FARMER_POPULATED_FIELDS = "firstName lastName email phone profileImg";

const myOrderController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const myOrders = await Order.find({ customerId: _id })
      .select("_id item farmerId orderDate status weight price")
      .populate("farmerId", "firstName lastName email phone profileImg")
      .populate("item", "itemName description img");
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

module.exports = {
  myOrderController,
  getAllProduct,
  getOrdersByStatus,
  cancelOrderInPendingState,
};
