const Order = require('../models/order');

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Server error while getting orders." });
  }
};

// POST create a new order
const createNewOrder = async (req, res) => {
  const { userId, orderDate, total, status} = req.body;

  if (!userId || !orderDate || !total || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newOrder = new Order({
      userId,
      orderDate,
      total,
      status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while creating order." });
  }
};

//DELETE an order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.status !== 'pending') {
      return res.status(403).json({ message: "Forbidden: You can only delete orders that are pending." });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully." });

  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error while deleting order." });
  }
};



// SERVICES operations for orders

// GET order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ message: "Server error while getting order by ID." });
  } 
};

// Get order history by user ID with statistics and grouping by month and year
const getOrderHistoryByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    const grouped = {};
    let totalSpent = 0;

    orders.forEach(order => {
      const date = new Date(order.orderDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('en-US', { month: 'long' });

      totalSpent += order.total;

      if (!grouped[year]) {
        grouped[year] = {};
      }

      if (!grouped[year][month]) {
        grouped[year][month] = [];
      }

      grouped[year][month].push({
        orderId: order._id,
        orderDate: order.orderDate,
        total: order.total,
        status: order.status,
        products: order.products
      });
    });

    res.status(200).json({
      userId,
      totalOrders: orders.length,
      totalSpent,
      lastOrderDate: orders[0].orderDate,
      history: grouped
    });

  } catch (error) {
    console.error("Error getting order history by user ID:", error);
    res.status(500).json({ message: "Server error while getting order history by user ID." });
  }
};


//Cancel order by ID
const cancelOrderById = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.status !== 'pending') {
      return res.status(403).json({ message: "Forbidden: You can only cancel orders that are pending." });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Server error while cancelling order." });
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  deleteOrder,
  getOrderById,
  getOrderHistoryByUserId,
  cancelOrderById
};
