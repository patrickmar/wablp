const express = require("express");
const router = express.Router();
const db = require("../config/db");
const path = require("path");

// ✅ Helper to normalize expert rows
function normalizeExpert(expert) {
  return {
    ...expert,
    photo: expert.photo
      ? `https://wablp.com/admin/jtps_photos/${expert.photo}`
      : null,
  };
}

// ✅ Get all categories for dropdown
router.get("/categories", (req, res) => {
  const query = "SELECT mentor_categories_id, name FROM mentor_categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching categories:", err);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
    res.json(results); // always array
  });
});

// ✅ Get experts (with filters)
router.get("/", (req, res) => {
  const { category, search, location } = req.query;

  let query = "SELECT * FROM customers WHERE joined_as = 'EXPERT'";
  const params = [];

  // filter by category (skip if "all")
  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }

  // filter by location (skip if "all")
  if (location && location !== "all") {
    query += " AND country LIKE ?";
    params.push(`%${location}%`);
  }

  // filter by search (matches name or company_name)
  if (search) {
    query += " AND (name LIKE ? OR company_name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  query += " ORDER BY timestamp DESC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching experts:", err);
      return res.status(500).json({ error: "Failed to fetch experts" });
    }

    // ✅ Normalize results so photo is a URL
    const normalized = results.map(normalizeExpert);
    res.json(normalized);
  });
});

// ✅ Get single expert by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'EXPERT'";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching expert:", err);
      return res.status(500).json({ error: "Failed to fetch expert" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Expert not found" });
    }

    const normalized = normalizeExpert(results[0]);
    res.json(normalized);
  });
});

module.exports = router;

