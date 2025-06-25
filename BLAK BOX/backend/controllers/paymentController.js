const Payment = require('../models/payment');

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'firstName lastName email')
      .populate('orderId', '_id');
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error getting payments:", error);
    res.status(500).json({ message: "Server error while getting payments." });
  }
};

module.exports = {
  getAllPayments
};
