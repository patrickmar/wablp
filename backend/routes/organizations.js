// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // GET categories for dropdown
// router.get("/categories", (req, res) => {
//   const query = "SELECT mentor_categories_id, name FROM mentor_categories";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching categories:", err);
//       return res.status(500).json({ error: "Failed to fetch categories" });
//     }
//     res.json(results);
//   });
// });

// // GET organizations (with optional category filter + search)
// router.get("/", (req, res) => {
//   const { category, search } = req.query;

//   let query = "SELECT * FROM customers WHERE joined_as = 'ORGANIZATION'";
//   const params = [];

//   if (category) {
//     query += " AND category = ?";
//     params.push(category);
//   }

//   if (search) {
//     query += " AND (name LIKE ? OR company_name LIKE ?)";
//     params.push(`%${search}%`, `%${search}%`);
//   }

//   query += " ORDER BY timestamp DESC";

//   db.query(query, params, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching organizations:", err);
//       return res.status(500).json({ error: "Failed to fetch organizations" });
//     }

//     if (results.length === 0) {
//       return res.json({ message: "No results found." });
//     }

//     res.json(results);
//   });
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

// ✅ Get organizations (with filters)
router.get("/", (req, res) => {
  const { category, search, location } = req.query;

  let query = "SELECT * FROM customers WHERE joined_as = 'ORGANIZATION'";
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
      console.error("❌ Error fetching organizations:", err);
      return res.status(500).json({ error: "Failed to fetch organizations" });
    }

    // ✅ Always return an array (empty [] if no results)
    res.json(results);
  });
});

module.exports = router;
