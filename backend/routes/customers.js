const express = require("express");
const router = express.Router();
const { db } = require("../config/db"); // ✅ pooled MySQL only
const { uploadToFTP } = require("../config/ftp"); // ✅ FTP helper
const multer = require("multer");
const path = require("path");
const { countryNames } = require("../utils/CountryNames");

// ✅ Use memory storage for FTP upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Normalize customer data
function normalizeCustomer(customer) {
  let photoFile = customer.photo || null;

  if (photoFile) {
    photoFile = photoFile.replace(/^jtps_photos\//, "").replace(/^\/+/, "");
  }

  return {
    ...customer,
    portfolio: customer.portfolio ? customer.portfolio.toString() : "",
    education_level: customer.education_level
      ? customer.education_level.toString()
      : "",
    description: customer.description ? customer.description.toString() : "",
    about_me: customer.about_me ? customer.about_me.toString() : "",
    country:
      customer.country && countryNames[customer.country]
        ? countryNames[customer.country]
        : customer.country,
    photo: photoFile
      ? `https://wablp.com/admin/jtps_photos/${photoFile}`
      : null,
  };
}

// ✅ Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query(
      "SELECT * FROM customers WHERE customers_id = ?",
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(normalizeCustomer(results[0]));
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Update customer by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "email",
      "phone",
      "country",
      "specialties",
      "language",
      "joined_as",
      "company_name",
      "about_me",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const sql = `
      UPDATE customers
      SET ${Object.keys(updates).map((f) => `${f}=?`).join(", ")}
      WHERE customers_id=?
    `;
    const values = [...Object.values(updates), id];

    await db.query(sql, values);

    // Return updated record
    const [results] = await db.query(
      "SELECT * FROM customers WHERE customers_id = ?",
      [id]
    );

    res.json(normalizeCustomer(results[0]));
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Upload profile photo (FTP + DB save)
router.post(
  "/:id/upload-profile-photo",
  upload.single("photo"),
  async (req, res) => {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = Date.now() + path.extname(req.file.originalname);
    const remotePath = `/public_html/admin/jtps_photos/${filename}`;

    try {
      // ✅ Upload file buffer to FTP
      await uploadToFTP(req.file.buffer, remotePath);

      // ✅ Save filename in DB
      await db.query(
        "UPDATE customers SET photo = ? WHERE customers_id = ?",
        [filename, id]
      );

      const photoUrl = `https://wablp.com/admin/jtps_photos/${filename}`;
      res.json({ STATUS: "SUCC", MESSAGE: "Photo uploaded", photoUrl });
    } catch (err) {
      console.error("FTP Upload Error:", err);
      res.status(500).json({ error: "Failed to upload image via FTP" });
    }
  }
);

module.exports = router;




























// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // MySQL connection file
// const multer = require("multer");
// const path = require("path");
// const ftp = require("basic-ftp"); // ✅ FTP client
// const { countryNames } = require("../utils/CountryNames");

// // ✅ Use memory storage (keep file in memory for FTP upload)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ✅ Helper to normalize photo path and customer data
// function normalizeCustomer(customer) {
//   let photoFile = customer.photo || null;

//   if (photoFile) {
//     // Remove duplicate folder name if already included in DB
//     photoFile = photoFile.replace(/^jtps_photos\//, "");
//     photoFile = photoFile.replace(/^\/+/, ""); // remove leading slashes
//   }

//   return {
//     ...customer,
//     portfolio: customer.portfolio ? customer.portfolio.toString() : "",
//     education_level: customer.education_level
//       ? customer.education_level.toString()
//       : "",
//     description: customer.description ? customer.description.toString() : "",
//     about_me: customer.about_me ? customer.about_me.toString() : "",
//     country:
//       customer.country && countryNames[customer.country]
//         ? countryNames[customer.country] // ✅ full country name
//         : customer.country, // fallback
//     photo: photoFile
//       ? `https://wablp.com/admin/jtps_photos/${photoFile}`
//       : null, // ✅ clean full photo URL
//   };
// }

// // ✅ Get customer by ID
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "SELECT * FROM customers WHERE customers_id = ?",
//     [id],
//     (err, results) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       if (results.length === 0) {
//         return res.status(404).json({ error: "Customer not found" });
//       }

//       res.json(normalizeCustomer(results[0]));
//     }
//   );
// });

// // ✅ Update customer by ID (ignores unexpected fields safely)
// router.put("/:id", (req, res) => {
//   const { id } = req.params;

//   const allowedFields = [
//     "name",
//     "email",
//     "phone",
//     "country",
//     "specialties",
//     "language",
//     "joined_as",
//     "company_name",
//     "about_me",
//   ];

//   const updates = {};
//   allowedFields.forEach((field) => {
//     if (req.body[field] !== undefined) {
//       updates[field] = req.body[field];
//     }
//   });

//   if (Object.keys(updates).length === 0) {
//     return res.status(400).json({ error: "No valid fields to update" });
//   }

//   const sql = `
//     UPDATE customers
//     SET ${Object.keys(updates)
//       .map((f) => `${f}=?`)
//       .join(", ")}
//     WHERE customers_id=?
//   `;
//   const values = [...Object.values(updates), id];

//   db.query(sql, values, (err) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     db.query(
//       "SELECT * FROM customers WHERE customers_id = ?",
//       [id],
//       (err2, results) => {
//         if (err2) {
//           console.error("DB Error:", err2);
//           return res.status(500).json({ error: "Database error" });
//         }
//         res.json(normalizeCustomer(results[0]));
//       }
//     );
//   });
// });

// // ✅ Upload profile photo (FTP to cPanel)
// router.post("/:id/upload-profile-photo", upload.single("photo"), async (req, res) => {
//   const { id } = req.params;
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filename = Date.now() + path.extname(req.file.originalname);

//   try {
//     const client = new ftp.Client();
//     client.ftp.verbose = false;

//     await client.access({
//       host: process.env.FTP_HOST,
//       user: process.env.FTP_USER,
//       password: process.env.FTP_PASSWORD,
//       secure: false, // set to true if your FTP uses TLS/SSL
//     });

//     // ✅ Upload to cPanel folder (adjust path if needed)
//     await client.uploadFrom(
//       req.file.buffer,
//       `/public_html/admin/jtps_photos/${filename}`
//     );

//     client.close();

//     // ✅ Save filename in DB
//     db.query(
//       "UPDATE customers SET photo = ? WHERE customers_id = ?",
//       [filename, id],
//       (err) => {
//         if (err) {
//           console.error("DB Error:", err);
//           return res.status(500).json({ error: "Database error" });
//         }

//         const photoUrl = `https://wablp.com/admin/jtps_photos/${filename}`;
//         res.json({ STATUS: "SUCC", MESSAGE: "Photo uploaded", photoUrl });
//       }
//     );
//   } catch (err) {
//     console.error("FTP Upload Error:", err);
//     res.status(500).json({ error: "Failed to upload image via FTP" });
//   }
// });

// module.exports = router;


























// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // MySQL connection file
// const multer = require("multer");
// const path = require("path");
// const { countryNames } = require("../utils/CountryNames"); // ✅ import country map

// // ✅ Multer storage for profile photos (store filename only)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads/jtps_photos")); // local uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // ✅ Helper to normalize photo path and customer data
// function normalizeCustomer(customer) {
//   let photoFile = customer.photo || null;

//   if (photoFile) {
//     // Remove duplicate folder name if already included in DB
//     photoFile = photoFile.replace(/^jtps_photos\//, "");
//     // Remove leading slashes
//     photoFile = photoFile.replace(/^\/+/, "");
//   }

//   return {
//     ...customer,
//     portfolio: customer.portfolio ? customer.portfolio.toString() : "",
//     education_level: customer.education_level
//       ? customer.education_level.toString()
//       : "",
//     description: customer.description ? customer.description.toString() : "",
//     about_me: customer.about_me ? customer.about_me.toString() : "",
//     country:
//       customer.country && countryNames[customer.country]
//         ? countryNames[customer.country] // ✅ full country name
//         : customer.country, // fallback
//     photo: photoFile
//       ? `https://wablp.com/admin/jtps_photos/${photoFile}`
//       : null, // ✅ clean full photo URL
//   };
// }

// // ✅ Get customer by ID
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "SELECT * FROM customers WHERE customers_id = ?",
//     [id],
//     (err, results) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       if (results.length === 0) {
//         return res.status(404).json({ error: "Customer not found" });
//       }

//       res.json(normalizeCustomer(results[0]));
//     }
//   );
// });

// // ✅ Update customer by ID (ignores unexpected fields safely)
// router.put("/:id", (req, res) => {
//   const { id } = req.params;

//   // Only allow these fields to be updated
//   const allowedFields = [
//     "name",
//     "email",
//     "phone",
//     "country",
//     "specialties",
//     "language",
//     "joined_as",
//     "company_name",
//     "about_me",
//   ];

//   const updates = {};
//   allowedFields.forEach((field) => {
//     if (req.body[field] !== undefined) {
//       updates[field] = req.body[field];
//     }
//   });

//   if (Object.keys(updates).length === 0) {
//     return res.status(400).json({ error: "No valid fields to update" });
//   }

//   // Build SQL dynamically
//   const sql = `
//     UPDATE customers
//     SET ${Object.keys(updates)
//       .map((f) => `${f}=?`)
//       .join(", ")}
//     WHERE customers_id=?
//   `;
//   const values = [...Object.values(updates), id];

//   db.query(sql, values, (err) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     // Fetch updated customer to return
//     db.query(
//       "SELECT * FROM customers WHERE customers_id = ?",
//       [id],
//       (err2, results) => {
//         if (err2) {
//           console.error("DB Error:", err2);
//           return res.status(500).json({ error: "Database error" });
//         }
//         res.json(normalizeCustomer(results[0]));
//       }
//     );
//   });
// });

// // ✅ Upload profile photo
// router.post("/:id/upload-profile-photo", upload.single("photo"), (req, res) => {
//   const { id } = req.params;
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filename = req.file.filename;

//   db.query(
//     "UPDATE customers SET photo = ? WHERE customers_id = ?",
//     [filename, id],
//     (err) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }

//       const photoUrl = `https://wablp.com/admin/jtps_photos/${filename}`;
//       res.json({ STATUS: "SUCC", MESSAGE: "Photo uploaded", photoUrl });
//     }
//   );
// });

// module.exports = router;

