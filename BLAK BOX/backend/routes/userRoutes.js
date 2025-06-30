const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//CRUD operations for users
router.get('/users', userController.getAllUsers);
router.post('/user', userController.createNewUser);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);

//SERVICES operations for users
router.get('/users/:id', userController.getUserById);

module.exports = router;
