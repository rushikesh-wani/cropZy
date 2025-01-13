const express = require("express");
const auth = require("../middlewares/auth");
const { makeAnOrder, createOrder } = require("../controllers/order.controller");
const customerAuth = require("../middlewares/customerAuth");

const orderRouter = express.Router();

// POST /order/send/:farmerId/:itemId => Send order
orderRouter.post("/order/send/:itemID", auth, customerAuth, makeAnOrder);

// POST /order/createOrder => create order
orderRouter.post("/order/createOrder", auth, customerAuth, createOrder);

module.exports = orderRouter;
