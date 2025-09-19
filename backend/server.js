const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
// const db = require("../config/db");


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
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();


app.get('/', (req, res) => {
  db.query('SELECT NOW() as now', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(`Database time: ${results[0].now}`);
  });
});

// Path to your XAMPP uploads folder
const EXTERNAL_UPLOADS = process.env.EXTERNAL_UPLOADS_PATH;

// Serve real uploaded photos (only if the folder exists)
if (fs.existsSync(EXTERNAL_UPLOADS)) {
  console.log("✅ Serving images from:", EXTERNAL_UPLOADS);
  app.use("/posts_photos", express.static(EXTERNAL_UPLOADS));
    app.use("/jobs_photos", express.static(EXTERNAL_UPLOADS));
    app.use("/webinars_photos", express.static(EXTERNAL_UPLOADS));
    app.use("/projects_photos", express.static(EXTERNAL_UPLOADS));
    app.use("/products_photos", express.static(EXTERNAL_UPLOADS));
    app.use("/jtps_photos", express.static(EXTERNAL_UPLOADS));
} else {
  console.error("❌ Folder not found:", EXTERNAL_UPLOADS);
}

// Fallback (default.jpg, etc.) inside your Node project
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/products_photos", express.static("C:/xampp/htdocs/Wablp/admin/products_photos"));
app.use("/product_documents", express.static("C:/xampp/htdocs/Wablp/admin/product_documents"));


/** ---- ROUTES ---- **/
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));









// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");

// const authRoutes = require("./routes/auth");
// const dashboardRoutes = require("./routes/dashboard");
// const statsRoutes = require("./routes/stats");
// const newsRoutes = require("./routes/news");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Serve actual uploaded photos from XAMPP folder
// app.use(
//   "/uploads",
//   express.static("C:/xampp/htdocs/Wablp/admin/posts_photos")
// );

// // Serve fallback default.jpg from your Node project (backend/public/uploads)
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "public/uploads"))
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/routes", statsRoutes); // Updated to match frontend fetch
// app.use("/routes/news", newsRoutes);

// const PORT = 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );
