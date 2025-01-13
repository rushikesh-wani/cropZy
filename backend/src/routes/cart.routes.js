const express = require("express");
const auth = require("../middlewares/auth");
const customerAuth = require("../middlewares/customerAuth");
const {
  addToCart,
  incrementQty,
  getUserCart,
  clearCart,
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

//GET //my-cart => Get my Cart
cartRouter.get("/my-cart", auth, customerAuth, getUserCart);

//POST /addItem => Add Items to cart
cartRouter.post("/addItem", auth, customerAuth, addToCart);

//POST /incrementQty => Increment Qty of Cart Item
cartRouter.post("/incrementQty/:cartItemId", auth, customerAuth, incrementQty);

//POST /cart/incrementQty/chd8ch9sjjs => Increment Qty of Cart Item || /cart/decrementQty/cd8hcs9cdjdd9w
cartRouter.post("/cart/:action/:cartItemId", auth, customerAuth, incrementQty);

//POST /cart/clear-cart => Clears the cart
cartRouter.post("/cart/clear-cart", auth, customerAuth, clearCart);

module.exports = cartRouter;
