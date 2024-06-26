const express = require("express");
const jwt = require("jsonwebtoken");
const secretJwt = process.env.SECRET_JWT;
const User = require("../models/user_model");
const Client = require("../models/client_model");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const bcrypt = require("bcrypt");

// Loga o usuário na aplicação
router.post("/auth/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: "Email or password are not in our database" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ msg: "Email or password are not in our database" });
    }
    const fullname = existingUser.first_name + " " + existingUser.last_name
    const payload = {
      user: {
        id: existingUser.id,
        fullname: fullname
      },
    };
    const bearerToken = await jwt.sign(payload, secretJwt, {
      expiresIn: "12h",
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    return res.status(200).json({ msg: "Signed-In successfully", bearerToken });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Loga o cliente na aplicação
router.post("/auth/client", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingClient = await Client.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingClient.password
    );
    if (!existingClient || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ msg: "Email or password are not in our database" });
    }
    const payload = {
      user: {
        id: existingClient.id,
        fullname: existingClient.fullname,
      },
    };
    const bearerToken = await jwt.sign(payload, secretJwt, {
      expiresIn: "12h",
    });
    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    return res.status(200).json({ msg: "Signed-In successfully", bearerToken });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Logout do usuário e cliente
router.get("/logout", (_req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ msg: "Signed-Out successfully" });
});


// Verifica se o usuário/cliente esta logado
router.get("/is-authenticated", isAuthenticated, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;
