const Wishlist = require('../models/wishlist');

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find()
      .populate('userId', 'firstName lastName email'); // muestra datos del usuario
    res.status(200).json(wishlists);
  } catch (error) {
    console.error("Error getting wishlists:", error);
    res.status(500).json({ message: "Server error while getting wishlists." });
  }
};

module.exports = {
  getAllWishlists
};
