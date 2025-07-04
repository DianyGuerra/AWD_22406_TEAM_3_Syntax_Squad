const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

// ✅ CRUD
router.get('/orderProducts', orderProductController.getAllOrderProducts);
router.get("/orderProducts/:orderId", orderProductController.getAllProductOfOrder);
router.post("/orderProducts/:orderId", orderProductController.addProductToOrder);
router.put("/orderProducts/:orderId/:productId", orderProductController.updateProductOrder);
router.delete("/orderProducts/:orderId/:productId", orderProductController.deleteProductFromOrder);

module.exports = router;
