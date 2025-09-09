const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "judesco",         // change if needed
  password: "jesusislord",         // add your MySQL password if you set one
  database: "wablp",   // change to your actual database name
  charset: "utf8mb4"  // ✅ correct charset for full UTF-8
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;
