const express = require("express");
const auth = require("../middlewares/auth");
const {
  profileViewController,
  cropAddController,
  getAllItemsController,
  deleteItemController,
  updateItemDetails,
} = require("../controllers/farmer.controller");

const farmerRouter = express.Router();

farmerRouter.get("/farmer/profileView", auth, profileViewController);
farmerRouter.post("/farmer/crop/add", auth, cropAddController);
farmerRouter.get("/farmer/getAllItems", auth, getAllItemsController);
farmerRouter.delete("/farmer/crop/delete/:itemId", auth, deleteItemController);
farmerRouter.patch("/farmer/crop/edit/:itemId", auth, updateItemDetails);

module.exports = farmerRouter;
