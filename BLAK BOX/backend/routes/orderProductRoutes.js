const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

router.get('/orderProducts', orderProductController.getAllOrderProducts);

router.get("/orderProducts/:orderId", orderProductController.GetAllProductToOrder);
router.post("/orderProduct/:orderId", orderProductController.AddProductToOrder);
router.put("/orderProduct/:orderId/:productId", orderProductController.UpdateProductOrder);
router.delete("/orderProduct/:orderId/:productId", orderProductController.DeleteProductFromOrder);

module.exports = router;
