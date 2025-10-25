import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";

const XemNhanVien = ({ data, onClose }) => {
  const [nv, setNv] = useState(null);

  // Nếu đã có dữ liệu nhân viên từ props thì dùng, nếu không thì fetch từ API
  useEffect(() => {
    const fetchData = async () => {
      if (!data) return;
      if (data?.TenNV) {
        setNv(data);
      } else {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/employees/${data.MaNV}`
          );
          setNv(res.data);
        } catch (err) {
          console.error("❌ Lỗi tải nhân viên:", err);
        }
      }
    };
    fetchData();
  }, [data]);

  if (!nv)
    return (
      <div style={{ textAlign: "center", padding: "1rem" }}>
        Đang tải thông tin nhân viên...
      </div>
    );

  return (
    <div className="quanly-container qlct-container">
      <div className="chitiet chitiet-pb">
        {/* Avatar */}
        <div className="form-gr" style={{ justifyContent: "center" }}>
          <div className="avatar" style={{ textAlign: "center" }}>
            <img
              src={
                nv.Avatar
                  ? `http://localhost:5000/uploads/${nv.Avatar}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="avatar-img"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
            />
            <p style={{ marginTop: "0.5rem", fontWeight: 600 }}>
              {nv.TenNV || "Không rõ"}
            </p>
          </div>
        </div>

        {/* Mã & Tên */}
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Mã nhân viên:
              <p>{nv.MaNV}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Tên nhân viên:
              <p>{nv.TenNV}</p>
            </strong>
          </div>
        </div>

        {/* Liên hệ */}
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Số điện thoại:
              <p>{nv.SDT || "—"}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Email:
              <p>{nv.Email || "—"}</p>
            </strong>
          </div>
        </div>

        {/* Giới tính - Ngày sinh */}
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Giới tính:
              <p>{nv.GioiTinh || "—"}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Ngày sinh:
              <p>
                {nv.NgaySinh
                  ? new Date(nv.NgaySinh).toLocaleDateString("vi-VN")
                  : "—"}
              </p>
            </strong>
          </div>
        </div>

        {/* Ngày vào làm - Chức vụ - Vai trò */}
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Ngày vào làm:
              <p>
                {nv.NgayVao
                  ? new Date(nv.NgayVao).toLocaleDateString("vi-VN")
                  : "—"}
              </p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Chức vụ:
              <p>{nv.ChucVu || "—"}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Vai trò:
              <p>{nv.VaiTro || "—"}</p>
            </strong>
          </div>
        </div>

        {/* Công ty & Phòng ban */}
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Công ty:
              <p>{nv.TenCT || nv.MaCT || "—"}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Phòng ban:
              <p>{nv.TenPB || nv.MaPB || "—"}</p>
            </strong>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="form-gr">
          <div className="form-gr-content">
            <strong>
              Địa chỉ:
              <p>{nv.DiaChi || "—"}</p>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XemNhanVien;
