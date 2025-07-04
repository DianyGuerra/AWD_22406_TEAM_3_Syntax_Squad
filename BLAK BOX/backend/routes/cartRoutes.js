const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 🟢 SERVICES
router.post('/carts/checkout', cartController.checkoutCart);
router.get('/carts/total', cartController.getTotalCartPrice);

// ✅ CRUD
router.get('/carts', cartController.getAllCarts);
router.post('/carts', cartController.createCart);
router.get('/carts/users/:userId', cartController.getCartByUserID); // más específico que /:id
router.get('/carts/:id', cartController.getCartByID);

module.exports = router;
