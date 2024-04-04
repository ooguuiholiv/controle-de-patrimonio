const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const { validateEmail, validatePassword } = require("../utils/validators");
const jwt = require("jsonwebtoken");
const secretJwt = process.env.SECRET_JWT;
const PasswordReset = require("../models/reset_password_model");

// Registrar usuário
// TODO tornar rota privada para usuários autenticados
router.post("/register/users", async (req, res) => {
  try {
    const { first_name, last_name, cpf, phone, email, password } =
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
      is_active: true,
    };

    const newUser = new User(userData);
    await newUser.save();
    console.log(newUser);
    return res.status(201).json({ msg: "User created succesfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//  Obter lista de usuários cadastrados
router.get("/list/users", isAuthenticated, async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ msg: "User's not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// TODO checar atualização de usuário, provávelmente a rota precisará ser refatorada
// Atualizar dados do usuario logado
router.put("/update/user", isAuthenticated, async (req, res) => {
  try {
    const { first_name, last_name, cpf, phone } = req.body;
    const user = req.user.id;
    const updateUser = await User.findByIdAndUpdate(user, {
      first_name,
      last_name,
      cpf,
      phone,
    });
    if (!updateUser) {
      return res.status(404).json({ err: "User not found" });
    }
    return res.status(200).json({
      message: "User updated successfully",
      updateUser,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Inativar um usuário
router.delete("/inative/users/:userId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { is_active },
      { new: false }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({
      msg: "User successfully inactivated",
      user,
    });
  } catch (err) {
    return res.json(500).json({ err: err.message });
  }
});

// Alterar a senha de um usuário
router.post("/user/reset-password", async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, secretJwt);
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
      return res.status(400).json({
        msg: "Passwords do not match",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const hashPass = await bcrypt.hash(confirmPassword, (saltOrRounds = 10));
    user.password = hashPass;
    await user.save();
    res.send("Password updated successfully");
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Solicitar um link de redefinição de senha
router.patch("/user/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ err: "Please enter your e-mail" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ err: "User not found" });
    }
    const token = jwt.sign({ email }, secretJwt, { expiresIn: 1800000 });
    const min30 = 1800000;
    const resetTokenExpiry = Date.now() + min30;
    await PasswordReset.create({ email, token, resetTokenExpiry });
    const resetLink = `http://localhost:3000/auth/forgot-password?token=${token}`;
    //TODO Enviar email com o link
    return res
      .status(200)
      .json({
        msg: "An email has been sent with instructions to reset your password.",
      });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});


module.exports = router;
