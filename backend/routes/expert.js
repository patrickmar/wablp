const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Helper to normalize expert rows and remove duplicate path
function normalizeExpert(expert) {
  let photoFile = expert.photo || null;

  if (photoFile) {
    // Remove any leading "jtps_photos/" or slashes to prevent duplicates
    photoFile = photoFile.replace(/^jtps_photos\//, "");
    photoFile = photoFile.replace(/^\/+/, "");
  }

  return {
    ...expert,
    photo: photoFile
      ? `https://wablp.com/admin/jtps_photos/${photoFile}`
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

  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }

  if (location && location !== "all") {
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
      console.error("❌ Error fetching experts:", err);
      return res.status(500).json({ error: "Failed to fetch experts" });
    }

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
