const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// ✅ CRUD
router.get('/userss', userController.getAllUsers);
router.post('/users', userController.createNewUser);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.get('/users/:id', userController.getUserById);



module.exports = router;
