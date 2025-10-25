import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import { FiEdit2 } from "react-icons/fi";

const SuaNhanVien = ({ data, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    MaNV: "",
    TenNV: "",
    Email: "",
    SDT: "",
    GioiTinh: "",
    NgaySinh: "",
    CCCD: "",
    NgayVao: "",
    ChucVu: "",
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

  // ✅ Lấy dữ liệu nhân viên + danh sách công ty / phòng ban
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ctyRes, pbRes] = await Promise.all([
          axios.get("http://localhost:5000/api/companies"),
          axios.get("http://localhost:5000/api/departments"),
        ]);
        setCompanies(ctyRes.data);
        setDepartments(pbRes.data);

        if (data?.MaNV) {
          const res = await axios.get(
            `http://localhost:5000/api/employees/${data.MaNV}`
          );
          const nv = res.data;
          setForm({
            MaNV: nv.MaNV || "",
            TenNV: nv.TenNV || "",
            Email: nv.Email || "",
            SDT: nv.SDT || "",
            GioiTinh: nv.GioiTinh || "",
            NgaySinh: nv.NgaySinh ? nv.NgaySinh.split("T")[0] : "",
            CCCD: nv.CCCD || "",
            NgayVao: nv.NgayVao ? nv.NgayVao.split("T")[0] : "",
            ChucVu: nv.ChucVu || "",
            VaiTro: nv.VaiTro || "",
            DiaChi: nv.DiaChi || "",
            MaPB: nv.MaPB || "",
            MaCT: nv.MaCT || "",
            MaLuong: nv.MaLuong || "",
          });
          if (nv.Avatar)
            setPreview(`http://localhost:5000/uploads/${nv.Avatar}`);
        }
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu nhân viên:", err);
      }
    };
    fetchData();
  }, [data]);

  // Xử lý đổi ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Xử lý nhập liệu
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Gửi cập nhật nhân viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      if (avatar) fd.append("Avatar", avatar);

      await axios.put(`http://localhost:5000/api/employees/${form.MaNV}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Cập nhật nhân viên thành công!");
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật nhân viên:", err);
      alert("Không thể cập nhật nhân viên!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          {/* Ảnh + Họ tên */}
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
              />
            </div>
          </div>

          {/* Email - SĐT */}
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
              />
            </div>
          </div>

          {/* Giới tính - Ngày sinh */}
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

          {/* CCCD + Ngày vào */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">CCCD:</label>
              <input
                name="CCCD"
                value={form.CCCD}
                onChange={handleChange}
                type="text"
                className="input"
              />
            </div>
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
          </div>

          {/* Chức vụ + Vai trò */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Chức vụ:</label>
              <input
                name="ChucVu"
                value={form.ChucVu}
                onChange={handleChange}
                className="input"
                readOnly
                style={{ backgroundColor: "#f5f5f5", color: "#555" }}
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Vai trò:</label>
              <input
                name="VaiTro"
                value={form.VaiTro}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Địa chỉ:</label>
              <textarea
                name="DiaChi"
                value={form.DiaChi}
                onChange={handleChange}
                className="textarea"
              />
            </div>
          </div>

          {/* Công ty & phòng ban */}
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

          {/* Buttons */}
          <div className="button-group">
            <button
              type="button"
              className="button-cancel"
              onClick={() => onClose && onClose()}
            >
              Hủy
            </button>
            <button type="submit" className="button-add">
              <FiEdit2 style={{ marginRight: ".3rem" }} /> Sửa nhân viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaNhanVien;
