const mongoose = require("mongoose");

const patrimonyScheme = new mongoose.Schema({
  name_patrimony: {
    type: String,
    required: true,
  },
  number_patrimony: {
    type: String,
    required: true,
  },
  serie_number: {
    type: String,
    required: false,
  },
  ca: {
    type: String,
    required: false,
  },
  purchase_invoice: {
    type: String,
    required: false,
  },
  purchase_price: {
    type: Number,
    required: false,
  },
  guarantee: {
    type: Date,
    required: false,
  },
  report: {
    type: String,
    required: false,
  },
  report_due_date: {
    type: Date,
    required: false,
  },
  item_status: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Patrimony", patrimonyScheme);
