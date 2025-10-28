const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const db = require("./config/db");
const { credentials } = require("./middleware/credentials");

// ✅ Initialize Express
const app = express();

// ====================================================
// 🔐 CORS + Credentials Setup
// ====================================================
app.use(
  cors({
    origin: [
      "https://wablp.netlify.app",
      "http://localhost:3000",
      "https://wablp.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight (OPTIONS) requests globally
app.options("*", cors());

// ✅ Apply credentials middleware AFTER CORS
app.use(credentials);

// ✅ JSON parser
app.use(bodyParser.json());

// ====================================================
// 🧠 Socket.IO Setup
// ====================================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://wablp.netlify.app",
      "http://localhost:3000",
      "https://wablp.com",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`👥 User joined room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

app.set("io", io);

// ====================================================
// 🧾 Logging + DB Test Route
// ====================================================
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT NOW() as now");
    res.send(`Database time: ${results[0].now}`);
  } catch (err) {
    console.error("DB Test Error:", err);
    res.status(500).send("Database connection failed");
  }
});

// ====================================================
// 🌍 Serve Public Uploads
// ====================================================
const externalBase = "https://wablp.com/admin";
console.log("🌍 Using direct external image base:", externalBase);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ====================================================
// 📦 Routes
// ====================================================
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

// ====================================================
// 🚀 Start Server
// ====================================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running with Socket.IO at http://localhost:${PORT}`)
);










// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");
// const { credentials } = require("./middleware/credentials");
// require("dotenv").config();

// const db = require("./config/db");


// // ✅ Initialize Express
// const app = express();
// app.use(bodyParser.json());
// app.use(credentials);
// // ✅ CORS setup
// app.use(
//   cors({
//     origin: [
//       "https://wablp.netlify.app",
//       "http://localhost:3000",
//       // "https://wablp.com"
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Create HTTP server for Socket.IO
// const server = http.createServer(app);

// // ✅ Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://wablp.netlify.app",
//       "http://localhost:3000",
//       "https://wablp.com"
//     ],
//     methods: ["GET", "POST"]
//   }
// });

// // ✅ Socket.IO connection log
// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   // (optional) Join user-specific room
//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`👥 User joined room: ${roomId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);
//   });
// });

// // ✅ Attach io to app (so routes can emit messages)
// app.set("io", io);

// // ✅ Request logging middleware
// app.use((req, res, next) => {
//   console.log(`➡️  ${req.method} ${req.originalUrl}`);
//   next();
// });

// // ✅ Test DB connection
// app.get("/", async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT NOW() as now");
//     res.send(`Database time: ${results[0].now}`);
//   } catch (err) {
//     console.error("DB Test Error:", err);
//     res.status(500).send("Database connection failed");
//   }
// });

// // ✅ External base
// const externalBase = "https://wablp.com/admin";
// console.log("🌍 Using direct external image base:", externalBase);

// // ✅ Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// // ✅ Import routes
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

// // ✅ Route setup
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

// // ✅ Start HTTP + Socket.IO server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running with Socket.IO at http://localhost:${PORT}`)
// );