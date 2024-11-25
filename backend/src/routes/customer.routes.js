const express = require("express");
const auth = require("../middlewares/auth");
const customerAuth = require("../middlewares/customerAuth");
const { myOrderController } = require("../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.get("/my-orders", auth, customerAuth, myOrderController);
module.exports = customerRouter;
