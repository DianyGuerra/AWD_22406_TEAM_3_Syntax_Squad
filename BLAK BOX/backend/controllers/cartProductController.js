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

    if (quantity <= 0) {
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
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive number." });
  }

  try {
    const updated = await CartProduct.findOneAndUpdate(
      { cartId, productId },
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Cart product not found.' });
    }

    res.status(200).json({ message: "Quantity updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error while updating product quantity." });
  }
};


const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const deleted = await CartProduct.findOneAndDelete({ cartId, productId });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

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

const clearCartProduct = async (req, res) => {
  const { cartId } = req.params;

  try {
    const result = await CartProduct.deleteMany({ cartId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No products found to remove from cart." });
    }

    res.status(200).json({ message: "All products removed from cart." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
  getCartProductById,
  clearCartProduct
};
