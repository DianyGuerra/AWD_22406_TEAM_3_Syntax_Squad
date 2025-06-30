const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/wishlists', wishlistController.getAllWishlists);
router.post('/wishlist', wishlistController.createWishlist);

router.get("/wishlist/:id", wishlistController.GetWishlistbyID);
router.delete("/wishlist/:id", wishlistController.DeleteWishlist);

module.exports = router;
