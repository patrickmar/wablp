const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");
const he = require("he");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM posts ORDER BY timestamp DESC"
    );

    const baseUrl = "http://localhost:5000";

    const formatted = Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.posts_id,
          title: he.decode(row.title),   // ✅ ensure correct chars
          body: row.body || "",
          category: row.category,
          tags: row.tags,
          status: row.status,
          timestamp: dayjs
            .unix(row.timestamp)
            .format("YYYY-MM-DD HH:mm:ss"),
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

module.exports = router;
