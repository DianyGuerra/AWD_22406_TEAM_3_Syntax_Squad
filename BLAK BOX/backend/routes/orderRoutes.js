// routes/orderRoutes.js

const express = require('express');
const router  = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin, isSelf } = require('../middleware/auth');

/**
 * 16. Create New Order (User) – protected  
 * POST /blakbox/orders  
 * Places a new order. :contentReference[oaicite:5]{index=5}
 */
router.post(
  '/orders',
  protect,
  orderController.createNewOrder
);

/**
 * 17. Get Order by ID (General) – protected  
 * GET /blakbox/orders/:orderId  
 * Retrieves order details. :contentReference[oaicite:6]{index=6}
 */
router.get(
  '/orders/:orderId',
  protect,
  orderController.getOrderById
);

/**
 * 18. Delete Order (Admin) – protected  
 * DELETE /blakbox/orders/:orderId  
 * Deletes an order permanently. :contentReference[oaicite:7]{index=7}
 */
router.delete(
  '/orders/:orderId',  
  protect,
  admin,
  orderController.deleteOrder
);

/**
 * (Admin-only) List all orders  
 * GET /blakbox/orders  
 * — not in spec, admin-only for overview
 */
router.get(
  '/orders',
  protect,
  admin,
  orderController.getAllOrders
);

/**
 * Custom: Get Orders by User ID (User) – protected  
 * GET /blakbox/orders/user/:userId  
 * Returns all orders for a given user.
 */
router.get(
  '/orders/user/:userId',
  protect,
  isSelf,
  orderController.getOrderByUserId
);

/**
 * 56. Get Order History by User ID – protected  
 * GET /blakbox/orders/history/:userId  
 * Lists previous orders with stats. :contentReference[oaicite:8]{index=8}
 */
router.get(
  '/orders/history/:userId',
  protect,
  isSelf,
  orderController.getOrderHistoryByUserId
);

/**
 * 54. Cancel Order (ADMIN) – protected  
 * PUT /blakbox/orders/cancel/:orderId  
 * Cancels an existing order. :contentReference[oaicite:9]{index=9}
 */
router.put(
  '/orders/cancel/:orderId',
  protect,
  admin,
  orderController.cancelOrderById
);

module.exports = router;
