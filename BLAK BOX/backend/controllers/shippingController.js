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

const getShippingByID = async (req, res) => {
  try {
      const shipping = await Shipping.findById(req.params.shippingId)
        .populate('orderId', '_id');
      if (!shipping) {
        return res.status(404).json({ message: "Shipping info not found" });
      }
      res.status(200).json(shipping);
  } catch (err) {
      res.status(500).json({ message: "Server error while getting shipping by id." });
  }
};

const createShipping = async (req, res) => {
  try {
    const { orderId, shippingAddress, shippingCompany, trackingNumber} = req.body;
    if (!orderId || !shippingAddress || !shippingCompany || !trackingNumber) {
        return res.status(400).json({ message: "Order ID, shipping address, shipping company, and tracking number are required." });
    }
    const shipping = new Shipping({ orderId, shippingAddress, shippingCompany, trackingNumber});
    await shipping.save();
    res.status(201).json({ message: "Shipping created successfully" });
  } catch (err) {
      res.status(500).json({ message: "Server error while creating shipping." });
  }
};

const updateShipping = async (req, res) => {
  try {
    const { shippingId } = req.params;
    const { shippingAddress, shippingCompany, trackingNumber} = req.body;
    if (!shippingAddress && !shippingCompany && !trackingNumber ) {
      return res.status(400).json({ message: "At least one field must be provided to update." });
    }

    const updatedShipping = await Shipping.findByIdAndUpdate(
      shippingId,
      { shippingAddress, shippingCompany, trackingNumber}
    );

    if (!updatedShipping) {
      return res.status(404).json({ message: "Shipping record not found." });
    }

    res.status(200).json({ message: "Shipping address updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error while update shipping data." });
  }
};

module.exports = {
  getAllShippings,
  getShippingByID,
  createShipping,
  updateShipping
};
