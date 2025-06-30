const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

router.get('/cartProducts', cartProductController.getAllCartProducts);
router.post('/cartProduct', cartProductController.addCartProduct);

router.get('/cartProducts/:cartId', cartProductController.getCartProductsByCartId);

module.exports = router;
