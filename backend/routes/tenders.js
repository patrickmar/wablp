const express = require("express");
const router = express.Router();
const db = require("../config/db"); // ✅ MySQL pool with promises

// ✅ Helper: Convert UNIX timestamp to "time ago"
function timeAgo(unixSeconds) {
  if (!unixSeconds) return "Unknown date";

  const date = new Date(parseInt(unixSeconds) * 1000); // ✅ convert to ms
  if (isNaN(date.getTime())) return "Unknown date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

// ✅ Get tender types
router.get("/types", async (req, res) => {
  try {
    const [results] = await db.promise().query(
      "SELECT tender_types_id, name FROM tender_types"
    );
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching tender types:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get tender categories
router.get("/categories", async (req, res) => {
  try {
    const [results] = await db.promise().query(
      "SELECT tender_categories_id, name FROM tender_categories"
    );
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching tender categories:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get tenders (with filters)
router.get("/", async (req, res) => {
  let sql = `
    SELECT tenders_id, title, timestamp, type, category,
           currency, tender_value, bid_open_date, bid_close_date
    FROM tenders
  `;
  let conditions = [];
  let params = [];

  if (req.query.type) {
    conditions.push("type = ?");
    params.push(req.query.type);
  }

  if (req.query.category) {
    conditions.push("category = ?");
    params.push(req.query.category);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY timestamp DESC";

  try {
    const [results] = await db.promise().query(sql, params);

    const formatted = results.map((row) => ({
      ...row,
      timeAgo: timeAgo(row.timestamp), // ✅ "2 years ago"
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching tenders:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
