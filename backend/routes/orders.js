const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { sendEmail } = require("../utils/emailService");

// ✅ Place an order
router.post("/", async (req, res) => {
  const {
    product_id,
    quantity,
    shipping_details,
    description,
    client_id,
    price,
    currency,
    contact_email, // seller email
  } = req.body;

  console.log("📦 New order request received:", req.body);

  if (!product_id || !quantity || !client_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch product info
    const [productResult] = await db.query(
      "SELECT name AS product_name, price, currency FROM products WHERE products_id = ?",
      [product_id]
    );

    if (productResult.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResult[0];
    const unitPrice = price || product.price || 0;
    const orderCurrency = currency || product.currency || "USD";
    const total = unitPrice * quantity;

    // Insert order
    await db.query(
      `INSERT INTO product_orders 
       (product, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())`,
      [
        product_id,
        client_id,
        quantity,
        shipping_details || "",
        description || "",
        unitPrice,
        orderCurrency,
        total,
      ]
    );

    // Fetch buyer info
    const [[buyerInfo]] = await db.query(
      "SELECT name, email FROM customers WHERE customers_id = ?",
      [client_id]
    );

    const senderName = buyerInfo?.name || "Customer";
    const mailTo = contact_email || process.env.ADMIN_EMAIL;

    if (!mailTo) {
      console.warn("⚠️ No seller email found, skipping email notification.");
      return res.json({
        success: true,
        message: "Order placed successfully (email skipped).",
      });
    }

    // Email HTML template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden;">
          
          <div style="background:#1d4ed8; color:#fff; padding:20px; text-align:center;">
            <h2>🛒 New Order Notification</h2>
          </div>

          <div style="padding:20px; color:#333;">
            <p>Hello,</p>
            <p>You have received a new order from <strong>${senderName}</strong>.</p>

            <table style="width:100%; border-collapse:collapse; margin-top:15px;">
              <tr>
                <td style="border:1px solid #ddd; padding:8px;">Product</td>
                <td style="border:1px solid #ddd; padding:8px;">${product.product_name}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd; padding:8px;">Quantity</td>
                <td style="border:1px solid #ddd; padding:8px;">${quantity}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd; padding:8px;">Total</td>
                <td style="border:1px solid #ddd; padding:8px;">${total} ${orderCurrency}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd; padding:8px;">Description</td>
                <td style="border:1px solid #ddd; padding:8px;">${description || "N/A"}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd; padding:8px;">Shipping Details</td>
                <td style="border:1px solid #ddd; padding:8px;">${shipping_details || "N/A"}</td>
              </tr>
            </table>

            <p style="margin-top:20px;">
              Please log in to your seller dashboard to process this order.
            </p>
          </div>

          <div style="background:#f1f1f1; padding:12px; text-align:center; font-size:12px; color:#777;">
            &copy; ${new Date().getFullYear()} WABLP Business Center
          </div>
        </div>
      </div>
    `;

    // ✅ Send email via centralized emailService
    await sendEmail({
      to: mailTo,
      subject: `🛍️ New Order from ${senderName}`,
      html: emailHTML,
    });

    res.json({
      success: true,
      message: "Order placed successfully & email sent!",
    });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// // ✅ Configure Brevo API client
// const brevoClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = brevoClient.authentications["api-key"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// // ✅ Place an order
// router.post("/", async (req, res) => {
//   const {
//     product_id,
//     quantity,
//     shipping_details,
//     description,
//     client_id,
//     price,
//     currency,
//     contact_email, // ✅ seller email
//   } = req.body;

//   console.log("📦 New order request received:", req.body);

//   if (!product_id || !quantity || !client_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // ✅ Fetch product info
//     const [productResult] = await db.query(
//       "SELECT name AS product_name, price, currency FROM products WHERE products_id = ?",
//       [product_id]
//     );

//     if (productResult.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const product = productResult[0];
//     const unitPrice = price || product.price || 0;
//     const orderCurrency = currency || product.currency || "USD";
//     const total = unitPrice * quantity;

//     // ✅ Insert order
//     await db.query(
//       `INSERT INTO product_orders 
//        (product, client, quantity, shipping_details, description, price, currency, total, status, dateentered)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW())`,
//       [product_id, client_id, quantity, shipping_details || "", description || "", unitPrice, orderCurrency, total]
//     );

//     // ✅ Fetch buyer info
//     const [[buyerInfo]] = await db.query(
//       "SELECT name, email FROM customers WHERE customers_id = ?",
//       [client_id]
//     );

//     const mailTo = contact_email || process.env.ADMIN_EMAIL;
//     if (!mailTo) {
//       console.warn("⚠️ No seller email found, skipping email notification.");
//       return res.json({
//         success: true,
//         message: "Order placed but no seller email provided.",
//       });
//     }

//     // ✅ Compose professional email
//     const senderName = buyerInfo?.name || "Customer";
//     const emailHTML = `
//       <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #eee; border-radius:10px; overflow:hidden;">
//         <div style="background-color:#004aad; color:white; text-align:center; padding:20px;">
//           <h2>🛒 New Order Notification</h2>
//         </div>
//         <div style="padding:20px;">
//           <p>Hello,</p>
//           <p>You have received a new order from <strong>${senderName}</strong>.</p>
//           <table style="width:100%; border-collapse:collapse; margin-top:15px;">
//             <tr><td style="border:1px solid #ddd; padding:8px;">Product</td><td style="border:1px solid #ddd; padding:8px;">${product.product_name}</td></tr>
//             <tr><td style="border:1px solid #ddd; padding:8px;">Quantity</td><td style="border:1px solid #ddd; padding:8px;">${quantity}</td></tr>
//             <tr><td style="border:1px solid #ddd; padding:8px;">Total</td><td style="border:1px solid #ddd; padding:8px;">${total} ${orderCurrency}</td></tr>
//             <tr><td style="border:1px solid #ddd; padding:8px;">Description</td><td style="border:1px solid #ddd; padding:8px;">${description || "N/A"}</td></tr>
//             <tr><td style="border:1px solid #ddd; padding:8px;">Shipping Details</td><td style="border:1px solid #ddd; padding:8px;">${shipping_details || "N/A"}</td></tr>
//           </table>
//           <p style="margin-top:20px;">Please log in to your seller dashboard to process this order.</p>
//         </div>
//         <div style="background-color:#f4f4f4; padding:10px; text-align:center; font-size:12px; color:#777;">
//           &copy; ${new Date().getFullYear()} Your Store | All rights reserved.
//         </div>
//       </div>
//     `;

//     // ✅ Send with Brevo
//     const emailData = {
//       sender: { email: process.env.SMTP_FROM_EMAIL, name: "Your Store" },
//       to: [{ email: mailTo }],
//       subject: `🛍️ New Order from ${senderName}`,
//       htmlContent: emailHTML,
//     };

//     await tranEmailApi.sendTransacEmail(emailData);
//     console.log(`✅ Order email sent to ${mailTo}`);

//     res.json({ success: true, message: "Order placed successfully & email sent!" });
//   } catch (err) {
//     console.error("❌ Error placing order:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;






