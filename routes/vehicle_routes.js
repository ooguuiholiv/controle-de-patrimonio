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
    if (fleet.length < 4 || fleet.length > 4) {
      return res
        .status(400)
        .json({ msg: "the fleet number has only 4 characters" });
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

router.get("/list/vehicles", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const vehicles = await Vehicle.find();
    if (!vehicles) {
      return res
        .status(404)
        .json({ msg: "We did not find any vehicles in our database" });
    }
    return res.status(200).json(vehicles);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.put("/update/vehicle/:vehicleId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { fleet, plate, conductorId } = req.body;
    const vehicleId = req.params.vehicleId;
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ msg: "Invalid vehicle ID" });
    }
    const existingVehicle = await Vehicle.findById(vehicleId);
    if (!existingVehicle) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }
    if (!fleet && !plate && !conductorId) {
      return res.status(400).json({ msg: "At least one field is required" });
    }

    if (conductorId) {
      if (!mongoose.Types.ObjectId.isValid(conductorId)) {
        return res.status(400).json({ msg: "the driver ID is invalid" });
      }
      const conductor = await Employee.findById(conductorId);
      if (!conductor) {
        return res.status(400).json({ msg: "Conductor not found" });
      }
      return conductor
    }

    if(plate){
      if (!validatePlate(plate) && !validatePlateMercosul(plate)) {
        return res.status(400).json({ err: "Error: Invalid plate" });
      }
    }
    
    if (fleet.length < 4 || fleet.length > 4) {
      return res
        .status(400)
        .json({ msg: "the fleet number has only 4 characters" });
    }
    const updatefields = {};
    if (fleet) updatefields.fleet = fleet;
    if (plate) updatefields.plate = plate;
    if (conductorId) updatefields.conductorId = conductorId;

    const updateVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      updatefields,
      { new: true }
    );
    if (!updateVehicle) {
      return res.status(404).json({ err: "Vehicle not found" });
    }
    return res.status(200).json({
      message: "Vehicle updated successfully",
      updateVehicle,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete(
  "/delete/vehicle/:vehicleId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const vehicleId = req.params.vehicleId;
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return res.status(500).json({ msg: "the vehicle ID is invalid" });
      }
      const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
      if (!vehicle) {
        return res.status(400).json({ msg: "Vehicle not found" });
      }
      return res
        .status(200)
        .json({ msg: "The vehicle was successfully deleted", vehicle });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

module.exports = router;
