const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const userAuthRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");
const farmerRouter = require("./routes/farmer.routes");
const productRouter = require("./routes/product.routes");
const customerRouter = require("./routes/customer.routes");
const fileUpload = require("express-fileupload");
const recipeRouter = require("./routes/recipe.routes");
const cartRouter = require("./routes/cart.routes");
require("dotenv").config();

const app = express();
const API_BASE_URL = process.env.API_BASE_URL;

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Routes
app.use(`${API_BASE_URL}/`, userAuthRouter);
app.use(`${API_BASE_URL}/`, orderRouter);
app.use(`${API_BASE_URL}/`, farmerRouter);
app.use(`${API_BASE_URL}/`, productRouter);
app.use(`${API_BASE_URL}/`, customerRouter);
app.use(`${API_BASE_URL}/`, recipeRouter);
app.use(`${API_BASE_URL}/`, cartRouter);

// Connect to DB
connectDB()
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Server running on PORT: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
    console.log("Error message : ", err);
  });
