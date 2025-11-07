import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { ImCancelCircle } from "react-icons/im";
import { FaRegEye, FaProjectDiagram, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";

import "../styles/style.css";

import ThemDuAn from "../components/ThemDuAn";
import SuaDuAn from "../components/SuaDuAn";
import XemDuAn from "../components/XemDuAn";
import Donut from "./dunut";

const QLDuAn = () => {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // add | edit | view
  const [modalData, setModalData] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE)),
    [totalRows]
  );

  // ======= Phân trang =======
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
  }, [currentPage]);

  useEffect(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    setTotalRows(rows.length);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ======= Khóa scroll & ESC đóng modal =======
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

  // ======= Xử lý mở modal =======
  const openAdd = () => {
    setModalType("add");
    setModalData(null);
    setShowModal(true);
  };
  const openEdit = (duan = null) => {
    setModalType("edit");
    setModalData(duan);
    setShowModal(true);
  };
  const openView = (duan = null) => {
    setModalType("view");
    setModalData(duan);
    setShowModal(true);
  };

  // ======= Render modal nội dung =======
  const renderModalContent = () => {
    if (modalType === "add")
      return <ThemDuAn onClose={() => setShowModal(false)} />;

    if (modalType === "edit")
      return <SuaDuAn data={modalData} onClose={() => setShowModal(false)} />;

    if (modalType === "view")
      return <XemDuAn data={modalData} onClose={() => setShowModal(false)} />;

    return null;
  };

  // ======= Tiêu đề modal =======
  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Dự Án
        </h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Dự Án:
        </h2>
        <h2>{modalData?.TenDA}</h2>
      </div>
    ) : modalType === "view" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye style={{ marginRight: "0.3rem" }} /> Chi Tiết Dự Án
        </h2>
      </div>
    ) : null;

  return (
    <div className="quanly-content">
      <div className="quanly-container qlct-container">
        {/* ======= Tiêu đề chính ======= */}
        <div className="quanly-title qlct-title">
          <h2>
            <FaProjectDiagram style={{ marginRight: "0.3rem" }} />
            Dự Án
          </h2>
        </div>
        <div className="quanly-title-sub">
          <div className="ct-tong">
            <div className="quanly-title-sub-content">
              <h3>Tổng dự án:<span className="tong">10</span></h3>
            </div>
          </div>
          <div className="ct-hoatdong">
            <div className="quanly-title-sub-content">
              <h3>Đã hoàn thành:<span className="hoatdong">5</span></h3>
            </div>
          </div>
          <div className="ct-tamngung">
            <div className="quanly-title-sub-content">
              <h3>Đang thực hiện:<span className="tamngung">5</span></h3>
            </div>
          </div>
        </div>
        {/* ======= Thanh tìm kiếm & lọc ======= */}
        <div className="timvaloc timvaloc-border">
          <div className="tim">
            <input
              type="text"
              className="tim-input"
              placeholder="Tìm theo mã, tên dự án, trưởng dự án,..."
            />
          </div>
          <div className="loc">
            <select className="loc-select">
              <option value="">--Lọc theo dự án--</option>
            </select>
            <select className="loc-select">
              <option value="">--Lọc theo trưởng dự án--</option>
            </select>
            <select className="loc-select">
              <option value="">--Lọc theo trạng thái--</option>
            </select>
          </div>
        </div>

        {/* ======= Header: tổng số + thêm ======= */}
        <div className="quanly-header qlct-header">
          <div className="quanly-header-title qlct-header-title">
            <h3>Danh sách dự án</h3>
          </div>
          <div className="quanly-them qlct-them">
            <button className="button-them" onClick={openAdd}>
              <IoAddCircle />
              <div>Thêm</div>
            </button>
          </div>
        </div>

        {/* ======= Bảng danh sách ======= */}
        <div className="quanly-body qlct-body">
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

                  {/* ✅ Thêm cột tiến độ */}
                  <th>Tiến độ</th>

                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
                {/* ====== Dòng mẫu ====== */}
                <tr>
                  <td>1</td>
                  <td>DA01</td>
                  <td>Dự Án 01</td>
                  <td>Nguyễn Văn A</td>
                  <td>1-1-2025</td>
                  <td>1-2-2025</td>

                  {/* ✅ Donut mức tiến độ */}
                  <td>
                    <Donut value={100} size={85} />
                  </td>

                  <td>Đã hoàn thành</td>
                  <td>
                    <button
                      className="button-xem quanly-button-xem"
                      onClick={() =>
                        openView({
                          MaDA: "DA01",
                          TenDA: "Dự Án 01",
                        })
                      }
                    >
                      <FaRegEye />
                    </button>

                    <button
                      className="button-sua quanly-button-sua"
                      onClick={() =>
                        openEdit({
                          MaDA: "DA01",
                          TenDA: "Dự Án 01",
                        })
                      }
                    >
                      <FiEdit2 />
                    </button>

                    <button className="button-xoa quanly-button-xoa">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ======= Phân trang ======= */}
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
                className={`phantrang-btn ${currentPage === i + 1 ? "active" : ""
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

          {/* ======= Modal overlay ======= */}
          {showModal &&
            createPortal(
              <div
                className="ql-overlay"
                role="dialog"
                aria-modal="true"
                onClick={(e) => {
                  if (e.target.classList.contains("ql-overlay"))
                    setShowModal(false);
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
    </div>
  );
};

export default QLDuAn;
