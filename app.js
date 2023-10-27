require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection.js')
const router = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
dbConnection()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
express.urlencoded({extended: true})
app.use('/', router)


module.exports = app