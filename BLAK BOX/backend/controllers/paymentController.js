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
  const { userId, orderId, amount, paymentMethod, transactionId } = req.body;

  if (!userId || !orderId || !amount || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPayment = new Payment({
      userId,
      orderId,
      amount,
      paymentMethod,
      transactionId
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({message: "Payment created successfully.", payment: savedPayment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Server error while creating payment." });
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

    return res.status(200).json({ message: `The payment validation is: ${isValid}`});

  } catch (error) {
    console.error("Error validating payment:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//POST confirm payment

const confirmPayment = async (req, res) => {
  const { paymentId } = req.params;

  if (!paymentId) {
    return res.status(400).json({ message: "Payment ID is required." });
  }

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ message: "Only pending payments can be confirmed." });
    }

    payment.status = 'confirmed';
    await payment.save();

    console.log(`📢 Usuario notificado: Pago ${paymentId} confirmado.`);

    res.status(200).json({ message: "Payment confirmed successfully." });

  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: "Server error while confirming payment." });
  }
};


module.exports = {
  getAllPayments,
  createNewPayment,
  validatePayment,
  updatePaymentStatus,
  confirmPayment
};
