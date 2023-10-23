require('dotenv').config()
const express = require('express')
const router = require('./routes/userRoutes.js')

const app = express()
app.use('/', router)


module.exports = app