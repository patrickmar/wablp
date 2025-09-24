const express = require("express");
const router = express.Router();
const db = require("../config/db"); // ✅ pooled MySQL connection

// ✅ GET /api/stats
router.get("/stats", async (req, res) => {
  try {
    const queries = {
      businesses: "SELECT COUNT(*) AS count FROM business_categories",
      experts: "SELECT COUNT(*) AS count FROM experts_categories",
      organizations: "SELECT COUNT(*) AS count FROM organizations_categories",
      resources: "SELECT COUNT(*) AS count FROM resource_categories",
    };

    // Run all queries in parallel
    const results = await Promise.all(
      Object.entries(queries).map(async ([key, sql]) => {
        const [rows] = await db.query(sql);
        return { key, count: rows[0].count };
      })
    );

    // Convert array back to object
    const stats = results.reduce((acc, item) => {
      acc[item.key] = item.count;
      return acc;
    }, {});

    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;












// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // make sure this is your DB connection

// // ✅ GET /api/stats
// router.get("/stats", (req, res) => {
//   const queries = {
//     businesses: "SELECT COUNT(*) AS count FROM business_categories",
//     experts: "SELECT COUNT(*) AS count FROM experts_categories",
//     organizations: "SELECT COUNT(*) AS count FROM organizations_categories",
//     resources: "SELECT COUNT(*) AS count FROM resource_categories",
//   };

//   const results = {};
//   let completed = 0;
//   const total = Object.keys(queries).length;

//   for (let key in queries) {
//     db.query(queries[key], (err, rows) => {
//       if (err) {
//         console.error(`Error fetching ${key}:`, err);
//         return res.status(500).json({ error: err.message });
//       }

//       results[key] = rows[0].count;
//       completed++;

//       // ✅ send once all queries are done
//       if (completed === total) {
//         return res.json(results);
//       }
//     });
//   }
// });

// module.exports = router;
