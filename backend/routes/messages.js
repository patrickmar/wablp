// routes/messages.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { sendNotificationEmail } = require("../config/email");

// ✅ Get chat messages between two users
router.get("/", (req, res) => {
  const { sender, client } = req.query;

  if (!sender || !client) {
    return res.status(400).json({ error: "sender and client are required" });
  }

  const query = `
    SELECT m.chat_id, m.sender, m.client, m.text, m.timestamp
    FROM chat m
    WHERE (m.sender= ? AND m.client = ?)
       OR (m.sender = ? AND m.client = ?)
    ORDER BY m.timestamp ASC
  `;

  db.query(query, [sender, client, client, sender], (err, results) => {
    if (err) {
      console.error("❌ Error fetching messages:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Send a new message + send email notification
router.post("/send", (req, res) => {
  const { sender, client, text } = req.body;

  if (!sender || !client || !text) {
    return res.status(400).json({ error: "sender, client and text are required" });
  }

  const insertQuery = `
    INSERT INTO chat (sender, client, text, timestamp)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(insertQuery, [sender, client, text], async (err, result) => {
    if (err) {
      console.error("❌ Error sending message:", err);
      return res.status(500).json({ error: err.message });
    }

    // ✅ Fetch receiver email & sender name
    const userQuery = `
      SELECT 
        CONCAT(s.first_name, ' ', s.other_names) AS senderName,
        c.email AS clientEmail
      FROM users s, users c
      WHERE s.id = ? AND c.id = ?
      LIMIT 1
    `;

    db.query(userQuery, [sender, client], async (userErr, userResult) => {
      if (userErr) {
        console.error("⚠️ Error fetching user emails:", userErr);
        return res.json({ success: true, messageId: result.insertId });
      }

      if (userResult.length > 0) {
        const { senderName, clientEmail } = userResult[0];
        try {
          await sendNotificationEmail(
            clientEmail,
            senderName,
            "YourAppName", // change this to your app name
            "https://yourapp.com/chat", // or your app deep link
            text // message preview
          );
          console.log(`📧 Email sent to ${clientEmail} about new message from ${senderName}`);
        } catch (mailErr) {
          console.error("⚠️ Failed to send email:", mailErr);
        }
      }

      res.json({ success: true, messageId: result.insertId });
    });
  });
});

module.exports = router;



























// routes/messages.js
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // ✅ Get chat messages between two users
// router.get("/", (req, res) => {
//   const { sender, client } = req.query;

//   if (!sender || !client) {
//     return res.status(400).json({ error: "sender and client are required" });
//   }

//   const query = `
//     SELECT m.chat_id, m.sender, m.client, m.text, m.timestamp
//     FROM chat m
//     WHERE (m.sender= ? AND m.client = ?)
//        OR (m.sender = ? AND m.client = ?)
//     ORDER BY m.timestamp ASC
//   `;

//   db.query(query, [sender, client, client, sender], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching messages:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });

// // ✅ Send a new message
// router.post("/send", (req, res) => {
//   const { sender, client, text } = req.body;

//   if (!sender || !client || !text) {
//     return res.status(400).json({ error: "sender, client and text are required" });
//   }

//   const query = `
//     INSERT INTO chat (sender, client, text, timestamp)
//     VALUES (?, ?, ?, NOW())
//   `;

//   db.query(query, [sender, client, text], (err, result) => {
//     if (err) {
//       console.error("❌ Error sending message:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ success: true, messageId: result.insertId });
//   });
// });

// module.exports = router;
