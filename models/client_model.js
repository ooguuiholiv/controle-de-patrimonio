const mongoose = require("mongoose");

const clientScheme = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  document_id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  //   Entra como guest automaticamente
  type_user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  is_active:{
    type: Boolean,
    required: true
  },
  constructions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constructions",
    },
  ],
});

module.exports = mongoose.model("Client", clientScheme)