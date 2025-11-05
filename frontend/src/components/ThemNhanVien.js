import React, { useState, useEffect } from "react";
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

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form">
          {/* ẢNH + HỌ TÊN */}
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

          {/* CCCD */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">CCCD:</label>
              <input
                name="CCCD"
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
                type="date"
                className="input"
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Vai trò:</label>
              <input
                name="VaiTro"
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

          {/* NÚT HÀNH ĐỘNG */}
          <div className="button-group">
            <button
              type="button"
              className="button-cancel"
              onClick={() => onClose && onClose(false)}
            >
              Hủy
            </button>
            <button type="submit" className="button-them">
              <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemNhanVien;
