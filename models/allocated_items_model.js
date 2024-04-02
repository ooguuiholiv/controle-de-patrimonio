const mongoose = require('mongoose')

const AllocatedItemsScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patrimony"
        }
    ]
})
// TODO Rever esse items - acredito estar passando informação errada
module.exports = mongoose.model("AllocatedItems", AllocatedItemsScheme);
