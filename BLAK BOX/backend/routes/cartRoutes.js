const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// ✅ CRUD
router.get('/carts', cartController.getAllCarts);
router.post('/carts', cartController.createCart);
router.get("/carts/:id", cartController.getCartByID);
router.get("/carts/:userId", cartController.getCartByUserID);

// 🟢 SERVICES
router.post('/carts/checkout', cartController.checkoutCart);
router.get('/carts/total', cartController.getTotalCartPrice);

module.exports = router;
