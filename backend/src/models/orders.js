const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "delivered", "cancel"], // pending => at time of order | approved => approved by farmer | delivered => delivered by farmer | cancel => order cancelled by customer
        message: `{VALUE} is not the valid status`,
      },
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        weight: {
          value: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            required: true,
            enum: ["gm", "kg", "liters", "ml", "Piece", "Combo"],
          },
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
