// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // ✅ GET /routes/stats
// router.get("/", async (req, res) => {
//   try {
//     const queries = {
//       businesses: "SELECT COUNT(*) AS count FROM customers WHERE joined_as = 'BUSINESS'",
//       experts: "SELECT COUNT(*) AS count FROM customers WHERE joined_as = 'EXPERT'",
//       organizations: "SELECT COUNT(*) AS count FROM customers WHERE joined_as = 'ORGANIZATION'",
//       resources: "SELECT COUNT(*) AS count FROM resource_center'"
//     };

//     const stats = {};
//     for (const [key, sql] of Object.entries(queries)) {
//       const [rows] = await db.query(sql);
//       stats[key] = rows[0].count || 0;
//     }

//     res.json({ success: true, data: stats });
//   } catch (err) {
//     console.error("❌ Error fetching stats:", err);
//     res.status(500).json({ success: false, message: "Database error" });
//   }
// });

// module.exports = router;



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

    const stats = {};

    // ✅ Run queries sequentially (one by one)
    for (const [key, sql] of Object.entries(queries)) {
      const [rows] = await db.query(sql);
      stats[key] = rows[0].count;
    }

    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;