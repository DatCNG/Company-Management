import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const ThemNhanVien = ({ onClose }) => {
  const [form, setForm] = useState({
    TenNV: "",
    Email: "",
    SDT: "",
    GioiTinh: "",
    NgaySinh: "",
    CCCD: "",
    NgayVao: "",
    VaiTro: "",
    DiaChi: "",
    MaPB: "",
    MaCT: "",
    MaLuong: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);

  // 🧭 Lấy danh sách công ty và phòng ban
  useEffect(() => {
    const fetchRefs = async () => {
      try {
        const [cty, pb] = await Promise.all([
          axios.get("http://localhost:5000/api/companies"),
          axios.get("http://localhost:5000/api/departments"),
        ]);
        setCompanies(cty.data);
        setDepartments(pb.data);
      } catch (err) {
        console.error("❌ Lỗi tải danh sách tham chiếu:", err);
      }
    };
    fetchRefs();
  }, []);

  // Cập nhật form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.TenNV.trim()) return alert("⚠️ Vui lòng nhập tên nhân viên!");
      if (!form.MaCT) return alert("⚠️ Vui lòng chọn công ty!");
      if (!form.MaPB) return alert("⚠️ Vui lòng chọn phòng ban!");

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      if (avatar) fd.append("Avatar", avatar);

      await axios.post("http://localhost:5000/api/employees", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Thêm nhân viên thành công!");
      onClose?.(true);
    } catch (err) {
      console.error("❌ Lỗi khi thêm nhân viên:", err);
      alert("❌ Lỗi khi thêm nhân viên!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          {/* ẢNH + HỌ TÊN */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Ảnh đại diện:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </div>
            <div className="form-gr-content">
              <label className="label">Họ và tên:</label>
              <input
                name="TenNV"
                value={form.TenNV}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Nhập họ và tên..."
                required
              />
            </div>
          </div>

          {/* EMAIL - SĐT */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Email:</label>
              <input
                name="Email"
                value={form.Email}
                onChange={handleChange}
                type="email"
                className="input"
                placeholder="VD: ten@gmail.com"
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Số điện thoại:</label>
              <input
                name="SDT"
                value={form.SDT}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Nhập số điện thoại..."
              />
            </div>
          </div>

          {/* GIỚI TÍNH - NGÀY SINH */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Giới tính:</label>
              <select
                name="GioiTinh"
                value={form.GioiTinh}
                onChange={handleChange}
                className="select"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="form-gr-content">
              <label className="label">Ngày sinh:</label>
              <input
                name="NgaySinh"
                value={form.NgaySinh}
                onChange={handleChange}
                type="date"
                className="input"
              />
            </div>
          </div>

          {/* CCCD */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">CCCD:</label>
              <input
                name="CCCD"
                value={form.CCCD}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Nhập số CCCD..."
              />
            </div>
          </div>

          {/* NGÀY VÀO LÀM - VAI TRÒ */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Ngày vào làm:</label>
              <input
                name="NgayVao"
                value={form.NgayVao}
                onChange={handleChange}
                type="date"
                className="input"
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Vai trò:</label>
              <input
                name="VaiTro"
                value={form.VaiTro}
                onChange={handleChange}
                className="input"
                placeholder="VD: Quản lý, Người dùng..."
              />
            </div>
          </div>

          {/* ĐỊA CHỈ */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Địa chỉ:</label>
              <textarea
                name="DiaChi"
                value={form.DiaChi}
                onChange={handleChange}
                className="textarea"
                placeholder="Nhập địa chỉ..."
              />
            </div>
          </div>

          {/* CÔNG TY - PHÒNG BAN */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Công ty:</label>
              <select
                name="MaCT"
                value={form.MaCT}
                onChange={handleChange}
                className="select"
              >
                <option value="">-- Chọn công ty --</option>
                {companies.map((ct) => (
                  <option key={ct.MaCT} value={ct.MaCT}>
                    {ct.TenCT}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-gr-content">
              <label className="label">Phòng ban:</label>
              <select
                name="MaPB"
                value={form.MaPB}
                onChange={handleChange}
                className="select"
              >
                <option value="">-- Chọn phòng ban --</option>
                {departments.map((pb) => (
                  <option key={pb.MaPB} value={pb.MaPB}>
                    {pb.TenPB}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* NÚT HÀNH ĐỘNG */}
          <div className="button-group">
            <button
              type="button"
              className="button-cancel"
              onClick={() => onClose && onClose(false)}
            >
              Hủy
            </button>
            <button type="submit" className="button-add">
              <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm nhân viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemNhanVien;
