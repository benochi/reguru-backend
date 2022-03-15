const express = require('express')
const router = express.Router()
const PropertyController = require('../Controllers/Property.Controller')

router.route('/properties')
  .get(PropertyController.getProperties)

router.route('/properties/:property_id')
  .get(PropertyController.getPropertyById)

router.route('/properties/address/:address')
  .get(PropertyController.getPropertyByAddress)

router.route('/properties/query/query')
  .get(PropertyController.getPropertyByQuery)

router.route('/properties/price/price')
  .get(PropertyController.getPropertiesByPrice)

router.route('/properties/beds/:beds')
  .get(PropertyController.getPropertiesByBeds)

router.route('/properties/baths/:baths')
  .get(PropertyController.getPropertiesByBaths)

router.route('/properties/sqft/:sqft')
  .get(PropertyController.getPropertiesBySqft)
  
module.exports = router;