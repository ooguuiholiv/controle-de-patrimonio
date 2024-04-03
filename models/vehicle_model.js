const mongoose = require("mongoose");

const VehicleScheme = new mongoose.Schema({
  fleet: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  conductor: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Vehicle", VehicleScheme);
