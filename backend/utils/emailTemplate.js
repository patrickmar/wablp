// utils/emailTemplate.js

module.exports.buildEmailTemplate = ({
  title,
  intro,
  contentHTML,
  actionText,
  actionUrl,
}) => {
  const year = new Date().getFullYear();

  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#1d4ed8; color:#ffffff; padding:20px; text-align:center;">
        <h2 style="margin:0;">${title}</h2>
      </div>

      <!-- BODY -->
      <div style="padding:25px; color:#333;">
        <p>${intro}</p>

        ${contentHTML}

        ${
          actionUrl
            ? `
          <div style="text-align:center; margin-top:25px;">
            <a href="${actionUrl}"
              style="display:inline-block; padding:12px 25px; background:#1d4ed8; color:#ffffff;
              text-decoration:none; border-radius:5px; font-weight:bold;">
              ${actionText || "View"}
            </a>
          </div>
        `
            : ""
        }
      </div>

      <!-- FOOTER -->
      <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
        © ${year} WABLP Business Center · <a href="https://wablp.com" style="color:#1d4ed8;text-decoration:none;">Visit Website</a>
      </div>

    </div>
  </div>
  `;
};
