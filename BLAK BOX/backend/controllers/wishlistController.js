const Wishlist = require('../models/wishlist');

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find()
      .populate('userId', 'firstName lastName email');
    res.status(200).json(wishlists);
  } catch (error) {
    console.error("Error getting wishlists:", error);
    res.status(500).json({ message: "Server error while getting wishlists." });
  }
};

// POST: Create a new wishlist
const createWishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const newWishlist = new Wishlist({ userId });
    await newWishlist.save();
    res.status(201).json({ message: 'Wishlist created successfully', wishlist: newWishlist });

  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).json({ message: 'Server error while creating wishlist' });
  }
};

module.exports = {
  getAllWishlists,
  createWishlist
};
