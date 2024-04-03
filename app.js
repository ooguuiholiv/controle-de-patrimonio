const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const user_routes = require("./routes/user_routes");

const port = process.env.PORT;

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// Routes
app.use(user_routes);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
