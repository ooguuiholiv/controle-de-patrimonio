const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const User = require("../models/user_model");
const Construction = require("../models/construction_model");
const mongoose = require("mongoose");
const Client = require("../models/client_model");

router.post("/create/construction", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { client_id, construction_name } = req.body;
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.status(400).json("ClientId is invalid");
    }
    const client = await Client.findById(client_id);
    if (!client) {
      return res.status(400).json({ msg: "Client not found!" });
    }
    const clientData = {
      client_id: client,
      construction_name,
      is_active: true,
    };
    const newClient = new Client(clientData);
    await newClient.save();
    return res
      .status(201)
      .json({ msg: "Construction created successfully! ", newClient });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.get("/list/construction", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const constructions = await Construction.find();
    if (!constructions) {
      return res.status(400).json({ msg: "Constructions not found" });
    }
    return res.status(200).json(constructions);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete(
  "/inative/construction/:constructionId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const constructionId = req.params.constructionId;
      if (!mongoose.Types.ObjectId.isValid(constructionId)) {
        return res.status(400).json({ msg: "ConstructionId is invalid" });
      }
      const construction = await Construction.findByIdAndUpdate(
        constructionId,
        { is_active: false },
        { new: true }
      );
      if (!construction) {
        return res.status(400).json({ msg: "Construction not found" });
      }
      return res
        .status(200)
        .json({ msg: "The construction has been disabled", construction });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

router.delete(
  "/delete/construction/:constructionId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const constructionId = req.params.constructionId;
      if (!mongoose.Types.ObjectId.isValid(constructionId)) {
        return res.status(400).json({ msg: "ConstructionId is invalid" });
      }
      const construction = await Construction.findByIdAndDelete(constructionId);
      if (!construction) {
        return res.status(400).json({ msg: "Construction not found" });
      }
      return res
        .status(200)
        .json({ msg: "The construction was deleted", construction });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

module.exports = router;
