const Order = require('../models/order');

// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'firstName lastName email')
      .populate('orderProducts.productId', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Server error while getting orders." });
  }
};

module.exports = {
  getAllOrders
};
