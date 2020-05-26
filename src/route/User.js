const Users = require('express').Router()
const userController = require('../controller/User.js')

Users.get('/', userController.getDataUser)
Users.post('/', userController.createDataUser)
Users.patch('/update/:id', userController.UpdateDataUser)
Users.patch('/delete/:id', userController.DeleteDataUser)

module.exports = Users