const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const statsRoutes = require("./routes/stats");
const newsRoutes = require("./routes/news");
const newsfullRoutes = require("./routes/newsfull");
const customersRoutes = require("./routes/customers");
const businessRoutes = require("./routes/business");
const organizationRoutes = require("./routes/organizations");
const expertRoutes = require("./routes/expert");
const jobRoutes = require("./routes/jobs");
const webinarRoutes = require("./routes/webinars");
const tendersRoutes = require("./routes/tenders");
const projectsRoutes = require("./routes/projects");
const cataloguesRoutes = require("./routes/catalogues");
const ordersRoutes = require("./routes/orders");
const statusRoutes = require("./routes/status");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

// ✅ Test DB connection
app.get("/", (req, res) => {
  db.query("SELECT NOW() as now", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(`Database time: ${results[0].now}`);
  });
});

// ✅ External base (direct use, no proxy)
const externalBase = "https://wablp.com/admin";
console.log("🌍 Using direct external image base:", externalBase);

// ✅ Local fallback for default.jpg or missing images
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/routes", statsRoutes);
app.use("/routes/news", newsRoutes);
app.use("/routes/newsfull", newsfullRoutes);
app.use("/routes/customers", customersRoutes);
app.use("/routes/business", businessRoutes);
app.use("/routes/organizations", organizationRoutes);
app.use("/routes/experts", expertRoutes);
app.use("/routes/jobs", jobRoutes);
app.use("/routes/webinars", webinarRoutes);
app.use("/routes/tenders", tendersRoutes);
app.use("/routes/projects", projectsRoutes);
app.use("/routes/catalogues", cataloguesRoutes);
app.use("/routes/orders", ordersRoutes);
app.use("/routes/status", statusRoutes);
app.use("/routes/messages", messageRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);























// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const db = require("./config/db");

// // Routes
// const authRoutes = require("./routes/auth");
// const dashboardRoutes = require("./routes/dashboard");
// const statsRoutes = require("./routes/stats");
// const newsRoutes = require("./routes/news");
// const newsfullRoutes = require("./routes/newsfull");
// const customersRoutes = require("./routes/customers");
// const businessRoutes = require("./routes/business");
// const organizationRoutes = require("./routes/organizations");
// const expertRoutes = require("./routes/expert");
// const jobRoutes = require("./routes/jobs");
// const webinarRoutes = require("./routes/webinars");
// const tendersRoutes = require("./routes/tenders");
// const projectsRoutes = require("./routes/projects");
// const cataloguesRoutes = require("./routes/catalogues");
// const ordersRoutes = require("./routes/orders");
// const statusRoutes = require("./routes/status");
// const messageRoutes = require("./routes/messages");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// require("dotenv").config();

// // ✅ Test DB connection
// app.get("/", (req, res) => {
//   db.query("SELECT NOW() as now", (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.send(`Database time: ${results[0].now}`);
//   });
// });

// // ✅ External base (instead of local C:/xampp path)
// const externalBase = "https://wablp.com/admin";
// console.log("🌍 Using external image base:", externalBase);

// // ✅ Proxy routes for external images
// app.use(
//   "/external/posts_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/posts_photos": "/posts_photos" },
//     onProxyReq: (proxyReq, req) => {
//       console.log("➡️ Proxy request:", req.url);
//     },
//   })
// );

// app.use(
//   "/external/jobs_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/jobs_photos": "/jobs_photos" },
//   })
// );

// app.use(
//   "/external/webinars_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/webinars_photos": "/webinars_photos" },
//   })
// );

// app.use(
//   "/external/projects_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/projects_photos": "/projects_photos" },
//   })
// );

// app.use(
//   "/external/products_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/products_photos": "/products_photos" },
//   })
// );

// app.use(
//   "/external/jtps_photos",
//   createProxyMiddleware({
//     target: externalBase,
//     changeOrigin: true,
//     pathRewrite: { "^/external/jtps_photos": "/jtps_photos" },
//   })
// );

// // ✅ Local fallback (default.jpg, etc.)
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// // ✅ API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/routes", statsRoutes);
// app.use("/routes/news", newsRoutes);
// app.use("/routes/newsfull", newsfullRoutes);
// app.use("/routes/customers", customersRoutes);
// app.use("/routes/business", businessRoutes);
// app.use("/routes/organizations", organizationRoutes);
// app.use("/routes/experts", expertRoutes);
// app.use("/routes/jobs", jobRoutes);
// app.use("/routes/webinars", webinarRoutes);
// app.use("/routes/tenders", tendersRoutes);
// app.use("/routes/projects", projectsRoutes);
// app.use("/routes/catalogues", cataloguesRoutes);
// app.use("/routes/orders", ordersRoutes);
// app.use("/routes/status", statusRoutes);
// app.use("/routes/messages", messageRoutes);

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );













// LOCAL VERSION WITHOUT PROXY (for reference)


// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const fs = require("fs");
// // const db = require("../config/db");


// const authRoutes = require("./routes/auth");
// const dashboardRoutes = require("./routes/dashboard");
// const statsRoutes = require("./routes/stats");
// const newsRoutes = require("./routes/news");
// const newsfullRoutes = require("./routes/newsfull");
// const customersRoutes = require("./routes/customers");
// const businessRoutes = require("./routes/business");
// const organizationRoutes = require("./routes/organizations");
// const expertRoutes = require("./routes/expert");
// const jobRoutes = require("./routes/jobs");
// const webinarRoutes = require("./routes/webinars");
// const tendersRoutes = require("./routes/tenders");
// const projectsRoutes = require("./routes/projects");
// const cataloguesRoutes = require("./routes/catalogues");
// const ordersRoutes = require("./routes/orders");
// const statusRoutes = require("./routes/status");
// const messageRoutes = require("./routes/messages");
// const db = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// require('dotenv').config();


// app.get('/', (req, res) => {
//   db.query('SELECT NOW() as now', (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.send(`Database time: ${results[0].now}`);
//   });
// });


// // Path to your XAMPP uploads folder
// const EXTERNAL_UPLOADS =`C:/xampp/htdocs/Wablp/admin`; // Adjust this path as needed
// console.log("Using EXTERNAL_UPLOADS path:", EXTERNAL_UPLOADS);

// // Serve real uploaded photos (only if the folder exists)
// if (fs.existsSync(EXTERNAL_UPLOADS)) {
//   console.log("✅ Serving images from:", EXTERNAL_UPLOADS);
//   app.use("/posts_photos", express.static(EXTERNAL_UPLOADS));
//     app.use("/jobs_photos", express.static(EXTERNAL_UPLOADS));
//     app.use("/webinars_photos", express.static(EXTERNAL_UPLOADS));
//     app.use("/projects_photos", express.static(EXTERNAL_UPLOADS));
//     app.use("/products_photos", express.static(EXTERNAL_UPLOADS));
//     app.use("/jtps_photos", express.static(EXTERNAL_UPLOADS));
// } else {
//   console.error("❌ Folder not found:", EXTERNAL_UPLOADS);
// }

// // Fallback (default.jpg, etc.) inside your Node project
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use("/products_photos", express.static("C:/xampp/htdocs/Wablp/admin/products_photos"));
// app.use("/product_documents", express.static("C:/xampp/htdocs/Wablp/admin/product_documents"));


// /** ---- ROUTES ---- **/
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/routes", statsRoutes);
// app.use("/routes/news", newsRoutes);
// app.use("/routes/newsfull", newsfullRoutes);
// app.use("/routes/customers", customersRoutes);
// app.use("/routes/business", businessRoutes);
// app.use("/routes/organizations", organizationRoutes);
// app.use("/routes/experts", expertRoutes);
// app.use("/routes/jobs", jobRoutes);
// app.use("/routes/webinars", webinarRoutes);
// app.use("/routes/tenders", tendersRoutes);
// app.use("/routes/projects", projectsRoutes);
// app.use("/routes/catalogues", cataloguesRoutes);
// app.use("/routes/orders", ordersRoutes);
// app.use("/routes/status", statusRoutes);
// app.use("/routes/messages", messageRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
