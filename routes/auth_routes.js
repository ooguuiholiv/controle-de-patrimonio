const { compare } = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const secretJwt = process.env.SECRET_JWT;
const User = require("../models/user_model");
const Client = require("../models/client_model");
const router = express.Router();

// Loga o usuário na aplicação
router.post("/auth/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ msg: "Email or password are not in our database" });
    }
    const payload = {
      user: {
        id: existingUser.id,
        fullname: existingUser.first_name + existingUser.last_name,
      },
    };
    const bearerToken = await jwt.sign(payload, secretJwt, {
      expiresIn: "12h",
    });
    return res.status(200).json({ msg: "Signed-In successfully", bearerToken });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
