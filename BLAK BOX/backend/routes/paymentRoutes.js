// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');

/**
 * 19. Get All Payments (General) – protected  
 *    GET /blakbox/payments  
 *    :contentReference[oaicite:5]{index=5}
 */
router.get(
  '/payments',
  protect,
  paymentController.getAllPayments
);

/**
 * 20. Create New Payment (User) – protected  
 *    POST /blakbox/payments  
 *    :contentReference[oaicite:6]{index=6}
 */
router.post(
  '/payments',
  protect,
  paymentController.createNewPayment
);

/**
 * 57. Confirm Payment (User) – protected  
 *    POST /blakbox/payments/confirm/:paymentId  
 *    :contentReference[oaicite:7]{index=7}
 */
router.post(
  '/payments/confirm/:paymentId',
  protect,
  paymentController.confirmPayment
);

/**
 * 51. Update Payment Status (ADMIN) – protected  
 *    PUT /blakbox/payments/:paymentId/status  
 *    :contentReference[oaicite:8]{index=8}
 */
router.put(
  '/payments/:paymentId/status',
  protect,
  admin,
  paymentController.updatePaymentStatus
);

/**
 * 60. Validate Payment (ADMIN) – protected  
 *    POST /blakbox/payments/validate  
 *    :contentReference[oaicite:9]{index=9}
 */
router.post(
  '/payments/validate',
  protect,
  admin,
  paymentController.validatePayment
);

module.exports = router;
