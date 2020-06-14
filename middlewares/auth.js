const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // header token
  const token = req.header("x-auth-token");

  // check if token exists
  if (!token) {
    return res.status(401).json({ msg: "Access denied, token is required" });
  }

  // validate token
  try {
    const encrypted = jwt.verify(token, process.env.SECRET);

    req.user = encrypted.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
