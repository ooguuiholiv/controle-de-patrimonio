const mongoose = require('mongoose')

const employeeScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    is_active:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Employee", employeeScheme)