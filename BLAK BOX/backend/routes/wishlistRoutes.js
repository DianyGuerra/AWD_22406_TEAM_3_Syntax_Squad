const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/wishlists', wishlistController.getAllWishlists);
router.post('/wishlist', wishlistController.createWishlist);

module.exports = router;
