const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// ✅ CRUD
router.get('/inventory', inventoryController.getAllInventory);
router.get('/reports/inventory-summary', inventoryController.getInventorySummary);

module.exports = router;
