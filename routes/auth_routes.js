const { compare } = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const secretJwt = process.env.SECRET_JWT;
const User = require("../models/user_model");
const Client = require("../models/client_model");
const router = express.Router();




module.exports = router