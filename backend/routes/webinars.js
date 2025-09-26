const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Helper: Convert UNIX timestamp to "time ago"
function timeAgo(unixSeconds) {
  if (!unixSeconds) return "Unknown date";
  const date = new Date(parseInt(unixSeconds) * 1000);
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

// ✅ Get webinar platforms
router.get("/platforms", async (req, res) => {
  try {
    const [results] = await db.promise().query(
      "SELECT webinar_platforms_id, name FROM webinar_platforms ORDER BY name ASC"
    );

    res.json(
      results.map((p) => ({
        webinar_platforms_id: String(p.webinar_platforms_id),
        name: String(p.name),
      }))
    );
  } catch (err) {
    console.error("Error fetching platforms:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get webinars (with optional filters)
router.get("/", async (req, res) => {
  const { platform, search } = req.query;

  let sql = `
    SELECT w.webinars_id, w.title, w.description, w.link,
           w.platform, w.timestamp,
           p.name AS platform_name
    FROM webinars w
    LEFT JOIN webinar_platforms p ON w.platform = p.webinar_platforms_id
    WHERE 1=1
  `;
  const params = [];

  if (platform && platform !== "all") {
    sql += " AND w.platform = ?";
    params.push(platform);
  }
  if (search && search.trim() !== "") {
    sql += " AND (w.title LIKE ? OR w.description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += " ORDER BY w.timestamp DESC";

  try {
    const [results] = await db.promise().query(sql, params);

    const webinars = results.map((w) => {
      const ts = w.timestamp ? new Date(w.timestamp * 1000) : null;
      return {
        webinars_id: String(w.webinars_id),
        title: String(w.title),
        description: w.description ? String(w.description) : "",
        link: w.link ? String(w.link) : "",
        platform: String(w.platform),
        platform_name: w.platform_name ? String(w.platform_name) : "",
        timeAgo: ts ? timeAgo(w.timestamp) : "Unknown date",
      };
    });

    res.json(webinars);
  } catch (err) {
    console.error("Error fetching webinars:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;












// const express = require("express");
// const router = express.Router();

// // import your db connection
// const con = require("../config/db");

// // ✅ Fetch all webinar platforms
// router.get("/platforms", (req, res) => {
//   const sql = "SELECT webinar_platforms_id, name FROM webinar_platforms";
//   con.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching platforms:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

// // ✅ Fetch webinars (with optional filters)
// router.get("/", (req, res) => {
//   let { platform, search } = req.query;

//   let sql = `
//     SELECT w.webinars_id, w.name, w.photo,
//            w.timestamp,
//            p.name AS platform_name
//     FROM webinars w
//     LEFT JOIN webinar_platforms p ON w.platform = p.webinar_platforms_id
//     WHERE 1=1
//   `;
//   const params = [];

//   if (platform) {
//     sql += " AND w.platform = ?";
//     params.push(platform);
//   }
//   if (search) {
//     sql += " AND w.name LIKE ?";
//     params.push(`%${search}%`);
//   }

//   sql += " ORDER BY w.timestamp DESC";

//   con.query(sql, params, (err, results) => {
//     if (err) {
//       console.error("Error fetching webinars:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     // Prefix with server URL for frontend access
//     const formatted = results.map(w => ({
//       ...w,
//       photo: w.photo 
//       ? `http://localhost:5000/webinars_photos/${w.photo}` 
//       : "http://localhost:5000/uploads/default.png",
//     }));

//     res.json(formatted);
//   });
// });


// module.exports = router;
