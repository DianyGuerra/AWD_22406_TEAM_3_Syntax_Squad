const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// ✅ CRUD
router.get('/inventory', inventoryController.getAllInventory);

module.exports = router;
