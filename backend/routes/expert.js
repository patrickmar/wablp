/// routes/expert.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Helper to normalize expert rows and remove duplicate path
function normalizeExpert(expert) {
  let photoFile = expert.photo || null;

  if (photoFile) {
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
router.get("/categories", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT mentor_categories_id, name FROM mentor_categories"
    );
    res.json(results); // always array
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ✅ Get experts (with filters)
router.get("/", async (req, res) => {
  try {
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

    const [results] = await db.query(query, params);
    const normalized = results.map(normalizeExpert);
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching experts:", err);
    res.status(500).json({ error: "Failed to fetch experts" });
  }
});

// ✅ Get single expert by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.query(
      "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'EXPERT'",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Expert not found" });
    }

    const normalized = normalizeExpert(results[0]);
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching expert:", err);
    res.status(500).json({ error: "Failed to fetch expert" });
  }
});

module.exports = router;
