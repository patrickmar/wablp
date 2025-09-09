const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key";

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ msg: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

// Dashboard routing
router.get("/", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT * FROM customers WHERE customers_id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
