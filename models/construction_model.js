const mongoose = require("mongoose");

const constructionScheme = new mongoose.Schema({
  client_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  construction_name: {
    type: String,
    required: true,
  },
  is_active:{
    type: Boolean,
    required: true
  },
  allocated_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllocatedItems",
      required: false,
    },
  ],
  allocated_team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Constructions", constructionScheme);
