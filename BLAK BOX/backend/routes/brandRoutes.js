const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/brands', brandController.getAllBrands);
router.post('/brands', brandController.createBrand);

module.exports = router;
