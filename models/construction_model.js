const mongoose = require('mongoose')

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
  allocated_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllocatedItems",
    },
  ],
  allocated_team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

module.exports = mongoose.model("Constructions", constructionScheme)