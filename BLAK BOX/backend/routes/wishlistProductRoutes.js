// routes/wishlistProductRoutes.js

const express = require('express');
const router = express.Router();
const wishlistProductController = require('../controllers/wishlistProductController');
const { protect, admin, isSelf } = require('../middleware/auth');

/**
 * Admin-only: list all wishlist–product records
 * (not exposed in public spec; useful for admin audits)
 */
router.get(
  '/wishlistProducts',
  protect,
  admin,
  wishlistProductController.getAllWishlistProducts
);

/**
 * 25. Add Product to Wishlist (User) – protected  
 * POST /blakbox/wishlistProducts  
 * :contentReference[oaicite:3]{index=3}
 */
router.post(
  '/wishlistProducts',
  protect,
  wishlistProductController.addProductToWishlist
);

/**
 * 26. Get Product in Wishlist by ID (User) – protected  
 * GET /blakbox/wishlistProducts/:wishlistProductId  
 * :contentReference[oaicite:4]{index=4}
 */
router.get(
  '/wishlistProducts/:wishlistProductId',
  protect,
  wishlistProductController.getProductsWishlistId
);

/**
 * 27. Delete Product from Wishlist (User) – protected  
 * DELETE /blakbox/wishlistProducts/:wishlistId/:productId  
 * :contentReference[oaicite:5]{index=5}
 */
router.delete(
  '/wishlistProducts/:wishlistId/:productId',
  protect,
  wishlistProductController.deleteProductFromWishlist
);

/**
 * Custom – Get all products in a given wishlist (User)  
 * GET /blakbox/wishlistProducts/wishlist/:wishlistId  
 * (ensure only owner can view)  
 */
router.get(
  '/wishlistProducts/wishlist/:wishlistId',
  protect,
  wishlistProductController.getProductsbyWishlistId
);

module.exports = router;
