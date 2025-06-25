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

module.exports = {
  getAllWishlistProducts
};
