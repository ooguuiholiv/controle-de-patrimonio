const express = require("express");
const router = express.Router();
const Employee = require("../models/employee_model");
const Team = require("../models/teams_model");
const User = require("../models/user_model");
const isAuthenticated = require("../middlewares/auth");
const mongoose = require("mongoose");

router.post("/create/team", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { leaderId, membersId } = req.body;

    if (leaderId === undefined || membersId === undefined) {
      return res.status(400).json({ msg: "Leader and members are required" });
    }

    if (membersId.includes(leaderId)) {
      return res
        .status(400)
        .json({ msg: "Leader cannot be a member of the team" });
    }

    const uniqueMembers = [...new Set(membersId)];
    if (uniqueMembers.length !== membersId.length) {
      return res
        .status(400)
        .json({ msg: "Duplicate member IDs are not allowed" });
    }

    if (!mongoose.Types.ObjectId.isValid(leaderId)) {
      return res.status(400).json({ msg: "Invalid leader ID" });
    }

    for (const memberId of membersId) {
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ msg: "Invalid member ID" });
      }
    }

    const existingLeaderAsLeader = await Team.findOne({ leader_id: leaderId });
    if (existingLeaderAsLeader) {
      return res
        .status(400)
        .json({ msg: "Leader is already a leader of another team" });
    }

    const existingLeaderAsMember = await Team.findOne({
      teams_members_id: leaderId,
    });
    if (existingLeaderAsMember) {
      return res
        .status(400)
        .json({ msg: "Leader is already a member of another team" });
    }

    for (const memberId of membersId) {
      const existingTeam = await Team.findOne({ teams_members_id: memberId });
      console.log(existingTeam);
      if (existingTeam) {
        return res
          .status(400)
          .json({ msg: `Member with ID ${memberId} is already in a team` });
      }
    }

    const newTeam = new Team({
      leader_id: leaderId,
      teams_members_id: membersId,
    });
    await newTeam.save();
    return res.status(201).json({ msg: "Team created successfully", newTeam });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.get("/list/teams", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const teams = await Team.find();
    /* .populate("leader_id", "fullname") 
      .populate("teams_members_id", "fullname");  */

    return res.status(200).json({ teams });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.put("/update/team/:teamId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const { leaderId, membersId } = req.body;
    const teamId = req.params.teamId;

    // Verificar se o ID da equipe é válido
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ msg: "Invalid team ID" });
    }

    // Verificar se a equipe existe
    const existingTeam = await Team.findById(teamId);
    if (!existingTeam) {
      return res.status(404).json({ msg: "Team not found" });
    }

    // Verificar se o líder e os membros foram fornecidos
    if (leaderId === undefined || membersId === undefined) {
      return res.status(400).json({ msg: "Leader and members are required" });
    }

    // Verificar se o líder não está na lista de membros
    if (membersId.includes(leaderId)) {
      return res
        .status(400)
        .json({ msg: "Leader cannot be a member of the team" });
    }

    // Verificar membros duplicados na lista
    const uniqueMembers = [...new Set(membersId)];
    if (uniqueMembers.length !== membersId.length) {
      return res
        .status(400)
        .json({ msg: "Duplicate member IDs are not allowed" });
    }

    // Verificar se o ID do líder é válido
    if (!mongoose.Types.ObjectId.isValid(leaderId)) {
      return res.status(400).json({ msg: "Invalid leader ID" });
    }

    // Verificar se o líder já é líder de outra equipe
    const existingLeaderAsLeader = await Team.findOne({ leader_id: leaderId });
    if (
      existingLeaderAsLeader &&
      existingLeaderAsLeader._id.toString() !== teamId
    ) {
      return res
        .status(400)
        .json({ msg: "Leader is already a leader of another team" });
    }

    // Verificar se o líder já é membro de outra equipe
    const existingLeaderAsMember = await Team.findOne({
      teams_members_id: leaderId,
    });
    if (
      existingLeaderAsMember &&
      existingLeaderAsMember._id.toString() !== teamId
    ) {
      return res
        .status(400)
        .json({ msg: "Leader is already a member of another team" });
    }

    // Verificar se algum dos membros já está em outra equipe
    const existingTeamWithMembers = await Team.findOne({
      _id: { $ne: teamId },
      teams_members_id: { $in: membersId },
    });
    if (existingTeamWithMembers) {
      return res
        .status(400)
        .json({ msg: "One or more members are already in a team" });
    }

    // Atualizar a equipe com os novos dados
    existingTeam.leader_id = leaderId;
    existingTeam.teams_members_id = membersId;
    await existingTeam.save();

    return res
      .status(200)
      .json({ msg: "Team updated successfully", existingTeam });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.delete("/delete/team/:teamId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "You do not have permission to access this path" });
    }
    const teamId = req.params.teamId;
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ msg: "Invalid team ID" });
    }

    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
      return res.status(400).json({ msg: "Team not found" });
    }
    return res.status(200).json({ msg: "team deleted successfully", team });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
