const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key"; // change this to something strong

// 📝 Register
router.post("/register", (req, res) => {
  const { name, email, phone, joined_as, how_did_you_hear, password, } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Check if email exists
  db.query("SELECT * FROM customers WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    db.query(
      "INSERT INTO customers (name, email, phone, joined_as, how_did_you_hear, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, joined_as, how_did_you_hear, hashedPassword],
      (err) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ msg: "User registered successfully" });
      }
    );
  });
});


// 🔑 Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email & password required" });
  }

  db.query("SELECT * FROM customers WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ msg: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const user = result[0];
    let isMatch = false;

    try {
      if (user.password.startsWith("$2")) {
        // ✅ already bcrypt hashed
        isMatch = await bcrypt.compare(password, user.password);
      } else {
        // ❌ plain text fallback
        isMatch = password === user.password;

        if (isMatch) {
          // 🔄 Rehash and update DB so next login uses bcrypt
          const newHashed = await bcrypt.hash(password, 10);
          db.query(
            "UPDATE customers SET password = ? WHERE customers_id = ?",
            [newHashed, user.id],
            (updateErr) => {
              if (updateErr) {
                console.error(`Failed to rehash password for user ${user.id}:`, updateErr);
              } else {
                console.log(`✅ User ${user.id} password upgraded to bcrypt.`);
              }
            }
          );
        }
      }
    } catch (e) {
      console.error("Password check error:", e);
      return res.status(500).json({ msg: "Password check failed" });
    }

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Remove password before sending user object
    const { password: _, ...safeUser } = user;

    return res.json({
      msg: "Login successful",
      token,
      user: {
    customers_id: safeUser.customers_id, // <-- important
    name: safeUser.name,
    email: safeUser.email,
    // any other fields you want to store
  },
    });
  });
});




// // 🔑 Login
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ msg: "Email & password required" });
//   }

//   db.query("SELECT * FROM customers WHERE email = ?", [email], async (err, result) => {
//     if (err) return res.status(500).json(err);
//     if (result.length === 0) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const user = result[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // Create JWT
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     return res.json({ msg: "Login successful", token });
//   });
// });

module.exports = router;
