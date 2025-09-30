const express = require("express");
const router = express.Router();
const db = require("../config/db");

//
// ✅ Place an order
//
router.post("/", async (req, res) => {
  const { product_id, quantity, shipping_details, description, client_id, price, currency } = req.body;

  if (!product_id || !quantity || !client_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [productResult] = await db.query(
      "SELECT owner, price, currency FROM products WHERE products_id = ?",
      [product_id]
    );

    if (productResult.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResult[0];
    const seller = product.owner;
    const unitPrice = price || product.price || 0;
    const orderCurrency = currency || product.currency || "USD";
    const total = unitPrice * quantity;

    await db.query(
      `INSERT INTO product_orders 
       (product, seller, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())`,
      [product_id, seller, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total]
    );

    res.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//
// ✅ Fetch orders for a client
//
router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  try {
    const [results] = await db.query(
      `SELECT 
        o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
        p.name AS product_name,
        c.name AS seller_name
      FROM product_orders o
      LEFT JOIN products p ON o.product = p.products_id
      LEFT JOIN customers c ON o.seller = c.customers_id
      WHERE o.client = ?
      ORDER BY o.dateentered DESC`,
      [clientId]
    );
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching client orders:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//
// ✅ Fetch orders for a seller
//
router.get("/seller/:sellerId", async (req, res) => {
  const { sellerId } = req.params;
  try {
    const [results] = await db.query(
      `SELECT 
        o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, 
        o.product, o.client,
        p.name AS product_name,
        c.name AS client_name
      FROM product_orders o
      LEFT JOIN products p ON o.product = p.products_id
      LEFT JOIN customers c ON o.client = c.customers_id
      WHERE o.seller = ?
      ORDER BY o.dateentered DESC`,
      [sellerId]
    );
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching seller orders:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//
// ✅ Update order status
//
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    await db.query(
      "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?",
      [status, id]
    );
    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//
// ✅ Delete order
//
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM product_orders WHERE product_orders_id = ?", [id]);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;


















// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// //
// // ✅ Place an order (auto-fetch seller from products table)
// //
// router.post("/", (req, res) => {
//   const { product_id, quantity, shipping_details, description, client_id, price, currency } = req.body;

//   if (!product_id || !quantity || !client_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   db.getConnection((connErr, connection) => {
//     if (connErr) {
//       console.error("❌ DB connection error:", connErr);
//       return res.status(500).json({ error: "Database connection failed" });
//     }

//     const sellerSql = "SELECT owner, price, currency FROM products WHERE products_id = ?";
//     connection.query(sellerSql, [product_id], (err, productResult) => {
//       if (err) {
//         connection.release();
//         console.error("❌ Error fetching product seller:", err);
//         return res.status(500).json({ error: "Database error" });
//       }

//       if (productResult.length === 0) {
//         connection.release();
//         return res.status(404).json({ error: "Product not found" });
//       }

//       const product = productResult[0];
//       const seller = product.owner;
//       const unitPrice = price || product.price || 0;
//       const orderCurrency = currency || product.currency || "USD";
//       const total = unitPrice * quantity;

//       const insertSql = `
//         INSERT INTO product_orders 
//         (product, seller, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())
//       `;

//       connection.query(
//         insertSql,
//         [product_id, seller, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total],
//         (insertErr) => {
//           connection.release();
//           if (insertErr) {
//             console.error("❌ Error inserting order:", insertErr);
//             return res.status(500).json({ error: "Database error" });
//           }
//           res.json({ success: true, message: "Order placed successfully!" });
//         }
//       );
//     });
//   });
// });

// //
// // ✅ Fetch orders for a client (My Orders)
// //
// router.get("/:clientId", (req, res) => {
//   const { clientId } = req.params;

//   db.getConnection((connErr, connection) => {
//     if (connErr) {
//       console.error("❌ DB connection error:", connErr);
//       return res.status(500).json({ error: "Database connection failed" });
//     }

//     const sql = `
//       SELECT 
//         o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
//         p.name AS product_name,
//         c.name AS seller_name
//       FROM product_orders o
//       LEFT JOIN products p ON o.product = p.products_id
//       LEFT JOIN customers c ON o.seller = c.customers_id
//       WHERE o.client = ?
//       ORDER BY o.dateentered DESC
//     `;

//     connection.query(sql, [clientId], (err, results) => {
//       connection.release();
//       if (err) {
//         console.error("❌ Error fetching client orders:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json(results);
//     });
//   });
// });

// //
// // ✅ Fetch orders for a seller (Seller Orders)
// //
// router.get("/seller/:sellerId", (req, res) => {
//   const { sellerId } = req.params;

//   db.getConnection((connErr, connection) => {
//     if (connErr) {
//       console.error("❌ DB connection error:", connErr);
//       return res.status(500).json({ error: "Database connection failed" });
//     }

//     const sql = `
//       SELECT 
//         o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, 
//         o.product, o.client,
//         p.name AS product_name,
//         c.name AS client_name
//       FROM product_orders o
//       LEFT JOIN products p ON o.product = p.products_id
//       LEFT JOIN customers c ON o.client = c.customers_id
//       WHERE o.seller = ?
//       ORDER BY o.dateentered DESC
//     `;

//     connection.query(sql, [sellerId], (err, results) => {
//       connection.release();
//       if (err) {
//         console.error("❌ Error fetching seller orders:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json(results);
//     });
//   });
// });

// //
// // ✅ Update order status (CLOSE / ARCHIVE)
// //
// router.put("/:id/status", (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   db.getConnection((connErr, connection) => {
//     if (connErr) {
//       console.error("❌ DB connection error:", connErr);
//       return res.status(500).json({ error: "Database connection failed" });
//     }

//     const sql = "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?";
//     connection.query(sql, [status, id], (err) => {
//       connection.release();
//       if (err) {
//         console.error("❌ Error updating order status:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ success: true, message: "Order status updated" });
//     });
//   });
// });

// //
// // ✅ Delete order
// //
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   db.getConnection((connErr, connection) => {
//     if (connErr) {
//       console.error("❌ DB connection error:", connErr);
//       return res.status(500).json({ error: "Database connection failed" });
//     }

//     const sql = "DELETE FROM product_orders WHERE product_orders_id = ?";
//     connection.query(sql, [id], (err) => {
//       connection.release();
//       if (err) {
//         console.error("❌ Error deleting order:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ success: true, message: "Order deleted successfully" });
//     });
//   });
// });

// module.exports = router;
























// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// //
// // ✅ Place an order (auto-fetch seller from products table)
// //
// router.post("/", (req, res) => {
//   const { product_id, quantity, shipping_details, description, client_id, price, currency } = req.body;

//   if (!product_id || !quantity || !client_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   // Step 1: Fetch product to get seller, default price/currency
//   const sellerSql = "SELECT owner, price, currency FROM products WHERE products_id = ?";
//   db.query(sellerSql, [product_id], (err, productResult) => {
//     if (err) {
//       console.error("❌ Error fetching product seller:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (productResult.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const product = productResult[0];
//     const seller = product.owner; // assumes column is "owner"
//     const unitPrice = price || product.price || 0;
//     const orderCurrency = currency || product.currency || "USD";
//     const total = unitPrice * quantity;

//     // Step 2: Insert into product_orders
//     const insertSql = `
//       INSERT INTO product_orders 
//       (product, seller, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())
//     `;

//     db.query(
//       insertSql,
//       [product_id, seller, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total],
//       (insertErr) => {
//         if (insertErr) {
//           console.error("❌ Error inserting order:", insertErr);
//           return res.status(500).json({ error: "Database error" });
//         }
//         res.json({ success: true, message: "Order placed successfully!" });
//       }
//     );
//   });
// });

// //
// // ✅ Fetch orders for a client (My Orders)
// //
// router.get("/:clientId", (req, res) => {
//   const { clientId } = req.params;

//   const sql = `
//     SELECT 
//       o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
//       p.name AS product_name,
//       c.name AS seller_name
//     FROM product_orders o
//     LEFT JOIN products p ON o.product = p.products_id
//     LEFT JOIN customers c ON o.seller = c.customers_id
//     WHERE o.client = ?
//     ORDER BY o.dateentered DESC
//   `;

//   db.query(sql, [clientId], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching client orders:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

// //
// // ✅ Fetch orders for a seller (Seller Orders)
// //
// router.get("/seller/:sellerId", (req, res) => {
//   const { sellerId } = req.params;

//   const sql = `
//     SELECT 
//       o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, 
//       o.product, o.client,
//       p.name AS product_name,
//       c.name AS client_name
//     FROM product_orders o
//     LEFT JOIN products p ON o.product = p.products_id
//     LEFT JOIN customers c ON o.client = c.customers_id
//     WHERE o.seller = ?
//     ORDER BY o.dateentered DESC
//   `;

//   db.query(sql, [sellerId], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching seller orders:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

// //
// // ✅ Update order status (CLOSE / ARCHIVE)
// //
// router.put("/:id/status", (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   const sql = "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?";
//   db.query(sql, [status, id], (err) => {
//     if (err) {
//       console.error("❌ Error updating order status:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json({ success: true, message: "Order status updated" });
//   });
// });

// //
// // ✅ Delete order
// //
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   const sql = "DELETE FROM product_orders WHERE product_orders_id = ?";
//   db.query(sql, [id], (err) => {
//     if (err) {
//       console.error("❌ Error deleting order:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json({ success: true, message: "Order deleted successfully" });
//   });
// });

// module.exports = router;
