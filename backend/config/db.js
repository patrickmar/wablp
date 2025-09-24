require("dotenv").config();
const mysql = require("mysql2");

const isProduction = process.env.NODE_ENV === "production";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // adjust as needed
  queueLimit: 0,
};

const db = mysql.createPool(dbConfig);

// Optional: Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log(
      `Database connected: ${isProduction ? "Remote DB (Render)" : "Local DB"}`
    );
    connection.release(); // release connection back to pool
  }
});

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
