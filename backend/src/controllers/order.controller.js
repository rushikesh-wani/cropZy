const Farmer = require("../models/farmers");
const Order = require("../models/orders");
const Product = require("../models/product");
const Cart = require("../models/cart");

const makeAnOrder = async (req, res) => {
  try {
    // fix the issue of the quantity and price when the price for Piece is calculated its coming wrong
    const USER_POPULATED_STR = "firstName lastName email phone profileImg";
    const { _id } = req.userData;
    const customerId = _id;
    const { itemID } = req.params;
    const { weight } = req.body;

    // Check mandatory fields
    if (!itemID || !weight) {
      return res.status(400).json({
        statusCode: 400,
        message: "ItemID and weight are mandatory!",
      });
    }

    const { value, unit } = weight;
    if (!value || !unit) {
      return res.status(400).json({
        statusCode: 400,
        message:
          "Value and unit of weight of Product to be purchased are required and must be valid!",
      });
    }
    // // is farmerId valid
    // const isFarmerIdValid = await Farmer.findById(farmerID);
    // if (!isFarmerIdValid) {
    //   return res.status(404).json({
    //     statusCode: 404,
    //     message: `Farmer ID - ${farmerID} not found!`,
    //   });
    // }

    // is itemId valid
    const isItemValid = await Product.findById(itemID);
    if (!isItemValid) {
      return res.status(404).json({
        statusCode: 404,
        message: `Item ID - ${itemID} not found!`,
      });
    }
    const { price, stockQty } = isItemValid;

    // Check if units of products matches with user purchase units
    if (unit !== isItemValid.weight.unit) {
      return res.status(400).json({
        statusCode: 400,
        message: `The user input unit does not matched with units of products`,
      });
    }
    // Check if enough stock is available
    if (stockQty < value) {
      return res.status(400).json({
        statusCode: 400,
        message: `Insufficient stock: Available units are ${stockQty}`,
      });
    }

    let calculatedPrice;
    // logic for calclating price based on unit
    if (
      isItemValid.weight.unit === "Piece" ||
      isItemValid.weight.unit === "Combo"
    ) {
      const pricePerOnePiece = isItemValid.price / isItemValid.weight.value;
      calculatedPrice = value * pricePerOnePiece;
    } else if (
      isItemValid.weight.unit === "kg" ||
      isItemValid.weight.unit === "liters"
    ) {
      calculatedPrice = price * value; // 1 unit price * Quantity
    }

    const order = new Order({
      customerId,
      farmerId: isItemValid.farmerId,
      status: "pending",
      item: itemID,
      weight: {
        value: value,
        unit: unit,
      },
      price: calculatedPrice,
    });

    await order.save();
    // Update stock in the Product model
    isItemValid.stockQty -= value;
    await isItemValid.save();

    // console.log(isItemValid);
    // find ordered item details
    const itemOrdered = await Order.findById(order._id)
      .populate("customerId", USER_POPULATED_STR)
      .populate("farmerId", USER_POPULATED_STR)
      .populate("item", "itemName img description");
    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Order placed successfully",
      data: itemOrdered,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "INTERNAL ERROR : Error sending the order.",
      err: `${err.message}`,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { _id } = req.userData;
    // Fetch the User Cart
    // Validate farmer consistency
    // Create orders for each item in the cart
    // Clear order cart once order placed

    const userCart = await Cart.findOne({ user: _id }).populate(
      "products.item"
    );

    if (!userCart || userCart.products.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message:
          "Cart is empty. Please add items to the cart before placing an order.",
      });
    }

    const farmerId = userCart.products[0].item.farmerId.toString();
    const allSameFarmer = userCart.products.every(
      (product) => product.item.farmerId.toString() === farmerId
    );

    if (!allSameFarmer) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message:
          "All items in the cart must be from the same farmer. Clear the cart and try again.",
      });
    }

    const items = userCart.products.map((product) => ({
      item: product.item._id,
      quantity: product.quantity,
      weight: {
        value: product.item.weight.value * product.quantity,
        unit: product.item.weight.unit,
      },
      price: product.price,
    }));

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const orderData = {
      farmerId: farmerId,
      customerId: _id,
      status: "pending",
      items: items,
      totalPrice: totalPrice,
    };

    const newOrder = await Order.create(orderData);
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("farmerId", "firstName lastName email phone profileImg")
      .populate("customerId", "firstName lastName email phone profileImg")
      .populate("items.item", "itemName img description")
      .lean();

    // Clear the user's cart
    await Cart.findOneAndUpdate({ user: _id }, { products: [] });

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Order placed successfully.",
      order: populatedOrder,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "INTERNAL ERROR : Error creating the order.",
      err: err.message,
    });
  }
};

module.exports = { makeAnOrder, createOrder };
