const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure this is your DB connection

// ✅ GET /api/stats
router.get("/stats", (req, res) => {
  const queries = {
    businesses: "SELECT COUNT(*) AS count FROM business_categories",
    experts: "SELECT COUNT(*) AS count FROM experts_categories",
    organizations: "SELECT COUNT(*) AS count FROM organizations_categories",
    resources: "SELECT COUNT(*) AS count FROM resource_categories",
  };

  const results = {};
  let completed = 0;
  const total = Object.keys(queries).length;

  for (let key in queries) {
    db.query(queries[key], (err, rows) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        return res.status(500).json({ error: err.message });
      }

      results[key] = rows[0].count;
      completed++;

      // ✅ send once all queries are done
      if (completed === total) {
        return res.json(results);
      }
    });
  }
});

module.exports = router;












// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Helper: promisify db.query
// function query(sql) {
//   return new Promise((resolve, reject) => {
//     db.query(sql, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// }

// // ✅ Stats endpoint
// router.get("/stats", async (req, res) => {
//   try {
//     const [b, e, o, r] = await Promise.all([
//       query("SELECT COUNT(*) AS count FROM business_categories"),
//       query("SELECT COUNT(*) AS count FROM experts_categories"),
//       query("SELECT COUNT(*) AS count FROM organizations_categories"),
//       query("SELECT COUNT(*) AS count FROM resource_categories"),
//     ]);

//     return res.json({
//       businesses: b[0].count,
//       experts: e[0].count,
//       organizations: o[0].count,
//       resources: r[0].count,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
