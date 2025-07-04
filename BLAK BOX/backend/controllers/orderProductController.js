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

const getAllProductOfOrder = async (req, res) => {
  try {
    const items = await OrderProduct.find({ orderId: req.params.orderId })
      .populate("productId")
      .populate("orderId");

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No products found for this order." });
    }

    const order = items[0].orderId;

    const products = items.map(i => ({
      productId: i.productId._id,
      name: i.productId.name,
      quantity: i.quantity,
      price: i.productId.price
    }));

    res.status(200).json({
      order: {
        orderId: order._id,
        userId: order.userId,
        status: order.status,
        total: order.total,
        orderDate: order.orderDate
      },
      products
    });

  } catch (err) {
    console.error("Error fetching order products:", err);
    res.status(500).json({ message: err.message });
  }
};


const addProductToOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  const { orderId } = req.params;

  if (!orderId || !productId || !quantity) {
    return res.status(400).json({ message: "Order ID, Product ID, and quantity are required" });
  }

  try {
    const item = new OrderProduct({
      orderId,
      productId,
      quantity
    });
    await item.save();
    res.status(201).json({ message: "Product added to order", product: item });
  } catch (err) {
    res.status(500).json({ message: "Server error while adding product to order." });
  }
};


const updateProductOrder = async (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive number." });
  }

  try {
    const updatedItem = await OrderProduct.findOneAndUpdate(
      { orderId, productId },
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Order product not found." });
    }

    res.status(200).json({ message: "Order product updated", product: updatedItem });
  } catch (err) {
    res.status(500).json({ message: "Server error while updating order product." });
  }
};


const deleteProductFromOrder = async (req, res) => {
  const { orderId, productId } = req.params;

  try {
    const deletedItem = await OrderProduct.findOneAndDelete({ orderId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in order." });
    }

    res.status(200).json({ message: "Product removed from order" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting product from order." });
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
  getAllProductOfOrder,
  addProductToOrder,
  updateProductOrder,
  getOrderProductbyID,
  deleteProductFromOrder
};