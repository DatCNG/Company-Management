import React, { useEffect, useMemo, useRef, useState } from "react";

import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye, FaEye } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

import "../styles/style.css";

import XemNhanVien from "./XemNhanVien";
import XemCongViec from "./XemCongViec";
import SuaCongViec from "./SuaCongViec";
import SuaMotCongViec from "./SuaMotCongViec";
import ThemCongViec from "./ThemCongViec";

const ThemTVDA = ({ openView = () => { }, onClose = () => { }, onPick = () => { }, modalType = () => { } }) => {
    // Dữ liệu mẫu – sau này thay bằng API/list thật của bạn
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState([]); // ⟵ nhiều nhân viên

    const [list] = useState([
        { id: 'NV01', ten: 'Nguyễn Văn A', sdt: '0901234567' },
        { id: 'NV02', ten: 'Trần Thị B', sdt: '0902222333' },
        { id: 'NV03', ten: 'Lê Văn C', sdt: '0903333444' },
        { id: 'NV04', ten: 'Phạm Thị D', sdt: '0904444555' },
        { id: 'NV05', ten: 'Đỗ Quốc E', sdt: '0905555666' },
        { id: 'NV06', ten: 'Đỗ Quốc E', sdt: '0905555666' },
        { id: 'NV07', ten: 'Đỗ Quốc E', sdt: '0905555666' },
        { id: 'NV08', ten: 'Đỗ Quốc E', sdt: '0905555666' },
    ]);

    const filtered = useMemo(() => {
        if (!q.trim()) return list;
        const k = q.toLowerCase();
        return list.filter(
            (nv) =>
                nv.id.toLowerCase().includes(k) ||
                nv.ten.toLowerCase().includes(k) ||
                nv.sdt.includes(k)
        );
    }, [q, list]);

    const isChecked = (id) => selected.some((s) => s.id === id);

    const toggle = (nv) => {
        setSelected((prev) => {
            const exists = prev.some((s) => s.id === nv.id);
            if (exists) return prev.filter((s) => s.id !== nv.id);
            return [...prev, nv];
        });
    };

    const selectAllFiltered = () => {
        // Hợp nhất selected hiện tại + filtered (tránh trùng id)
        setSelected((prev) => {
            const map = new Map(prev.map((x) => [x.id, x]));
            filtered.forEach((nv) => map.set(nv.id, nv));
            return Array.from(map.values());
        });
    };

    const clearAll = () => setSelected([]);

    const removeOne = (id) => setSelected((prev) => prev.filter((s) => s.id !== id));

    return (
        <div className="chon-tp">
            <div className="chon-tp-tools">
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

                <div className="chon-tp-tools-right">
                    <button type="button" className="btn-secondary" onClick={selectAllFiltered}>
                        Chọn tất cả
                    </button>
                    <button type="button" className="btn-secondary" onClick={clearAll}>
                        Bỏ chọn
                    </button>
                </div>
            </div>

            {/* Badge đã chọn */}
            {/* {selected.length > 0 && (
        <div className="chon-tp-selected">
          {selected.map((nv) => (
            <span className="chon-tp-badge" key={nv.id}>
              {nv.ten} <span className="chon-tp-badge-id">({nv.id})</span>
              <button type="button" className="chon-tp-badge-x" onClick={() => removeOne(nv.id)} aria-label={`Bỏ ${nv.ten}`}>
                ×
              </button>
            </span>
          ))}
        </div>
      )} */}

            <div className="chon-tp-list">
                {filtered.length === 0 ? (
                    <div className="chon-tp-empty">Không có nhân viên phù hợp.</div>
                ) : (
                    filtered.map((nv) => (
                        <label key={nv.id} className={`chon-tp-item ${isChecked(nv.id) ? "is-checked" : ""}`}>
                            <input
                                type="checkbox"              // ⟵ đổi sang checkbox
                                name={`nvpb-${nv.id}`}
                                value={nv.id}
                                checked={isChecked(nv.id)}
                                onChange={() => toggle(nv)}
                            />
                            <div className="chon-tp-meta">
                                <div className="chon-tp-line">
                                    <span className="chon-tp-name">{nv.ten}</span>
                                    <span className="chon-tp-id">{nv.id}</span>
                                </div>
                                <div className="chon-tp-sub">
                                    <span>{nv.sdt}</span>
                                </div>
                            </div>
                        </label>
                    ))
                )}
            </div>

            <div className="chon-tp-actions">
                <div className="chon-tp-count">
                    Đã chọn: <strong>{selected.length}</strong>
                </div>
                <div className="chon-tp-actions-right">
                    <button className="button-cancel" onClick={onClose}>Hủy</button>
                    <button
                        className="btn-primary"
                        disabled={selected.length === 0}
                        onClick={() => {
                            onPick(selected); // trả về mảng nhân viên
                            onClose();
                        }}
                    >
                        Thêm {selected.length > 0 ? `(${selected.length})` : ""} nhân viên vào dự án
                    </button>
                </div>
            </div>
        </div>
    );
};


const XemDuAn = ({ data }) => {
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
                    <FaEye style={{ marginRight: "0.3rem" }} /> Chi Tiết Nhân Viên
                </h2>
            </div>
        ) : modalType === "them-tvda" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: "0.3rem" }} /> Thêm Thành Viên Dự Án
                </h2>
            </div>
        ) : modalType === "view-cv" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} /> Chi Tiết Công Việc
                </h2>
            </div>
        ) : modalType === "edit-1cv" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Công Việc
                </h2>
            </div>
        ) : modalType === "edit-ncv" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Hàng Loạt Công Việc
                </h2>
            </div>
        ) : modalType === "add-cv" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FiEdit2 style={{ marginRight: "0.3rem" }} /> Thêm Công Việc
                </h2>
            </div>
        ) : (
            ""
        );

    // Hàm render nội dung trong overlay
    const renderModalContent = () => {
        switch (modalType) {
            case "view-nv":
                return <XemNhanVien onClose={closeModal} />;
            case "them-tvda":
                return <ThemTVDA onClose={closeModal} />;
            case "view-cv":
                return <XemCongViec onClose={closeModal} />;
            case "edit-1cv":
                return <SuaMotCongViec onClose={closeModal} />;
            case "edit-ncv":
                return <SuaCongViec onClose={closeModal} />;
            case "add-cv":
                return <ThemCongViec onClose={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="quanly-container qlct-container">
            {/* ===== Thông tin công ty ===== */}
            <div className="chitiet chitiet-pb">
                <div className="chitiet-content">
                    <h3>Dự Án</h3>
                    <div className="form-gr under-line">
                        <div className="form-gr-content">
                            <strong>Mã dự án:<p>-</p></strong>
                        </div>
                        <div className="form-gr-content">
                            <strong>Tên dự án:<p>-</p></strong>
                        </div>
                        <div className="form-gr-content">
                            <strong>Trưởng dự án:<p>-</p></strong>
                        </div>
                    </div>
                    <div className="form-gr under-line">
                        <div className="form-gr-content">
                            <strong>Ngày bắt đầu:<p>-</p></strong>
                        </div>
                        <div className="form-gr-content">
                            <strong>Ngày kết thúc:<p>-</p></strong>
                        </div>
                    </div>
                    <div className="form-gr under-line">
                        <div className="form-gr-content">
                            <strong style={{ display: "block" }}>Mô tả dự án:<p>-</p></strong>
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Tổng số thành viên dự án:</label>
                            <strong style={{ marginLeft: '0.3rem' }}>-</strong>
                        </div>
                    </div>
                    <div className='quanly-body qlct-body'
                        ref={tbodyRef}
                        s>
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
                                            <button class='button-xoa quanly-button-xoa' type='button'><MdDeleteOutline /></button>
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
                        <div className='button-group'>
                            <button className='button-add-da' type='button' onClick={() => openModal('them-tvda')}>Thêm thành viên dự án</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chitiet-content">
                <h3>Công Việc</h3>
                <div className='form-gr'>
                    <div className='form-gr-content'>
                        <label className='label'>Tổng số công việc dự án:</label>
                        <strong style={{ marginLeft: '0.3rem' }}>-</strong>
                    </div>
                </div>
                <div className='quanly-body qlct-body' ref={tbodyRef}>
                    <div className='table-container'>
                        <table className='quanly-table'>
                            <thead className='quanly-thead qlct-thead'>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã công việc</th>
                                    <th>Tên công việc</th>
                                    <th>Nhân viên phụ trách</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className='quanly-tbody qlct-tbody'>
                                <tr>
                                    <td>1</td>
                                    <td>CV01</td>
                                    <td>Công việc 01</td>
                                    <td>Nguyễn Văn B</td>
                                    <td>01-01-2025</td>
                                    <td>01-04-2025</td>
                                    <td>
                                        <button className='button-xem quanly-button-xem' type='button' onClick={() => openModal('view-cv')}>
                                            <FaRegEye />
                                        </button>
                                        <button className='button-sua quanly-button-sua' type='button' onClick={() => openModal('edit-1cv')}>
                                            <FiEdit2 />
                                        </button>
                                        <button className='button-xoa quanly-button-xoa' type='button'>
                                            <MdDeleteOutline />
                                        </button>
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
                    <div className='button-group'>
                        <button
                            className='button-add-sua'
                            type='button'
                            onClick={() => openModal('edit-ncv')}
                        >
                            Sửa hàng loạt công việc
                        </button>
                        <button
                            className='button-add-da'
                            type='button'
                            onClick={() => openModal('add-cv')}
                        >
                            Thêm công việc
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

export default XemDuAn;
