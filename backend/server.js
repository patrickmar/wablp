const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
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
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wablp.onrender.com",
      "https://wablp.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());
// app.use(cors());
app.use(bodyParser.json());

// ✅ Test DB connection (async/await)
app.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT NOW() as now");
    res.send(`Database time: ${results[0].now}`);
  } catch (err) {
    console.error("DB Test Error:", err);
    res.status(500).send("Database connection failed");
  }
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
