const Cart = require('../models/cart');

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('userId', 'firstName lastName email');
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting carts:", error);
    res.status(500).json({ message: "Server error while getting carts." });
  }
};

module.exports = {
  getAllCarts
};
