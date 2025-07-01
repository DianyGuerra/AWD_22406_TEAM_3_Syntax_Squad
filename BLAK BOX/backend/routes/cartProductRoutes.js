const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

router.get('/cartProducts', cartProductController.getAllCartProducts);
router.post('/cartProduct', cartProductController.addCartProduct);

router.get('/cartProducts/:cartId', cartProductController.getCartProductsByCartId);

router.put("/cartProduct/:cartId/:productId", cartProductController.UpdateProductCart);
router.delete("/cartProduct/:cartId/:productId", cartProductController.DeleteProductFromCart);
router.delete("/cartProduct/:cartId", cartProductController.ClearCartProduct);

module.exports = router;
