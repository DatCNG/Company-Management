import React, { useEffect, useState } from "react";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";

// Import nội dung trong overlay
import ThemCongViec from "./ThemCongViec";
import XemCongViec from "./XemCongViec";
import SuaCongViec from "./SuaCongViec";
import SuaMotCongViec from "./SuaMotCongViec";
import XemNhanVien from "./XemNhanVien";

const ThemDuAn = ({ onClose, onRefresh }) => {
  const [tenDA, setTenDA] = useState("");
  const [truongDA, setTruongDA] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [ngayKT, setNgayKT] = useState("");
  const [moTa, setMoTa] = useState("<p>Mô tả dự án...</p>");
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // ====== Lấy danh sách nhân viên (Trưởng dự án) ======
  useEffect(() => {
    const fetchNhanVien = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setDsNhanVien(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy danh sách nhân viên:", err);
      }
    };
    fetchNhanVien();
  }, []);

  // ====== Gửi form tạo dự án ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenDA.trim()) return alert("Vui lòng nhập tên dự án!");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/duan", {
        TenDA: tenDA,
        TruongDA: truongDA || null,
        NgayBatDau: ngayBD || null,
        NgayKetThuc: ngayKT || null,
        TrangThai: 0,
        MoTa: moTa,
      });

      alert("✅ Thêm dự án thành công!");
      if (onRefresh) onRefresh();
      onClose();

      // Reset form
      setTenDA("");
      setTruongDA("");
      setNgayBD("");
      setNgayKT("");
      setMoTa("<p>Mô tả dự án...</p>");
    } catch (err) {
      console.error("❌ Lỗi thêm dự án:", err);
      alert("Không thể thêm dự án. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // ====== Modal công việc / nhân viên phụ ======
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const modalTitle =
    modalType === "add" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Công Việc
        </h2>
      </div>
    ) : modalType === "edit" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Công Việc
        </h2>
      </div>
    ) : null;

  const renderModalContent = () => {
    switch (modalType) {
      case "add":
        return <ThemCongViec onClose={closeModal} />;
      case "edit":
        return <SuaCongViec onClose={closeModal} />;
      case "view":
        return <XemCongViec onClose={closeModal} />;
      case "edit_one":
        return <SuaMotCongViec onClose={closeModal} />;
      case "view_nv":
        return <XemNhanVien onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          {/* === FORM DỰ ÁN === */}
          <div className="them-body-title">
            <h2 style={{ margin: 0 }}>Thông tin dự án:</h2>
          </div>
          <div className="them-body-border">
            <div className="form-gr">
              <div className="form-gr-content">
                <label className="label">Tên dự án:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nhập tên dự án..."
                  value={tenDA}
                  onChange={(e) => setTenDA(e.target.value)}
                />
              </div>

              <div className="form-gr-content">
                <label className="label">Trưởng dự án:</label>
                <select
                  className="select"
                  value={truongDA}
                  onChange={(e) => setTruongDA(e.target.value)}
                >
                  <option value="">-- Chọn trưởng dự án --</option>
                  {dsNhanVien.map((nv) => (
                    <option key={nv.MaNV} value={nv.MaNV}>
                      {nv.TenNV}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-gr">
              <div className="form-gr-content">
                <label className="label">Ngày bắt đầu:</label>
                <input
                  type="date"
                  className="input"
                  value={ngayBD}
                  onChange={(e) => setNgayBD(e.target.value)}
                />
              </div>
              <div className="form-gr-content">
                <label className="label">Ngày kết thúc:</label>
                <input
                  type="date"
                  className="input"
                  value={ngayKT}
                  onChange={(e) => setNgayKT(e.target.value)}
                />
              </div>
            </div>

            <div className="form-gr">
              <div
                className="form-gr-content"
                style={{ flexDirection: "column" }}
              >
                <label className="label">Mô tả:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={moTa}
                  onChange={(_, editor) => setMoTa(editor.getData())}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "|",
                      "bulletedList",
                      "numberedList",
                      "blockQuote",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="button-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button type="submit" className="button-add" disabled={loading}>
              {loading ? "Đang thêm..." : "Thêm dự án"}
            </button>
          </div>
        </form>
      </div>

      {/* === OVERLAY CÔNG VIỆC / NHÂN VIÊN === */}
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

export default ThemDuAn;
