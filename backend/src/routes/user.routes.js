const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
  isAuthenticated,
} = require("../controllers/userAuth.controller");

const userAuthRouter = express.Router();

// END-POINT - POST /signup => user signup
userAuthRouter.post("/signup", signupController);

// END-POINT - POST /login => login user
userAuthRouter.post("/login", loginController);

// END-POINT - POST /logout => logout user
userAuthRouter.post("/logout", logoutController);

userAuthRouter.get("/protected", isAuthenticated);

module.exports = userAuthRouter;
