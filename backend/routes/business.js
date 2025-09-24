// routes/business.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const path = require("path");

// ✅ Helper to normalize business rows
function normalizeBusiness(business) {
  return {
    ...business,
    photo: business.photo
      ? `https://wablp.com/admin/jtps_photos/${business.photo}`
      : null,
  };
}

// ✅ Get all businesses with filters
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

    const normalized = results.map(normalizeBusiness);
    res.json(normalized);
  });
});

// ✅ Get single business details
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'BUSINESS'";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching business details:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Business not found" });
    }

    const normalized = normalizeBusiness(results[0]);
    res.json(normalized);
  });
});

// ✅ Get products for a business
router.get("/:id/products", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE products_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching products:", err);
      return res.status(500).json({ error: err.message });
    }

    const normalized = results.map((p) => ({
      ...p,
      photo: p.photo
        ? `https://wablp.com/admin/product_photos/${p.photo}`
        : null,
    }));

    res.json(normalized);
  });
});

module.exports = router;







// // routes/business.js
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const path = require("path");

// // ✅ Helper to normalize business rows
// function normalizeBusiness(business) {
//   return {
//     ...business,
//     photo: business.photo
//       ? `http://localhost:5000/jtps_photos/${business.photo}`
//       : null,
//   };
// }

// // ✅ Get all businesses with filters
// router.get("/", (req, res) => {
//   const { category, search, location } = req.query;

//   let query = "SELECT * FROM customers WHERE joined_as = 'BUSINESS'";
//   const params = [];

//   if (category) {
//     query += " AND category = ?";
//     params.push(category);
//   }
//   if (location) {
//     query += " AND country LIKE ?";
//     params.push(`%${location}%`);
//   }
//   if (search) {
//     query += " AND (name LIKE ? OR company_name LIKE ?)";
//     params.push(`%${search}%`, `%${search}%`);
//   }

//   query += " ORDER BY timestamp DESC";

//   db.query(query, params, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching businesses:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     // ✅ Normalize results so photo is a URL
//     const normalized = results.map(normalizeBusiness);
//     res.json(normalized);
//   });
// });

// module.exports = router;