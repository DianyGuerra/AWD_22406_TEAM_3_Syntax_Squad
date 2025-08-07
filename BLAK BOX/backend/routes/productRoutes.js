// routes/productRoutes.js

const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

/**
 * Custom: Search Products (General) – protected
 */
router.get(
  '/products/search',
  productController.searchProducts
);

/**
 * 43. Get Top-Selling Products (General) – protected  
 * GET /blakbox/products/top-sellers  
 * :contentReference[oaicite:14]{index=14}
 */
router.get(
  '/products/top-sellers',
  productController.getTopSellingProducts
);

/**
 * 44. Get Low Stock Products (ADMIN) – protected  
 * GET /blakbox/products/low-stock  
 * :contentReference[oaicite:15]{index=15}
 */
router.get(
  '/products/low-stock',
  protect,
  admin,
  productController.getLowStockProducts
);

/**
 * 45. Update Stock of a Product (ADMIN) – protected  
 * PUT /blakbox/products/:productId/stock  
 * :contentReference[oaicite:16]{index=16}
 */
router.put(
  '/products/:productId/stock',
  protect,
  productController.updateProductStock
);

/**
 * 46. Get Discounted Products (General)
 * GET /blakbox/products/discounted  
 * :contentReference[oaicite:17]{index=17}
 */
router.get(
  '/products/discounted',
  productController.getDiscountedProducts
);

/**
 * 53. Get Products By Price Range (General) – protected  
 * GET /blakbox/products/price/:min/:max  
 * :contentReference[oaicite:18]{index=18}
 */
router.get(
  '/products/price/:min/:max',
  protect,
  productController.getProductsByPriceRange
);

/**
 * 42. Get Similar Products (General) – protected  
 * GET /blakbox/products/similar/:productId  
 * :contentReference[oaicite:19]{index=19}
 */
router.get(
  '/products/similar/:productId',
  protect,
  productController.getSimilarProducts
);

/**
 * 47. Submit Product Rating (User) – protected  
 * POST /blakbox/products/:productId/rating  
 * :contentReference[oaicite:20]{index=20}
 */
router.post(
  '/products/:productId/rating',
  protect,
  productController.submitProductRating
);

/**
 * 48. Get Average Product Rating (User) – protected  
 * GET /blakbox/products/:productId/average-rating  
 * :contentReference[oaicite:21]{index=21}
 */
router.get(
  '/products/:productId/average-rating',
  protect,
  productController.getAverageProductRating
);

/**
 * 50. Compare Products by ID (General) – protected  
 * GET /blakbox/products/compare/:productId1/:productId2  
 * :contentReference[oaicite:22]{index=22}
 */
router.get(
  '/products/compare/:productId1/:productId2',
  protect,
  productController.compareProductsById
);

/*──────────────────────────*/
/*        CRUD URIs         */
/*──────────────────────────*/

/**
 * 1. Get All Products (General) – protected  
 * GET /blakbox/products  
 * :contentReference[oaicite:23]{index=23}
 */
router.get(
  '/products',
  protect,
  productController.getAllProducts
);

/**
 * 2. Get Product by ID (General) – protected  
 * GET /blakbox/products/:productId  
 * :contentReference[oaicite:24]{index=24}
 */
router.get(
  '/products/:productId',
  protect,
  productController.getProductById
);

/**
 * 3. Create New Product (ADMIN) – protected  
 * POST /blakbox/products  
 * :contentReference[oaicite:25]{index=25}
 */
router.post(
  '/products',
  protect,
  admin,
  productController.createProduct
);

/**
 * 4. Update Product (ADMIN) – protected  
 * PUT /blakbox/products/:productId  
 * :contentReference[oaicite:26]{index=26}
 */
router.put(
  '/products/:productId',
  protect,
  admin,
  productController.updateProduct
);

/**
 * 5. Delete Product (ADMIN) – protected  
 * DELETE /blakbox/products/:productId  
 * :contentReference[oaicite:27]{index=27}
 */
router.delete(
  '/products/:productId',
  protect,
  admin,
  productController.deleteProduct
);

module.exports = router;
