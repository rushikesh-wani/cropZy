const express = require("express");
const auth = require("../middlewares/auth");
const { profileViewController } = require("../controllers/farmer.controller");
const farmerAuth = require("../middlewares/farmerAuth");

const farmerRouter = express.Router();

farmerRouter.get(
  "/farmer/profileView",
  auth,
  farmerAuth,
  profileViewController
);

module.exports = farmerRouter;
