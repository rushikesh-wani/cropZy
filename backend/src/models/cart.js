const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    farmer: {
      farmerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      farmDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "farmer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
