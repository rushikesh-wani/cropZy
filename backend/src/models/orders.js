const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      require: true,
    },
    orderDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "delivered"],
        message: `{VALUE} is not the valid status`,
      },
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
