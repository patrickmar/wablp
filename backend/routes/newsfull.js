const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");
const he = require("he");

router.get("/", async (req, res) => {
  try {
    // ✅ db is already promise-based now, so no `.promise()`
    const [rows] = await db.query(
      "SELECT * FROM posts ORDER BY timestamp DESC"
    );

    const baseUrl = "https://wablp.com/admin";

    const formatted = Array.isArray(rows)
      ? rows.map((row) => {
          let photoFile = row.photo || "default.jpg";

          // remove leading "posts_photos/" to avoid duplication
          photoFile = photoFile.replace(/^posts_photos\//, "");

          return {
            id: row.posts_id,
            title: he.decode(row.title), // decode HTML entities
            body: row.body || "",
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
        })
      : [];

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.json([]);
  }
});

module.exports = router;












// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const dayjs = require("dayjs");
// const he = require("he");

// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.promise().query(
//       "SELECT * FROM posts ORDER BY timestamp DESC"
//     );

//     const baseUrl = "https://wablp.com/admin";

//     const formatted = Array.isArray(rows)
//       ? rows.map((row) => {
//           // ✅ handle photo safely per row
//           let photoFile = row.photo || "default.jpg";

//           // remove leading "posts_photos/" to avoid duplication
//           photoFile = photoFile.replace(/^posts_photos\//, "");

//           return {
//             id: row.posts_id,
//             title: he.decode(row.title), // decode HTML entities
//             body: row.body || "",
//             category: row.category,
//             tags: row.tags,
//             status: row.status,
//             timestamp: dayjs
//               .unix(row.timestamp)
//               .format("YYYY-MM-DD HH:mm:ss"),
//             imageUrl: row.photo
//               ? `${baseUrl}/posts_photos/${photoFile}`
//               : `${baseUrl}/uploads/default.jpg`,
//           };
//         })
//       : [];

//     res.json(formatted);
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     res.json([]);
//   }
// });

// module.exports = router;
