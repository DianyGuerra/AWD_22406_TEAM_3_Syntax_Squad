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


const GetShippingByID = async (req, res) => {
    try {
        const shipping = await Shipping.findOne({ orderId: req.params.orderId });
        if (!shipping) return res.status(404).json({ message: "Shipping info not found" });
        res.status(200).json(shipping);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const CreateShipping = async (req, res) => {
    const { orderId, shippingAddress, shippingCompany, trackingNumber, estimatedDeliveryDate } = req.body;
    const shipping = new Shipping({ orderId, shippingAddress, shippingCompany, trackingNumber, estimatedDeliveryDate });
    try {
        await shipping.save();
        res.status(201).json({ message: "Shipping created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const UpdateShipping = async (req, res) => {
    try {
        await Shipping.findByIdAndUpdate(req.params.shippingId, {
            shippingAddress: req.body.shippingAddress
        });
        res.status(200).json({ message: "Shipping address updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
  getAllShippings,
  GetShippingByID,
  CreateShipping,
  UpdateShipping
};
