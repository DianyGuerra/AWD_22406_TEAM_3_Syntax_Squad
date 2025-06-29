const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/payments', paymentController.getAllPayments);

module.exports = router;
