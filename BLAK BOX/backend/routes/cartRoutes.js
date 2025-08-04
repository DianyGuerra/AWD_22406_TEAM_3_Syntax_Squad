const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect, admin, isSelf } = require('../middleware/auth');

/**
 * 28. Get Cart by User ID (User) - protected
 *    GET /blakbox/carts/users/:userId
 *    :contentReference[oaicite:3]{index=3}
 */
router.get(
  '/carts/users/:userId',
  protect,
  isSelf,
  cartController.getCartByUserID
);

/**
 * 52. Checkout Cart (User) - protected
 *    POST /blakbox/carts/checkout
 *    :contentReference[oaicite:4]{index=4}
 */
router.post(
  '/carts/checkout',
  protect,
  cartController.checkoutCart
);

/**
 * 59. Get Total Cart Price (General) - protected
 *    GET /blakbox/carts/total?cartId=:cartId
 *    :contentReference[oaicite:5]{index=5}
 */
router.get(
  '/carts/total',
  protect,
  cartController.getTotalCartPrice
);

/**
 * Additional CRUD operations on carts
 * – List all carts (Admin only)
 */
router.get(
  '/carts',
  protect,
  admin,
  cartController.getAllCarts
);

/**
 * – Create a new cart (authenticated users)
 */
router.post(
  '/carts',
  protect,
  cartController.createCart
);

/**
 * – Get cart by ID (Admin only)
 */
router.get(
  '/carts/:id',
  protect,
  admin,
  cartController.getCartByID
);

/**
 * – Delete cart (Admin only)
 */
router.delete(
  '/carts/:id',
  protect,
  admin,
  cartController.deleteCart
);

module.exports = router;
