const express = require("express");

// register import from controller
const { register } = require("../controller/register");

// Router
const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports =  registerRouter ;
