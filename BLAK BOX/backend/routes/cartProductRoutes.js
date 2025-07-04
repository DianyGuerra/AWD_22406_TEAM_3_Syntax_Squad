const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

// ✅ CRUD
router.get('/cartProducts', cartProductController.getAllCartProducts);
router.post('/cartProducts', cartProductController.addCartProduct);
router.get('/cartProducts/:cartId', cartProductController.getCartProductsByCartId);
router.put("/cartProducts/:cartId/:productId", cartProductController.updateProductCart);
router.delete("/cartProducts/:cartId/:productId", cartProductController.deleteProductFromCart);
router.delete("/cartProducts/:cartId", cartProductController.clearCartProduct);

module.exports = router;