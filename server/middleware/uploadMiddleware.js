const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif']; // Add more if needed

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${randomString}${fileExtension}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Check the file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'), false);
    }

    // Check the file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return cb(new Error('File size exceeds the maximum limit of 5MB.'), false);
    }

    // Both file extension and size are valid, allow the upload
    cb(null, true);
  },
});

module.exports = upload;
