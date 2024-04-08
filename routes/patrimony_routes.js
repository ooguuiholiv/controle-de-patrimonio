const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Patrimony = require("../models/patrimony_model");
const isAuthenticated = require("../middlewares/auth");
const mongoose = require("mongoose");

router.post("/create/patrimony", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "You do not have permission to access this path" });
    }
    const {
      name_patrimony,
      number_patrimony,
      serie_number,
      ca,
      purchase_invoice,
      purchase_price,
      guarantee,
      report,
      report_due_date,
      item_status,
      is_active,
      responsible_employee_id,
    } = req.body;
    const patrimonyData = {};
    if (name_patrimony) patrimonyData.name_patrimony = name_patrimony;
    if (number_patrimony) patrimonyData.number_patrimony = number_patrimony;
    if (serie_number) patrimonyData.serie_number = serie_number;
    if (ca) patrimonyData.ca = ca;
    if (purchase_invoice) patrimonyData.purchase_invoice = purchase_invoice;
    if (purchase_price) patrimonyData.purchase_price = purchase_price;
    if (guarantee) patrimonyData.guarantee = guarantee;
    if (report) patrimonyData.report = report;
    if (report_due_date) patrimonyData.report_due_date = report_due_date;
    if (item_status) patrimonyData.item_status = item_status;
    if (is_active) patrimonyData.is_active = is_active;
    if (responsible_employee_id)
      patrimonyData.responsible_employee_id = responsible_employee_id;

    const newPatrimony = new Patrimony(patrimonyData);
    newPatrimony.save();
    return res
      .status(201)
      .json({ msg: "Patrimony created successfully", newPatrimony });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.put(
  "/update/patrimony/:patrimonyId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(400)
          .json({ msg: "You do not have permission to access this path" });
      }

      const patrimonyId = req.params.patrimonyId;

      // Verificar se o ID do patrimônio é válido
      if (!mongoose.Types.ObjectId.isValid(patrimonyId)) {
        return res.status(400).json({ msg: "Invalid patrimony ID" });
      }

      // Encontrar o patrimônio pelo ID
      const existingPatrimony = await Patrimony.findById(patrimonyId);
      if (!existingPatrimony) {
        return res.status(404).json({ msg: "Patrimony not found" });
      }

      // Extrair os campos fornecidos na requisição
      const {
        name_patrimony,
        number_patrimony,
        serie_number,
        ca,
        purchase_invoice,
        purchase_price,
        guarantee,
        report,
        report_due_date,
        item_status,
        is_active,
        responsible_employee_id,
      } = req.body;

      // Atualizar os campos do patrimônio, se fornecidos
      if (name_patrimony) existingPatrimony.name_patrimony = name_patrimony;
      if (number_patrimony)
        existingPatrimony.number_patrimony = number_patrimony;
      if (serie_number) existingPatrimony.serie_number = serie_number;
      if (ca) existingPatrimony.ca = ca;
      if (purchase_invoice)
        existingPatrimony.purchase_invoice = purchase_invoice;
      if (purchase_price) existingPatrimony.purchase_price = purchase_price;
      if (guarantee) existingPatrimony.guarantee = guarantee;
      if (report) existingPatrimony.report = report;
      if (report_due_date) existingPatrimony.report_due_date = report_due_date;
      if (item_status) existingPatrimony.item_status = item_status;
      if (is_active) existingPatrimony.is_active = is_active;
      if (responsible_employee_id)
        existingPatrimony.responsible_employee_id = responsible_employee_id;

      // Salvar as mudanças no patrimônio
      await existingPatrimony.save();

      return res
        .status(200)
        .json({ msg: "Patrimony updated successfully", existingPatrimony });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

router.get("/list/patrimony", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const patrimony = await Patrimony.find();
    if (!patrimony) {
      return res.status(400).json({ msg: "Patrimony not found" });
    }
    return res.status(200).json(patrimony);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete(
  "/inative/patrimony/:patrimonyId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const patrimonyId = req.params.patrimonyId;
      if (!mongoose.Types.ObjectId.isValid(patrimonyId)) {
        return res.status(400).json({ msg: "Patrimony Id is invalid" });
      }
      const patrimony = await Patrimony.findByIdAndUpdate(
        patrimonyId,
        {
          is_active: false,
        },
        { new: true }
      );
      if (!patrimony) {
        return res.status(400).json({ msg: "Patrimony not found" });
      }
      return res
        .status(200)
        .json({ msg: "The feature has been successfully disabled", patrimony });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

router.delete(
  "/delete/patrimony/:patrimonyId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ msg: "You do not have permission to access this path" });
      }
      const patrimonyId = req.params.patrimonyId;
      if (!mongoose.Types.ObjectId.isValid(patrimonyId)) {
        return res.status(400).json({ msg: "Patrimony id is invalid" });
      }
      const patrimony = await Patrimony.findByIdAndDelete(patrimonyId);
      if (!patrimony) {
        return res.status(400).json({ msg: "Patrimony not found" });
      }
      return res
        .status(200)
        .json({ msg: "The resource was successfully deleted", patrimony });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

module.exports = router;
