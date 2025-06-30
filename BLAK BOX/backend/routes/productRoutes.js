const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/search', productController.searchProducts);
router.get('/products/filter', productController.filterProductsByPrice);
router.get('/products/top-sellers', productController.getTopSellingProducts);
router.get('/products/low-stock', productController.getLowStockProducts);
router.put('/products/:id/stock', productController.updateProductStock);
router.get('/products/discounted', productController.getDiscountedProducts);
router.get('/products/discounted', productController.getDiscountedProducts);


module.exports = router;
