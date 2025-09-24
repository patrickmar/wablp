require("dotenv").config();
const mysql = require("mysql2");

// ✅ Remote Database Config (Render)
const dbConfig = {
  host: process.env.DB_HOST,       // e.g., your Render DB host
  user: process.env.DB_USER,       // e.g., your DB username
  password: process.env.DB_PASSWORD, // e.g., your DB password
  database: process.env.DB_NAME,   // e.g., your DB name
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 3,  // Adjust as needed
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true, // Render requires secure SSL
  },
};

// ✅ Create pool and wrap with promise API
const pool = mysql.createPool(dbConfig);
const db = pool.promise();

// ✅ Test connection once on startup
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Remote Database connected successfully (Render)");
    connection.release();
  } catch (err) {
    console.error("❌ Remote Database connection failed:", err.message);
  }
})();

module.exports = db;












// require('dotenv').config();
// const mysql = require('mysql2');

// const isProduction = process.env.NODE_ENV === 'production';

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306
// };

// // EXTERNAL_UPLOADS_PATH=process.env.EXTERNAL_UPLOADS_PATH;
// const db = mysql.createConnection(dbConfig);

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log(`Database connected: ${isProduction ? 'Remote DB (Render)' : 'Local DB'}`);
//   }
// });

// module.exports = db;










// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "judesco",         // change if needed
//   password: "jesusislord",         // add your MySQL password if you set one
//   database: "wablp",   // change to your actual database name
//   charset: "utf8mb4"  // ✅ correct charset for full UTF-8
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL database");
//   }
// });

// module.exports = db;
