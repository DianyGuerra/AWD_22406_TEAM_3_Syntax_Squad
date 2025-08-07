const WishlistProduct = require('../models/wishlistProduct');

const getAllWishlistProducts = async (req, res) => {
  try {
    const wishlistProducts = await WishlistProduct.find()
      .populate('wishlistId', '_id')
      .populate('productId', 'name price brand');
    res.status(200).json(wishlistProducts);
  } catch (error) {
    console.error("Error getting wishlist products:", error);
    res.status(500).json({ message: "Server error while getting wishlist products." });
  }
};

const addProductToWishlist = async (req, res) => {
  try {
    const { wishlistId, productId } = req.body;

    if (!wishlistId || !productId) {
      return res.status(400).json({ message: "Wishlist ID and Product ID are required." });
    }

    const newWishlistProduct = new WishlistProduct({
      wishlistId,
      productId
    });

    await newWishlistProduct.save();
    res.status(201).json({ message: 'Product added to wishlist successfully' });

  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: 'Server error while adding product to wishlist' });
  }
};

const getProductsWishlistId = async (req, res) => {
  const { wishlistProductId } = req.params;

  if (!wishlistProductId) {
    return res.status(400).json({ message: "WishlistProduct ID is required." });
  }

  try {
    const wishlistProduct = await WishlistProduct.findById(wishlistProductId)
      .populate('wishlistId', '_id')
      .populate('productId', 'name price brand');

    res.status(200).json(wishlistProduct);
  } catch (err) {
    console.error("Error getting wishlistProduct by ID:", err);
    res.status(500).json({ message: "Server error while getting wishlist product by ID." });
  }
};


const deleteProductFromWishlist = async (req, res) => {
    try {
        const { wishlistId, productId } = req.params;
        if (!wishlistId || !productId) {
            return res.status(400).json({ message: "Wishlist ID and Product ID are required." });
        }
        const result = await WishlistProduct.findOneAndDelete({ wishlistId, productId });
        if (!result) {
            return res.status(404).json({ message: "Product not found in wishlist." });
        }
        res.status(200).json({ message: "Product removed from wishlist successfully." });
    }catch (error) {
        console.error("Error deleting product from wishlist:", error);
        res.status(500).json({ message: "Server error while deleting product from wishlist." });
    }
};

const getProductsbyWishlistId = async (req, res) => {
  const { wishlistId } = req.params;
  if (!wishlistId) {
    return res.status(400).json({ message: "Wishlist ID is required." });
  }
  try {
    const wishlistProducts = await WishlistProduct
      .find({ wishlistId })
      .populate('productId', 'name price brand');

    res.status(200).json(wishlistProducts);
  } catch (err) {
    console.error("Error getting products by wishlist ID:", err);
    res.status(500).json({ message: "Server error while getting products by wishlist ID." });
  }
}


module.exports = {
  getAllWishlistProducts,
  addProductToWishlist,
  getProductsWishlistId,
  deleteProductFromWishlist,
  getProductsbyWishlistId
};
