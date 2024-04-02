const mongoose = require('mongoose')

const constructionScheme = new mongoose.Schema({
  client_name: {
    type: String,
    required: true,
  },
  construction_name: {
    type: String,
    required: true,
  },
  allocated_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllocatedItems"
    },
  ],
});

module.exports = mongoose.model("Constructions", constructionScheme)