// routes/business.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const { category, search, location } = req.query;

  let query = "SELECT * FROM customers WHERE joined_as = 'BUSINESS'";
  const params = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (location) {
    query += " AND country LIKE ?";
    params.push(`%${location}%`);
  }
  if (search) {
    query += " AND (name LIKE ? OR company_name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  query += " ORDER BY timestamp DESC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching businesses:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
