const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS (true only for 465)
  auth: {
    user: process.env.SMTP_USER, // always "apikey"
    pass: process.env.SMTP_PASS, // Brevo API key
  },
});

// ✅ Verify SMTP connection at startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Brevo SMTP connection failed:", error.message);
  } else {
    console.log("✅ Brevo SMTP is ready to send emails");
  }
});

async function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };















// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),
//   secure: true, // REQUIRED for 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, // cPanel cert compatibility
//   },
// });

// // Optional: verify connection at startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP connection failed:", error.message);
//   } else {
//     console.log("✅ SMTP server is ready to send emails");
//   }
// });

// module.exports.sendEmail = async ({ to, subject, html }) => {
//   await transporter.sendMail({
//     from: `WABLP Business Center <${process.env.EMAIL_FROM}>`,
//     to,
//     subject,
//     html,
//   });
// };
