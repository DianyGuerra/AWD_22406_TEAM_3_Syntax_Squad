// routes/shippingRoutes.js

const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const { protect, admin } = require('../middleware/auth');

/**
 * (Optional) List All Shippings – admin-only  
 * Note: This endpoint isn’t listed in the spec, so we’ll lock it down to admins.
 */
router.get(
  '/shippings',
  protect,
  admin,
  shippingController.getAllShippings
);

/**
 * 33. Get Shipping Info by ID (User) – protected  
 * GET /blakbox/shippings/:shippingId  
 * Retrieves a specific shipping record.  
 * :contentReference[oaicite:3]{index=3}
 */
router.get(
  '/shippings/:shippingId',
  protect,
  shippingController.getShippingByID
);

/**
 * 34. Create Shipping Record (General) – protected  
 * POST /blakbox/shippings  
 * Creates a new shipping entry.  
 * :contentReference[oaicite:4]{index=4}
 */
router.post(
  '/shippings',
  protect,
  shippingController.createShipping
);

/**
 * 35. Update Shipping (General) – protected  
 * PUT /blakbox/shipping/:shippingId  
 * Updates an existing shipping’s address, company, or tracking number.  
 */
router.put(
  '/shippings/:shippingId',
  protect,
  shippingController.updateShipping
);

module.exports = router;
