const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Helper: format "x time ago"
function timeAgo(timestamp) {
  if (!timestamp) return "Unknown date";

  // handle UNIX timestamps
  let date = typeof timestamp === "number" || !isNaN(timestamp)
    ? new Date(timestamp * 1000)
    : new Date(timestamp);

  if (isNaN(date.getTime())) return "Unknown date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

// ✅ Get all job categories
router.get("/categories", (req, res) => {
  const sql = "SELECT job_categories_id, name FROM job_categories ORDER BY name ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching job categories:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Get jobs with filters
router.get("/", (req, res) => {
  const { category, institution, search } = req.query;

  let sql = `
    SELECT j.jobs_id, j.title, j.institution, j.photo, j.timestamp,
           c.name AS category_name, j.description, j.more_details, j.salary
    FROM jobs j
    LEFT JOIN job_categories c ON j.category = c.job_categories_id
    WHERE 1=1
  `;
  const params = [];

  // Filtering
  if (category && category !== "all") {
    sql += " AND j.category = ?";
    params.push(category);
  }
  if (institution && institution.trim() !== "") {
    sql += " AND j.institution LIKE ?";
    params.push(`%${institution}%`);
  }
  if (search && search.trim() !== "") {
    sql += " AND (j.title LIKE ? OR j.institution LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += " ORDER BY j.timestamp DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const jobsWithExtras = results.map((job) => {
      // ✅ Convert Buffer fields to string
      ["description", "more_details", "salary"].forEach((field) => {
        if (job[field] && Buffer.isBuffer(job[field])) {
          job[field] = job[field].toString("utf-8");
        }
      });

      return {
        ...job,
        photo: job.photo
          ? `http://localhost:5000/jobs_photos/${job.photo}`
          : "http://localhost:5000/uploads/default.png",
        timeAgo: timeAgo(job.timestamp),
      };
    });

    res.json(jobsWithExtras);
  });
});

// ✅ Get single job details
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT j.*, c.name as category_name
    FROM jobs j
    LEFT JOIN job_categories c ON j.category = c.job_categories_id
    WHERE j.jobs_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching job details:", err);
      return res.status(500).json({ error: "Failed to fetch job details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const job = results[0];

    // ✅ Convert Buffer fields (BLOB/TEXT) into UTF-8 strings
    ["description", "more_details", "salary", "application_link", "document"].forEach((field) => {
      if (job[field] && Buffer.isBuffer(job[field])) {
        job[field] = job[field].toString("utf-8");
      }
    });

    job.photo = job.photo
      ? `http://localhost:5000/jobs_photos/${job.photo}`
      : "http://localhost:5000/uploads/default.png";
    job.document = job.document
      ? `http://localhost:5000/${job.document}`
      : null;
    job.timeAgo = timeAgo(job.timestamp);

    res.json(job);
  });
});

module.exports = router;












// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Helper: format "x time ago"
// function timeAgo(timestamp) {
//   if (!timestamp) return "Unknown date";

//   // handle UNIX timestamps
//   let date = typeof timestamp === "number" || !isNaN(timestamp)
//     ? new Date(timestamp * 1000)
//     : new Date(timestamp);

//   if (isNaN(date.getTime())) return "Unknown date";

//   const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//   const intervals = [
//     { label: "year", seconds: 31536000 },
//     { label: "month", seconds: 2592000 },
//     { label: "day", seconds: 86400 },
//     { label: "hour", seconds: 3600 },
//     { label: "minute", seconds: 60 },
//     { label: "second", seconds: 1 },
//   ];

//   for (let i of intervals) {
//     const count = Math.floor(seconds / i.seconds);
//     if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
//   }
//   return "Just now";
// }

// // ✅ Get all job categories
// router.get("/categories", (req, res) => {
//   const sql = "SELECT job_categories_id, name FROM job_categories ORDER BY name ASC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching job categories:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

// // ✅ Get jobs with filters
// router.get("/", (req, res) => {
//   const { category, institution, search } = req.query;

//   let sql = `
//     SELECT j.jobs_id, j.title, j.institution, j.photo, j.timestamp,
//            c.name AS category_name
//     FROM jobs j
//     LEFT JOIN job_categories c ON j.category = c.job_categories_id
//     WHERE 1=1
//   `;
//   const params = [];

//   // Filtering
//   if (category && category !== "all") {
//     sql += " AND j.category = ?";
//     params.push(category);
//   }
//   if (institution && institution.trim() !== "") {
//     sql += " AND j.institution LIKE ?";
//     params.push(`%${institution}%`);
//   }
//   if (search && search.trim() !== "") {
//     sql += " AND (j.title LIKE ? OR j.institution LIKE ?)";
//     params.push(`%${search}%`, `%${search}%`);
//   }

//   sql += " ORDER BY j.timestamp DESC";

//   db.query(sql, params, (err, results) => {
//     if (err) {
//       console.error("Error fetching jobs:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const jobsWithExtras = results.map((job) => ({
//       ...job,
//       photo: job.photo
//         ? `http://localhost:5000/jobs_photos/${job.photo}`
//         : "http://localhost:5000/uploads/default.png",
//       timeAgo: timeAgo(job.timestamp),
//     }));

//     res.json(jobsWithExtras);
//   });
// });

// // ✅ Get single job details
// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const sql = `
//     SELECT j.*, c.name as category_name
//     FROM jobs j
//     LEFT JOIN job_categories c ON j.category = c.job_categories_id
//     WHERE j.jobs_id = ?
//   `;

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching job details:", err);
//       return res.status(500).json({ error: "Failed to fetch job details" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Job not found" });
//     }

//     const job = results[0];
//     job.photo = job.photo
//       ? `http://localhost:5000/jobs_photos/${job.photo}`
//       : "http://localhost:5000/uploads/default.png";
//     job.document = job.document
//       ? `http://localhost:5000/${job.document}`
//       : null;
//     job.timeAgo = timeAgo(job.timestamp);

//     res.json(job);
//   });
// });

// module.exports = router;
