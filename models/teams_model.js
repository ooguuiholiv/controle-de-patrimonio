const mongoose = require('mongoose')

const teamsScheme = new mongoose.Schema({
  leader_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
  ],
  teams_members_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ]
  
});

module.exports = mongoose.model('Team', teamsScheme)