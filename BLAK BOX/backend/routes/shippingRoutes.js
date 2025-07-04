const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// ✅ CRUD
router.get('/shippings', shippingController.getAllShippings);
router.get("/shipping/:orderId", shippingController.getShippingByID);
router.post("/shipping", shippingController.createShipping);
router.put("/shipping/:shippingId", shippingController.updateShipping);

module.exports = router;
