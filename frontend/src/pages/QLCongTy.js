import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { FaWarehouse, FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import axios from "axios";

// Các form ở file riêng
import ThemCongTy from "../components/ThemCongTy";
import XemCongTy from "../components/XemCongTy";
import SuaCongTy from "../components/SuaCongTy";

/* ===========================
   Trang Quản Lý Công Ty
   =========================== */
const QLCongTy = () => {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);

  // ========== STATE ==========
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [companies, setCompanies] = useState([]);
  const API_URL = "http://localhost:5000/api/companies";

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE)),
    [totalRows]
  );

  // ================= FETCH API =================
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(API_URL);
      setCompanies(res.data);
      setTotalRows(res.data.length);
    } catch (error) {
      console.error("Lỗi tải danh sách công ty:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ================= PHÂN TRANG =================
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
  }, [currentPage, totalRows, companies]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ================= XỬ LÝ MODAL =================
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

  const renderModalContent = () => {
    if (modalType === "add")
      return (
        <ThemCongTy
          onClose={() => setShowModal(false)}
          onAdded={fetchCompanies}
        />
      );

    if (modalType === "view") return <XemCongTy data={modalData} />;
    if (modalType === "edit")
      return (
        <SuaCongTy
          data={modalData}
          onClose={() => setShowModal(false)}
          onUpdated={fetchCompanies}
        />
      );
  };

  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Công Ty
        </h2>
      </div>
    ) : modalType === "view" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye style={{ marginRight: "0.3rem" }} />
          Chi Tiết Công Ty:
        </h2>
        <h2>{modalData?.TenCT || "Không rõ"}</h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Công Ty:
        </h2>
        <h2>{modalData?.TenCT || "Không rõ"}</h2>
      </div>
    ) : (
      ""
    );

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa công ty này?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCompanies((prev) => prev.filter((c) => c.MaCT !== id));
      alert("Đã xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa công ty:", error);
      alert(
        error.response?.data?.error ||
          "Không thể xóa công ty (có thể đang được tham chiếu trong bảng khác)."
      );
    }
  };

  // ================= RENDER =================
  return (
    <div className="quanly-container qlct-container">
      {/* Tiêu đề chính */}
      <div className="quanly-title qlct-title">
        <h2>
          <FaWarehouse style={{ marginRight: "0.3rem" }} />
          Quản Lý Công Ty
        </h2>
      </div>

      {/* Tìm & Lọc */}
      <div className="timvaloc timvaloc-border">
        <div className="tim">
          <input
            type="text"
            className="tim-input"
            placeholder="Tìm theo mã, tên, địa chỉ,..."
          />
        </div>
        <div className="loc">
          <select className="loc-select">
            <option value="">-- Lọc theo tên công ty --</option>
          </select>
          <select className="loc-select">
            <option value="">-- Lọc theo địa chỉ --</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <div className="quanly-header qlct-header">
        <div className="quanly-header-title qlct-header-title">
          <h3>
            Tổng số công ty: <span className="kpi">{companies.length}</span>
          </h3>
        </div>
        <div className="quanly-them qlct-them">
          <button className="button-them" onClick={openAdd}>
            Thêm công ty
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="quanly-body qlct-body">
        <div className="table-container">
          <table className="quanly-table">
            <thead className="quanly-thead qlct-thead">
              <tr>
                <th>STT</th>
                <th>Mã công ty</th>
                <th>Tên công ty</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
              {companies.map((ct, idx) => (
                <tr key={ct.MaCT}>
                  <td>{idx + 1}</td>
                  <td>{ct.MaCT}</td>
                  <td>{ct.TenCT}</td>

                  {/* Mô tả HTML (CKEditor) */}
                  <td>
                    {ct.MoTa ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: ct.MoTa }}
                        style={{
                          maxHeight: "80px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      />
                    ) : (
                      "Chưa có mô tả"
                    )}
                  </td>

                  <td>
                    <button
                      className="button-xem quanly-button-xem"
                      onClick={() => openView(ct)}
                    >
                      <FaRegEye />
                    </button>
                    <button
                      className="button-sua quanly-button-sua"
                      onClick={() => openEdit(ct)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="button-xoa quanly-button-xoa"
                      onClick={() => handleDelete(ct.MaCT)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* Modal */}
      {showModal && (
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
        </div>
      )}
    </div>
  );
};

export default QLCongTy;
