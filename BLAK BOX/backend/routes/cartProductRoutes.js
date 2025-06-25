const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

router.get('/cartProducts', cartProductController.getAllCartProducts);

module.exports = router;
