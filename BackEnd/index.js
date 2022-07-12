const express = require("express");
require("dotenv").config();
require("./models/db");

const App = express();

App.use(express.json());

//import Router
const registerRouter = require("./route/register");
const loginRouter = require("./route/login");
const TaskRouter = require("./route/dashboard")

//Router
App.use("/register", registerRouter);
App.use("/login", loginRouter);
App.use("/dashboard",TaskRouter)

const Port = 5000;

App.listen(Port, () => {
  console.log(`The server is working on port ${Port}..`);
});
