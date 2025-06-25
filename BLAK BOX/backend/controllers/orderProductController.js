const OrderProduct = require('../models/orderProduct');

const getAllOrderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProduct.find()
      .populate('orderId', '_id')
      .populate('productId', 'name price');
    res.status(200).json(orderProducts);
  } catch (error) {
    console.error("Error getting order products:", error);
    res.status(500).json({ message: "Server error while getting order products." });
  }
};

module.exports = {
  getAllOrderProducts
};
