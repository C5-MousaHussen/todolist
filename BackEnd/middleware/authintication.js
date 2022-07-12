const jwt = require("jsonwebtoken");

const authontication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(500).json({
      success: false,
      message: "Forbidden",
    });
  }

  const token = req.headers.authorization.split(" ").pop();
  const Secret = "hushki";

  jwt.verify(token, Secret, (err, result) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "The token is invalid or expired" });
    } else {
      req.token = result;
      next();
    }
  });
};

module.exports = authontication;
