const express = require("express");
const auth = require("../middlewares/auth");
const farmerAuth = require("../middlewares/farmerAuth");
const {
  getAllItemsController,
  deleteItemController,
  updateItemDetails,
  productAddController,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/product/add", auth, farmerAuth, productAddController);
productRouter.get(
  "/product/getAllItems",
  auth,
  farmerAuth,
  getAllItemsController
);
productRouter.delete(
  "/product/delete/:itemId",
  auth,
  farmerAuth,
  deleteItemController
);
productRouter.patch(
  "/product/edit/:itemId",
  auth,
  farmerAuth,
  updateItemDetails
);

module.exports = productRouter;
