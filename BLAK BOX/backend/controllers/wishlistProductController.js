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


//POST: Add a product to the wishlist
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

module.exports = {
  getAllWishlistProducts,
  addProductToWishlist
};
