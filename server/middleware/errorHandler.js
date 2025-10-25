// server/middleware/errorHandler.js

// Middleware bắt lỗi tổng quát
function errorHandler(err, req, res, next) {
  console.error("⚠️ Lỗi:", err.message);

  // Lỗi từ multer (file upload)
  if (err.name === "MulterError") {
    return res.status(400).json({
      error: `Lỗi upload file: ${err.message}`,
    });
  }

  // Lỗi tùy chỉnh (ví dụ throw new Error("..."))
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  // Trường hợp lỗi khác
  res.status(500).json({
    error: "Lỗi máy chủ không xác định!",
  });
}

module.exports = errorHandler;
