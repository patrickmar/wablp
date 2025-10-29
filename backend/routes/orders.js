// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// //
// // ✅ Place an order
// //
// router.post("/", async (req, res) => {
//   const { product_id, quantity, shipping_details, description, client_id, price, currency } = req.body;

//   if (!product_id || !quantity || !client_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const [productResult] = await db.query(
//       "SELECT owner, price, currency FROM products WHERE products_id = ?",
//       [product_id]
//     );

//     if (productResult.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const product = productResult[0];
//     const seller = product.owner;
//     const unitPrice = price || product.price || 0;
//     const orderCurrency = currency || product.currency || "USD";
//     const total = unitPrice * quantity;

//     await db.query(
//       `INSERT INTO product_orders 
//        (product, seller, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())`,
//       [product_id, seller, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total]
//     );

//     res.json({ success: true, message: "Order placed successfully!" });
//   } catch (err) {
//     console.error("❌ Error placing order:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// //
// // ✅ Fetch orders for a client
// //
// router.get("/:clientId", async (req, res) => {
//   const { clientId } = req.params;
//   try {
//     const [results] = await db.query(
//       `SELECT 
//         o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
//         p.name AS product_name,
//         c.name AS seller_name
//       FROM product_orders o
//       LEFT JOIN products p ON o.product = p.products_id
//       LEFT JOIN customers c ON o.seller = c.customers_id
//       WHERE o.client = ?
//       ORDER BY o.dateentered DESC`,
//       [clientId]
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("❌ Error fetching client orders:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// //
// // ✅ Fetch orders for a seller
// //
// router.get("/seller/:sellerId", async (req, res) => {
//   const { sellerId } = req.params;
//   try {
//     const [results] = await db.query(
//       `SELECT 
//         o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, 
//         o.product, o.client,
//         p.name AS product_name,
//         c.name AS client_name
//       FROM product_orders o
//       LEFT JOIN products p ON o.product = p.products_id
//       LEFT JOIN customers c ON o.client = c.customers_id
//       WHERE o.seller = ?
//       ORDER BY o.dateentered DESC`,
//       [sellerId]
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("❌ Error fetching seller orders:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// //
// // ✅ Update order status
// //
// router.put("/:id/status", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   try {
//     await db.query(
//       "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?",
//       [status, id]
//     );
//     res.json({ success: true, message: "Order status updated" });
//   } catch (err) {
//     console.error("❌ Error updating order status:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// //
// // ✅ Delete order
// //
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.query("DELETE FROM product_orders WHERE product_orders_id = ?", [id]);
//     res.json({ success: true, message: "Order deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting order:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// module.exports = router;


















const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer"); // ✅ new email setup

//
// ✅ Place an order
//
router.post("/", async (req, res) => {
  const {
    product_id,
    quantity,
    shipping_details,
    description,
    client_id,
    price,
    currency,
    contact_email, // ✅ seller email directly from frontend
  } = req.body;

  console.log("📦 New order request received:", req.body);

  if (!product_id || !quantity || !client_id) {
    console.warn("⚠️ Missing required fields in order request.");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ✅ Fetch product info only (no seller lookup)
    console.log("🔍 Fetching product info for product_id:", product_id);
    const [productResult] = await db.query(
      "SELECT name AS product_name, price, currency FROM products WHERE products_id = ?",
      [product_id]
    );

    if (productResult.length === 0) {
      console.error("❌ Product not found for ID:", product_id);
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResult[0];
    console.log("✅ Product found:", product);

    const unitPrice = price || product.price || 0;
    const orderCurrency = currency || product.currency || "USD";
    const total = unitPrice * quantity;

    console.log("💰 Calculated order total:", total, orderCurrency);

    // ✅ Insert the order
    console.log("📝 Inserting order into database...");
    await db.query(
      `INSERT INTO product_orders 
       (product, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())`,
      [product_id, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total]
    );
    console.log("✅ Order successfully inserted into database");

    // ✅ Fetch buyer info
    console.log("🔍 Fetching buyer info...");
    const [[buyerInfo]] = await db.query(
      "SELECT name, email FROM customers WHERE customers_id = ?",
      [client_id]
    );

    console.log("👤 Buyer info:", buyerInfo);

    // ✅ Setup email
    const mailTo = contact_email || process.env.ADMIN_EMAIL;
    if (!mailTo) {
      console.warn("⚠️ No seller email found, skipping email notification.");
    } else {
      console.log("📨 Setting up email transporter...");

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      // const transporter = nodemailer.createTransport({
      //   host: process.env.SMTP_HOST,
      //   port: process.env.SMTP_PORT,
      //   secure: false,
      //   auth: {
      //     user: process.env.SMTP_EMAIL,
      //     pass: process.env.SMTP_PASSWORD,
      //   },
      // });

      try {
        await transporter.verify();
        console.log("✅ SMTP connection verified successfully");
      } catch (verifyErr) {
        console.error("❌ SMTP connection verification failed:", verifyErr);
      }

      // ✅ Refined, professional email content
      const mailOptions = {
        from: `"${buyerInfo?.name || "Customer"}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: mailTo,
        subject: `🛒 New Order from ${buyerInfo?.name || "a customer"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color:#004aad; color:white; padding:20px; text-align:center;">
              <h1 style="margin:0; font-size:24px;">New Order Notification</h1>
            </div>
            <div style="padding:20px; color:#333;">
              <p>Hello,</p>
              <p>You have received a new order from <strong>${buyerInfo?.name || "a customer"}</strong>.</p>

              <table style="width:100%; border-collapse: collapse; margin-top:15px;">
                <tr>
                  <td style="padding:8px; border:1px solid #ddd;"><strong>Product</strong></td>
                  <td style="padding:8px; border:1px solid #ddd;">${product.product_name}</td>
                </tr>
                <tr>
                  <td style="padding:8px; border:1px solid #ddd;"><strong>Quantity</strong></td>
                  <td style="padding:8px; border:1px solid #ddd;">${quantity}</td>
                </tr>
                <tr>
                  <td style="padding:8px; border:1px solid #ddd;"><strong>Total</strong></td>
                  <td style="padding:8px; border:1px solid #ddd;">${total} ${orderCurrency}</td>
                </tr>
                <tr>
                  <td style="padding:8px; border:1px solid #ddd;"><strong>Description</strong></td>
                  <td style="padding:8px; border:1px solid #ddd;">${description || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:8px; border:1px solid #ddd;"><strong>Shipping Details</strong></td>
                  <td style="padding:8px; border:1px solid #ddd;">${shipping_details || "N/A"}</td>
                </tr>
              </table>

              <p style="margin-top:20px;">Please log in to your dashboard to process this order.</p>

              <p style="margin-top:30px; font-size:14px; color:#777;">Best regards,<br/>Your Store Team</p>
            </div>
            <div style="background-color:#f2f2f2; padding:10px; text-align:center; font-size:12px; color:#555;">
              &copy; ${new Date().getFullYear()} Your Store. All rights reserved.
            </div>
          </div>
        `,
      };

      try {
        console.log("📤 Sending email to:", mailTo);
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email notification sent successfully to ${mailTo}`);
      } catch (mailErr) {
        console.error("❌ Error sending email notification:", mailErr);
      }
    }

    res.json({ success: true, message: "Order placed successfully and seller notified!" });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Database or server error" });
  }
});

//
// ✅ Fetch orders for a client
//
router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  console.log("📦 Fetching orders for client:", clientId);
  try {
    const [results] = await db.query(
      `SELECT 
        o.product_orders_id, o.quantity, o.status, o.price, o.currency, o.total, o.product,
        p.name AS product_name
      FROM product_orders o
      LEFT JOIN products p ON o.product = p.products_id
      WHERE o.client = ?
      ORDER BY o.dateentered DESC`,
      [clientId]
    );
    console.log(`✅ Found ${results.length} orders for client ${clientId}`);
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching client orders:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//
// ✅ Fetch orders for a seller (kept for backward compatibility)
//
router.get("/seller/:sellerId", async (req, res) => {
  const { sellerId } = req.params;
  console.log("📦 Fetching orders for seller:", sellerId);
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
    console.log(`✅ Found ${results.length} orders for seller ${sellerId}`);
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

  console.log(`🔄 Updating order ${id} to status:`, status);

  if (!["NEW", "CLOSED", "ARCHIVED"].includes(status)) {
    console.warn("⚠️ Invalid status received:", status);
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    await db.query(
      "UPDATE product_orders SET status = ?, lastupdate = NOW() WHERE product_orders_id = ?",
      [status, id]
    );
    console.log("✅ Order status updated successfully");
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
  console.log("🗑️ Deleting order with ID:", id);
  try {
    await db.query("DELETE FROM product_orders WHERE product_orders_id = ?", [id]);
    console.log("✅ Order deleted successfully");
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;




