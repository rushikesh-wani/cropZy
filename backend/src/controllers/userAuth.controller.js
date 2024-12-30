const Customer = require("../models/customers");
const Farmer = require("../models/farmers");
const User = require("../models/users");
const {
  encrptPass,
  validateReqBody,
  sanitizeReqBody,
} = require("../utils/helperFunctions");
const jwt = require("jsonwebtoken");
const USER_POPULATE_STR = "_id firstName lastName email phone role profileImg";

const signupController = async (req, res) => {
  try {
    // sanitize the req.body
    sanitizeReqBody(req, res);
    // Validate the req.body
    await validateReqBody(req, res);

    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      password,
      profileImg,
      ...roleSpecificData
    } = req.body;

    const hashedPassword = await encrptPass(password);

    // first register and create the user with shared fields in User Collection
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      role,
      password: hashedPassword,
      profileImg,
    });

    let roleData;
    if (role === "customer") {
      // save shared fields in User collection and remaining field in Customer collection
      roleData = new Customer({
        userId: user._id,
        address: roleSpecificData?.address,
      });
      // first save the roleData in respective collection and then save the user in Users collection
      await roleData.save();
      await user.save();
    } else if (role === "farmer") {
      // save shared fields in User collection and remaining field in Farmer collection
      roleData = new Farmer({
        userId: user._id,
        farmName: roleSpecificData?.farmName,
        farmLocation: roleSpecificData?.farmLocation,
      });
      await roleData.save();
      await user.save();
    } else if (role === "admin") {
      // Currently nothing to do here
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: "Unexpected error occured while registering a user.",
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "User created successfully...",
      userId: user._id,
      role: user.role,
      roleData: roleData,
    });
  } catch (err) {
    // console.error("Error in /signup ", error);
    return res.status(500).json({
      statusCode: 500,
      err: "Error signing up the user",
      message: `${err.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        message: "Required fields are missing!",
      });
    }

    const isUserRegistered = await User.findOne({ email });
    if (!isUserRegistered) {
      return res.status(400).json({
        statusCode: 400,
        message: "Register first to login!",
      });
    }

    // returns bool
    const isPasswordValid = await isUserRegistered.validatePassword(password);

    if (isPasswordValid) {
      const jwtToken = await isUserRegistered.getJWT();
      res.cookie("token", jwtToken, {
        httpOnly: true, // Prevent client-side JavaScript access to cookies
        secure: process.env.NODE_ENV === "production", // Set secure to true in production
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // Set cookie expiry to 1 day
      });
      return res.status(200).json({
        statusCode: 200,
        message: `User ${isUserRegistered.firstName} ${isUserRegistered.lastName} login successfully`,
        data: isUserRegistered,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid credentials!",
      });
    }
  } catch (err) {
    return res.status(400).json({
      statusCode: 400,
      message: "Unexpected error occurred during login",
      err: `${err.message}`,
    });
  }
};

const logoutController = async (req, res) => {
  // Expire the Cookies immediately
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      statusCode: 200,
      message: "User Logout successfully",
    });
};

const isAuthenticated = async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    const USER_POPULATE_STR =
      "_id firstName lastName email phone role profileImg";
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Bad Request",
        error: "Unauthorized",
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id, firstName } = decodeToken;
    const userLogged = await User.findOne({ _id, firstName }).select(
      USER_POPULATE_STR
    );
    if (!userLogged) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Invalid Token. Register first!",
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Welcome ${userLogged?.firstName} ${userLogged?.lastName}!`,
      data: userLogged,
    });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  isAuthenticated,
};
