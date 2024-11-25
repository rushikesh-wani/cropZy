const Product = require("../models/product");

const getAllItemsController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const allItems = await Product.find({ farmerId: _id });

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

const productAddController = async (req, res) => {
  try {
    const { _id } = req.userData;
    const {
      itemName,
      price,
      category,
      description,
      stockQty,
      value,
      unit,
      img,
    } = req.body;
    const isItemAlreadyExists = await Product.findOne({
      itemName: itemName,
      farmerId: _id,
    });
    if (!itemName || !stockQty || !unit || !value || !description || !price) {
      throw new Error("All fields are required");
    }
    if (isItemAlreadyExists) {
      throw new Error(
        "Item already listed in your shop! Try update the existing product or delete to add new item with same name."
      );
    }

    const product = new Product({
      itemName,
      price,
      category,
      description,
      addedAt: Date.now(),
      stockQty,
      weight: {
        value: value,
        unit: unit,
      },
      img,
      farmerId: _id,
    });
    const productData = await product.save();

    const productAddedData = await Product.findById(productData._id).populate(
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
    const doesItemExists = await Product.findOne({
      _id: itemId,
      farmerId: _id,
    });

    if (!doesItemExists) {
      res.status(404).json({
        statusCode: 404,
        message: "Item not found!",
      });
    } else {
      const deletedItem = await Product.findByIdAndDelete(itemId);
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
    const { _id } = req.userData; // Farmer Id as farmer is logged in
    const { itemId } = req.params;
    const {
      itemName,
      description,
      stockQty,
      price,
      weight,
      unit,
      value,
      category,
    } = req.body;
    const allowedFields = [
      "itemName",
      "description",
      "stockQty",
      "price",
      "category",
      "weight",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );
    const doesItemExists = await Product.findOne({
      _id: itemId,
      farmerId: _id,
    });

    // if edit is allowed then => then check if item with Id and farmerId exists or not => then validate the fields => then update the fields

    if (!isEditAllowed) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Unkown field found in req.body!",
      });
    } else {
      if (!doesItemExists) {
        return res.status(404).json({
          statusCode: 404,
          success: false,
          message: "Item not found!",
        });
      } else {
        // Validate the updated Fields
        // write validations here

        // update the item details
        const updatedItem = await Product.findByIdAndUpdate(itemId, req.body, {
          returnDocument: "after",
        });
        if (!updatedItem) {
          return res.status(404).json({
            statusCode: 404,
            success: false,
            message: "Item not found!",
          });
        } else {
          return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Item details updated successfully",
            data: updatedItem,
          });
        }
      }
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
  productAddController,
  getAllItemsController,
  deleteItemController,
  updateItemDetails,
};
