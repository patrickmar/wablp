const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// ✅ Absolute external directories
const PHOTO_DIR = "https://wablp.com/admin/products_photos";
const DOC_DIR = "https://wablp.com/admin/product_documents";

// ✅ Storage for photo & document uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "photo") {
      cb(null, "uploads/products_photos");
    } else if (file.fieldname === "document") {
      cb(null, "uploads/product_documents");
    } else {
      cb(null, "uploads/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 🔹 Helper for "time ago"
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

// ✅ Get product categories for dropdown
router.get("/categories", async (req, res) => {
  try {
    const [results] = await db
      .promise()
      .query("SELECT product_categories_id, name FROM product_categories ORDER BY name ASC");

    const categories = results.map((cat) => ({
      product_categories_id: String(cat.product_categories_id),
      name: String(cat.name),
    }));

    res.json(categories);
  } catch (err) {
    console.error("❌ Error fetching product categories:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get product types for dropdown
router.get("/types", async (req, res) => {
  try {
    const [results] = await db
      .promise()
      .query("SELECT product_types_id, name FROM product_types ORDER BY name ASC");

    const types = results.map((t) => ({
      product_types_id: String(t.product_types_id),
      name: String(t.name),
    }));

    res.json(types);
  } catch (err) {
    console.error("❌ Error fetching product types:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get all products (with filters)
router.get("/", async (req, res) => {
  const { category, type, search } = req.query;

  let sql = `
    SELECT p.products_id, p.name, p.description, p.category, p.type,
           p.currency, p.price, p.photo, p.document, p.timestamp,
           c.name AS category_name
    FROM products p
    LEFT JOIN product_categories c ON p.category = c.product_categories_id
    WHERE 1=1
  `;
  const params = [];

  if (category && category !== "all") {
    sql += " AND p.category = ?";
    params.push(category);
  }
  if (type && type !== "all") {
    sql += " AND p.type = ?";
    params.push(type);
  }
  if (search && search.trim() !== "") {
    sql += " AND p.name LIKE ?";
    params.push(`%${search}%`);
  }

  sql += " ORDER BY p.timestamp DESC";

  try {
    const [results] = await db.promise().query(sql, params);

    const products = results.map((prod) => {
      const ts = prod.timestamp ? new Date(prod.timestamp * 1000) : null;

      let photoFile = prod.photo ? prod.photo.replace(/^products_photos\//, "") : null;
      let docFile = prod.document ? prod.document.replace(/^product_documents\//, "") : null;

      return {
        products_id: String(prod.products_id),
        name: String(prod.name),
        description: prod.description ? String(prod.description) : "",
        category: String(prod.category),
        category_name: prod.category_name ? String(prod.category_name) : "",
        type: prod.type ? String(prod.type) : "",
        currency: prod.currency ? String(prod.currency) : "",
        price: prod.price ? String(prod.price) : "0",
        photo: photoFile ? `${PHOTO_DIR}/${photoFile}` : null,
        document: docFile ? `${DOC_DIR}/${docFile}` : null,
        timeAgo: ts ? timeAgo(ts) : "Unknown date",
      };
    });

    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get single product details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.products_id, p.name, p.description, p.category, p.type,
           p.currency, p.price, p.photo, p.timestamp,
           p.stock_available, p.uom,
           p.contact_email, p.contact_phone, p.website, p.status, p.document,
           c.name AS category_name
    FROM products p
    LEFT JOIN product_categories c ON p.category = c.product_categories_id
    WHERE p.products_id = ?
    LIMIT 1
  `;

  try {
    const [results] = await db.promise().query(sql, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const prod = results[0];
    const ts = prod.timestamp ? new Date(prod.timestamp * 1000) : null;

    let photoFile = prod.photo ? prod.photo.replace(/^products_photos\//, "") : null;
    let docFile = prod.document ? prod.document.replace(/^product_documents\//, "") : null;

    const product = {
      products_id: String(prod.products_id),
      name: String(prod.name),
      description: prod.description ? String(prod.description) : "",
      category: String(prod.category),
      category_name: prod.category_name ? String(prod.category_name) : "",
      type: prod.type ? String(prod.type) : "",
      currency: prod.currency ? String(prod.currency) : "",
      price: prod.price ? String(prod.price) : "0",
      stock_available: prod.stock_available ? String(prod.stock_available) : "0",
      uom: prod.uom ? String(prod.uom) : "",
      contact_email: prod.contact_email ? String(prod.contact_email) : "",
      contact_phone: prod.contact_phone ? String(prod.contact_phone) : "",
      website: prod.website ? String(prod.website) : "",
      status: prod.status ? String(prod.status) : "PUBLISHED",
      photo: photoFile ? `${PHOTO_DIR}/${photoFile}` : null,
      document: docFile ? `${DOC_DIR}/${docFile}` : null,
      timeAgo: ts ? timeAgo(ts) : "Unknown date",
    };

    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product details:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;














// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // ✅ Get product categories for dropdown
// router.get("/categories", (req, res) => {
//   const sql = "SELECT product_categories_id, name FROM product_categories ORDER BY name ASC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching product categories:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     // Ensure clean strings
//     const categories = results.map((cat) => ({
//       product_categories_id: String(cat.product_categories_id),
//       name: String(cat.name),
//     }));

//     res.json(categories);
//   });
// });

// // ✅ Get all products (with filters)
// router.get("/", (req, res) => {
//   const { category, type, search } = req.query;

//   let sql = `
//     SELECT p.products_id, p.name, p.description, p.category, p.type,
//            p.currency, p.price, p.photo, p.timestamp,
//            c.name AS category_name
//     FROM products p
//     LEFT JOIN product_categories c ON p.category = c.product_categories_id
//     WHERE 1=1
//   `;
//   const params = [];

//   // Filtering
//   if (category && category !== "all") {
//     sql += " AND p.category = ?";
//     params.push(category);
//   }

//   if (type && type !== "all") {
//     sql += " AND p.type = ?";
//     params.push(type);
//   }

//   if (search && search.trim() !== "") {
//     sql += " AND p.name LIKE ?";
//     params.push(`%${search}%`);
//   }

//   sql += " ORDER BY p.timestamp DESC";

//   db.query(sql, params, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching products:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const products = results.map((prod) => {
//       const ts = prod.timestamp ? new Date(prod.timestamp * 1000) : null;

//       return {
//         products_id: String(prod.products_id),
//         name: String(prod.name),
//         description: prod.description ? String(prod.description) : "",
//         category: String(prod.category),
//         category_name: prod.category_name ? String(prod.category_name) : "",
//         type: prod.type ? String(prod.type) : "",
//         currency: prod.currency ? String(prod.currency) : "",
//         price: prod.price ? String(prod.price) : "0",
//         photo: prod.photo
//           ? `http://localhost:5000/products_photos/${prod.photo}`
//           : "http://localhost:5000/uploads/default.png",
//         timeAgo: ts ? timeAgo(ts) : "Unknown date",
//       };
//     });

//     res.json(products);
//   });
// });

// // ✅ Get single product details (safe + stringified)
// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const sql = `
//     SELECT p.products_id, p.name, p.description, p.category, p.type,
//            p.currency, p.price, p.photo, p.timestamp,
//            p.stock_available, p.uom,
//            p.contact_email, p.contact_phone, p.website,
//            c.name AS category_name
//     FROM products p
//     LEFT JOIN product_categories c ON p.category = c.product_categories_id
//     WHERE p.products_id = ?
//     LIMIT 1
//   `;

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching product details:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const prod = results[0];
//     const ts = prod.timestamp ? new Date(prod.timestamp * 1000) : null;

//     const product = {
//       products_id: String(prod.products_id),
//       name: String(prod.name),
//       description: prod.description ? String(prod.description) : "",
//       category: String(prod.category),
//       category_name: prod.category_name ? String(prod.category_name) : "",
//       type: prod.type ? String(prod.type) : "",
//       currency: prod.currency ? String(prod.currency) : "",
//       price: prod.price ? String(prod.price) : "0",
//       stock_available: prod.stock_available ? String(prod.stock_available) : "0",
//       uom: prod.uom ? String(prod.uom) : "",
//       contact_email: prod.contact_email ? String(prod.contact_email) : "",
//       contact_phone: prod.contact_phone ? String(prod.contact_phone) : "",
//       website: prod.website ? String(prod.website) : "",
//       photo: prod.photo
//         ? `http://localhost:5000/products_photos/${prod.photo}`
//         : "http://localhost:5000/uploads/default.png",
//       timeAgo: ts ? timeAgo(ts) : "Unknown date",
//     };

//     res.json(product);
//   });
// });

// // 🔹 Helper to format "time ago"
// function timeAgo(date) {
//   const seconds = Math.floor((new Date() - date) / 1000);
//   const intervals = {
//     year: 31536000,
//     month: 2592000,
//     day: 86400,
//     hour: 3600,
//     minute: 60,
//   };

//   for (let key in intervals) {
//     const interval = Math.floor(seconds / intervals[key]);
//     if (interval >= 1) {
//       return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
//     }
//   }
//   return "Just now";
// }

// module.exports = router;
