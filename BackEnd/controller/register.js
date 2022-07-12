const express = require("express");

const connection = require("../models/db");

const bcrypt = require("bcrypt")
const salt = 10


const register = async (req, res) => {
  
  const { name, email, password } = req.body;
  
  const hashPassword = await bcrypt.hash(password,10)
  
  const query = "INSERT INTO USERS (name,email,password) VALUES (?,?,?)";
  const data = [name, email, hashPassword];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        err,
      });
      return;
    }
    res.status(201).json({
      success: true,
      result: result,
    });
  });
};

module.exports = { register };
