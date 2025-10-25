// server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Cho phép truy cập ảnh tĩnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Import routes ===
const companyRoutes = require("./routes/companyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const duanRoutes = require("./routes/duanRoutes");

app.use("/api/companies", companyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/duan", duanRoutes);
// === Middleware xử lý lỗi ===
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server chạy tại http://localhost:${PORT}`)
);
