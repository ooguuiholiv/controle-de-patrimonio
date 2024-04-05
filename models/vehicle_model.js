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

  conductor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],

  is_active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", VehicleScheme);
