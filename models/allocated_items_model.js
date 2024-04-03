const mongoose = require('mongoose')

const AllocatedItemsScheme = new mongoose.Schema({
  
  construction_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constructions",
    },
  ],
  vehicle_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  patrimony_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patrimony"
    }
  ]
});
// TODO Rever esse items - acredito estar passando informação errada
module.exports = mongoose.model("AllocatedItems", AllocatedItemsScheme);
