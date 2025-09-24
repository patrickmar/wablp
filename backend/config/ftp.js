const ftp = require("basic-ftp");
const { Readable } = require("stream");

async function uploadToFTP(file) {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST || "ftp.wablp.com",
      user: process.env.FTP_USER || "wablp",
      password: process.env.FTP_PASSWORD, // keep in .env
      port: 21,
      secure: false
    });

    // Convert Multer buffer → stream
    const stream = Readable.from(file.buffer);

    // Upload into public_html/uploads/
    const remotePath = `/public_html/uploads/${file.originalname}`;
    await client.uploadFrom(stream, remotePath);

    console.log("✅ File uploaded to FTP:", remotePath);
    return remotePath; // return path for saving in DB
  } catch (err) {
    console.error("❌ FTP Upload Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports = { uploadToFTP };
