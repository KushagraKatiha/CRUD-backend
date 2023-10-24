require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection.js')
const router = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()
dbConnection()
app.use(cookieParser())
app.use(express.json())
express.urlencoded({extended: true})
app.use('/', router)


module.exports = app