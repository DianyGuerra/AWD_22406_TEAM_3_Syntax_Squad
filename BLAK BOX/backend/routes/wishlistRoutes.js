const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// ✅ CRUD
router.get('/wishlists', wishlistController.getAllWishlists);
router.post('/wishlist', wishlistController.createWishlist);
router.get("/wishlist/:id", wishlistController.getWishlistbyID);
router.delete("/wishlist/:id", wishlistController.deleteWishlist);

module.exports = router;
