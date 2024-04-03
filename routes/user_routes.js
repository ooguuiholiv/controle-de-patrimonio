const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const isAuthenticated = require("../middlewares/auth");
const secretJwt = process.env.SECRET_JWT;
const router = express.Router();
const { validateEmail, validatePassword } = require("../utils/validators");

router.post("/auth/register", async (req, res) => {
  try {
    const { first_name, last_name, cpf, phone, email, password, type_user } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ err: "User already exists" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Error: Invalid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    const hashPass = await bcrypt.hash(password, (saltOrRounds = 10));
    const userData = {
      first_name,
      last_name,
      email,
      password: hashPass,
      cpf,
      phone,
      type_user: "editor",
    };

    const newUser = new User(userData);
    await newUser.save();
    console.log(newUser);
    return res.status(201).json({ msg: "User created succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Error: ", err);
  }
});
