const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/User.Controller')

router.get('/:username', UserController.getCurrentUser)

router.post('/:username/liked', UserController.addLikedProperty)

router.post('/:username/managed', UserController.addManagedProperty)

router.delete('/:username/remove/liked/:property_id', UserController.removeLikedProperty)

router.delete('/:username/remove/managed/:property_id', UserController.removeManagedProperty)

module.exports = router