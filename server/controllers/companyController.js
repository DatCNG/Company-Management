const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ===== LẤY TẤT CẢ CÔNG TY =====
exports.getAllCompanies = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM congty");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== LẤY CHI TIẾT 1 CÔNG TY =====
exports.getCompanyById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM congty WHERE MaCT = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy công ty!" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== THÊM CÔNG TY =====
exports.createCompany = async (req, res, next) => {
  try {
    const { TenCT, MoTa } = req.body;
    const Anh = req.file ? req.file.filename : null;

    if (!TenCT) throw new Error("Tên công ty không được để trống!");

    // Sinh mã CT tự động
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM congty");
    const nextId = rows[0].count + 1;
    const MaCT = "CT" + nextId.toString().padStart(2, "0");

    await db.query(
      "INSERT INTO congty (MaCT, TenCT, MoTa, Anh) VALUES (?, ?, ?, ?)",
      [MaCT, TenCT, MoTa, Anh]
    );

    res.status(201).json({ message: "✅ Thêm công ty thành công!", MaCT });
  } catch (err) {
    next(err);
  }
};

// ===== CẬP NHẬT CÔNG TY =====
exports.updateCompany = async (req, res) => {
  try {
    const { TenCT, MoTa } = req.body;
    const MaCT = req.params.id;

    // Lấy ảnh hiện tại trong DB
    const [rows] = await db.query("SELECT Anh FROM congty WHERE MaCT = ?", [
      MaCT,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy công ty!" });

    let Anh = rows[0].Anh;

    // Nếu upload ảnh mới → xóa ảnh cũ trong uploads
    if (req.file) {
      const oldPath = path.join(__dirname, "../uploads", Anh || "");
      if (Anh && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("🗑️ Đã xóa ảnh cũ:", Anh);
      }
      Anh = req.file.filename;
    }

    // Cập nhật DB
    await db.query(
      "UPDATE congty SET TenCT = ?, MoTa = ?, Anh = ? WHERE MaCT = ?",
      [TenCT, MoTa, Anh, MaCT]
    );

    res.json({ message: "✅ Cập nhật công ty thành công!" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật công ty:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===== XÓA CÔNG TY =====
exports.deleteCompany = async (req, res) => {
  try {
    const MaCT = req.params.id;

    // Lấy ảnh để xóa file vật lý
    const [rows] = await db.query("SELECT Anh FROM congty WHERE MaCT = ?", [
      MaCT,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy công ty!" });

    const Anh = rows[0].Anh;

    // Xóa trong DB
    await db.query("DELETE FROM congty WHERE MaCT = ?", [MaCT]);

    // Xóa file ảnh nếu tồn tại
    if (Anh) {
      const filePath = path.join(__dirname, "../uploads", Anh);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("🗑️ Đã xóa ảnh:", Anh);
      }
    }

    res.json({ message: "✅ Đã xóa công ty và ảnh liên quan!" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa công ty:", err);
    res.status(500).json({ error: err.message });
  }
};
