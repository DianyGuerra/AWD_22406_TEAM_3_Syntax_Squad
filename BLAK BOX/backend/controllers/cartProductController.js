const CartProduct = require('../models/cartProduct');

const getAllCartProducts = async (req, res) => {
  try {
    const cartProducts = await CartProduct.find()
      .populate('cartId', '_id')
      .populate('productId', 'name price');
    res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error getting cart products:", error);
    res.status(500).json({ message: "Server error while getting cart products." });
  }
};

module.exports = {
  getAllCartProducts
};
