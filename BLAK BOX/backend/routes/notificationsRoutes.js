const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

router.post('/notifications/whatsapp/send', notificationsController.sendWhatsAppNotification);
router.post('/notifications/availability/notify', notificationsController.notifyAvailability);

module.exports = router;
