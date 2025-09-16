// routes/status.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Get online status of a user
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // Example: check last_activity in DB (you must store it on login/ping)
  const query = "SELECT lastseen FROM customers WHERE customers_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching status:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) return res.json({ status: "Offline" });

    const lastActivity = new Date(results[0].last_activity);
    const now = new Date();

    // If active within 2 minutes → Online
    const diff = (now - lastActivity) / 1000;
    const status = diff < 120 ? "Online" : "Offline";

    res.json({ status });
  });
});

module.exports = router;
