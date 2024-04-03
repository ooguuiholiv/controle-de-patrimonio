const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    cpf: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // O padrão é guest!
    type_user:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)