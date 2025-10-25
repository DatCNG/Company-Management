const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// === Lấy danh sách nhân viên (lọc theo phòng ban / công ty) ===
exports.getAllEmployees = async (req, res) => {
  try {
    const { MaPB, MaCT } = req.query;
    let query = `
      SELECT nv.*, pb.TenPB, ct.TenCT, bl.BacLuong, bl.HSLuong, tk.UserName
      FROM nhanvien nv
      LEFT JOIN phongban pb ON nv.MaPB = pb.MaPB
      LEFT JOIN congty ct ON nv.MaCT = ct.MaCT
      LEFT JOIN bacluong bl ON nv.MaLuong = bl.MaLuong
      LEFT JOIN taikhoan tk ON nv.MaTK = tk.MaTK
      WHERE 1=1
    `;
    const params = [];

    if (MaPB) {
      query += " AND nv.MaPB = ?";
      params.push(MaPB);
    }
    if (MaCT) {
      query += " AND nv.MaCT = ?";
      params.push(MaCT);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách nhân viên:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Lấy 1 nhân viên theo mã ===
exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT nv.*, pb.TenPB, ct.TenCT, bl.BacLuong, bl.HSLuong, tk.UserName
      FROM nhanvien nv
      LEFT JOIN phongban pb ON nv.MaPB = pb.MaPB
      LEFT JOIN congty ct ON nv.MaCT = ct.MaCT
      LEFT JOIN bacluong bl ON nv.MaLuong = bl.MaLuong
      LEFT JOIN taikhoan tk ON nv.MaTK = tk.MaTK
      WHERE nv.MaNV = ?
    `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy nhân viên!" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi khi lấy nhân viên:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Thêm nhân viên (tự động mã NV, upload ảnh, mặc định chức vụ "Nhân viên") ===
exports.createEmployee = async (req, res) => {
  try {
    const {
      TenNV,
      Email,
      SDT,
      VaiTro,
      GioiTinh,
      NgaySinh,
      CCCD,
      DiaChi,
      NgayVao,
      MaPB,
      MaCT,
      MaLuong,
      MaTK,
    } = req.body;

    const Avatar = req.file ? req.file.filename : null;

    // ✅ Sinh mã NV tự động (NV01, NV02,...)
    const [countRows] = await db.query(
      "SELECT COUNT(*) AS total FROM nhanvien"
    );
    const nextId = countRows[0].total + 1;
    const MaNV = "NV" + nextId.toString().padStart(2, "0");

    // ✅ Mặc định chức vụ là "Nhân viên"
    const ChucVu = "Nhân viên";

    await db.query(
      `
      INSERT INTO nhanvien
      (MaNV, TenNV, Email, SDT, ChucVu, VaiTro, GioiTinh, Avatar,
       NgaySinh, CCCD, DiaChi, NgayVao, MaPB, MaCT, MaLuong, MaTK)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        MaNV,
        TenNV,
        Email,
        SDT,
        ChucVu, // ✅ luôn là “Nhân viên”
        VaiTro || null,
        GioiTinh,
        Avatar,
        NgaySinh,
        CCCD,
        DiaChi,
        NgayVao || null,
        MaPB || null,
        MaCT || null,
        MaLuong || null,
        MaTK || null,
      ]
    );

    res.status(201).json({ message: "✅ Thêm nhân viên thành công!", MaNV });
  } catch (err) {
    console.error("❌ Lỗi khi thêm nhân viên:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Cập nhật nhân viên (xóa ảnh cũ nếu thay ảnh mới) ===
exports.updateEmployee = async (req, res) => {
  try {
    const MaNV = req.params.id;
    const {
      TenNV,
      Email,
      SDT,
      ChucVu,
      VaiTro,
      GioiTinh,
      NgaySinh,
      CCCD,
      DiaChi,
      NgayVao,
      MaPB,
      MaCT,
      MaLuong,
      MaTK,
    } = req.body;

    const [rows] = await db.query(
      "SELECT Avatar FROM nhanvien WHERE MaNV = ?",
      [MaNV]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy nhân viên!" });

    let Avatar = rows[0].Avatar;
    if (req.file) {
      if (Avatar) {
        const oldPath = path.join(__dirname, "../uploads", Avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      Avatar = req.file.filename;
    }

    await db.query(
      `
      UPDATE nhanvien SET
      TenNV=?, Email=?, SDT=?, ChucVu=?, VaiTro=?, GioiTinh=?, Avatar=?,
      NgaySinh=?, CCCD=?, DiaChi=?, NgayVao=?, MaPB=?, MaCT=?, MaLuong=?, MaTK=?
      WHERE MaNV=?
      `,
      [
        TenNV,
        Email,
        SDT,
        ChucVu || "Nhân viên", // ✅ nếu không truyền lên, giữ là “Nhân viên”
        VaiTro || null,
        GioiTinh,
        Avatar,
        NgaySinh,
        CCCD,
        DiaChi,
        NgayVao || null,
        MaPB || null,
        MaCT || null,
        MaLuong || null,
        MaTK || null,
        MaNV,
      ]
    );

    res.json({ message: "✅ Cập nhật nhân viên thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật nhân viên:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Xóa nhân viên (xóa luôn ảnh nếu có) ===
exports.deleteEmployee = async (req, res) => {
  try {
    const MaNV = req.params.id;
    const [rows] = await db.query(
      "SELECT Avatar FROM nhanvien WHERE MaNV = ?",
      [MaNV]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy nhân viên!" });

    const avatarFile = rows[0].Avatar;
    if (avatarFile) {
      const filePath = path.join(__dirname, "../uploads", avatarFile);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.query("DELETE FROM nhanvien WHERE MaNV = ?", [MaNV]);
    res.json({ message: "🗑️ Đã xóa nhân viên và ảnh liên quan!" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa nhân viên:", err);
    res.status(500).json({ error: err.message });
  }
};
