require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,      // e.g. mysql.yourdomain.com
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5,   // bump a bit for safety
  queueLimit: 0,
  ssl: false,           // ✅ keep false for cPanel
};

const pool = mysql.createPool(dbConfig);
const db = pool.promise();

// ✅ Test + auto-reconnect logging
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Remote DB connected (cPanel, no SSL)");
    connection.release();
  } catch (err) {
    console.error("❌ Remote Database connection failed:", err.message);
  }
})();

// ✅ Keepalive to prevent idle disconnects
setInterval(async () => {
  try {
    await db.query("SELECT 1");
    console.log("🔄 DB keepalive OK");
  } catch (e) {
    console.error("⚠️ DB keepalive failed:", e.message);
  }
}, 60000); // every 1 min

module.exports = db;













// require("dotenv").config();
// const mysql = require("mysql2");

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 3, // keep small to avoid max_user_connections
//   queueLimit: 0,

//   // 🚨 Force disable SSL so handshake works with cPanel/cheap hosts
//   ssl: false,
// };

// // Create a pool and wrap with promise API
// const pool = mysql.createPool(dbConfig);
// const db = pool.promise();

// // Optional: Test connection
// (async () => {
//   try {
//     const connection = await db.getConnection();
//     console.log(`✅ Remote DB connected (No SSL)`);
//     connection.release();
//   } catch (err) {
//     console.error("❌ Remote Database connection failed:", err.message);
//   }
// })();

// module.exports = db;
