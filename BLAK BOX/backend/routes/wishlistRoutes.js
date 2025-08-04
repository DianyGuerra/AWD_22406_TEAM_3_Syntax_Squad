// routes/wishlistRoutes.js

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect, isSelf } = require('../middleware/auth');

/**
 * 21. Get All Wishlists (User) – protected  
 *    GET /blakbox/wishlists  
 *    :contentReference[oaicite:4]{index=4}
 */
router.get(
  '/wishlists',
  protect,
  wishlistController.getAllWishlists
);

/**
 * 22. Get Wishlist by ID (User) – protected  
 *    GET /blakbox/wishlists/:id  
 *    :contentReference[oaicite:5]{index=5}
 */
router.get(
  '/wishlists/:id',
  protect,
  isSelf,
  wishlistController.getWishlistbyID
);

/**
 * 23. Create New Wishlist (User) – protected  
 *    POST /blakbox/wishlists  
 *    :contentReference[oaicite:6]{index=6}
 */
router.post(
  '/wishlists',
  protect,
  wishlistController.createWishlist
);

/**
 * 24. Delete Wishlist (User) – protected  
 *    DELETE /blakbox/wishlists/:id  
 *    :contentReference[oaicite:7]{index=7}
 */
router.delete(
  '/wishlists/:id',
  protect,
  isSelf,
  wishlistController.deleteWishlist
);

/**
 * Custom: Get Wishlists by User ID – protected  
 * (Not in spec; returns all wishlists for a given user)
 */
router.get(
  '/wishlists/users/:userId',
  protect,
  isSelf,
  wishlistController.getWishlistByUserID
);

module.exports = router;
