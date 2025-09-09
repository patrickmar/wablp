const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");

// ✅ Get latest news (already exists, untouched)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
    );

    const baseUrl = "http://localhost:5000";

    const formatted = Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.posts_id,
          title: row.title,
          body: row.body ? row.body.toString("utf-8") : "",
          category: row.category,
          tags: row.tags,
          status: row.status,
          timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
          imageUrl: row.photo
            ? `${baseUrl}/posts_photos/${row.photo}`
            : `${baseUrl}/uploads/default.jpg`,
        }))
      : [];

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.json([]);
  }
});

// ✅ NEW: Get full single news by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db
      .promise()
      .query("SELECT * FROM posts WHERE posts_id = ? LIMIT 1", [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    const row = rows[0];
    const baseUrl = "http://localhost:5000";

    const formatted = {
      id: row.posts_id,
      title: row.title,
      body: row.body ? row.body.toString("utf-8") : "",
      category: row.category,
      tags: row.tags,
      status: row.status,
      timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
      imageUrl: row.photo
        ? `${baseUrl}/posts_photos/${row.photo}`
        : `${baseUrl}/uploads/default.jpg`,
    };

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching single news:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;









// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // make sure this is your DB connection
// const dayjs = require("dayjs");

// router.get("/", async (req, res) => {
//   try {
//     // ⬇️ Use the promise wrapper so `await` works
//     const [rows] = await db.promise().query(
//       "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
//     );

//     console.log("DB rows:", rows); // ✅ Debug: see exactly what DB returns

//     const baseUrl = "http://localhost:5000";

//     const formatted = Array.isArray(rows)
//       ? rows.map((row) => ({
//           id: row.posts_id,
//           title: row.title,
//           body: row.body ? row.body.toString("utf-8") : "",
//           category: row.category,
//           tags: row.tags,
//           status: row.status,
//           timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
//           imageUrl: row.photo
//             ? `${baseUrl}/posts_photos/${row.photo}`
//             : `${baseUrl}/uploads/default.jpg`,
//         }))
//       : [];

//     res.json(formatted);
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     // ✅ Always return an array so the frontend can safely `.map(...)`
//     res.json([]);
//   }
// });

// module.exports = router;
