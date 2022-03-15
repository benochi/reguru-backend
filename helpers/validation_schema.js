const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  liked_properties: Joi.array().items(Joi.string()),
  managed_properties: Joi.array().items(Joi.string()),
  isAdmin: Joi.boolean()
})

const loginSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  password: Joi.string().min(6).required()
})

module.exports = {
  authSchema,
  loginSchema
}
