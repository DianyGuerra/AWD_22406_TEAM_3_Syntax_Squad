const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// ✅ CRUD
router.get('/wishlists', wishlistController.getAllWishlists);
router.post('/wishlists', wishlistController.createWishlist);
router.get("/wishlists/:id", wishlistController.getWishlistbyID);
router.delete("/wishlists/:id", wishlistController.deleteWishlist);

module.exports = router;
