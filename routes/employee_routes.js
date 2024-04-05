const express = require("express");
const router = express.Router();
const Employee = require("../models/employee_model");
const { validateName } = require("../utils/validators");
const isAuthenticated = require("../middlewares/auth");
const User = require("../models/user_model");
const mongoose = require("mongoose");


// Cria um funcionário
router.post("/create/employee", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { fullname } = req.body;
    if (!fullname) {
      return res.status(400).json({ msg: "Fullname is required" });
    }
    if (fullname.length < 7) {
      return res.status(400).json({ msg: "Very short name" });
    }
    const employee = await Employee.findOne({
      fullname: fullname.toUpperCase(),
    });
    console.log(employee);
    if (employee) {
      return res.status(400).json({ msg: "Employee already exists" });
    }
    const newEmployee = new Employee({
      fullname: fullname.toUpperCase(),
      is_active: true,
    });
    await newEmployee.save();
    console.log(newEmployee);
    return res
      .status(201)
      .json({ msg: "Employee created successfully", newEmployee });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Lista todos os funcionarios
router.get("/list/employee", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Atualiza o nome de um usuário
router.put(
  "/update/employee/:employeeId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const { fullname } = req.body;
      const employeeId = req.params.employeeId;
      if (!fullname) {
        return res.status(400).json({ err: "At least one field is required" });
      }
      if (fullname.length < 7) {
        return res.status(400).json({ msg: "Very short name" });
      }
      const updateFields = {};
      if (fullname) updateFields.fullname = fullname.toUpperCase();
      const updateEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        updateFields,
        { new: true }
      );
      if (!updateEmployee) {
        return res.status(404).json({ err: "Employee not found" });
      }
      return res.status(200).json({
        message: "Employee updated successfully",
        updateEmployee,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

// Inativa um funcionario
router.delete(
  "/inative/employee/:employeeId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const employeeId = req.params.employeeId;
      const employee = await Employee.findByIdAndUpdate(employeeId, {
        is_active: false,
      });
      if (!employee) {
        return res.status(404).json({ err: "Employee not found" });
      }
      return res.status(200).json({
        message: "Employee successfully deactivated",
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

// Deleta um funcionario
router.delete(
  "/delete/employee/:employeeId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const employeeId = req.params.employeeId;
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ msg: "Invalid employee ID" });
      }
      const employee = await Employee.findByIdAndDelete(employeeId);
      console.log(employee);
      if (!employee) {
        return res.status(400).json({ msg: "Employee not found" });
      }
      return res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

module.exports = router;
