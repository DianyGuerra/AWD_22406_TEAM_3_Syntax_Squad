const Shipping = require('../models/shipping');

const getAllShippings = async (req, res) => {
  try {
    const shippings = await Shipping.find()
      .populate('orderId', '_id');
    res.status(200).json(shippings);
  } catch (error) {
    console.error("Error getting shipping data:", error);
    res.status(500).json({ message: "Server error while getting shipping data." });
  }
};

module.exports = {
  getAllShippings
};
