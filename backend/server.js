const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

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

// === ENVIRONMENT SWITCH ===
const isProduction = process.env.NODE_ENV === "production";

// ✅ Local path for uploads (adjust to your local XAMPP path if needed)
const LOCAL_UPLOADS = path.resolve("C:/xampp/htdocs/Wablp/admin/");

// ✅ Remote URL for uploads
const REMOTE_UPLOADS = "https://wablp.com/admin";

if (isProduction) {
  console.log("🌍 Running in PRODUCTION mode");
  console.log("Proxying uploads to:", REMOTE_UPLOADS);

  // Proxy all upload folders to remote server
  const proxyFolders = [
    "posts_photos",
    "jobs_photos",
    "webinars_photos",
    "projects_photos",
    "products_photos",
    "jtps_photos",
  ];

  proxyFolders.forEach((folder) => {
    app.use(
      `/${folder}`,
      createProxyMiddleware({
        target: REMOTE_UPLOADS,
        changeOrigin: true,
        pathRewrite: { [`^/${folder}`]: `/${folder}` },
      })
    );
  });
} else {
  console.log("💻 Running in DEVELOPMENT mode");
  console.log("Serving uploads from:", LOCAL_UPLOADS);

  if (fs.existsSync(LOCAL_UPLOADS)) {
    app.use("/posts_photos", express.static(path.join(LOCAL_UPLOADS, "posts_photos")));
    app.use("/jobs_photos", express.static(path.join(LOCAL_UPLOADS, "jobs_photos")));
    app.use("/webinars_photos", express.static(path.join(LOCAL_UPLOADS, "webinars_photos")));
    app.use("/projects_photos", express.static(path.join(LOCAL_UPLOADS, "projects_photos")));
    app.use("/products_photos", express.static(path.join(LOCAL_UPLOADS, "products_photos")));
    app.use("/jtps_photos", express.static(path.join(LOCAL_UPLOADS, "jtps_photos")));
  } else {
    console.error("❌ Local uploads folder not found:", LOCAL_UPLOADS);
  }
}

// ✅ Fallback (always available, inside project)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// === ROUTES ===
app.get("/", (req, res) => {
  db.query("SELECT NOW() as now", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(`Database time: ${results[0].now}`);
  });
});

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

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));













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
// const EXTERNAL_UPLOADS =`https://wablp.com/admin/`; // Adjust this path as needed
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
