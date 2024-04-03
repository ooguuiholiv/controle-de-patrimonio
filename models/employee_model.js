const mongoose = require('mongoose')

const employeeScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Employee", employeeScheme)