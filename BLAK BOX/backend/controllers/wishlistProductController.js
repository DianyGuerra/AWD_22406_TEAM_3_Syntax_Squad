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



const AddProductToWishlist = async (req, res) => {
  const { wishlistId, productId } = req.body;
  const entry = new WishlistProduct({ wishlistId, productId });
  try {
      await entry.save();
      res.status(201).json({ message: "Product added to wishlist" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const GetProductsWishlist = async (req, res) => {
  try {
      const items = await WishlistProduct.find({ wishlistId: req.params.wishlistId }).populate("productId");
      const products = items.map(i => ({
          productId: i.productId._id,
          name: i.productId.name
      }));
      res.status(200).json(products);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const DeleteProductFromWishlist = async (req, res) => {
    try {
        await WishlistProduct.findOneAndDelete({
            wishlistId: req.params.wishlistId,
            productId: req.params.productId
        });
        res.status(200).json({ message: "Product removed from wishlist" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
  getAllWishlistProducts,
  addProductToWishlist,
  AddProductToWishlist,
  GetProductsWishlist,
  DeleteProductFromWishlist
};
