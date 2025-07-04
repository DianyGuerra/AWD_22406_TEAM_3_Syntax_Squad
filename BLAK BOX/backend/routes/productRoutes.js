const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 🟢 SERVICES
router.get('/products/search', productController.searchProducts);
router.get('/products/top-sellers', productController.getTopSellingProducts);
router.get('/products/low-stock', productController.getLowStockProducts);
router.get('/products/discounted', productController.getDiscountedProducts);
router.get('/products/price/:min/:max', productController.getProductsByPriceRange);
router.put('/products/:productId/stock', productController.updateProductStock);
router.get('/products/similar/:productId', productController.getSimilarProducts);
router.post('/products/:productId/rating', productController.submitProductRating);
router.get('/products/:productId/average-rating', productController.getAverageProductRating);
router.get('/products/compare/:productId1/:productId2', productController.compareProductsById);


// ✅ CRUD
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
