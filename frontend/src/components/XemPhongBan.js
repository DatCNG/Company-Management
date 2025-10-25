import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const XemPhongBan = ({ data, onClose }) => {
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState(null);
  const [totalRows, setTotalRows] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE)),
    [totalRows]
  );

  // ✅ Lấy chi tiết phòng ban và danh sách nhân viên
  useEffect(() => {
    if (!data?.MaPB) return;
    const fetchData = async () => {
      try {
        const [pbRes, nvRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/departments/${data.MaPB}`),
          axios.get(`http://localhost:5000/api/employees?MaPB=${data.MaPB}`),
        ]);
        setDepartment(pbRes.data);
        setEmployees(nvRes.data);
        setTotalRows(nvRes.data.length);
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết phòng ban:", err);
      }
    };
    fetchData();
  }, [data]);

  // ✅ Phân trang
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
  }, [currentPage, totalRows, employees]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (!department)
    return <div className="loading">Đang tải thông tin phòng ban...</div>;

  return (
    <div className="quanly-container qlct-container">
      {/* ===== Thông tin phòng ban ===== */}
      <div className="chitiet chitiet-pb">
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Mã phòng ban:
              <p>{department.MaPB}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Tên phòng ban:
              <p>{department.TenPB}</p>
            </strong>
          </div>
          <div className="form-gr-content">
            <strong>
              Thuộc công ty:
              <p>{department.TenCT || "Chưa xác định"}</p>
            </strong>
          </div>
        </div>
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>
              Trưởng phòng:
              <p>{department.TruongPhongTen || "Chưa có"}</p>
            </strong>
          </div>
        </div>
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong style={{ display: "block" }}>
              Mô tả:
              <div
                dangerouslySetInnerHTML={{
                  __html: department.MoTa || "<p>Chưa có mô tả</p>",
                }}
              />
            </strong>
          </div>
        </div>
      </div>

      {/* ===== Danh sách nhân viên ===== */}
      <div className="quanly-header qlct-header">
        <div className="quanly-header-title qlct-header-title">
          <h3>
            Tổng số nhân viên: <span>{employees.length}</span>
          </h3>
        </div>
      </div>

      <div className="quanly-body qlct-body">
        <div className="table-container">
          <table className="quanly-table">
            <thead className="quanly-thead qlct-thead">
              <tr>
                <th>STT</th>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Chức vụ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Không có nhân viên trong phòng ban này.
                  </td>
                </tr>
              ) : (
                employees.map((nv, idx) => (
                  <tr key={nv.MaNV}>
                    <td>{idx + 1}</td>
                    <td>{nv.MaNV}</td>
                    <td>{nv.TenNV}</td>
                    <td>{nv.ChucVu || "Nhân viên"}</td>
                    <td>
                      <button className="button-xem quanly-button-xem">
                        <FaRegEye />
                      </button>
                      <button className="button-xoa quanly-button-xoa">
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Phân trang ===== */}
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
              className={`phantrang-btn ${
                currentPage === i + 1 ? "active" : ""
              }`}
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

      {/* ===== Nút đóng ===== */}
      <div className="button-group">
        <button className="button-cancel" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default XemPhongBan;
