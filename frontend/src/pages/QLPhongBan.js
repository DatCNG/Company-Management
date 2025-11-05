import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/style.css";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { PiHouseFill } from "react-icons/pi";
import { FaRegEye, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

import ThemPhongBan from "../components/ThemPhongBan";
import XemPhongBan from "../components/XemPhongBan";
import SuaPhongBan from "../components/SuaPhongBan";

const QLPhongBan = () => {
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);

  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE)),
    [totalRows]
  );


  // === Phân trang DOM-based như cũ ===
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
  useEffect(() => applyPagination(), [currentPage, totalRows, departments]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // === Modal ===
  const openAdd = () => {
    setModalType("add");
    setShowModal(true);
  };
  const openView = (data) => {
    setModalType("view");
    setModalData(data);
    setShowModal(true);
  };
  const openEdit = (data) => {
    setModalType("edit");
    setModalData(data);
    setShowModal(true);
  };

  const renderModalContent = () => {
    if (modalType === "add")
      return (
        <ThemPhongBan
          onClose={() => setShowModal(false)}
        />
      );
    if (modalType === "view") return <XemPhongBan data={modalData} />;
    if (modalType === "edit")
      return (
        <SuaPhongBan
          onClose={() => setShowModal(false)}
        />
      );
    return null;
  };

  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <IoAddCircle style={{ marginRight: "0.3rem" }} /> Thêm Phòng Ban
        </h2>
      </div>
    ) : modalType === "view" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye style={{ marginRight: "0.3rem" }} /> Xem Phòng Ban
        </h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Phòng Ban
        </h2>
      </div>
    ) : null;

  return (
    <div className="quanly-content">
      <div className="quanly-container qlct-container">
        <div className="quanly-title qlct-title">
          <h2>
            <PiHouseFill style={{ marginRight: "0.3rem" }} />
            Phòng Ban
          </h2>
        </div>
        <div className="quanly-title-sub" style={{ justifyContent: "left" }}>
          <div className="ct-tong" style={{ margin: 0, width: "30%" }}>
            <div className="quanly-title-sub-content">
              <h3>
                Tổng phòng ban:
                <span className="tong"></span>
              </h3>
            </div>
          </div>
        </div>

        <div className='timvaloc timvaloc-border'>
          <div className='tim'>
            <input type="text" className='tim-input' placeholder='Tìm theo mã, tên, trưởng phòng, công ty,...' />
          </div>
          <div className='loc'>
            <select className='loc-select' >
              <option value="">--Lọc theo phòng ban--</option>
            </select>
            <select className='loc-select' >
              <option value="">--Lọc theo trưởng phòng--</option>
            </select>
            <select className='loc-select' >
              <option value="">--Lọc theo công ty--</option>
            </select>
          </div>
        </div>

        <div className="quanly-header qlct-header">
          <div className="quanly-header-title qlct-header-title">
            <h3>Danh sách phòng ban</h3>
          </div>
          <div className="quanly-them qlct-them">
            <button className="button-them" onClick={openAdd}>
              <IoAddCircle />
              <div>Thêm</div>
            </button>
          </div>
        </div>

        <div className="quanly-body qlct-body">
          <div className="table-container">
            <table className="quanly-table">
              <thead className="quanly-thead qlct-thead">
                <tr>
                  <th>STT</th>
                  <th>Mã PB</th>
                  <th>Tên Phòng Ban</th>
                  <th>Trưởng Phòng</th>
                  <th>Công Ty</th>
                  <th>SL Nhân Viên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
                <tr>
                  <td>1</td>
                  <td>PB01</td>
                  <td>Phòng ban 01</td>
                  <td>Nguyễn Văn A</td>
                  <td>Công ty 01</td>
                  <td>5</td>
                  <td>
                    <button
                      className="button-xem quanly-button-xem"
                      onClick={() => openView()}
                    >
                      <FaRegEye />
                    </button>
                    <button
                      className="button-sua quanly-button-sua"
                      onClick={() => openEdit()}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="button-xoa quanly-button-xoa"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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

        {/* Modal */}
        {showModal &&
          createPortal(
            <div
              className="ql-overlay"
              role="dialog"
              aria-modal="true"
              onClick={(e) => {
                if (e.target.classList.contains("ql-overlay")) setShowModal(false);
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
                    onClick={() => setShowModal(false)}
                  >
                    <ImCancelCircle style={{ color: "red" }} />
                  </button>
                </div>
                <div className="overlay-body">{renderModalContent()}</div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default QLPhongBan;
