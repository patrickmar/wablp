const express = require("express");
const router = express.Router();
const db = require("../config/db");

//
// ✅ Place an order (auto-fetch seller from products table)
//
router.post("/", (req, res) => {
  const { product_id, quantity, shipping_details, description, client_id, price, currency } = req.body;

  if (!product_id || !quantity || !client_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Step 1: Fetch product to get seller, default price/currency
  const sellerSql = "SELECT owner, price, currency FROM products WHERE products_id = ?";
  db.query(sellerSql, [product_id], (err, productResult) => {
    if (err) {
      console.error("❌ Error fetching product seller:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (productResult.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResult[0];
    const seller = product.owner; // assumes column is "owner"
    const unitPrice = price || product.price || 0;
    const orderCurrency = currency || product.currency || "USD";
    const total = unitPrice * quantity;

    // Step 2: Insert into product_orders
    const insertSql = `
      INSERT INTO product_orders 
      (product, seller, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())
    `;

    db.query(
      insertSql,
      [product_id, seller, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total],
      (insertErr) => {
        if (insertErr) {
          console.error("❌ Error inserting order:", insertErr);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "Order placed successfully!" });
      }
    );
  });
});

//
// ✅ Fetch orders for a client (My Orders)
//
router.get("/:clientId", (req, res) => {
  const { clientId } = req.params;

  const sql = `
    SELECT 
      o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
      p.name AS product_name,
      c.name AS seller_name
    FROM product_orders o
    LEFT JOIN products p ON o.product = p.products_id
    LEFT JOIN customers c ON o.seller = c.customers_id
    WHERE o.client = ?
    ORDER BY o.dateentered DESC
  `;

  db.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching client orders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//
// ✅ Fetch orders for a seller (Seller Orders)
//
router.get("/seller/:sellerId", (req, res) => {
  const { sellerId } = req.params;

  const sql = `
    SELECT 
      o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, 
      o.product, o.client,
      p.name AS product_name,
      c.name AS client_name
    FROM product_orders o
    LEFT JOIN products p ON o.product = p.products_id
    LEFT JOIN customers c ON o.client = c.customers_id
    WHERE o.seller = ?
    ORDER BY o.dateentered DESC
  `;

  db.query(sql, [sellerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching seller orders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//
// ✅ Update order status (CLOSE / ARCHIVE)
//
router.put("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const sql = "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error("❌ Error updating order status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: "Order status updated" });
  });
});

//
// ✅ Delete order
//
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM product_orders WHERE product_orders_id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting order:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  });
});

module.exports = router;
