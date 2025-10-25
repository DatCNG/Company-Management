// server/middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// === Cấu hình nơi lưu ảnh ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// === Giới hạn và lọc file ===
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const isExtOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const isMimeOk = allowed.test(file.mimetype);
  if (isExtOk && isMimeOk) return cb(null, true);
  cb(new Error("❌ Chỉ chấp nhận file ảnh (.jpg, .jpeg, .png, .gif)"));
};

// === Khởi tạo upload ===
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
