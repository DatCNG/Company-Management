import React, { useEffect, useState } from "react";
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

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form">
          {/* Ảnh + Họ tên */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Ảnh đại diện:</label>
              <input type="file" accept="image/*" />
            </div>
            <div className="form-gr-content">
              <label className="label">Họ và tên:</label>
              <input
                name="TenNV"
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
                type="email"
                className="input"
                placeholder="VD: ten@gmail.com"
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Số điện thoại:</label>
              <input
                name="SDT"
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
                type="text"
                className="input"
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Ngày vào làm:</label>
              <input
                name="NgayVao"
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
                className="input"
                readOnly
                style={{ backgroundColor: "#f5f5f5", color: "#555" }}
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Vai trò:</label>
              <input
                name="VaiTro"
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
                className="select"
              >
                <option value="">-- Chọn công ty --</option>
              </select>
            </div>
            <div className="form-gr-content">
              <label className="label">Phòng ban:</label>
              <select
                name="MaPB"
                className="select"
              >
                <option value="">-- Chọn phòng ban --</option>
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
            <button type="submit" className="button-them">
              <FiEdit2 style={{ marginRight: ".3rem" }} /> Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaNhanVien;
