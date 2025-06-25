const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

router.get('/orderProducts', orderProductController.getAllOrderProducts);

module.exports = router;
