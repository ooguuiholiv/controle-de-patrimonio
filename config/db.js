const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const db_name = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      auth: {
        username,
        password,
      },
      dbName: db_name,
    });
    console.log("Database Connected");
  } catch (err) {
    console.log("Could not connect to MongoDB");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;