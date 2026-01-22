const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const fields = req.body;
    const setStr = Object.keys(fields)
      .map(key => `${key} = ?`)
      .join(", ");

    await db.query(
      `UPDATE customers SET ${setStr} WHERE customers_id = ?`,
      [...Object.values(fields), req.userId]
    );

    const [rows] = await db.query("SELECT * FROM customers WHERE customers_id = ?", [req.userId]);
    const user = rows[0];
    delete user.password;

    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
