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

const addProductToOrder = async (req, res) => {
    try {
        const { orderId, productId, quantify } = req.body;
        if (!orderId || !productId || !quantify) {
            return res.status(400).json({ message: "Order ID, Product ID, and quantify are required" });
        }
        const item = new OrderProduct({
            orderId,
            productId,
            quantify
        });
        await item.save();
        res.status(201).json({ message: "Product added to order" });
    } catch (err) {
        res.status(500).json({ message: "Server error while adding order products." });
    }
};

const updateProductOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantify } = req.body;

        if (!quantify || quantify <= 0) {
            return res.status(400).json({ message: "Quantify must be a positive number." });
        }

        const updatedItem = await OrderProduct.findByIdAndUpdate(
            id,
            { quantify }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Order product not found." });
        }

        res.status(200).json({ message: "Order quantify updated"});
    } catch (err) {
        res.status(500).json({ message: "Server error while updating order product." });
    }
};

const deleteOrderProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await OrderProduct.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Order product not found." });
        }

        res.status(200).json({ message: "Order product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error while deleting order product." });
    }
};

const getOrderProductbyID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "OrderPorduct ID is required" });
    }
    const orderProducts = await OrderProduct.findById(id)
      .populate('orderId', '_id')
      .populate('productId', 'name price');
    res.status(200).json(orderProducts);
  } catch (error) {
    console.error("Error getting order products:", error);
    res.status(500).json({ message: "Server error while getting order product by id." });
  }
};

module.exports = {
  getAllOrderProducts,
  addProductToOrder,
  updateProductOrder,
  deleteOrderProduct,
  getOrderProductbyID
};
