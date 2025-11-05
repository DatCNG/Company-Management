import React, { useEffect, useMemo, useRef, useState } from "react";

import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { FaRegEye, FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import "../styles/style.css";

const XemNhanVien = () => {
  // Phân trang
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);

  // ========== STATE ==========
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  // Edit mode cho cột trái
  const [editMode, setEditMode] = useState(false);

  // Form state chỉ dùng cho cột trái
  const [form, setForm] = useState({
    fullName: "Cao Nguyễn Gia Đạt",
    email: "cngdat@gmail.com",
    phone: "0949566519",
    gioitinh: "",
    ngaysinh: "",
    diachi: "",
    // có thể mở rộng thêm trường khác nếu bạn muốn hiển thị ở cột trái
  });

  // Lưu tạm để cho phép Hủy
  const [backupForm, setBackupForm] = useState(form);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE)),
    [totalRows]
  );

  const applyPagination = () => {
    const tbody = tbodyRef.current;
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    rows.forEach((tr, idx) => {
      tr.style.display = idx >= start && idx < end ? "" : "none";
    });
  };

  useEffect(() => {
    applyPagination();
  }, [currentPage, totalRows]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ====== Handlers cho edit mode cột trái ======
  const onStartEdit = () => {
    setBackupForm(form); // lưu lại để có thể hủy
    setEditMode(true);
  };

  const onCancelEdit = () => {
    setForm(backupForm); // khôi phục
    setEditMode(false);
  };

  const onSave = () => {
    // Frontend only: tạm thời coi như đã lưu
    setEditMode(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="chitiet chitiet-pb">
        <div className="chitiet-one">
          {/* ========== CỘT TRÁI ========== */}
          <div className="chitiet-content col-4">
            {/* Nút edit ở góc trên */}
            {!editMode && (
              <div className="edit-pf">
                <button title="Sửa thông tin" onClick={onStartEdit}>
                  <FaEdit />
                </button>
              </div>
            )}

            <div className="form-gr" style={{ justifyContent: "center" }}>
              <div className="avatar" style={{ textAlign: "center" }}>
                <img
                  className="avatar-img"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ddd",
                  }}
                  alt="avatar"
                  src=""
                />

                {/* Nếu đang sửa thì hiện nút Thay Avatar */}
              </div>
            </div>
            {editMode && (
              <div style={{
                marginTop: ".75rem",
                display: "flex",
                justifyContent: "center"
              }}>
                <button
                  type="button"
                  className="button-avt"
                  onClick={() => alert("Chỉ minh họa front-end: mở file chooser")}
                >
                  Đổi ảnh đại diện
                </button>
              </div>
            )}

            {/* Họ và tên */}
            <div className="form-gr under-line" style={{ marginTop: '1.5rem' }}>
              <div className="form-gr-content">
                <strong>Họ và tên:
                  {!editMode ? (
                    <p>{form.fullName}</p>
                  ) : (
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      className="input"
                      placeholder="Nhập họ và tên"
                    />
                  )}
                </strong>
              </div>
            </div>

            {/* Email */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>Email:
                  {!editMode ? (
                    <p>{form.email}</p>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="input"
                      placeholder="Nhập email"
                    />
                  )}
                </strong>
              </div>
            </div>

            {/* SĐT */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>SĐT:
                  {!editMode ? (
                    <p>{form.phone}</p>
                  ) : (
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="input"
                      placeholder="Nhập số điện thoại"
                    />
                  )}
                </strong>
              </div>
            </div>

            {/* Hàng nút Lưu / Hủy (dưới cùng cột trái) */}
            {editMode && (
              <div
                className="form-gr"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                  marginTop: ".25rem",
                }}
              >
                <button className="button-outline" type="button" onClick={onCancelEdit}>
                  Hủy
                </button>
                <button className="button-primary" type="button" onClick={onSave}>
                  Lưu
                </button>
              </div>
            )}
          </div>

          {/* ========== CỘT PHẢI (thông tin chi tiết) ========== */}
          <div className="chitiet-content" style={{ width: "100%" }}>
            <div className="chitiet-title">
              <h3>Thông Tin Cá Nhân</h3>
            </div>
            {/* Mã & Tên */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>
                  Mã nhân viên:
                  {!editMode ? (
                    <p>-</p>
                  ) : (
                    <input
                      type="text"
                      name="fullName"
                      onChange={onChange}
                      className="input"
                      disabled
                    />
                  )}
                </strong>
              </div>
              <div className="form-gr-content">
                <strong>
                  Giới tính:
                  {editMode ? (
                    <select className="input" value={form.gioitinh}
                      onChange={onChange} name="gioitinh">
                      <option value="" disabled>Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  ) : (
                    <p>{form.gioitinh}</p>
                  )}
                </strong>
              </div>
            </div>

            {/* Liên hệ */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>
                  Ngày sinh:
                  {editMode ? (
                    <input type="date" className="input" name="ngaysinh" onChange={onChange} value={form.ngaysinh} />
                  ) : (
                    <p>{form.ngaysinh}</p>
                  )}
                </strong>
              </div>
              <div className="form-gr-content">
                <strong>
                  Địa chỉ:
                  {editMode ? (
                    <input className="input" name="diachi" onChange={onChange} value={form.diachi} placeholder="Nhập địa chỉ" />
                  ) : (
                    <p>{form.diachi}</p>
                  )}
                </strong>
              </div>
            </div>
            <h3>Thông Tin Công Việc</h3>
            {/* Ngày vào làm - Chức vụ - Vai trò */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>
                  Ngày vào làm:
                  <p>-</p>
                </strong>
              </div>
              <div className="form-gr-content">
                <strong>
                  Chức vụ:
                  <p>-</p>
                </strong>
              </div>
              <div className="form-gr-content">
                <strong>
                  Vai trò:
                  <p>-</p>
                </strong>
              </div>
            </div>

            {/* Công ty & Phòng ban */}
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>
                  Công ty:
                  <p>-</p>
                </strong>
              </div>
              <div className="form-gr-content">
                <strong>
                  Phòng ban:
                  <p>-</p>
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ========== DỰ ÁN ========== */}
        <div className="chitiet-content">
          <h3>Dự Án</h3>
          <div className="form-gr-content">
            <strong>Danh sách dự án đang tham gia:</strong>
          </div>
          <div className="quanly-body qlct-body" ref={tbodyRef}>
            <div className="table-container">
              <table className="quanly-table">
                <thead className="quanly-thead qlct-thead">
                  <tr>
                    <th>STT</th>
                    <th>Mã dự án</th>
                    <th>Tên dự án</th>
                    <th>Trưởng dự án</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
                  <tr>
                    <td>1</td>
                    <td>DA01</td>
                    <td>Dự Án 01</td>
                    <td>Nguyễn Văn A</td>
                    <td>1-1-2025</td>
                    <td>1-2-2025</td>
                    <td>Đang hoàn thành</td>
                    <td>
                      <button className="button-xem quanly-button-xem">
                        <FaRegEye />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Phân trang */}
            <div className="quanly-phantrang">
              <button
                className="phantrang-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <TfiBackLeft />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`phantrang-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="phantrang-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <TfiBackRight />
              </button>
            </div>
          </div>
        </div>

        {/* ========== CÔNG VIỆC ========== */}
        <div className="chitiet-content">
          <h3>Công Việc</h3>
          <div className="form-gr-content">
            <strong>Danh sách công việc đang thực hiện:</strong>
          </div>
          <div className="quanly-body qlct-body" ref={tbodyRef}>
            <div className="table-container">
              <table className="quanly-table">
                <thead className="quanly-thead qlct-thead">
                  <tr>
                    <th>STT</th>
                    <th>Mã công việc</th>
                    <th>Tên công việc</th>
                    <th>Tên dự án</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
                  <tr>
                    <td>1</td>
                    <td>CV01</td>
                    <td>Công việc 01</td>
                    <td>Dự án 01</td>
                    <td>1-1-2025</td>
                    <td>1-3-2025</td>
                    <td>Đang hoàn thành</td>
                    <td>
                      <button className="button-xem quanly-button-xem">
                        <FaRegEye />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Phân trang */}
            <div className="quanly-phantrang">
              <button
                className="phantrang-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <TfiBackLeft />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`phantrang-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="phantrang-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <TfiBackRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XemNhanVien;
