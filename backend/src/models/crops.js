const mongoose = require("mongoose");

const cropSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
      minLength: 2,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      maxLength: 100,
      default: "Recently Added",
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 500,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    addedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Crop = mongoose.model("crop", cropSchema);

module.exports = Crop;
