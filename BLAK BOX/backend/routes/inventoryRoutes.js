const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect, admin } = require('../middleware/auth');

/**
 * Get All Inventory (ADMIN) – protected
 * GET /blakbox/inventory
 * Admin-only route to list all inventory items.
 */
router.get(
  '/inventory',
  protect,
  admin,
  inventoryController.getAllInventory
);

/**
 * 49. Get Inventory Summary Report (ADMIN) – protected  
 * GET /blakbox/reports/inventory-summary  
 * Provides a summary of inventory levels. :contentReference[oaicite:1]{index=1}
 */
router.get(
  '/reports/inventory-summary',
  protect,
  admin,
  inventoryController.getInventorySummary
);

module.exports = router;
