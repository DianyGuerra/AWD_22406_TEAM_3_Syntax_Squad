const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/shippings', shippingController.getAllShippings);
router.get("/shipping/:id", shippingController.getShippingByID);
router.post("/shipping", shippingController.createShipping);
router.put("/shipping/:id", shippingController.updateShipping);

module.exports = router;
