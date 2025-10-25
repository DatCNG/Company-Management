const db = require("../config/db");

// === Lấy tất cả phòng ban ===
exports.getAllDepartments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pb.*, ct.TenCT, nv.TenNV AS TruongPhongTen
      FROM phongban pb
      LEFT JOIN congty ct ON pb.MaCT = ct.MaCT
      LEFT JOIN nhanvien nv ON pb.TruongPhong = nv.MaNV
      ORDER BY pb.MaPB ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách phòng ban:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Lấy 1 phòng ban theo mã ===
exports.getDepartmentById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT pb.*, ct.TenCT, nv.TenNV AS TruongPhongTen
      FROM phongban pb
      LEFT JOIN congty ct ON pb.MaCT = ct.MaCT
      LEFT JOIN nhanvien nv ON pb.TruongPhong = nv.MaNV
      WHERE pb.MaPB = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy phòng ban!" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi lấy phòng ban:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Thêm phòng ban (tự động tạo MaPB) ===
exports.createDepartment = async (req, res) => {
  try {
    const { TenPB, MoTa, MaCT, TruongPhong } = req.body;

    if (!TenPB || !MaCT) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // ✅ Tạo mã PB tự động theo mã lớn nhất
    const [rows] = await db.query(
      "SELECT MaPB FROM phongban ORDER BY MaPB DESC LIMIT 1"
    );
    let nextId = 1;
    if (rows.length > 0) {
      const last = rows[0].MaPB.replace("PB", "");
      nextId = parseInt(last) + 1;
    }
    const MaPB = "PB" + nextId.toString().padStart(2, "0");

    await db.query(
      `
      INSERT INTO phongban (MaPB, TenPB, MoTa, MaCT, TruongPhong)
      VALUES (?, ?, ?, ?, ?)
      `,
      [MaPB, TenPB, MoTa, MaCT, TruongPhong || null]
    );

    res.status(201).json({ message: "✅ Thêm phòng ban thành công!", MaPB });
  } catch (err) {
    console.error("❌ Lỗi khi thêm phòng ban:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Cập nhật phòng ban ===
exports.updateDepartment = async (req, res) => {
  try {
    const { TenPB, MoTa, MaCT, TruongPhong } = req.body;
    const MaPB = req.params.id;

    // Kiểm tra tồn tại
    const [check] = await db.query("SELECT * FROM phongban WHERE MaPB = ?", [
      MaPB,
    ]);
    if (check.length === 0)
      return res.status(404).json({ message: "Không tìm thấy phòng ban!" });

    const oldTP = check[0].TruongPhong; // Trưởng phòng cũ

    // ✅ Nếu trưởng phòng thay đổi
    if (oldTP && oldTP !== TruongPhong) {
      // Gán nhân viên cũ về "Nhân viên"
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [oldTP]
      );
    }

    if (TruongPhong) {
      // Gán nhân viên mới là "Trưởng phòng"
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Trưởng phòng' WHERE MaNV = ?",
        [TruongPhong]
      );
    }

    // ✅ Cập nhật thông tin phòng ban
    await db.query(
      `
      UPDATE phongban
      SET TenPB = ?, MoTa = ?, MaCT = ?, TruongPhong = ?
      WHERE MaPB = ?
      `,
      [TenPB, MoTa, MaCT, TruongPhong || null, MaPB]
    );

    res.json({
      message: "✅ Cập nhật phòng ban và đồng bộ chức vụ nhân viên!",
    });
  } catch (err) {
    console.error("❌ Lỗi cập nhật phòng ban:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteDepartment = async (req, res) => {
  try {
    const MaPB = req.params.id;

    // Kiểm tra tồn tại
    const [rows] = await db.query("SELECT * FROM phongban WHERE MaPB = ?", [
      MaPB,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy phòng ban!" });

    const TruongPhong = rows[0].TruongPhong;

    // ✅ Nếu có trưởng phòng thì gán lại chức vụ
    if (TruongPhong) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [TruongPhong]
      );
    }

    // Cập nhật nhân viên thuộc phòng này -> null
    await db.query("UPDATE nhanvien SET MaPB = NULL WHERE MaPB = ?", [MaPB]);

    // Xóa phòng ban
    await db.query("DELETE FROM phongban WHERE MaPB = ?", [MaPB]);

    res.json({
      message: "🗑️ Đã xóa phòng ban và cập nhật chức vụ nhân viên liên quan!",
    });
  } catch (err) {
    console.error("❌ Lỗi xóa phòng ban:", err);
    res.status(500).json({ error: err.message });
  }
};

// === Cập nhật Trưởng phòng (và cập nhật chức vụ nhân viên) ===
exports.updateTruongPhong = async (req, res) => {
  try {
    const { MaPB } = req.params; // Mã phòng ban
    const { MaNV } = req.body; // Nhân viên được chọn làm trưởng phòng

    if (!MaPB || !MaNV) {
      return res
        .status(400)
        .json({ message: "Thiếu mã phòng ban hoặc mã nhân viên!" });
    }

    // 🔍 Lấy trưởng phòng hiện tại (nếu có)
    const [oldRows] = await db.query(
      "SELECT TruongPhong FROM phongban WHERE MaPB = ?",
      [MaPB]
    );
    const oldTruongPhong = oldRows[0]?.TruongPhong;

    // ✅ Cập nhật trưởng phòng mới cho phòng ban
    await db.query("UPDATE phongban SET TruongPhong = ? WHERE MaPB = ?", [
      MaNV,
      MaPB,
    ]);

    // 🔁 Nếu có người cũ khác người mới → hạ chức vụ xuống “Nhân viên”
    if (oldTruongPhong && oldTruongPhong !== MaNV) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [oldTruongPhong]
      );
    }

    // ✅ Nâng chức vụ người mới lên “Trưởng phòng”
    await db.query(
      "UPDATE nhanvien SET ChucVu = 'Trưởng phòng' WHERE MaNV = ?",
      [MaNV]
    );

    res.json({
      message:
        "✅ Cập nhật trưởng phòng thành công và đã đổi chức vụ nhân viên!",
    });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật trưởng phòng:", err);
    res.status(500).json({ error: err.message });
  }
};
