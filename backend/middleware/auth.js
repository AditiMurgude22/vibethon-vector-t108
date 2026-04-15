const jwt = require("jsonwebtoken");
const { users } = require("../models/store");
const { JWT_SECRET } = require("../controllers/authController");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Missing auth token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid auth token" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
}

module.exports = { requireAuth };
