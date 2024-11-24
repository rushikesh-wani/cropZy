const express = require("express");
const auth = require("../middlewares/auth");
const Order = require("../models/orders");
const Farmer = require("../models/farmers");

const orderRouter = express.Router();

orderRouter.get("/order", auth, async (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    console.log(error);
  }
});

// Send order
orderRouter.post("/order/send/:farmerID/:itemID", auth, async (req, res) => {
  try {
    const { _id } = req.userData;
    const customerId = _id;
    const { farmerID, itemID } = req.params;
    const { price } = req.body;

    // is farmerId valid
    const isFarmerIdValid = await Farmer.findById(farmerID);
    if (!isFarmerIdValid) {
      throw new Error("FarmerId provided is not valid");
    }

    // is itemId valid
    // {
    // write logic here!
    // }

    const order = new Order({
      customerId,
      farmerId: farmerID,
      status: "pending",
      item: itemID,
      price,
      orderDate: Date.now(),
    });

    await order.save();
    res.status(200).json({
      statusCode: 200,
      message: "Order placed successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "INTERNAL ERROR : Error sending the order.",
      err: `${err.message}`,
    });
  }
});

module.exports = orderRouter;
