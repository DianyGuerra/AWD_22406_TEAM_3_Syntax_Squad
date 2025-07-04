const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// ✅ CRUD
router.get('/payments', paymentController.getAllPayments);
router.post('/payments', paymentController.createNewPayment);
router.put('/payments/:paymentId/status', paymentController.updatePaymentStatus);

// 🟢 SERVICES
router.post('/payments/validate', paymentController.validatePayment);
router.post('/payments/confirm/:paymentId', paymentController.confirmPayment);
module.exports = router;
