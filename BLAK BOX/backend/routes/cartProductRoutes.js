// routes/cartProductRoutes.js

const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');
const { protect } = require('../middleware/auth');

/**
 * 29. Add Product to Cart (User) – protected  
 *    POST /blakbox/cartProducts  
 *    :contentReference[oaicite:4]{index=4}
 */
router.post(
  '/cartProducts',
  protect,
  cartProductController.addCartProduct
);

/**
 * 30. Update Cart Product (User) – protected  
 *    PUT /blakbox/cartProducts/:cartId/:productId  
 *    :contentReference[oaicite:5]{index=5}
 */
router.put(
  '/cartProducts/:cartId/:productId',
  protect,
  cartProductController.updateProductCart
);

/**
 * 31. Delete Product from Cart (User) – protected  
 *    DELETE /blakbox/cartProducts/:cartId/:productId  
 *    :contentReference[oaicite:6]{index=6}
 */
router.delete(
  '/cartProducts/:cartId/:productId',
  protect,
  cartProductController.deleteProductFromCart
);

/**
 * 32. Get cartProducts by cartID (User) – protected  
 *    GET /blakbox/cartProducts/:cartId  
 *    :contentReference[oaicite:7]{index=7}
 */
router.get(
  '/cartProducts/:cartId',
  protect,
  cartProductController.getCartProductsByCartId
);

router.get(
   '/cartProducts',
   protect,
   cartProductController.getAllCartProducts
 );
 router.delete(
   '/cartProducts/:cartId',
   protect,
   cartProductController.clearCartProduct
 );


module.exports = router;
