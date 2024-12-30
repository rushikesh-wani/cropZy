const Cart = require("../models/cart");
const validator = require("validator");
const Product = require("../models/product");
const { isMongoId } = validator;

const addToCart = async (req, res) => {
  try {
    const { _id } = req.userData;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Item ID is required.",
      });
    }

    const isItemIdValidMongoId = isMongoId(itemId);
    if (!isItemIdValidMongoId) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Item ID is not a valid mongoId!",
      });
    }

    const isItemIdValid = await Product.findById(itemId);

    if (!isItemIdValid) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Item with Id- ${itemId} not found!`,
      });
    }

    let userCart = await Cart.findOne({ user: _id });
    if (userCart) {
      // User Cart Already exits!
      const itemIndex = userCart.products.findIndex(
        (product) => product.item.toString() === itemId
      );

      if (itemIndex !== -1) {
        // Item already in cart: Update quantity and price
        userCart.products[itemIndex].quantity++;
        userCart.products[itemIndex].price =
          userCart.products[itemIndex].quantity * isItemIdValid.price;
        // Update price
      } else {
        // Item not in cart: Add it
        userCart.products.push({
          item: itemId,
          quantity: 1,
          price: isItemIdValid.price,
        });
      }

      await userCart.save();
    } else {
      // Create new Cart for User
      userCart = new Cart({
        user: _id,
        products: [{ item: itemId, quantity: 1, price: isItemIdValid.price }],
      });

      await userCart.save();
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Item added to cart successfully.",
      cart: userCart,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "INTERNAL SERVER ERROR",
      err: err.message,
    });
  }
};

const incrementQty = async (req, res) => {
  try {
    const { _id } = req.userData;
    const { action, cartItemId } = req.params;
    if (!cartItemId || !["incrementQty", "decrementQty"].includes(action)) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message:
          "Invalid input. Provide a valid itemId and action (incrementQty/decrementQty)!",
      });
    }

    const iscartItemIdValidMongoId = isMongoId(cartItemId);
    if (!iscartItemIdValidMongoId) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Cart Item ID is not a valid mongoId!",
      });
    }

    const userCart = await Cart.findOne({ user: _id });
    if (!userCart) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Cart not found.",
      });
    }

    const itemIndex = userCart.products.findIndex(
      (product) => product.item.toString() === cartItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Item not found in cart. First Add the item to cart",
      });
    }

    const unitPrice =
      userCart.products[itemIndex].price /
      userCart.products[itemIndex].quantity;

    if (action === "incrementQty") {
      userCart.products[itemIndex].quantity += 1;
    } else if (action === "decrementQty") {
      userCart.products[itemIndex].quantity -= 1;
      // Remove the item if quantity becomes 0
      if (userCart.products[itemIndex].quantity <= 0) {
        userCart.products.splice(itemIndex, 1);

        await userCart.save();

        // If no items in carts remove document of usercart from collection ==>

        return res.status(200).json({
          statusCode: 200,
          success: true,
          message: "Item removed from cart as its quantity reached zero.",
          cart: userCart,
        });
      }
    }
    // Update the price dynamically (unitPrice * quantity)
    userCart.products[itemIndex].price =
      unitPrice * userCart.products[itemIndex].quantity;

    // Save the updated cart
    await userCart.save();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Item quantity ${
        action === "incrementQty" ? "incremented" : "decremented"
      } successfully.`,
      cart: userCart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "INTERNAL SERVER ERROR",
      err: err.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { _id } = req.userData;
    const userCart = await Cart.findOne({ user: _id });
    if (!userCart || userCart?.products?.length === 0) {
      return res.status(204).json({
        statusCode: 204,
        success: false,
        message: "Cart is empty! Add items to cart to see.",
        data: {
          user: _id,
          products: [],
        },
      });
    }
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Cart data fetched successfully...",
      data: userCart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "INTERNAL SERVER ERROR",
      err: err.message,
    });
  }
};

module.exports = { addToCart, incrementQty, getUserCart };
