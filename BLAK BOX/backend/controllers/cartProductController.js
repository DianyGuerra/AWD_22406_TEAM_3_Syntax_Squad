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
  try {
    const { cartId, productId, quantity } = req.body;

    if (!cartId || !productId || !quantity) {
      return res.status(400).json({ message: "Cart ID, Product ID, and quantity are required." });
    }

    if (quantify <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number." });
      }
    
    const newCartProduct = new CartProduct({
      cartId,
      productId,
      quantity
    });
    await newCartProduct.save();
    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding cart product:", error);
    res.status(500).json({ message: "Server error while adding cart product." });
  }
};

const updateProductCart = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantify } = req.body;

      if (!quantify || quantify <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number." });
      }

      const updated = await CartProduct.findByIdAndUpdate(id, { quantity: quantify });
      if (!updated) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json({ message: "Quantity updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error while updating quantify product of cart." });
    }
};

const deleteProductFromCart = async (req, res) => {
    try {
        await CartProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCartProductById = async (req, res) => {
  try {
    const cartProduct = await CartProduct.findById(req.params.id)
      .populate('cartId', '_id')
      .populate('productId', 'name price');
    if (!cartProduct) {
      return res.status(404).json({ message: "Cart product not found." });
    }
    res.status(200).json(cartProduct);
  } catch (error) {
    console.error("Error getting cart product by ID:", error);
    res.status(500).json({ message: "Server error while getting cart product by ID." });
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
  updateProductCart,
  deleteProductFromCart,
  getCartProductById
};
