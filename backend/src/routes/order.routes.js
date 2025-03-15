const express = require("express");
const auth = require("../middlewares/auth");
const {
  makeAnOrder,
  createOrder,
  getOrderDetails,
} = require("../controllers/order.controller");
const customerAuth = require("../middlewares/customerAuth");

const orderRouter = express.Router();

// POST /order/send/:farmerId/:itemId => Send order
orderRouter.post("/order/send/:itemID", auth, customerAuth, makeAnOrder);

// POST /order/createOrder => create order
orderRouter.post("/order/createOrder", auth, customerAuth, createOrder);

// GET /order/:orderId => Get Order based on order Id
orderRouter.get("/order/:orderId", auth, customerAuth, getOrderDetails);

module.exports = orderRouter;
