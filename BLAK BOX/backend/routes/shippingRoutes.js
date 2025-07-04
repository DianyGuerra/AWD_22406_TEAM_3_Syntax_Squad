const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// ✅ CRUD
router.get('/shippings', shippingController.getAllShippings);
router.get("/shippings/:shippingId", shippingController.getShippingByID);
router.post("/shippings", shippingController.createShipping);
router.put("/shippings/:shippingId", shippingController.updateShipping);

module.exports = router;
