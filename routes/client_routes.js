const express = require("express");
const bcrypt = require("bcrypt");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const { validateEmail, validatePassword } = require("../utils/validators");
const Client = require("../models/client_model");

router.post("/register/client", isAuthenticated, async (req, res) => {
  try {
    const {
      fullname,
      document_id,
      phone,
      type_user,
      email,
      password,
      is_active,
    } = req.body;
    const existingCLient = await Client.findOne({ email });
    if (existingCLient) {
      return res.status(403).json({ err: "Client already exists" });
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
    const clientData = {
      fullname,
      document_id,
      phone,
      type_user: "guest",
      email,
      password: hashPass,
      is_active: true,
    };
    const newCLient = new Client(clientData);
    await newCLient.save();
    console.log(newCLient);
    return res.status(201).json({ msg: "Client created succesfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.get("/list/client", isAuthenticated, async (req, res) => {
  try {
    const client = await Client.find();
    if (!client) {
      return res.status(404).json("Clients not found");
    }
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
