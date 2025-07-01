const Cart = require('../models/cart');
const CartProduct = require('../models/cartProduct');
const Order = require('../models/order');
const OrderProduct = require('../models/orderProduct');
const Product = require('../models/product');

//------------------------------------------------------------CRUD operations for carts------------------------------------------------------------

// GET all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('userId', 'firstName lastName email');
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting carts:", error);
    res.status(500).json({ message: "Server error while getting carts." });
  }
};


//POST create a new cart
const createCart = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const newCart = new Cart({ userId });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ message: "Server error while creating cart." });
  }
};

//------------------------------------------------------------SERVICES operations for carts------------------------------------------------------------

//CHECKOUT cart by cart ID
const checkoutCart = async (req, res) => {
  const { cartId } = req.body;

  if (!cartId) {
    return res.status(400).json({ message: "Cart ID is required." });
  }

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const cartProducts = await CartProduct.find({ cartId }).populate('productId');
    if (cartProducts.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const total = cartProducts.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId: cart.userId,
      orderDate: new Date(),
      total,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();

    for (const item of cartProducts) {
      await OrderProduct.create({
        orderId: savedOrder._id,
        productId: item.productId._id,
        quantity: item.quantity
      });
    }

    await CartProduct.deleteMany({ cartId });

    res.status(200).json({ message: "Checkout complete", orderId: savedOrder._id });

  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};

// GET total price of items in a cart
const getTotalCartPrice = async (req, res) => {
  const { cartId } = req.query;

  if (!cartId) {
    return res.status(400).json({ message: "Cart ID is required." });
  }

  try {
    const cartProducts = await CartProduct.find({ cartId }).populate('productId');

    if (!cartProducts || cartProducts.length === 0) {
      return res.status(404).json({ message: "Cart not found or is empty." });
    }

    const total = cartProducts.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    res.status(200).json({ total: parseFloat(total.toFixed(2)) });

  } catch (error) {
    console.error("Error getting total cart price:", error);
    res.status(500).json({ message: "Server error while calculating total price." });
  }
};

const GetCartByID = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getAllCarts,
  createCart,
  checkoutCart,
  getTotalCartPrice,
  GetCartByID
};
