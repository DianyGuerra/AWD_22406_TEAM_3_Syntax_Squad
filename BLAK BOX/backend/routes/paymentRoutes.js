const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

//CRUD operations for payments
router.get('/payments', paymentController.getAllPayments);
router.post('/payment', paymentController.createNewPayment);


//SERVICE operations for payments
router.post('/payment/validate', paymentController.validatePayment);
router.put('/payment/:paymentId/status', paymentController.updatePaymentStatus);
module.exports = router;
