const express = require("express");
const router = express.Router();
const db = require("../config/db"); // MySQL connection file

// ✅ Helper to convert Buffer fields to strings
function normalizeCustomer(customer) {
  return {
    ...customer,
    portfolio: customer.portfolio ? customer.portfolio.toString() : "",
    education_level: customer.education_level ? customer.education_level.toString() : "",
    description: customer.description ? customer.description.toString() : "",
    about_me: customer.about_me ? customer.about_me.toString() : "", // ensure safe string
  };
}

// ✅ Get customer by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE customers_id = ?", [id], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(normalizeCustomer(results[0]));
  });
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
    SET ${Object.keys(updates).map((f) => `${f}=?`).join(", ")}
    WHERE customers_id=?
  `;
  const values = [...Object.values(updates), id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Fetch updated customer to return
    db.query("SELECT * FROM customers WHERE customers_id = ?", [id], (err2, results) => {
      if (err2) {
        console.error("DB Error:", err2);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(normalizeCustomer(results[0]));
    });
  });
});

module.exports = router;














// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // this is your MySQL connection file

// // ✅ Get customer by ID
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("SELECT * FROM customers WHERE customers_id = ?", [id], (err, results) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Customer not found" });
//     }
//     res.json(results[0]);
//   });
// });

// // ✅ Update customer by ID
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     email,
//     phone,
//     country,
//     specialties,
//     language,
//     joined_as,
//     company_name,
//     business_description,
//   } = req.body;

//   const sql = `
//     UPDATE customers
//     SET name=?, email=?, phone=?, country=?, specialties=?, language=?, joined_as=?, company_name=?, business_description=?
//     WHERE customers_id=?
//   `;

//   db.query(
//     sql,
//     [
//       name,
//       email,
//       phone,
//       country,
//       specialties,
//       language,
//       joined_as,
//       company_name,
//       business_description,
//       id,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ message: "Profile updated successfully" });
//     }
//   );
// });

// module.exports = router;
