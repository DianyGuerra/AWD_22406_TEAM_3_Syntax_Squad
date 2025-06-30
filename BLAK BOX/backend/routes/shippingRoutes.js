const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/shippings', shippingController.getAllShippings);


router.get("/shipping/:orderId", shippingController.GetShippingByID);
router.post("/shipping", shippingController.CreateShipping);
router.put("/shipping/:shippingId", shippingController.UpdateShipping);

module.exports = router;
