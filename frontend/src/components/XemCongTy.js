import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const XemCongTy = ({ data }) => {
  const ITEMS_PER_PAGE = 5;
  const tbodyRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:5000/api/departments";

  // Lấy danh sách phòng ban theo công ty
  useEffect(() => {
    if (!data?.MaCT) return;
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${API_URL}/by-company/${data.MaCT}`);
        setDepartments(res.data);
      } catch (err) {
        console.error("Lỗi tải phòng ban:", err);
      }
    };
    fetchDepartments();
  }, [data]);

  // Lọc phòng ban theo tìm kiếm
  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (pb) =>
        pb.TenPB?.toLowerCase().includes(search.toLowerCase()) ||
        pb.MaPB?.toLowerCase().includes(search.toLowerCase()) ||
        pb.TruongPhong?.toLowerCase().includes(search.toLowerCase())
    );
  }, [departments, search]);

  // Phân trang
  const totalRows = filteredDepartments.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));
  const pagedDepartments = filteredDepartments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = async (maPB) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng ban này?")) return;
    try {
      await axios.delete(`${API_URL}/${maPB}`);
      setDepartments((prev) => prev.filter((pb) => pb.MaPB !== maPB));
    } catch (err) {
      alert("Không thể xóa phòng ban!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      {/* ===== Thông tin công ty ===== */}
      <div className="chitiet chitiet-pb">
        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong>Mã công ty:</strong>
            <p>{data?.MaCT}</p>
          </div>
          <div className="form-gr-content">
            <strong>Tên công ty:</strong>
            <p>{data?.TenCT}</p>
          </div>
        </div>

        <div className="form-gr under-line">
          <div className="form-gr-content">
            <strong style={{ display: "block" }}>Mô tả công ty:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.MoTa || "<p>Chưa có mô tả</p>",
              }}
              style={{
                background: "#fafafa",
                padding: "10px",
                borderRadius: "6px",
                lineHeight: "1.6",
              }}
            />
          </div>
        </div>

        {/* Ảnh công ty (nếu có) */}
        {data?.Anh && (
          <div className="form-gr">
            <div className="form-gr-content">
              <strong>Ảnh công ty:</strong>
            </div>
            <div className="image-preview-container">
              <div className="image-preview-item">
                <img
                  src={`http://localhost:5000/uploads/${data.Anh}`}
                  alt={data.TenCT}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Danh sách phòng ban ===== */}
      <div className="quanly-header qlct-header">
        <div className="quanly-header-title qlct-header-title">
          <h3>
            Tổng số phòng ban:{" "}
            <span className="kpi">{filteredDepartments.length}</span>
          </h3>
        </div>
        <div className="timvaloc">
          <div className="tim" style={{ margin: 0, width: "500px" }}>
            <input
              type="text"
              className="tim-input"
              placeholder="Tìm theo mã, tên phòng ban, trưởng phòng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="quanly-body qlct-body">
        <div className="table-container">
          <table className="quanly-table">
            <thead className="quanly-thead qlct-thead">
              <tr>
                <th>STT</th>
                <th>Mã phòng ban</th>
                <th>Tên phòng ban</th>
                <th>Trưởng phòng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="quanly-tbody qlct-tbody" ref={tbodyRef}>
              {pagedDepartments.map((pb, idx) => (
                <tr key={pb.MaPB}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                  <td>{pb.MaPB}</td>
                  <td>{pb.TenPB}</td>
                  <td>{pb.TruongPhong || "—"}</td>
                  <td>
                    <button className="button-xem quanly-button-xem">
                      <FaRegEye />
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
              {pagedDepartments.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Không có phòng ban nào.
                  </td>
                </tr>
              )}
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
    </div>
  );
};

export default XemCongTy;
