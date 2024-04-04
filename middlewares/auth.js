const User = require("../models/user_model");
const Client = require("../models/client_model");
const secretJwt = process.env.SECRET_JWT;
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        err: "You must be logged in",
      });
    }

    const decoded = jwt.verify(authHeader, secretJwt);
    const user = await User.findById(decoded.user.id);
    const client = await Client.findById(decoded.user.id);

    if(!user){
      if(client){
        req.user = client
        return next()
      }
      return res.status(400).json({msg: "User/client not found"})
    }
    req.user = user
    next()
  } catch (err) {
    console.log(err);
    res.status(503).json({
      err: "Token is not valid",
    });
  }
};

module.exports = isAuthenticated;
