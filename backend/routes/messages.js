// routes/messages.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

// ✅ Send a new message
router.post("/send", (req, res) => {
  const { sender, client, text } = req.body;

  if (!sender || !client || !text) {
    return res.status(400).json({ error: "sender, client and text are required" });
  }

  const query = `
    INSERT INTO chat (sender, client, text, timestamp)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [sender, client, text], (err, result) => {
    if (err) {
      console.error("❌ Error sending message:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, messageId: result.insertId });
  });
});

module.exports = router;
