// config/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or replace with another SMTP service
  auth: {
    user: process.env.EMAIL_USER, // your Gmail or SMTP username
    pass: process.env.EMAIL_PASS, // your Gmail app password
  },
});

/**
 * Sends a notification email when a new message is received.
 * @param {string} to - Receiver email address
 * @param {string} senderName - Name of the sender
 * @param {string} appName - Name of the app
 * @param {string} appUrl - URL to open the chat
 * @param {string} messagePreview - Short preview of the chat message
 */
async function sendNotificationEmail(to, senderName, appName, appUrl, messagePreview) {
  const trimmedPreview =
    messagePreview.length > 100
      ? messagePreview.substring(0, 100) + "..."
      : messagePreview;

  const mailOptions = {
    from: `"${appName} Chat" <${process.env.EMAIL_USER}>`,
    to,
    subject: `💬 New Message from ${senderName}`,
    text: `You have a new message from ${senderName} on ${appName}:\n\n"${trimmedPreview}"\n\nClick here to reply: ${appUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 500px;">
        <h3>New Message from ${senderName}</h3>
        <p style="background:#f1f1f1; padding:10px; border-radius:5px;">
          "${trimmedPreview}"
        </p>
        <p>You have a new message waiting for you on <b>${appName}</b>.</p>
        <p>
          <a href="${appUrl}" style="background:#007bff; color:#fff; padding:10px 15px; text-decoration:none; border-radius:4px;">
            Go to Chat
          </a>
        </p>
        <p style="font-size: 12px; color: #888;">If you didn’t expect this message, you can safely ignore it.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationEmail };
