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



const GetAllProductToOrder = async (req, res) => {
    try {
        const items = await OrderProduct.find({ orderId: req.params.orderId }).populate("productId");
        const result = items.map(i => ({
            productId: i.productId._id,
            name: i.productId.name,
            quantity: i.quantity
        }));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const AddProductToOrder = async (req, res) => {
    const { productId, quantity } = req.body;
    const item = new OrderProduct({
        orderId: req.params.orderId,
        productId,
        quantity
    });
    try {
        await item.save();
        res.status(201).json({ message: "Product added to order" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const UpdateProductOrder = async (req, res) => {
    try {
        await OrderProduct.findOneAndUpdate(
            { orderId: req.params.orderId, productId: req.params.productId },
            { quantity: req.body.quantity }
        );
        res.status(200).json({ message: "Order quantity updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const DeleteProductFromOrder = async (req, res) => {
    try {
        await OrderProduct.findOneAndDelete({
            orderId: req.params.orderId,
            productId: req.params.productId
        });
        res.status(200).json({ message: "Product removed from order" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getAllOrderProducts,
  GetAllProductToOrder,
  AddProductToOrder,
  UpdateProductOrder,
  DeleteProductFromOrder
};
