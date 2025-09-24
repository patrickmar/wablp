/// routes/organization.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Helper to normalize organization row and remove duplicate path
function normalizeOrg(org) {
  let photoFile = org.photo || null;

  if (photoFile) {
    photoFile = photoFile.replace(/^jtps_photos\//, "");
    photoFile = photoFile.replace(/^\/+/, "");
  }

  return {
    ...org,
    customers_id: org.customers_id,
    name: org.name?.toString() || "",
    company_name: org.company_name?.toString() || "",
    category: org.category?.toString() || "",
    country: org.country?.toString() || "",
    email: org.email?.toString() || "",
    phone: org.phone?.toString() || "",
    organization_type: org.organization_type?.toString() || "",
    website: org.website?.toString() || "",
    portfolio: org.portfolio?.toString() || "",
    description: org.description?.toString() || "",
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
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ✅ Get organizations (with filters)
router.get("/", async (req, res) => {
  try {
    const { category, search, location } = req.query;

    let query = "SELECT * FROM customers WHERE joined_as = 'ORGANIZATION'";
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
    const normalized = results.map(normalizeOrg);
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching organizations:", err);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

// ✅ Get single organization details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.query(
      "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'ORGANIZATION'",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const normalized = normalizeOrg(results[0]);
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching organization details:", err);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
});

module.exports = router;





















// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const path = require("path");


// // ✅ Helper to normalize business rows
// function normalizeOrg(org) {
//   return {
//     ...org,
//     photo: org.photo
//       ? `http://localhost:5000/jtps_photos/${org.photo}`
//       : null,
//   };
// }


// // ✅ Get all categories for dropdown
// router.get("/categories", (req, res) => {
//   const query = "SELECT mentor_categories_id, name FROM mentor_categories";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching categories:", err);
//       return res.status(500).json({ error: "Failed to fetch categories" });
//     }
//     res.json(results); // always array
//   });
// });

// // ✅ Get organizations (with filters)
// router.get("/", (req, res) => {
//   const { category, search, location } = req.query;

//   let query = "SELECT * FROM customers WHERE joined_as = 'ORGANIZATION'";
//   const params = [];

//   // filter by category (skip if "all")
//   if (category && category !== "all") {
//     query += " AND category = ?";
//     params.push(category);
//   }

//   // filter by location (skip if "all")
//   if (location && location !== "all") {
//     query += " AND country LIKE ?";
//     params.push(`%${location}%`);
//   }

//   // filter by search (matches name or company_name)
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

//     // ✅ Normalize results so photo is a URL
//     const normalized = results.map(normalizeOrg);
//     res.json(normalized);
//   });
// });


// // ✅ Get single organization details
// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const sql = "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'ORGANIZATION'";

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching business details:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Organization not found" });
//     }

//     const normalized = normalizeOrg(results[0]);
//     res.json(normalized);
//   });
// });

// module.exports = router;
