// routes/notificationsRoutes.js

const express = require('express');
const router  = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { protect, admin } = require('../middleware/auth');

/**
 * 55. Send Order Delivery Message via WhatsApp (ADMIN) – protected  
 * POST /blakbox/notifications/whatsapp/send  
 * :contentReference[oaicite:2]{index=2}
 */
router.post(
  '/notifications/whatsapp/send',
  protect,
  admin,
  notificationsController.sendWhatsAppNotification
);

/**
 * 58. Notify Product Back in Stock to Wishlist User (ADMIN) – protected  
 * POST /blakbox/notifications/availability/notify  
 * :contentReference[oaicite:3]{index=3}
 */
router.post(
  '/notifications/availability/notify',
  protect,
  admin,
  notificationsController.notifyAvailability
);

module.exports = router;
