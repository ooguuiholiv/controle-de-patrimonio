const express = require("express");
const bcrypt = require("bcrypt");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const { validateEmail, validatePassword } = require("../utils/validators");
const Client = require("../models/client_model");
const jwt = require("jsonwebtoken");
const secretJwt = process.env.SECRET_JWT;
const PasswordReset = require("../models/reset_password_model");

// Cria um cliente
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

// Lista todos os clientes
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

//  Edita dados de um cliente
router.put("/update/client/:clientId", isAuthenticated, async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { phone } = req.body;
    const updateClient = await Client.findByIdAndUpdate(
      clientId,
      { phone },
      { new: phone }
    );
    if (!updateClient) {
      return res.status(404).json({ err: "Client not found" });
    }
    return res.status(200).json({
      message: "Client updated successfully",
      updateClient,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Inativa um cliente
router.delete(
  "/inative/client/:clientId",
  isAuthenticated,
  async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const client = await Client.findByIdAndUpdate(
        clientId,
        { is_active },
        { new: false }
      );
      if (!client) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.status(200).json({
        msg: "Client successfully inactivated",
        client,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

// Solicitar um link de redefinição de senha
router.patch("/client/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ err: "Please enter your e-mail" });
    }
    const existingCLient = await Client.findOne({ email });
    if (!existingCLient) {
      return res.status(400).json({ err: "Client not found" });
    }
    const token = jwt.sign({ email }, secretJwt, { expiresIn: 1800000 });
    const min30 = 1800000;
    const resetTokenExpiry = Date.now() + min30;
    await PasswordReset.create({ email, token, resetTokenExpiry });
    const resetLink = `http://localhost:3000/client/reset-password?token=${token}`;
    // TODO envia email para o cliente!
    return res.status(200).json({
      msg: "An email has been sent with instructions to reset your password.",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Redefine a senha do cliente
router.post("/client/reset-password", async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.query;
  try {
    const decoded = jwt.decode(token, secretJwt);
    const { email } = decoded;
    const resetRequest = await PasswordReset.findOne({ email, token });
    if (!resetRequest) {
      return res
        .status(400)
        .json({ msg: "The token has expired and/or is invalid" });
    }
    const now = new Date();
    if (now > resetRequest.resetTokenExpiry) {
      await PasswordReset.deleteOne({ email, token });
      return res.status(400).json({
        msg: "The token has expired and/or is invalid, please request a password reset again",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match. " });
    }
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ msg: "CLient not found" });
    }
    const hashPass = await bcrypt.hash(confirmPassword, (saltOrRounds = 10));
    client.password = hashPass;
    await client.save();
    res.send("Password updated succesfully");
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
