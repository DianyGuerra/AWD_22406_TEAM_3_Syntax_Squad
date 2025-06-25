const express = require('express');
const router = express.Router();
const wishlistProductController = require('../controllers/wishlistProductController');

router.get('/wishlistProducts', wishlistProductController.getAllWishlistProducts);

module.exports = router;
