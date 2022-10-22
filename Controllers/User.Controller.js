const createError = require('http-errors')
const User = require('../Models/User.model')


module.exports = {
  getCurrentUser: async(req, res, next) => {
    try {
      let reqName = req.params.username
      const user = await User.findOne({ username: reqName })
      if (!user) throw createError.NotFound('User not registered') 
      let resp = {
        username: user.username,
        liked_properties: user.liked_properties,
        managed_properties: user.managed_properties
      }
      
      return res.json(resp);
    } catch (error) {
        return next(createError.BadRequest('Invalid Username/Password'))
    }
  },

  addLikedProperty: async (req, res, next) => {
    let reqName = req.params.username
    let propId = req.query.propertyId

    const user = await User.findOne({ username: reqName })
    if (!user) throw createError.NotFound('User not registered')

    let arr = user.liked_properties
    if(arr.indexOf(propId) !== -1) return res.json('Property already added.')
    try {
      const response = await User.findOneAndUpdate(
        { username: reqName },
        { $push: { liked_properties : propId }}
      )
      return res.json(response)
    } catch(error){
      return next(createError.BadRequest('Unable to add property_ID'))
    } 
  },

  removeLikedProperty: async (req, res, next) => {
    let reqName = req.params.username
    let propId = req.params.property_id

    const user = await User.findOne({ username: reqName })
    if (!user) throw createError.NotFound('User not registered')
  
    try {
      const response = await User.findOneAndUpdate(
        { username: reqName },
        { $pull: { liked_properties : propId }}
      )
      return res.json(response)
    } catch(error){
      return next(createError.BadRequest('Unable to remove property_ID'))
    } 
  },

  addManagedProperty: async (req,res,next) => {
    let reqName = req.params.username
    let propId = req.query.propertyId

    const user = await User.findOne({ username: reqName })
    if (!user) throw createError.NotFound('User not registered')
    let arr = user.managed_properties

    if(arr.indexOf(propId) !== -1) return res.json('Property already added.')
    
    try {
      const response = await User.findOneAndUpdate(
        { username: reqName },
        { $push: { managed_properties: propId }}
      )
      return res.json(response)
    } catch(error){
      return next(createError.BadRequest('Unable to find property.'))
    } 
  },

  removeManagedProperty: async (req,res,next) => {
    let reqName = req.params.username
    let propId = req.params.property_id

    const user = await User.findOne({ username: reqName })
    if (!user) throw createError.NotFound('User not registered')
  
    try {
      const response = await User.findOneAndUpdate(
        { username: reqName },
        { $pull: { managed_properties : propId }}
      )
      return res.json(response)
    } catch(error){
      return next(createError.BadRequest('Unable to find property to delete'))
    } 
  }
  
}

