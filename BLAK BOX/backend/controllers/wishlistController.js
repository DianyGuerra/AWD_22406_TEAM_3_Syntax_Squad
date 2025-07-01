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



const GetWishlistbyID = async (req, res) => {
  try {
      const wishlist = await Wishlist.findById(req.params.id);
      if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
      res.status(200).json(wishlist);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const CreateWishlist = async (req, res) => {
    const wishlist = new Wishlist({
        userId: req.body.userId
    });
    try {
        await wishlist.save();
        res.status(201).json({ message: "Wishlist created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const DeleteWishlist = async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
  getAllWishlists,
  createWishlist,
  GetWishlistbyID,
  CreateWishlist,
  DeleteWishlist
};
