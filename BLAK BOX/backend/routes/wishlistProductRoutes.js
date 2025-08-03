    const express = require('express');
    const router = express.Router();
    const wishlistProductController = require('../controllers/wishlistProductController');

    // ✅ CRUD
    router.get('/wishlistProducts', wishlistProductController.getAllWishlistProducts);
    router.post('/wishlistProducts', wishlistProductController.addProductToWishlist);
    router.get("/wishlistProducts/:wishlistProductId", wishlistProductController.getProductsWishlistId);
    router.delete("/wishlistProducts/:wishlistId/:productId", wishlistProductController.deleteProductFromWishlist);
    router.get("/wishlistProducts/wishlist/:wishlistId", wishlistProductController.getProductsbyWishlistId);

    module.exports = router;
