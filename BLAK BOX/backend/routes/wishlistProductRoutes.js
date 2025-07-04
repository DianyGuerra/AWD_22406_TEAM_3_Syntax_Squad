const express = require('express');
const router = express.Router();
const wishlistProductController = require('../controllers/wishlistProductController');

router.get('/wishlistProducts', wishlistProductController.getAllWishlistProducts);
router.post('/wishlistProduct', wishlistProductController.addProductToWishlist);
router.get("/wishlistProduct/:id", wishlistProductController.getProductsWishlistId);
router.delete("/wishlistProduct/:id/", wishlistProductController.deleteProductFromWishlist);

module.exports = router;
