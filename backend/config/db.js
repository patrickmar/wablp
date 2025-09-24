require("dotenv").config();
const mysql = require("mysql2");
const ftp = require("basic-ftp");

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

// Create a pool and wrap with promise API
const pool = mysql.createPool(dbConfig);
const db = pool.promise();

// Optional: Test connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log(
      `Database connected: ${isProduction ? "Remote DB (Render)" : "Local DB"}`
    );
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

// =========================
// FTP CONFIG + UPLOAD HELPER
// =========================
const FTP_HOST = process.env.FTP_HOST || "ftp.wablp.com";
const FTP_USER = process.env.FTP_USER || "wablp";
const FTP_PASSWORD = process.env.FTP_PASSWORD || "Supp0rt@W@b1";
const FTP_PORT = process.env.FTP_PORT || 21;

async function uploadToFTP(localFilePath, remoteFilePath) {
  const client = new ftp.Client();
  client.ftp.verbose = true; // log FTP commands for debugging
  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: false, // set to true if using FTPS
    });

    console.log(`Connected to FTP: ${FTP_HOST}`);
    await client.uploadFrom(localFilePath, remoteFilePath);
    console.log(`✅ Uploaded: ${localFilePath} → ${remoteFilePath}`);
  } catch (err) {
    console.error("❌ FTP Upload Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports = { db, uploadToFTP };













// require("dotenv").config();
// const mysql = require("mysql2");

// const isProduction = process.env.NODE_ENV === "production";

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10, // adjust as needed
//   queueLimit: 0,
// };

// // Create a pool and wrap with promise API
// const pool = mysql.createPool(dbConfig);
// const db = pool.promise();

// // Optional: Test connection
// (async () => {
//   try {
//     const connection = await db.getConnection();
//     console.log(
//       `Database connected: ${isProduction ? "Remote DB (Render)" : "Local DB"}`
//     );
//     connection.release();
//   } catch (err) {
//     console.error("Database connection failed:", err);
//   }
// })();

// module.exports = db;











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
