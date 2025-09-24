const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");

// ✅ Get latest news (already exists, untouched)
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.promise().query(
//       "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
//     );

//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
//     res.json([]);
//   }
// });


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const externalBase = "https://wablp.com/admin";

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
    );

    const formatted = Array.isArray(rows)
      ? rows.map((row) => {
        const photoFile = row.photo || "default.jpg";

        return {
          id: row.posts_id,
          title: row.title,
          body: row.body ? row.body.toString("utf-8") : "",
          category: row.category,
          tags: row.tags,
          status: row.status,
          timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),

          // ✅ NEW: Provide both URLs
          image: {
            externalUrl: `${baseUrl}/external/posts_photos/${photoFile}`
          }

        };
      })
      : [];

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.json([]);
  }
});





// ✅ Get full single news by ID + related posts
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the main article
    const [rows] = await db
      .promise()
      .query("SELECT * FROM posts WHERE posts_id = ? LIMIT 1", [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    const row = rows[0];
    const baseUrl = "http://localhost:5000";

    // Fetch related news (same category, exclude this post)
    const [relatedRows] = await db
      .promise()
      .query(
        "SELECT posts_id, title FROM posts WHERE category = ? AND posts_id != ? ORDER BY timestamp DESC LIMIT 10",
        [row.category, id]
      );

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
      related: Array.isArray(relatedRows)
        ? relatedRows.map((r) => ({
          id: r.posts_id,
          title: r.title,
        }))
        : [],
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
// const db = require("../config/db");
// const dayjs = require("dayjs");

// // ✅ Get latest news (already exists, untouched)
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.promise().query(
//       "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
//     );

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
//     res.json([]);
//   }
// });

// // ✅ NEW: Get full single news by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [rows] = await db
//       .promise()
//       .query("SELECT * FROM posts WHERE posts_id = ? LIMIT 1", [id]);

//     if (!rows || rows.length === 0) {
//       return res.status(404).json({ error: "News not found" });
//     }

//     const row = rows[0];
//     const baseUrl = "http://localhost:5000";

//     const formatted = {
//       id: row.posts_id,
//       title: row.title,
//       body: row.body ? row.body.toString("utf-8") : "",
//       category: row.category,
//       tags: row.tags,
//       status: row.status,
//       timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
//       imageUrl: row.photo
//         ? `${baseUrl}/posts_photos/${row.photo}`
//         : `${baseUrl}/uploads/default.jpg`,
//     };

//     res.json(formatted);
//   } catch (error) {
//     console.error("Error fetching single news:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
