const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

/**
 * 6. Get All Categories (General) – protected  
 *    GET /blakbox/categories  
 *    :contentReference[oaicite:3]{index=3}
 */
router.get(
  '/categories',
  protect,
  categoryController.getAllCategories
);

/**
 * 7. Create New Category (ADMIN) – protected  
 *    POST /blakbox/categories  
 *    :contentReference[oaicite:4]{index=4}
 */
router.post(
  '/categories',
  protect,
  admin,
  categoryController.createCategory
);

/**
 * 10. Update Category (ADMIN) – protected  
 *     PUT /blakbox/categories/:id  
 *     :contentReference[oaicite:5]{index=5}
 */
router.put(
  '/categories/:id',
  protect,
  admin,
  categoryController.updateCategory
);

module.exports = router;
