const Payment = require('../models/payment');

//CRUD operations for payments

// GET all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error getting payments:", error);
    res.status(500).json({ message: "Server error while getting payments." });
  }
};

// POST create a new payment
const createNewPayment = async (req, res) => {
  const { userId, orderId, amount, paymentMethod, paymentDate, status, transactionId } = req.body;

  if (!userId || !orderId || !amount || !paymentMethod || !paymentDate || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPayment = new Payment({
      userId,
      orderId,
      amount,
      paymentMethod,
      paymentDate,
      status,
      transactionId
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Server error while creating payment." });
  }
};


//SERVICE operations for payments

// POST validate a payment
const validatePayment = async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ message: "paymentId is required." });
  }

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    const isValid = payment.status === 'confirmed';

    return res.status(200).json({ valid: isValid });

  } catch (error) {
    console.error("Error validating payment:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// PUT update payment status
const updatePaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'failed', 'refunded'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    payment.status = status;
    await payment.save();

    res.status(200).json({ message: `Payment status updated to ${status}.` });

  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error while updating payment status." });
  }
};



module.exports = {
  getAllPayments,
  createNewPayment,
  validatePayment,
  updatePaymentStatus
};
