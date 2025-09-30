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

// ✅ Fetch all webinars (summary list)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT w.webinars_id, 
             w.name, 
             w.photo, 
             w.timestamp, 
             p.name AS platform_name
      FROM webinars w
      LEFT JOIN webinar_platforms p 
        ON w.platform = p.webinar_platforms_id
      ORDER BY w.timestamp DESC
    `);

    const webinarsWithPhoto = rows.map((w) => {
      let photoFile = w.photo || null;
      if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");

      return {
        ...w,
        photo: photoFile
          ? `https://wablp.com/admin/webinars_photos/${photoFile}`
          : null,
      };
    });

    res.json(webinarsWithPhoto);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ error: "Failed to fetch webinars" });
  }
});

// ✅ Fetch single webinar by ID (minimal safe version)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT w.webinars_id, 
              w.name, 
              w.photo, 
              w.timestamp, 
              w.date_time,
              p.name AS platform_name
       FROM webinars w
       LEFT JOIN webinar_platforms p 
         ON w.platform = p.webinar_platforms_id
       WHERE w.webinars_id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    let webinar = rows[0];

    // ✅ Fix photo path
    let photoFile = webinar.photo || null;
    if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");
    webinar.photo = photoFile
      ? `https://wablp.com/admin/webinars_photos/${photoFile}`
      : null;

    res.json(webinar);
  } catch (error) {
    console.error("Error fetching webinar:", error);
    res.status(500).json({ error: "Failed to fetch webinar" });
  }
});

// ✅ Create a new webinar
router.post("/", async (req, res) => {
  try {
    const { name, photo, timestamp, platform } = req.body;

    if (!name || !photo || !timestamp || !platform) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await db.execute(
      "INSERT INTO webinars (name, photo, timestamp, platform) VALUES (?, ?, ?, ?)",
      [name, photo, timestamp, platform]
    );

    res
      .status(201)
      .json({ message: "Webinar created", webinarId: result.insertId });
  } catch (error) {
    console.error("Error creating webinar:", error);
    res.status(500).json({ error: "Failed to create webinar" });
  }
});

// ✅ Update a webinar
router.put("/:id", async (req, res) => {
  try {
    const { name, photo, timestamp, platform } = req.body;

    const [result] = await db.execute(
      "UPDATE webinars SET name = ?, photo = ?, timestamp = ?, platform = ? WHERE webinars_id = ?",
      [name, photo, timestamp, platform, req.params.id]
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
    const [result] = await db.execute(
      "DELETE FROM webinars WHERE webinars_id = ?",
      [req.params.id]
    );

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
// const db = require("../config/db"); // ✅ your promise-based pool

// // ✅ Fetch all webinar platforms
// router.get("/platforms", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       "SELECT webinar_platforms_id, name FROM webinar_platforms ORDER BY name ASC"
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching platforms:", error);
//     res.status(500).json({ error: "Failed to fetch platforms" });
//   }
// });

// // ✅ Fetch all webinars (summary list)
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.execute(`
//       SELECT w.webinars_id, 
//              w.name, 
//              w.photo, 
//              w.timestamp, 
//              p.name AS platform_name
//       FROM webinars w
//       LEFT JOIN webinar_platforms p 
//         ON w.platform = p.webinar_platforms_id
//       ORDER BY w.timestamp DESC
//     `);

//     const webinarsWithPhoto = rows.map((w) => {
//       let photoFile = w.photo || null;
//       if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");

//       return {
//         ...w,
//         photo: photoFile
//           ? `https://wablp.com/admin/webinars_photos/${photoFile}`
//           : null,
//       };
//     });

//     res.json(webinarsWithPhoto);
//   } catch (error) {
//     console.error("Error fetching webinars:", error);
//     res.status(500).json({ error: "Failed to fetch webinars" });
//   }
// });

// // ✅ Fetch single webinar by ID (full details)
// router.get("/:id", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       `SELECT w.webinars_id, 
//               w.name, 
//               w.photo, 
//               w.timestamp, 
//               w.platform, 
//               w.date_time,
//               w.description,
//               w.details,
//               w.document,
//               w.links,
//               w.meeting_id,
//               w.password,
//               w.link,
//               p.name AS platform_name
//        FROM webinars w
//        LEFT JOIN webinar_platforms p 
//          ON w.platform = p.webinar_platforms_id
//        WHERE w.webinars_id = ?`,
//       [req.params.id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     let webinar = rows[0];

//     // ✅ Fix photo path
//     let photoFile = webinar.photo || null;
//     if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");
//     webinar.photo = photoFile
//       ? `https://wablp.com/admin/webinars_photos/${photoFile}`
//       : null;

//     // ✅ Fix document path (if it exists)
//     if (webinar.document) {
//       webinar.document = `https://wablp.com/admin/${webinar.document}`;
//     }

//     res.json(webinar);
//   } catch (error) {
//     console.error("Error fetching webinar:", error);
//     res.status(500).json({ error: "Failed to fetch webinar" });
//   }
// });

// // ✅ Create a new webinar
// router.post("/", async (req, res) => {
//   try {
//     const { name, photo, timestamp, platform } = req.body;

//     if (!name || !photo || !timestamp || !platform) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const [result] = await db.execute(
//       "INSERT INTO webinars (name, photo, timestamp, platform) VALUES (?, ?, ?, ?)",
//       [name, photo, timestamp, platform]
//     );

//     res
//       .status(201)
//       .json({ message: "Webinar created", webinarId: result.insertId });
//   } catch (error) {
//     console.error("Error creating webinar:", error);
//     res.status(500).json({ error: "Failed to create webinar" });
//   }
// });

// // ✅ Update a webinar
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, photo, timestamp, platform } = req.body;

//     const [result] = await db.execute(
//       "UPDATE webinars SET name = ?, photo = ?, timestamp = ?, platform = ? WHERE webinars_id = ?",
//       [name, photo, timestamp, platform, req.params.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     res.json({ message: "Webinar updated" });
//   } catch (error) {
//     console.error("Error updating webinar:", error);
//     res.status(500).json({ error: "Failed to update webinar" });
//   }
// });

// // ✅ Delete a webinar
// router.delete("/:id", async (req, res) => {
//   try {
//     const [result] = await db.execute(
//       "DELETE FROM webinars WHERE webinars_id = ?",
//       [req.params.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     res.json({ message: "Webinar deleted" });
//   } catch (error) {
//     console.error("Error deleting webinar:", error);
//     res.status(500).json({ error: "Failed to delete webinar" });
//   }
// });

// module.exports = router;















// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // ✅ your promise-based pool

// // ✅ Fetch all webinar platforms
// router.get("/platforms", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       "SELECT webinar_platforms_id, name FROM webinar_platforms ORDER BY name ASC"
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching platforms:", error);
//     res.status(500).json({ error: "Failed to fetch platforms" });
//   }
// });

// // ✅ Fetch all webinars
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.execute(`
//       SELECT w.webinars_id, w.name, w.photo, w.timestamp, p.name AS platform
//       FROM webinars w
//       LEFT JOIN webinar_platforms p ON w.platform = p.webinar_platforms_id
//       ORDER BY w.timestamp DESC
//     `);

//     const webinarsWithPhoto = rows.map((w) => {
//       let photoFile = w.photo || null;
//       if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");

//       return {
//         ...w,
//         photo: photoFile
//           ? `https://wablp.com/admin/webinars_photos/${photoFile}`
//           : null,
//       };
//     });

//     res.json(webinarsWithPhoto);
//   } catch (error) {
//     console.error("Error fetching webinars:", error);
//     res.status(500).json({ error: "Failed to fetch webinars" });
//   }
// });

// // ✅ Fetch single webinar by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const [rows] = await db.execute(
//       `SELECT w.webinars_id, w.name, w.photo, w.timestamp, p.name AS platform
//        FROM webinars w
//        LEFT JOIN webinar_platforms p ON w.platform = p.webinar_platforms_id
//        WHERE w.webinars_id = ?`,
//       [req.params.id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     let webinar = rows[0];
//     let photoFile = webinar.photo || null;
//     if (photoFile) photoFile = photoFile.replace(/^webinars_photos\//, "");

//     webinar.photo = photoFile
//       ? `https://wablp.com/admin/webinars_photos/${photoFile}`
//       : null;

//     res.json(webinar);
//   } catch (error) {
//     console.error("Error fetching webinar:", error);
//     res.status(500).json({ error: "Failed to fetch webinar" });
//   }
// });

// // ✅ Create a new webinar
// router.post("/", async (req, res) => {
//   try {
//     const { name, photo, timestamp, platform } = req.body;

//     if (!name || !photo || !timestamp || !platform) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const [result] = await db.execute(
//       "INSERT INTO webinars (name, photo, timestamp, platform) VALUES (?, ?, ?, ?)",
//       [name, photo, timestamp, platform]
//     );

//     res.status(201).json({ message: "Webinar created", webinarId: result.insertId });
//   } catch (error) {
//     console.error("Error creating webinar:", error);
//     res.status(500).json({ error: "Failed to create webinar" });
//   }
// });

// // ✅ Update a webinar
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, photo, timestamp, platform } = req.body;

//     const [result] = await db.execute(
//       "UPDATE webinars SET name = ?, photo = ?, timestamp = ?, platform = ? WHERE webinars_id = ?",
//       [name, photo, timestamp, platform, req.params.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     res.json({ message: "Webinar updated" });
//   } catch (error) {
//     console.error("Error updating webinar:", error);
//     res.status(500).json({ error: "Failed to update webinar" });
//   }
// });

// // ✅ Delete a webinar
// router.delete("/:id", async (req, res) => {
//   try {
//     const [result] = await db.execute("DELETE FROM webinars WHERE webinars_id = ?", [req.params.id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Webinar not found" });
//     }

//     res.json({ message: "Webinar deleted" });
//   } catch (error) {
//     console.error("Error deleting webinar:", error);
//     res.status(500).json({ error: "Failed to delete webinar" });
//   }
// });

// module.exports = router;
