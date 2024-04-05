const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle_model");
const User = require("../models/user_model");
const Employee = require("../models/employee_model");
const isAuthenticated = require("../middlewares/auth");
const mongoose = require("mongoose");
const { validatePlate, validatePlateMercosul } = require("../utils/validators");

router.post("/create/vehicle", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { fleet, plate, conductorId } = req.body;
    console.log("requisições recebidas", plate);
    if (!fleet || !plate || !conductorId) {
      return res
        .status(400)
        .json({ msg: "Fleet, plate and conductor is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(conductorId)) {
      return res.status(400).json({ msg: "the driver ID is invalid" });
    }
    const conductor = await Employee.findById(conductorId);
    if (!conductor) {
      return res.status(400).json({ msg: "Conductor not found" });
    }
    if (!validatePlate(plate) && !validatePlateMercosul(plate)) {
      return res.status(400).json({ err: "Error: Invalid plate" });
    }


    const vehicleData = {
      fleet,
      plate,
      conductor,
      is_active: true,
    };
    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();
    return res.status(201).json({ msg: "Vehicle created succesfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
