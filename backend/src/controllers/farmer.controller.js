const Crop = require("../models/crops");
const Farmer = require("../models/farmers");
const { validateItemEditFields } = require("../utils/helperFunctions");

const profileViewController = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, phone, role, profileImg } =
      req.userData;

    // Validate if user logged in is the Farmer or not
    if (role !== "farmer") {
      res.status(400).json({
        statusCode: "400",
        err: "Unauthorized access",
        message: "User logged in does not have access to farmer role.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: `Hello farmer ${firstName} ${lastName}. Welcome back!`,
        res: req.userData,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};

const getAllItemsController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const allItems = await Crop.find({ farmerId: _id });

    if (allItems.length == 0) {
      res.status(200).json({
        statusCode: 200,
        message: "No items yet added in shop. Add item to your shop first",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "All items fetched successfully!",
        data: allItems,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "Internal server error",
      err: err.message,
    });
  }
};

const cropAddController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const { itemName, pricePerUnit, category, description, quantity, addedAt } =
      req.body;

    const isItemAlreadyExists = await Crop.findOne({
      itemName: itemName,
      farmerId: _id,
    });
    if (!itemName && !pricePerUnit && !description) {
      throw new Error("All fields are required");
    }
    if (isItemAlreadyExists) {
      throw new Error(
        "Item already listed in your shop! Try update the existing product or delete to add new item with same name."
      );
    }

    const crop = new Crop({
      itemName,
      pricePerUnit,
      category,
      description,
      addedAt: Date.now(),
      quantity,
      farmerId: _id,
    });
    const cropData = await crop.save();

    const productAddedData = await Crop.findById(cropData._id).populate(
      "farmerId",
      "firstName lastName email phone"
    );
    res.status(201).json({
      statusCode: 201,
      message: `${itemName} item successfully added!`,
      data: productAddedData,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { _id } = req.userData;

    // Validate the itemId => whether is item id is reset and is where associated with the user logged in
    const doesItemExists = await Crop.findOne({ _id: itemId, farmerId: _id });

    if (!doesItemExists) {
      res.status(404).json({
        statusCode: 404,
        message: "Item not found!",
      });
    } else {
      const deletedItem = await Crop.findByIdAndDelete(itemId);
      // console.log(deleteItem);
      res.status(200).json({
        statusCode: 200,
        message: `Item ${deletedItem.itemName} deleted successfully!`,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};

const updateItemDetails = async (req, res) => {
  try {
    if (!validateItemEditFields(req)) {
      throw new Error(
        "Validations failed! Some fields didn't followed the validations"
      );
    }
    const { _id } = req.userData;
    const { itemId } = req.params;

    const doesItemExists = await Crop.findOne({ _id: itemId, farmerId: _id });
    if (!doesItemExists) {
      res.status(404).json({
        statusCode: 404,
        message: "Item not found!",
      });
    } else {
      // update the item details
      Object.keys(req.body).forEach(
        (key) => (doesItemExists[key] = req.body[key])
      );

      await doesItemExists.save();
      res.status(202).json({
        statusCode: "202",
        message: `${doesItemExists.itemName} Product details updated!`,
        data: doesItemExists,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};

module.exports = {
  profileViewController,
  cropAddController,
  getAllItemsController,
  deleteItemController,
  updateItemDetails,
};
