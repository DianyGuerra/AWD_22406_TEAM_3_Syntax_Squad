const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// ✅ CRUD
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createNewOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);
router.get("/orders/user/:userId", orderController.getOrderByUserId);
router.get('/orders/:orderId', orderController.getOrderById);

// 🟢 SERVICES
router.get('/orders/history/:userId', orderController.getOrderHistoryByUserId);
router.put('/orders/cancel/:orderId', orderController.cancelOrderById);

module.exports = router;
