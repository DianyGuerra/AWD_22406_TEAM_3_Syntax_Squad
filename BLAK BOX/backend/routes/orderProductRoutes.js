const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

router.get('/orderProducts', orderProductController.getAllOrderProducts);
router.post("/orderProduct", orderProductController.addProductToOrder);
router.put("/orderProduct/:id", orderProductController.updateProductOrder);
router.delete("/orderProduct/:id", orderProductController.deleteOrderProduct);
router.get('/orderProduct/:id', orderProductController.getOrderProductbyID);

module.exports = router;
