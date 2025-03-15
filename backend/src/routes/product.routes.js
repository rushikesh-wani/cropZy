const express = require("express");
const auth = require("../middlewares/auth");
const farmerAuth = require("../middlewares/farmerAuth");
const xlsx = require("xlsx");
const {
  getAllItemsController,
  deleteItemController,
  updateItemDetails,
  productAddController,
  getProductDetails,
  getFreshFruits,
} = require("../controllers/product.controller");
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const validator = require("validator");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const { isMongoId } = validator;
const productRouter = express.Router();

// GET /product/:itemId => Get the Item Details based on its _id
productRouter.get("/getProduct/:itemId", getProductDetails);

productRouter.post(
  "/product/add",
  auth,
  farmerAuth,
  upload.single("img"),
  productAddController
);

productRouter.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image file is required",
      });
    }

    // File uploaded successfully
    return res.status(200).json({
      statusCode: 200,
      message: "Image uploaded successfully",
      imageUrl: req.file.path, // Cloudinary URL of the uploaded image
    });
  } catch (err) {
    console.error("Error uploading image:", err.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
});

productRouter.get("/fresh-fruits", getFreshFruits);

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

// Bulk Upload API
productRouter.post("/bulk-upload", async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded. Please upload an Excel file." });
    }

    // Access the uploaded file
    const uploadedFile = req.files.file;

    // Read the Excel file
    const workbook = xlsx.read(uploadedFile.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and map data from the Excel sheet
    const products = sheetData.map((row) => ({
      itemName: row["Item Name"],
      stockQty: row["Stock Quantity"],
      weight: {
        value: row["Weight Value"],
        unit: row["Weight Unit"],
      },
      img: row["Image URL"], // Using text link for image
      price: row["Price"],
      category: row["Category"],
      description: row["Description"],
      farmerId: new mongoose.Types.ObjectId(row["Farmer ID"]),
      farmDetails: new mongoose.Types.ObjectId(row["Farm Details"]),
    }));

    // Insert the mapped data into the database
    const result = await Product.insertMany(products);

    res.status(201).json({
      message: `${result.length} products successfully uploaded`,
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during bulk upload", error: error.message });
  }
});

module.exports = productRouter;
