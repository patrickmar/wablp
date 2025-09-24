const express = require("express");
const router = express.Router();
const db = require("../config/db"); // MySQL connection file
const multer = require("multer");
const path = require("path");
const { countryNames } = require("../utils/CountryNames"); // ✅ import country map

// ✅ Multer storage for profile photos (store filename only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/jtps_photos")); // local uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Helper to normalize photo path and customer data
function normalizeCustomer(customer) {
  let photoFile = customer.photo || null;

  if (photoFile) {
    // Remove duplicate folder name if already included in DB
    photoFile = photoFile.replace(/^jtps_photos\//, "");
    // Remove leading slashes
    photoFile = photoFile.replace(/^\/+/, "");
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
        ? countryNames[customer.country] // ✅ full country name
        : customer.country, // fallback
    photo: photoFile
      ? `https://wablp.com/admin/jtps_photos/${photoFile}`
      : null, // ✅ clean full photo URL
  };
}

// ✅ Get customer by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM customers WHERE customers_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.json(normalizeCustomer(results[0]));
    }
  );
});

// ✅ Update customer by ID (ignores unexpected fields safely)
router.put("/:id", (req, res) => {
  const { id } = req.params;

  // Only allow these fields to be updated
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

  // Build SQL dynamically
  const sql = `
    UPDATE customers
    SET ${Object.keys(updates)
      .map((f) => `${f}=?`)
      .join(", ")}
    WHERE customers_id=?
  `;
  const values = [...Object.values(updates), id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Fetch updated customer to return
    db.query(
      "SELECT * FROM customers WHERE customers_id = ?",
      [id],
      (err2, results) => {
        if (err2) {
          console.error("DB Error:", err2);
          return res.status(500).json({ error: "Database error" });
        }
        res.json(normalizeCustomer(results[0]));
      }
    );
  });
});

// ✅ Upload profile photo
router.post("/:id/upload-profile-photo", upload.single("photo"), (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filename = req.file.filename;

  db.query(
    "UPDATE customers SET photo = ? WHERE customers_id = ?",
    [filename, id],
    (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      const photoUrl = `https://wablp.com/admin/jtps_photos/${filename}`;
      res.json({ STATUS: "SUCC", MESSAGE: "Photo uploaded", photoUrl });
    }
  );
});

module.exports = router;










// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // MySQL connection file
// const multer = require("multer");
// const path = require("path");
// const { countryNames } = require("../utils/CountryNames"); // ✅ import country map

// // ✅ Multer storage for profile photos (jtps_photos folder)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join("https://wablp.com/admin/jtps_photos")); // <-- absolute path to your folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // ✅ Helper to convert Buffer fields to strings + include photo URL + map country
// function normalizeCustomer(customer) {
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
//     photo: customer.photo
//       ? `https://wablp.com/admin/jtps_photos/${customer.photo}`
//       : null, // ✅ full photo URL
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
//   const photoUrl = `https://wablp.com/admin/jtps_photos/${filename}`; // ✅ served path

//   db.query(
//     "UPDATE customers SET photo = ? WHERE customers_id = ?",
//     [filename, id],
//     (err) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ STATUS: "SUCC", MESSAGE: "Photo uploaded", photoUrl });
//     }
//   );
// });

// module.exports = router;
