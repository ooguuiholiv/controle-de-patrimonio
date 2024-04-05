const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle_model')
const User = require('../models/user_model')
const Employee = require('../models/employee_model')
const isAuthenticated = require("../middlewares/auth")

module. exports = router