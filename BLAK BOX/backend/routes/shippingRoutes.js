const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/shippings', shippingController.getAllShippings);

module.exports = router;
