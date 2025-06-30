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


const AddProductToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    const newItem = new CartProduct({ cartId, productId, quantity });
    try {
        await newItem.save();
        res.status(201).json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const UpdateProductCart = async (req, res) => {
    try {
        await CartProduct.findOneAndUpdate(
            { cartId: req.params.cartId, productId: req.params.productId },
            { quantity: req.body.quantity }
        );
        res.status(200).json({ message: "Quantity updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const DeleteProductFromCart = async (req, res) => {
    try {
        await CartProduct.findOneAndDelete({
            cartId: req.params.cartId,
            productId: req.params.productId
        });
        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const ClearCartProduct = async (req, res) => {
    try {
        await CartProduct.deleteMany({ cartId: req.params.cartId });
        res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getAllCartProducts,
  addCartProduct,
  getCartProductsByCartId,
  AddProductToCart,
  UpdateProductCart,
  DeleteProductFromCart,
  ClearCartProduct
};
