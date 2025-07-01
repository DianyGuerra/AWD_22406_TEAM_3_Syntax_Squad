const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/carts', cartController.getAllCarts);
router.post('/cart', cartController.createCart);

router.post('/cart/checkout', cartController.checkoutCart);
router.get('/cart/total', cartController.getTotalCartPrice);

module.exports = router;
