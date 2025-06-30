const express = require('express');
const router = express.Router();
const wishlistProductController = require('../controllers/wishlistProductController');

router.get('/wishlistProducts', wishlistProductController.getAllWishlistProducts);
router.post('/wishlistProduct', wishlistProductController.addProductToWishlist);

module.exports = router;
