const bcrypt = require("bcrypt");
const validator = require("validator");
const { isLength, isNumeric, isAlphanumeric } = validator;
const User = require("../models/users");

// function to sanitize the request body to avoid attacks
const sanitizeReqBody = (req) => {
  const { firstName, lastName, email, phone, role, password, profileImg } =
    req.body;
  if (!firstName || !lastName || !email || !phone || !password || !role) {
    throw new Error("All fields are required");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error(
      "FirstName either too big or too small. Must be 3 < firstName < 50"
    );
  } else if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
    throw new Error("firstName must contain a-z or A-Z character only");
  } else if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
    throw new Error("lastName must contain a-z or A-Z character only");
  } else if (lastName.length < 3 || lastName.length > 50) {
    throw new Error(
      "LastName either too big or too small. Must be 3 < lastName < 50"
    );
  }
};

// function to valid the req.body at time of signup
const validateReqBody = async (req) => {
  const { email, phone, role } = req.body;
  const validRoles = ["customer", "farmer", "admin"];
  const isUserAlreadyExists = await User.findOne({ email: email });
  const isPhoneNumberAlreadyExists = await User.findOne({ phone });
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role provided");
  }
  if (isUserAlreadyExists) {
    throw new Error("User already exists.");
  }
  if (isPhoneNumberAlreadyExists) {
    throw new Error("Phone number already exists");
  }
};

// functions to encrpt password while signup
const encrptPass = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

const validateItemEditFields = async (req) => {
  // let { itemName, pricePerUnit, category, description, quantity } = req.body;
  // const allowedFields = [
  //   "itemName",
  //   "pricePerUnit",
  //   "category",
  //   "description",
  //   "quantity",
  // ];
  // const isItemEditAllowed = Object.keys(req.body).every((field) =>
  //   allowedFields.includes(field)
  // );
  // const isItemNameAllowed = isLength(itemName, { max: 150 });
  // const isPricePerUnitValid = isNumeric(pricePerUnit);
  // const isCategoryValid = isAlphanumeric(category);
  // const isDescriptionValid = isLength(description, { max: 250 });
  // const isQuantityValid = isNumeric(quantity);
  // return (
  //   isItemEditAllowed &&
  //   isItemNameAllowed &&
  //   isPricePerUnitValid &&
  //   isCategoryValid &&
  //   isDescriptionValid &&
  //   isQuantityValid
  // );
};

module.exports = {
  sanitizeReqBody,
  validateReqBody,
  encrptPass,
  validateItemEditFields,
};
