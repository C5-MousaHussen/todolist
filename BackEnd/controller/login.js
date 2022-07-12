const connection = require("../models/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email= (?)";
  const data = [email];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "server error",
        err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "The email is not exist",
        err,
      });
    }

    bcrypt.compare(password, result[0].password, async (err, response) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "server error", err });
      }
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "The password is wrong",
          err,
        });
      }

      const payload = {
        userId: result[0].id,
        name: result[0].name,
      };
      const Options = { expiresIn: "300m" };
      const Secret = "hushki";

      const token = await jwt.sign(payload, Secret, Options);

      res.status(201).json({
        success: true,
        token,
      });
    });
  });
};

module.exports = { login };
