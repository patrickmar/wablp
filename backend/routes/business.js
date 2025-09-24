/// routes/business.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Helper to normalize business rows
function normalizeBusiness(business) {
  let photoFile = business.photo || null;

  if (photoFile) {
    photoFile = photoFile.replace(/^jtps_photos\//, "").replace(/^\/+/, "");
  }

  return {
    ...business,
    photo: photoFile
      ? `https://wablp.com/admin/jtps_photos/${photoFile}`
      : null,
  };
}

// ✅ Helper to normalize product rows
function normalizeProduct(product) {
  let photoFile = product.photo || null;
  if (photoFile) {
    photoFile = photoFile.replace(/^product_photos\//, "").replace(/^\/+/, "");
  }
  return {
    ...product,
    photo: photoFile
      ? `https://wablp.com/admin/product_photos/${photoFile}`
      : null,
  };
}

// ✅ Get all businesses with optional filters
router.get("/", async (req, res) => {
  try {
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

    const [results] = await db.query(query, params);

    const normalized = Array.isArray(results) ? results.map(normalizeBusiness) : [];
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching businesses:", err);
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});

// ✅ Get single business details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.query(
      "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'BUSINESS'",
      [id]
    );

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Business not found" });
    }

    const normalized = normalizeBusiness(results[0]);
    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching business details:", err);
    res.status(500).json({ error: "Failed to fetch business details" });
  }
});

// ✅ Get products for a business (fully safe)
// router.get("/:id/products", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [results] = await db.query(
//       "SELECT * FROM products WHERE business_id = ?",
//       [id]
//     );

//     const normalized = Array.isArray(results) ? results.map(normalizeProduct) : [];
//     res.json(normalized);
//   } catch (err) {
//     console.error("❌ Error fetching products:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

module.exports = router;











// /// routes/business.js
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // ✅ Helper to normalize business rows and remove duplicate path
// function normalizeBusiness(business) {
//   let photoFile = business.photo || null;

//   if (photoFile) {
//     // Remove any leading "jtps_photos/" to avoid duplicates
//     photoFile = photoFile.replace(/^jtps_photos\//, "");
//     photoFile = photoFile.replace(/^\/+/, ""); // remove leading slashes
//   }

//   return {
//     ...business,
//     photo: photoFile
//       ? `https://wablp.com/admin/jtps_photos/${photoFile}`
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

//     const normalized = results.map(normalizeBusiness);
//     res.json(normalized);
//   });
// });

// // ✅ Get single business details
// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const sql =
//     "SELECT * FROM customers WHERE customers_id = ? AND joined_as = 'BUSINESS'";

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching business details:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Business not found" });
//     }

//     const normalized = normalizeBusiness(results[0]);
//     res.json(normalized);
//   });
// });

// // ✅ Get products for a business
// router.get("/:id/products", (req, res) => {
//   const { id } = req.params;

//   const sql = "SELECT * FROM products WHERE business_id = ?"; // assuming products reference business_id
//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching products:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     const normalized = results.map((p) => {
//       let photoFile = p.photo || null;
//       if (photoFile) {
//         photoFile = photoFile.replace(/^product_photos\//, "");
//         photoFile = photoFile.replace(/^\/+/, "");
//       }

//       return {
//         ...p,
//         photo: photoFile
//           ? `https://wablp.com/admin/product_photos/${photoFile}`
//           : null,
//       };
//     });

//     res.json(normalized);
//   });
// });

// module.exports = router;








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