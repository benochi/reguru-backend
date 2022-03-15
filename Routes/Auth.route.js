const { Router } = require('express')
const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

//handled on frontend
//router.delete('/logout', AuthController.logout)

module.exports = router
