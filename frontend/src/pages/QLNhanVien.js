import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import "../styles/style.css";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { ImCancelCircle } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

import ThemNhanVien from "../components/ThemNhanVien";
import XemNhanVien from "../components/XemNhanVien";
import SuaNhanVien from "../components/SuaNhanVien";

const QLNhanVien = () => {
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'view' | 'edit'
  const [modalData, setModalData] = useState(null); // có thể truyền dữ liệu CT sau này

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
    const tbody = tbodyRef.current;
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    setTotalRows(rows.length);
  }, []);
  useEffect(() => {
    applyPagination();
  }, [currentPage, totalRows]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Khóa scroll & ESC đóng modal
  useEffect(() => {
    if (showModal) {
      const onKey = (e) => e.key === "Escape" && setShowModal(false);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [showModal]);

  // Helpers mở modal theo loại
  const openAdd = () => {
    setModalType("add");
    setModalData(null);
    setShowModal(true);
  };
  const openView = (data = null) => {
    setModalType("view");
    setModalData(data);
    setShowModal(true);
  };
  const openEdit = (data = null) => {
    setModalType("edit");
    setModalData(data);
    setShowModal(true);
  };

  // Chọn component cho modal
  const renderModalContent = () => {
    if (modalType === "add") return <ThemNhanVien onClose={() => setShowModal(false)} />;
    if (modalType === "view")
      return (
        // Có thể truyền props dữ liệu sau (modalData)
        <XemNhanVien />
      );
    if (modalType === "edit")
      return (
        // Có thể truyền props dữ liệu sau (modalData)
        <SuaNhanVien />
      );
    return null;
  };

  // Tiêu đề modal theo loại
  const modalTitle =
    modalType === "add" ? (
      <div className='quanly-title qlct-title'>
        <h2>
          <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Nhân Viên
        </h2>
      </div>
    ) : modalType === "view" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye style={{ marginRight: "0.3rem" }} />
          Chi Tiết Nhân Viên:
        </h2>
        <h2>
          {modalData?.ten || "Nguyễn Văn A"}
        </h2>
      </div>
    ) : modalType === "edit" ? (
      <div className='quanly-title qlct-title'>
        <h2><FiEdit2 style={{ marginRight: "0.3rem" }} />Sửa Nhân Viên:</h2>
        <h2>
          {modalData?.ten || "Nguyễn Văn A"}
        </h2>
      </div>
    ) : (
      ""
    );

  return (
    <div className="quanly-content">
      <div className="quanly-container qlct-container">
        <div className="quanly-title qlct-title">
          <h2>
            <IoIosPeople style={{ marginRight: "0.3rem" }} />
            Nhân Viên
          </h2>
        </div>
        <div className="quanly-title-sub" style={{ justifyContent: "left" }}>
          <div className="ct-tong" style={{ margin: 0, width: "30%" }}>
            <div className="quanly-title-sub-content">
              <h3>Tổng nhân viên:<span className="tong">-</span></h3>
            </div>
          </div>
        </div>
        <div className='timvaloc timvaloc-border'>
          <div className='tim'>
            <input type="text" className='tim-input' placeholder='Tìm theo mã, tên, chức vụ,...' />
          </div>
          <div className='loc'>
            <select className='loc-select' >
              <option value="">--Lọc theo tên nhân viên--</option>
            </select>
            <select className='loc-select' >
              <option value="">--Lọc theo chức vụ--</option>
            </select>
          </div>
        </div>

        <div className="quanly-header qlct-header">
          <div className="quanly-header-title qlct-header-title">
            <h3>
              Danh sách nhân viên
            </h3>
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
                  <th>Mã NV</th>
                  <th>Tên nhân viên</th>
                  <th>Email</th>
                  <th>Công Ty</th>
                  <th>Phòng Ban</th>
                  <th>Chức vụ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="quanly-tbody qlct-tbody">
                <tr>
                  <td>1</td>
                  <td>NV01</td>
                  <td>Nguyễn Văn A</td>
                  <td>nva@gmail.com</td>
                  <td>Công Ty 01</td>
                  <td>Phòng Ban 01</td>
                  <td>Nhân viên</td>
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

          {/* Phân trang */}
          <div className='quanly-phantrang'>
            <button
              className='phantrang-btn'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <TfiBackLeft />
            </button>

            {/* Nút số trang */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`phantrang-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className='phantrang-btn'
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
          )
        }
      </div>
    </div>
  );
};

export default QLNhanVien;
