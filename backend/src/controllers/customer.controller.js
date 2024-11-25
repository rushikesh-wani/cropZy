const Order = require("../models/orders");

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

module.exports = { myOrderController };
