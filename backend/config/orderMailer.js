// config/orderMailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Send mail function
async function sendOrderMail(to, subject, html, senderName = "Customer") {
  const mailOptions = {
    from: `"${senderName}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Order email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending order email:", err);
  }
}

module.exports = sendOrderMail;
