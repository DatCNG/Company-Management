import React, { useEffect, useMemo, useRef, useState } from "react";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye, FaEye } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import "../styles/style.css";

import XemNhanVien from "./XemNhanVien";

const XemCongTy = ({ data }) => {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' | 'edit' | 'view' | 'delete'

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  // Phân trang
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);

  // ========== STATE ==========
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  // Modal state
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

  // Tiêu đề động kiểu bạn muốn
  const modalTitle =
    modalType === "view-nv" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye style={{ marginRight: "0.3rem" }} /> Chi Tiết Nhân Viên:
        </h2>
        <h2>-</h2>
      </div>
    ) : modalType === "view-pb" ? (
      <div className='quanly-title qlct-title'>
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} /> Chi Tiết Phòng Ban:
        </h2>
        <h2>-</h2>
      </div>
    ) : (
      ""
    );

  // Hàm render nội dung trong overlay
  const renderModalContent = () => {
    switch (modalType) {
      case "view-nv":
        return <XemNhanVien onClose={closeModal} />;
      case "view-pb":
        return <XemNhanVien onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="quanly-container qlct-container">
      {/* ===== Thông tin công ty ===== */}
      <div className="chitiet chitiet-pb">
        <div className="chitiet-content">
          <h3>Công Ty</h3>
          <div className="form-gr under-line">
            <div className="form-gr-content">
              <strong>Mã công ty:<p>-</p></strong>

            </div>
            <div className="form-gr-content">
              <strong>Tên công ty:<p>-</p></strong>

            </div>
          </div>

          <div className="form-gr under-line">
            <div className="form-gr-content">
              <strong style={{ display: "block" }}>Mô tả công ty:<p>-</p></strong>
            </div>
          </div>

          <div className="form-gr" style={{ display: 'block' }}>
            <div className="form-gr-content">
              <strong>Ảnh công ty:</strong>
            </div>
            <div className="image-preview-container">
              <div className="image-preview-item">
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chitiet-content">
        <h3>Phòng Ban</h3>
        <div className='form-gr'>
          <div className='form-gr-content'>
            <label className='label'>Tổng số phòng ban công ty:</label>
            <strong style={{ marginLeft: '0.3rem' }}>-</strong>
          </div>
        </div>
        <div className='quanly-body qlct-body' ref={tbodyRef}>
          <div className='table-container'>
            <table className='quanly-table'>
              <thead className='quanly-thead qlct-thead'>
                <tr>
                  <th>STT</th>
                  <th>Mã phòng ban</th>
                  <th>Tên phòng ban</th>
                  <th>Trưởng phòng</th>
                  <th>SL nhân viên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className='quanly-tbody qlct-tbody'>
                <tr>
                  <td>1</td>
                  <td>PB01</td>
                  <td>Phòng ban 01</td>
                  <td>Nguyễn Văn A</td>
                  <td>5</td>
                  <td>
                    <button class='button-xem quanly-button-xem' type='button' onClick={() => openModal('view-pb')}><FaRegEye /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Phân trang */}
          <div className="quanly-phantrang">
            <button className="phantrang-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
            <button className="phantrang-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <TfiBackRight />
            </button>
          </div>
        </div>
      </div>
      <div className="chitiet-content">
        <h3>Nhân Viên</h3>
        <div className='form-gr'>
          <div className='form-gr-content'>
            <label className='label'>Tổng số nhân viên công ty:</label>
            <strong style={{ marginLeft: '0.3rem' }}>-</strong>
          </div>
        </div>
        <div className='quanly-body qlct-body' ref={tbodyRef}>
          <div className='table-container'>
            <table className='quanly-table'>
              <thead className='quanly-thead qlct-thead'>
                <tr>
                  <th>STT</th>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Chức vụ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className='quanly-tbody qlct-tbody'>
                <tr>
                  <td>1</td>
                  <td>NV01</td>
                  <td>Nguyễn Văn A</td>
                  <td>Nhân viên</td>
                  <td>
                    <button class='button-xem quanly-button-xem' type='button' onClick={() => openModal('view-nv')}><FaRegEye /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Phân trang */}
          <div className="quanly-phantrang">
            <button className="phantrang-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
            <button className="phantrang-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <TfiBackRight />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="ql-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains("ql-overlay")) closeModal();
          }}
        >
          <div className="overlay-content">
            <div className="overlay-header">
              <h3 className="quanly-title qlct-title">
                <span style={{ display: "flex", alignItems: "center" }}>
                  {modalTitle}
                </span>
              </h3>
              <button
                className="overlay-close"
                aria-label="Đóng"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="overlay-body">{renderModalContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XemCongTy;
