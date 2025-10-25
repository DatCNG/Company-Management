// server/controllers/duanController.js
const db = require("../config/db");

/**
 * === Lấy tất cả dự án ===
 * GET /api/duan
 */
exports.getAllDuAn = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT da.*, nv.TenNV AS TenTruongDA
      FROM duan da
      LEFT JOIN nhanvien nv ON da.TruongDA = nv.MaNV
      ORDER BY da.MaDA ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách dự án:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * === Lấy 1 dự án theo mã ===
 * GET /api/duan/:id
 */
exports.getDuAnById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT da.*, nv.TenNV AS TenTruongDA
      FROM duan da
      LEFT JOIN nhanvien nv ON da.TruongDA = nv.MaNV
      WHERE da.MaDA = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy dự án!" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi lấy dự án:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * === Thêm dự án (tự tạo mã DA) ===
 * POST /api/duan
 */
exports.createDuAn = async (req, res) => {
  try {
    const { TenDA, TruongDA, NgayBatDau, NgayKetThuc, TrangThai, MoTa } =
      req.body;

    if (!TenDA) {
      return res.status(400).json({ message: "Thiếu tên dự án!" });
    }

    // ✅ Tạo mã DA tự động theo mã lớn nhất
    const [rows] = await db.query(
      "SELECT MaDA FROM duan ORDER BY MaDA DESC LIMIT 1"
    );
    let nextId = 1;
    if (rows.length > 0) {
      const last = rows[0].MaDA.replace("DA", "");
      nextId = parseInt(last) + 1;
    }
    const MaDA = "DA" + nextId.toString().padStart(2, "0");

    // ✅ Thêm dự án mới
    await db.query(
      `
      INSERT INTO duan (MaDA, TenDA, TruongDA, NgayBatDau, NgayKetThuc, TrangThai, MoTa)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        MaDA,
        TenDA,
        TruongDA || null,
        NgayBatDau || null,
        NgayKetThuc || null,
        TrangThai || 0,
        MoTa || null,
      ]
    );

    // ✅ Nếu có trưởng dự án thì cập nhật chức vụ
    if (TruongDA) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Trưởng dự án' WHERE MaNV = ?",
        [TruongDA]
      );
    }

    res.status(201).json({ message: "✅ Thêm dự án thành công!", MaDA });
  } catch (err) {
    console.error("❌ Lỗi khi thêm dự án:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * === Cập nhật dự án ===
 * PUT /api/duan/:id
 */
exports.updateDuAn = async (req, res) => {
  try {
    const MaDA = req.params.id;
    const { TenDA, TruongDA, NgayBatDau, NgayKetThuc, TrangThai, MoTa } =
      req.body;

    // ✅ Kiểm tra tồn tại
    const [check] = await db.query("SELECT * FROM duan WHERE MaDA = ?", [MaDA]);
    if (check.length === 0)
      return res.status(404).json({ message: "Không tìm thấy dự án!" });

    const oldTruongDA = check[0].TruongDA;

    // ✅ Nếu thay đổi trưởng dự án
    if (oldTruongDA && oldTruongDA !== TruongDA) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [oldTruongDA]
      );
    }

    if (TruongDA) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Trưởng dự án' WHERE MaNV = ?",
        [TruongDA]
      );
    }

    // ✅ Cập nhật dữ liệu
    await db.query(
      `
      UPDATE duan
      SET TenDA = ?, TruongDA = ?, NgayBatDau = ?, NgayKetThuc = ?, TrangThai = ?, MoTa = ?
      WHERE MaDA = ?
      `,
      [
        TenDA,
        TruongDA || null,
        NgayBatDau || null,
        NgayKetThuc || null,
        TrangThai || 0,
        MoTa || null,
        MaDA,
      ]
    );

    res.json({ message: "✅ Cập nhật dự án và chức vụ nhân viên thành công!" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật dự án:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * === Xóa dự án ===
 * DELETE /api/duan/:id
 */
exports.deleteDuAn = async (req, res) => {
  try {
    const MaDA = req.params.id;

    // ✅ Kiểm tra tồn tại
    const [rows] = await db.query("SELECT * FROM duan WHERE MaDA = ?", [MaDA]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy dự án!" });

    const TruongDA = rows[0].TruongDA;

    // ✅ Nếu có trưởng dự án thì hạ chức vụ
    if (TruongDA) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [TruongDA]
      );
    }

    // ✅ Xóa các công việc & phân công liên quan
    await db.query(
      "DELETE FROM phancong WHERE MaCV IN (SELECT MaCV FROM congviec WHERE MaDA = ?)",
      [MaDA]
    );
    await db.query("DELETE FROM congviec WHERE MaDA = ?", [MaDA]);
    await db.query("DELETE FROM thanhvienda WHERE MaDA = ?", [MaDA]);

    // ✅ Xóa dự án
    await db.query("DELETE FROM duan WHERE MaDA = ?", [MaDA]);

    res.json({
      message: "🗑️ Đã xóa dự án và cập nhật chức vụ nhân viên liên quan!",
    });
  } catch (err) {
    console.error("❌ Lỗi xóa dự án:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * === Cập nhật Trưởng dự án ===
 * PUT /api/duan/:MaDA/truongda
 */
exports.updateTruongDA = async (req, res) => {
  try {
    const { MaDA } = req.params;
    const { MaNV } = req.body; // nhân viên được chọn làm trưởng dự án

    if (!MaDA || !MaNV)
      return res
        .status(400)
        .json({ message: "Thiếu mã dự án hoặc mã nhân viên!" });

    // ✅ Lấy trưởng dự án hiện tại
    const [oldRows] = await db.query(
      "SELECT TruongDA FROM duan WHERE MaDA = ?",
      [MaDA]
    );
    const oldTruongDA = oldRows[0]?.TruongDA;

    // ✅ Cập nhật trưởng dự án mới
    await db.query("UPDATE duan SET TruongDA = ? WHERE MaDA = ?", [MaNV, MaDA]);

    // ✅ Hạ chức vụ người cũ (nếu khác người mới)
    if (oldTruongDA && oldTruongDA !== MaNV) {
      await db.query(
        "UPDATE nhanvien SET ChucVu = 'Nhân viên' WHERE MaNV = ?",
        [oldTruongDA]
      );
    }

    // ✅ Nâng chức vụ người mới
    await db.query(
      "UPDATE nhanvien SET ChucVu = 'Trưởng dự án' WHERE MaNV = ?",
      [MaNV]
    );

    res.json({
      message:
        "✅ Cập nhật trưởng dự án thành công và đồng bộ chức vụ nhân viên!",
    });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật trưởng dự án:", err);
    res.status(500).json({ error: err.message });
  }
};
