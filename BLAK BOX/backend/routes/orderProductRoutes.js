// routes/orderProductRoutes.js

const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');
const { protect } = require('../middleware/auth');

/**
 * 36. Get All Products in an Order (General) – protected  
 * GET /blakbox/orderProducts  
 * :contentReference[oaicite:5]{index=5}
 */
router.get(
  '/orderProducts',
  protect,
  orderProductController.getAllOrderProducts
);

/**
 * 40. Get Products in an Order by orderId (General) – protected  
 * GET /blakbox/orderProducts/:orderId  
 * :contentReference[oaicite:6]{index=6}
 */
router.get(
  '/orderProducts/:orderId',
  protect,
  orderProductController.getAllProductOfOrder
);

/**
 * 37. Add Product to Order (User) – protected  
 * POST /blakbox/orderProducts/:orderId  
 * :contentReference[oaicite:7]{index=7}
 */
router.post(
  '/orderProducts/:orderId',
  protect,
  orderProductController.addProductToOrder
);

/**
 * 38. Update Product in Order (User) – protected  
 * PUT /blakbox/orderProducts/:orderId/:productId  
 * :contentReference[oaicite:8]{index=8}
 */
router.put(
  '/orderProducts/:orderId/:productId',
  protect,
  orderProductController.updateProductOrder
);

/**
 * 39. Delete Product from Order (User) – protected  
 * DELETE /blakbox/orderProducts/:orderId/:productId  
 * :contentReference[oaicite:9]{index=9}
 */
router.delete(
  '/orderProducts/:orderId/:productId',
  protect,
  orderProductController.deleteProductFromOrder
);

module.exports = router;
