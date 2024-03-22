const express = require('express');
const route = express.Router();
const userController = require('./../controllers/userController')




route.route('/').get(userController.getAllUsers).post(userController.createUser)
route.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)


module.exports = route ;