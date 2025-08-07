const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin, isSelf } = require('../middleware/auth');

// 📋 Public routes
router.post('/users', userController.createNewUser);
router.post('/users/login', userController.loginUser);

// 🔒 Admin-only: List all users
router.get('/users', protect, admin, userController.getAllUsers);

// 🔒 Protected routes: Only the authenticated user can access their own data
router.get('/users/:userId', protect, isSelf, userController.getUserById);
router.put('/users/:userId', protect, isSelf, userController.updateUserById);
router.delete('/users/:userId', protect, isSelf, userController.deleteUserById);

module.exports = router;
