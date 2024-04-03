const mongoose = require('mongoose')

const teamsScheme = new mongoose.Schema({
  teams_id: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Employee",
    },
  ],
  leader_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
  ]
});

module.exports = mongoose.model('Team', teamsScheme)