const express = require("express");

// import from controller
const { login } = require("../controller/login");

const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter;
