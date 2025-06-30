const CartProduct = require('../models/cartProduct');
const Cart = require('../models/cart');
const mongoose = require('mongoose');

//------------------------------------------------------------CRUD operations for cart products------------------------------------------------------------


//GET all cart products
const getAllCartProducts = async (req, res) => {
  try {
    const cartProducts = await CartProduct.find()
      .populate('cartId', '_id')
      .populate('productId', 'name price');
    res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error getting cart products:", error);
    res.status(500).json({ message: "Server error while getting cart products." });
  }
};

//POST new cart product
const addCartProduct = async (req, res) => {
  const { cartId, productId, quantity } = req.body;
  if (!cartId || !productId || !quantity) {
    return res.status(400).json({ message: "Cart ID, Product ID, and quantity are required." });
  }
  try {
    const newCartProduct = new CartProduct({
      cartId: new mongoose.Types.ObjectId(cartId),
      productId: new mongoose.Types.ObjectId(productId),
      quantity
    });
    const savedCartProduct = await newCartProduct.save();
    res.status(201).json(savedCartProduct);
  } catch (error) {
    console.error("Error adding cart product:", error);
    res.status(500).json({ message: "Server error while adding cart product." });
  }
};

//------------------------------------------------------------SERVICES operations for cart products------------------------------------------------------------

//Get all cart products by cart ID

const getCartProductsByCartId = async (req, res) => {
  const { cartId } = req.params;

  if (!cartId) {
    return res.status(400).json({ message: "Cart ID is required." });
  }

  try {
    const cartProducts = await CartProduct.find({
      cartId: new mongoose.Types.ObjectId(cartId)
    }).populate('productId', 'name price');

    if (cartProducts.length === 0) {
      return res.status(404).json({ message: "No products found for this cart." });
    }

    res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error getting cart products by cart ID:", error);
    res.status(500).json({ message: "Server error while getting cart products by cart ID." });
  }
};



module.exports = {
  getAllCartProducts,
  addCartProduct,
  getCartProductsByCartId,
};
