const express = require("express");
const router = express.Router();
const db = require("../config/db");
const dayjs = require("dayjs");
const he = require("he");

router.get("/", async (req, res) => {
  let connection;
  try {
    // ✅ Always grab a dedicated connection (avoids "max_user_connections")
    connection = await db.getConnection();

    const [rows] = await connection.query(
      "SELECT * FROM posts ORDER BY timestamp DESC"
    );

    const baseUrl = "https://wablp.com/admin";

    const formatted = (Array.isArray(rows) ? rows : []).map((row) => {
      let photoFile = row.photo || "default.jpg";

      // remove leading "posts_photos/" to avoid duplication
      photoFile = photoFile.replace(/^posts_photos\//, "");

      return {
        id: row.posts_id,
        title: he.decode(row.title || ""), // decode HTML entities safely
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
  } finally {
    // ✅ Release connection to avoid leaks
    if (connection) connection.release();
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
