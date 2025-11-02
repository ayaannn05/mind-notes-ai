const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for subtitle files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".srt", ".vtt", ".txt", ".pdf", ".mp4", ".mp3"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only (.srt, .vtt, .txt, .pdf, .mp4, .mp3) files are allowed"), false);
  }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;