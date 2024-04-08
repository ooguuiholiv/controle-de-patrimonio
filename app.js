const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const user_routes = require("./routes/user_routes");
const client_routes = require("./routes/client_routes");
const auth_routes = require("./routes/auth_routes");
const employee_routes = require("./routes/employee_routes");
const team_routes = require("./routes/team_routes")
const vehicle_routes = require('./routes/vehicle_routes')
const patrimony_routes = require('./routes/patrimony_routes')

const port = process.env.PORT;

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// Routes
app.use(user_routes);
app.use(client_routes)
app.use(auth_routes)
app.use(employee_routes)
app.use(team_routes)
app.use(vehicle_routes)
app.use(patrimony_routes)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
