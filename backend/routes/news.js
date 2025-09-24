const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");

// ✅ Get latest news
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM posts ORDER BY timestamp DESC LIMIT 4"
    );

    const baseUrl = "https://wablp.com/admin";

    const formatted = rows.map((row) => {
      let photoFile = row.photo || "default.jpg";
      photoFile = photoFile.replace(/^posts_photos\//, "");

      return {
        id: row.posts_id,
        title: row.title,
        body: row.body ? row.body.toString("utf-8") : "",
        category: row.category,
        tags: row.tags,
        status: row.status,
        timestamp: dayjs
          .unix(row.timestamp)
          .format("YYYY-MM-DD HH:mm:ss"),
        imageUrl: row.photo
          ? `${baseUrl}/posts_photos/${photoFile}`
          : `${baseUrl}/uploads/default.jpg`,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json([]);
  }
});

// ✅ Get full single news by ID + related posts
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch main article
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE posts_id = ? LIMIT 1",
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    const row = rows[0];
    const baseUrl = "https://wablp.com/admin";

    let photoFile = row.photo || "default.jpg";
    photoFile = photoFile.replace(/^posts_photos\//, "");

    // Fetch related news (same category, exclude this post)
    const [relatedRows] = await db.query(
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
      timestamp: dayjs
        .unix(row.timestamp)
        .format("YYYY-MM-DD HH:mm:ss"),
      imageUrl: row.photo
        ? `${baseUrl}/posts_photos/${photoFile}`
        : `${baseUrl}/uploads/default.jpg`,
      related: relatedRows.map((r) => ({
        id: r.posts_id,
        title: r.title,
      })),
    };

    res.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching single news:", error);
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

//     const baseUrl = "https://wablp.com/admin";

//     const formatted = Array.isArray(rows)
//       ? rows.map((row) => {
//           // ✅ make sure we only keep the filename (remove "posts_photos/" if it exists)
//           let photoFile = row.photo || "default.jpg";
//           photoFile = photoFile.replace(/^posts_photos\//, "");

//           return {
//             id: row.posts_id,
//             title: row.title,
//             body: row.body ? row.body.toString("utf-8") : "",
//             category: row.category,
//             tags: row.tags,
//             status: row.status,
//             timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
//             imageUrl: row.photo
//               ? `${baseUrl}/posts_photos/${photoFile}`
//               : `${baseUrl}/uploads/default.jpg`,
//           };
//         })
//       : [];

//     res.json(formatted);
//   } catch (error) {
//     console.error("❌ Error fetching news:", error);
//     res.json([]);
//   }
// });


// // ✅ Get full single news by ID + related posts
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch the main article
//     const [rows] = await db
//       .promise()
//       .query("SELECT * FROM posts WHERE posts_id = ? LIMIT 1", [id]);

//     if (!rows || rows.length === 0) {
//       return res.status(404).json({ error: "News not found" });
//     }

//     const row = rows[0];
//     const baseUrl = "https://wablp.com/admin";

//     // ✅ ensure no duplicate "posts_photos/"
//     let photoFile = row.photo || "default.jpg";
//     photoFile = photoFile.replace(/^posts_photos\//, "");

//     // Fetch related news (same category, exclude this post)
//     const [relatedRows] = await db
//       .promise()
//       .query(
//         "SELECT posts_id, title FROM posts WHERE category = ? AND posts_id != ? ORDER BY timestamp DESC LIMIT 10",
//         [row.category, id]
//       );

//     const formatted = {
//       id: row.posts_id,
//       title: row.title,
//       body: row.body ? row.body.toString("utf-8") : "",
//       category: row.category,
//       tags: row.tags,
//       status: row.status,
//       timestamp: dayjs.unix(row.timestamp).format("YYYY-MM-DD HH:mm:ss"),
//       imageUrl: row.photo
//         ? `${baseUrl}/posts_photos/${photoFile}`
//         : `${baseUrl}/uploads/default.jpg`,
//       related: Array.isArray(relatedRows)
//         ? relatedRows.map((r) => ({
//             id: r.posts_id,
//             title: r.title,
//           }))
//         : [],
//     };

//     res.json(formatted);
//   } catch (error) {
//     console.error("❌ Error fetching single news:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// module.exports = router;

