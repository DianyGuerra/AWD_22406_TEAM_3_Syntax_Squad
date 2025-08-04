const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { protect, admin } = require('../middleware/auth');

// 🔒 General (any authenticated): Get All Brands
// 8. Get All Brands (General)  
//    HTTP GET /blakbox/brands  
//    :contentReference[oaicite:2]{index=2}
router.get('/brands', protect, brandController.getAllBrands);

// 🔒 Admin only: Create New Brand
// 9. Create New Brand (ADMIN)  
//    HTTP POST /blakbox/brands  
//    :contentReference[oaicite:3]{index=3}
router.post('/brands', protect, admin, brandController.createBrand);

module.exports = router;
