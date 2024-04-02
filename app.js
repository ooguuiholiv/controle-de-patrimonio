const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const port = process.env.PORT;
const app = express()
connectDB()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
})