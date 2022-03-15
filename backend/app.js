const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const cors = require('cors');

const USerRoute = require('./Routes/User.route')
const AuthRoute = require('./Routes/Auth.route')
const PropRoute = require('./Routes/Property.route')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res, next) => {
  res.send('Hello from express.')
})

app.use('/auth', AuthRoute)
app.use('/prop', PropRoute)
app.use('/user', USerRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
