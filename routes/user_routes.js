const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();
const { validateEmail, validatePassword } = require("../utils/validators");

router.post("/register/users", async (req, res) => {
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

router.get("/list/users", isAuthenticated, async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// TODO checar atualização de usuário, provávelmente a rota precisará ser refatorada
router.put("/update/users", isAuthenticated, async (req, res) => {
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
      return res.status(404).json({ err: "Event not found" });
    }
    return res.status(200).json({
      message: "User updated successfully",
      updateUser,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete("/inative/users/:userId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { is_active },
      { new: false }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.json(500).json({ err: err.message });
  }
});

module.exports = router;
