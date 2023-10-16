const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png']; // Add more if needed

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${randomString}${fileExtension}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

module.exports = upload;
