import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
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

// ===== Component chọn trưởng phòng =====
const ChonTruongPhong = ({ onClose, onPick }) => {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  // ✅ Gọi API danh sách nhân viên
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setList(res.data))
      .catch((err) => console.error("Lỗi tải danh sách nhân viên:", err));
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return list;
    const k = q.toLowerCase();
    return list.filter(
      (nv) =>
        nv.MaNV.toLowerCase().includes(k) ||
        nv.TenNV.toLowerCase().includes(k) ||
        nv.SDT.includes(k)
    );
  }, [q, list]);

  return (
    <div className="chon-tp">
      <div className="form-gr">
        <div className="form-gr-content">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="chon-tp-search"
            placeholder="Tìm theo mã, tên, SĐT…"
          />
        </div>
      </div>

      <div className="chon-tp-list">
        {filtered.length === 0 ? (
          <div className="chon-tp-empty">Không có nhân viên phù hợp.</div>
        ) : (
          filtered.map((nv) => (
            <label key={nv.MaNV} className="chon-tp-item">
              <input
                type="radio"
                name="truongphong"
                value={nv.MaNV}
                checked={selected?.MaNV === nv.MaNV}
                onChange={() => setSelected(nv)}
              />
              <div className="chon-tp-meta">
                <div className="chon-tp-line">
                  <span className="chon-tp-name">{nv.TenNV}</span>
                  <span className="chon-tp-id">{nv.MaNV}</span>
                </div>
                <div className="chon-tp-sub">
                  <span>{nv.SDT}</span>
                </div>
              </div>
            </label>
          ))
        )}
      </div>

      <div className="chon-tp-actions">
        <button className="button-cancel" onClick={onClose}>
          Hủy
        </button>
        <button
          className="btn-primary"
          disabled={!selected}
          onClick={() => {
            onPick(selected);
            onClose();
          }}
        >
          Chọn làm trưởng phòng
        </button>
      </div>
    </div>
  );
};

// ===== Trang chính: Quản lý Phòng Ban =====
const QLPhongBan = () => {
  const API_URL = "http://localhost:5000/api/departments";
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

  // === Fetch dữ liệu thật ===
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(API_URL);
      setDepartments(res.data);
      setTotalRows(res.data.length);
    } catch (err) {
      console.error("Lỗi tải danh sách phòng ban:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // === Phân trang ===
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
          onAdded={fetchDepartments}
        />
      );
    if (modalType === "view") return <XemPhongBan data={modalData} />;
    if (modalType === "edit")
      return (
        <SuaPhongBan
          data={modalData}
          onClose={() => setShowModal(false)}
          onUpdated={fetchDepartments}
        />
      );
    return null;
  };

  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <IoAddCircle /> Thêm Phòng Ban
        </h2>
      </div>
    ) : modalType === "view" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FaEye /> Xem Phòng Ban
        </h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 /> Sửa Phòng Ban
        </h2>
      </div>
    ) : null;

  // === Xóa phòng ban ===
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng ban này?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("✅ Đã xóa phòng ban!");
      fetchDepartments();
    } catch (err) {
      console.error("Lỗi khi xóa phòng ban:", err);
      alert("❌ Không thể xóa!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="quanly-title qlct-title">
        <h2>
          <PiHouseFill style={{ marginRight: "0.3rem" }} />
          Quản Lý Phòng Ban
        </h2>
      </div>

      <div className="timvaloc timvaloc-border">
        <div className="tim">
          <input
            type="text"
            className="tim-input"
            placeholder="Tìm theo mã, tên, trưởng phòng, công ty,..."
          />
        </div>
      </div>

      <div className="quanly-header qlct-header">
        <div className="quanly-header-title qlct-header-title">
          <h3>
            Tổng số phòng ban: <span className="kpi">{departments.length}</span>
          </h3>
        </div>
        <div className="quanly-them qlct-them">
          <button className="button-them" onClick={openAdd}>
            Thêm phòng ban
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
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
              {departments.map((pb, idx) => (
                <tr key={pb.MaPB}>
                  <td>{idx + 1}</td>
                  <td>{pb.MaPB}</td>
                  <td>{pb.TenPB}</td>
                  <td>{pb.TruongPhongTen || "Chưa có"}</td>
                  <td>{pb.TenCT || "—"}</td>
                  <td>
                    <button
                      className="button-xem quanly-button-xem"
                      onClick={() => openView(pb)}
                    >
                      <FaRegEye />
                    </button>
                    <button
                      className="button-sua quanly-button-sua"
                      onClick={() => openEdit(pb)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="button-xoa quanly-button-xoa"
                      onClick={() => handleDelete(pb.MaPB)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* === Modal chung === */}
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
              <h3>{modalTitle}</h3>
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

export default QLPhongBan;
