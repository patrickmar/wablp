const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Fetch all countries
router.get("/countries", (req, res) => {
  const sql = "SELECT countries_id, name FROM countries ORDER BY name ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching countries:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Fetch projects with optional filter
router.get("/", (req, res) => {
  const { country, search } = req.query;

  let sql = `
    SELECT p.projects_id, p.name, p.photo, p.timestamp,
           c.name AS country_name,
           u.name AS owner_name
    FROM projects p
    LEFT JOIN countries c ON p.country = c.countries_id
    LEFT JOIN customers u ON p.owner = u.customers_id
    WHERE 1=1
  `;
  const params = [];

  // 🔹 Filtering
  if (country && country !== "all") {
    sql += " AND p.country = ?";
    params.push(country);
  }

  if (search && search.trim() !== "") {
    sql += " AND (p.name LIKE ? OR u.name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += " ORDER BY p.timestamp DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // ✅ Fix photo path + add timeAgo
    const projects = results.map((proj) => {
      // Strip duplicate prefix if present
      let photoFile = proj.photo || null;
      if (photoFile) photoFile = photoFile.replace(/^projects_photos\//, "");

      // Convert UNIX timestamp (seconds) to JS Date
      const ts = proj.timestamp ? new Date(proj.timestamp * 1000) : null;

      return {
        ...proj,
        photo: photoFile
          ? `https://wablp.com/admin/projects_photos/${photoFile}`
          : null,
        timeAgo: ts ? timeAgo(ts) : "Unknown date",
      };
    });

    res.json(projects);
  });
});

// 🔹 Helper to format "time ago"
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

module.exports = router;
