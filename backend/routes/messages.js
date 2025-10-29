const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Brevo = require("@getbrevo/brevo"); // ✅ Brevo SDK

// ✅ Setup Brevo client once
const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// ✅ Get chat messages between two users
router.get("/", async (req, res) => {
  const { sender, client } = req.query;

  if (!sender || !client) {
    return res.status(400).json({ error: "sender and client are required" });
  }

  const query = `
    SELECT m.chat_id, m.sender, m.client, m.text, m.timestamp
    FROM chat m
    WHERE (m.sender = ? AND m.client = ?)
       OR (m.sender = ? AND m.client = ?)
    ORDER BY m.timestamp ASC
  `;

  try {
    const [results] = await db.query(query, [sender, client, client, sender]);
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Send a new message
router.post("/send", async (req, res) => {
  const { sender, client, text } = req.body;

  if (!sender || !client || !text) {
    return res.status(400).json({ error: "sender, client and text are required" });
  }

  const insertQuery = `
    INSERT INTO chat (sender, client, text, timestamp)
    VALUES (?, ?, ?, NOW())
  `;

  try {
    const [result] = await db.query(insertQuery, [sender, client, text]);
    console.log("✅ Message saved:", result);

    // ✅ Fetch recipient info
    const [clientData] = await db.query(
      "SELECT email, name, is_online FROM customers WHERE customers_id = ?",
      [client]
    );

    // ✅ Fetch sender info
    const [senderData] = await db.query(
      "SELECT name FROM customers WHERE customers_id = ?",
      [sender]
    );

    if (clientData.length > 0 && senderData.length > 0) {
      const clientInfo = clientData[0];
      const senderName = senderData[0].name || "Someone";
      const { email, name, is_online } = clientInfo;

      // ✅ Send email only if user is offline
      if (!is_online) {
        await sendEmailNotification(email, name, senderName, text);
      }
    }

    res.json({ success: true, messageId: result.insertId });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Email Notification Helper using Brevo
async function sendEmailNotification(toEmail, toName, senderName, messageText) {
  const businessName = "WABLP Business Center";
  const replyLink = "https://wablp.com/login";
  const logoUrl = "https://wablp.com/assets/logo.png";

  // 💌 Branded WABLP Email Template
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: #1d4ed8; color: white; padding: 20px; text-align: center;">
          <img src="${logoUrl}" alt="WABLP Logo" style="max-width: 100px; margin-bottom: 10px;" />
          <h2 style="margin: 0;">New Message from ${senderName}</h2>
        </div>
        
        <!-- Body -->
        <div style="padding: 25px; color: #333333;">
          <p>Hi <strong>${toName || "there"}</strong>,</p>
          <p><strong>${senderName}</strong> just sent you a new message on <strong>${businessName}</strong>:</p>
          
          <blockquote style="border-left: 4px solid #1d4ed8; margin: 20px 0; padding-left: 12px; color: #555; font-style: italic;">
            ${messageText}
          </blockquote>
          
          <p>You can log in to your dashboard to view or reply to this message:</p>
          
          <a href="${replyLink}" 
            style="display: inline-block; margin-top: 15px; padding: 10px 25px; background: #1d4ed8; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Message
          </a>
        </div>

        <!-- Footer -->
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
          <p><a href="https://wablp.com" style="color: #1d4ed8; text-decoration: none;">Visit WABLP</a></p>
        </div>
      </div>
    </div>
  `;

  const emailData = {
    sender: { 
      email: process.env.SMTP_FROM_EMAIL || "noreply@wablp.com", 
      name: process.env.SMTP_FROM_NAME || "WABLP Business Center" 
    },
    to: [{ email: toEmail, name: toName }],
    subject: `💬 New message from ${senderName} on ${businessName}`,
    htmlContent: htmlTemplate,
  };

  try {
    await brevo.sendTransacEmail(emailData);
    console.log(`📧 Email notification sent via Brevo to ${toEmail}`);
  } catch (error) {
    console.error("❌ Failed to send email notification via Brevo:", error.message);
  }
}

module.exports = router;
























// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const nodemailer = require("nodemailer");

// // ✅ Setup email transporter once
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT) || 587,
//   service: process.env.SMTP_SERVICE,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// // const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST,
// //   port: process.env.SMTP_PORT,
// //   secure: false,
// //   auth: {
// //     user: process.env.SMTP_EMAIL,
// //     pass: process.env.SMTP_PASSWORD,
// //   },
// // });

// // ✅ Get chat messages between two users
// router.get("/", async (req, res) => {
//   const { sender, client } = req.query;

//   if (!sender || !client) {
//     return res.status(400).json({ error: "sender and client are required" });
//   }

//   const query = `
//     SELECT m.chat_id, m.sender, m.client, m.text, m.timestamp
//     FROM chat m
//     WHERE (m.sender = ? AND m.client = ?)
//        OR (m.sender = ? AND m.client = ?)
//     ORDER BY m.timestamp ASC
//   `;

//   try {
//     const [results] = await db.query(query, [sender, client, client, sender]);
//     res.json(results);
//   } catch (err) {
//     console.error("❌ Error fetching messages:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Send a new message
// router.post("/send", async (req, res) => {
//   const { sender, client, text } = req.body;

//   if (!sender || !client || !text) {
//     return res.status(400).json({ error: "sender, client and text are required" });
//   }

//   const insertQuery = `
//     INSERT INTO chat (sender, client, text, timestamp)
//     VALUES (?, ?, ?, NOW())
//   `;

//   try {
//     const [result] = await db.query(insertQuery, [sender, client, text]);
//     console.log("✅ Message saved:", result);

//     // ✅ Fetch recipient info
//     const [clientData] = await db.query(
//       "SELECT email, name, is_online FROM customers WHERE customers_id = ?",
//       [client]
//     );

//     // ✅ Fetch sender info
//     const [senderData] = await db.query(
//       "SELECT name FROM customers WHERE customers_id = ?",
//       [sender]
//     );

//     if (clientData.length > 0 && senderData.length > 0) {
//       const clientInfo = clientData[0];
//       const senderName = senderData[0].name || "Someone";
//       const { email, name, is_online } = clientInfo;

//       // ✅ Send email only if user is offline
//       if (!is_online) {
//         await sendEmailNotification(email, name, senderName, text);
//       }
//     }

//     res.json({ success: true, messageId: result.insertId });
//   } catch (err) {
//     console.error("❌ Error sending message:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Email Notification Helper
// async function sendEmailNotification(toEmail, toName, senderName, messageText) {
//   const businessName = "WABLP Business Center";
//   const replyLink = "https://wablp.com/login";
//   const logoUrl = "https://wablp.com/assets/logo.png"; // ✅ Replace with your actual logo URL

//   // 💌 Branded WABLP Email Template
//   const htmlTemplate = `
//     <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
//       <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
//         <!-- Header -->
//         <div style="background-color: #1d4ed8; color: white; padding: 20px; text-align: center;">
//           <img src="${logoUrl}" alt="WABLP Logo" style="max-width: 100px; margin-bottom: 10px;" />
//           <h2 style="margin: 0;">New Message from ${senderName}</h2>
//         </div>
        
//         <!-- Body -->
//         <div style="padding: 25px; color: #333333;">
//           <p>Hi <strong>${toName || "there"}</strong>,</p>
//           <p><strong>${senderName}</strong> just sent you a new message on <strong>${businessName}</strong>:</p>
          
//           <blockquote style="border-left: 4px solid #1d4ed8; margin: 20px 0; padding-left: 12px; color: #555; font-style: italic;">
//             ${messageText}
//           </blockquote>
          
//           <p>You can log in to your dashboard to view or reply to this message:</p>
          
//           <a href="${replyLink}" 
//             style="display: inline-block; margin-top: 15px; padding: 10px 25px; background: #1d4ed8; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
//             View Message
//           </a>
//         </div>

//         <!-- Footer -->
//         <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
//           <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
//           <p><a href="https://wablp.com" style="color: #1d4ed8; text-decoration: none;">Visit WABLP</a></p>
//         </div>
//       </div>
//     </div>
//   `;

//   const mailOptions = {
//     from: `"${businessName}" <${process.env.SMTP_FROM_EMAIL}>`,
//     to: toEmail,
//     subject: `💬 New message from ${senderName} on ${businessName}`,
//     html: htmlTemplate,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email notification sent to ${toEmail}`);
//   } catch (error) {
//     console.error("❌ Failed to send email notification:", error.message);
//   }
// }

// module.exports = router;

