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
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'view' | 'edit'
  const [modalData, setModalData] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(employees.length / ITEMS_PER_PAGE)),
    [employees]
  );

  // ✅ Lấy danh sách nhân viên
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải nhân viên:", err);
      alert("Không thể tải danh sách nhân viên!");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Xóa nhân viên
  const handleDelete = async (MaNV) => {
    if (!window.confirm("Bạn có chắc muốn xóa nhân viên này không?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${MaNV}`);
      alert("🗑️ Đã xóa nhân viên!");
      fetchEmployees(); // reload lại danh sách
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa nhân viên!");
    }
  };

  // ✅ Mở modal
  const openAdd = () => {
    setModalType("add");
    setModalData(null);
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

  // ✅ Khi modal đóng hoặc thêm/sửa xong thì reload
  const closeModal = (reload = false) => {
    setShowModal(false);
    if (reload) fetchEmployees();
  };

  // ✅ Lọc danh sách hiển thị theo trang hiện tại
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return employees.slice(start, start + ITEMS_PER_PAGE);
  }, [employees, currentPage]);

  // ✅ Modal nội dung
  const renderModalContent = () => {
    if (modalType === "add")
      return <ThemNhanVien onClose={() => closeModal(true)} />;
    if (modalType === "view")
      return <XemNhanVien data={modalData} onClose={closeModal} />;
    if (modalType === "edit")
      return <SuaNhanVien data={modalData} onClose={() => closeModal(true)} />;
    return null;
  };

  // ✅ Tiêu đề modal
  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
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
        <h2>{modalData?.TenNV || "Không rõ"}</h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} />
          Sửa Nhân Viên:
        </h2>
        <h2>{modalData?.TenNV || "Không rõ"}</h2>
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
              <h3>Tổng nhân viên:<span className="tong">{employees.length}</span></h3>
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
                  <th>Chức vụ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="quanly-tbody qlct-tbody">
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      Không có nhân viên nào.
                    </td>
                  </tr>
                ) : (
                  currentData.map((nv, i) => (
                    <tr key={nv.MaNV}>
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                      <td>{nv.MaNV}</td>
                      <td>{nv.TenNV}</td>
                      <td>{nv.Email}</td>
                      <td>{nv.ChucVu || "—"}</td>
                      <td>
                        <button
                          className="button-xem quanly-button-xem"
                          onClick={() => openView(nv)}
                        >
                          <FaRegEye />
                        </button>
                        <button
                          className="button-sua quanly-button-sua"
                          onClick={() => openEdit(nv)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="button-xoa quanly-button-xoa"
                          onClick={() => handleDelete(nv.MaNV)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="quanly-phantrang">
            <button
              className="phantrang-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <TfiBackLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`phantrang-btn ${currentPage === i + 1 ? "active" : ""
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="phantrang-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
