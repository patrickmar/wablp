const express = require("express");
const router = express.Router();
const db = require("../config/db"); // ✅ your promise-based pool

// ✅ Fetch all webinar platforms
router.get("/platforms", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT webinar_platforms_id, name FROM webinar_platforms ORDER BY name ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).json({ error: "Failed to fetch platforms" });
  }
});

// ✅ Fetch all webinars
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT w.id, w.title, w.description, w.date, w.time, p.name AS platform
      FROM webinars w
      LEFT JOIN webinar_platforms p ON w.platform_id = p.id
      ORDER BY w.date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ error: "Failed to fetch webinars" });
  }
});

// ✅ Fetch single webinar by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT w.webinars_id, w.title, w.description, w.date, w.time, p.name AS platform
       FROM webinars w
       LEFT JOIN webinar_platforms p ON w.platform_id = p.webinar_platforms_id
       WHERE w.webinars_id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching webinar:", error);
    res.status(500).json({ error: "Failed to fetch webinar" });
  }
});

// ✅ Create a new webinar
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, platform_id } = req.body;

    if (!title || !date || !time || !platform_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await db.execute(
      "INSERT INTO webinars (title, description, date, time, platform_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, date, time, platform_id]
    );

    res.status(201).json({ message: "Webinar created", webinarId: result.insertId });
  } catch (error) {
    console.error("Error creating webinar:", error);
    res.status(500).json({ error: "Failed to create webinar" });
  }
});

// ✅ Update a webinar
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, time, platform_id } = req.body;

    const [result] = await db.execute(
      "UPDATE webinars SET title = ?, description = ?, date = ?, time = ?, platform_id = ? WHERE id = ?",
      [title, description, date, time, platform_id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    res.json({ message: "Webinar updated" });
  } catch (error) {
    console.error("Error updating webinar:", error);
    res.status(500).json({ error: "Failed to update webinar" });
  }
});

// ✅ Delete a webinar
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM webinars WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    res.json({ message: "Webinar deleted" });
  } catch (error) {
    console.error("Error deleting webinar:", error);
    res.status(500).json({ error: "Failed to delete webinar" });
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
