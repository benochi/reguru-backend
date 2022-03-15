const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema, loginSchema } = require('../helpers/validation_schema')
const { createToken } = require("../helpers/tokens");


module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)

      const doesExist = await User.findOne({ email: result.email })
      if (doesExist)
        throw createError.Conflict(`Email: ${result.email} has already been registered`)
      const doesExist2 = await User.findOne({ username: result.username })
      if(doesExist2)
        throw createError.Conflict(`Username: ${result.username} has already been registered`)

      const user = new User({...result, isAdmin: false })
      const token = createToken(user);
      const savedUser = await user.save()
      const name = savedUser.username

      return res.status(201).json({token: token})
    } catch (error) {
      
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body)
      const user = await User.findOne({ username: result.username })
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')
        //sign token
        const token = createToken(user)

      res.send({token});
    } catch (error) {
      if (error.isJoi === true)
        console.error(error)
        return next(createError.BadRequest('Invalid Username/Password'))
    }
  },
}
