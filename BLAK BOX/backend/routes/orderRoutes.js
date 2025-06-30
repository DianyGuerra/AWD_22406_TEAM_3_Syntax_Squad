const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


//CRUD operations for orders
router.get('/orders', orderController.getAllOrders);
router.post('/order', orderController.createNewOrder);
router.delete('/order/:orderId', orderController.deleteOrder);

router.get("/order/user/:userId", orderController.GetOrderByID);


//SERVICES operations for orders
router.get('/order/:orderId', orderController.getOrderById);
router.get('/order/history/:userId', orderController.getOrderHistoryByUserId);
router.put('/order/cancel/:orderId', orderController.cancelOrderById);

module.exports = router;
