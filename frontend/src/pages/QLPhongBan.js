import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { PiHouseFill } from "react-icons/pi";
import { FaRegEye, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

import ThemPhongBan from '../components/ThemPhongBan';
import XemPhongBan from '../components/XemPhongBan';
import SuaPhongBan from '../components/SuaPhongBan';

/** --- Component con: Form chọn trưởng phòng --- */
const ChonTruongPhong = ({ openView = () => { }, onClose = () => { }, onPick = () => { } }) => {
    // Dữ liệu mẫu – sau này thay bằng API/list thật của bạn
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState(null);
    const [list] = useState([
        { id: 'NV01', ten: 'Nguyễn Văn A', sdt: '0901234567' },
        { id: 'NV02', ten: 'Trần Thị B', sdt: '0902222333' },
        { id: 'NV03', ten: 'Lê Văn C', sdt: '0903333444' },
        { id: 'NV04', ten: 'Phạm Thị D', sdt: '0904444555' },
        { id: 'NV05', ten: 'Đỗ Quốc E', sdt: '0905555666'},
        { id: 'NV06', ten: 'Đỗ Quốc E', sdt: '0905555666'},
        { id: 'NV07', ten: 'Đỗ Quốc E', sdt: '0905555666'},
        { id: 'NV08', ten: 'Đỗ Quốc E', sdt: '0905555666'},
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

    return (
        <div className="chon-tp">
            <div className='form-gr'>
                <div className='form-gr-content'>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="chon-tp-search"
                        placeholder="Tìm theo mã, tên, SĐT…"
                    />
                </div>
                <div className='form-gr-content'>
                    <select className='select'>
                        <option value=''>-- Chọn phòng ban --</option>
                    </select>
                </div>
            </div>
            <div className="chon-tp-list">
                {filtered.length === 0 ? (
                    <div className="chon-tp-empty">Không có nhân viên phù hợp.</div>
                ) : (
                    filtered.map((nv) => (
                        <label key={nv.id} className="chon-tp-item">
                            <input
                                type="radio"
                                name="truongphong"
                                value={nv.id}
                                checked={selected?.id === nv.id}
                                onChange={() => setSelected(nv)}
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
                <button className="button-cancel" onClick={onClose}>Hủy</button>
                <button
                    className="btn-primary"
                    disabled={!selected}
                    onClick={() => {
                        onPick(selected);   // trả kết quả về cha
                        onClose();
                    }}
                >
                    Chọn làm trưởng phòng
                </button>
            </div>
        </div>
    );
};

const QLPhongBan = () => {
    const ITEMS_PER_PAGE = 5;
    const tbodyRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // 'add' | 'view' | 'edit' | 'pickHead'
    const [modalData, setModalData] = useState(null);

    // Lưu người vừa chọn (demo)
    const [lastPickedHead, setLastPickedHead] = useState(null);

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
    const openPickHead = () => {
        setModalType("pickHead");
        setModalData(null);
        setShowModal(true);
    };

    // Chọn component cho modal
    const renderModalContent = () => {
        if (modalType === "add") return <ThemPhongBan onClose={() => setShowModal(false)} />;
        if (modalType === "view") return <XemPhongBan />;
        if (modalType === "edit") return <SuaPhongBan />;
        if (modalType === "pickHead")
            return (
                <ChonTruongPhong
                    onClose={() => setShowModal(false)}
                    onPick={(nv) => {
                        // Ở đây bạn có thể gọi API cập nhật trưởng phòng cho phòng ban đang chọn
                        setLastPickedHead(nv); // demo hiển thị lại ở header
                        console.log("Đã chọn trưởng phòng:", nv);
                    }}
                />
            );
        return null;
    };

    // Tiêu đề modal theo loại
    const modalTitle =
        modalType === "add" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Phòng Ban
                </h2>
            </div>
        ) : modalType === "view" ? (
            <div className="quanly-title qlct-title">
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} />
                    Chi Tiết Phòng Ban:
                </h2>
                <h2>{modalData?.ten || "Phòng Ban 01"}</h2>
            </div>
        ) : modalType === "edit" ? (
            <div className='quanly-title qlct-title'>
                <h2><FiEdit2 style={{ marginRight: "0.3rem" }} />Sửa Phòng Ban:</h2>
                <h2>{modalData?.ten || "Phòng Ban 01"}</h2>
            </div>
        ) : modalType === "pickHead" ? (
            <div className='quanly-title qlct-title'>
                <h2>Chọn Trưởng Phòng</h2>
            </div>
        ) : ("");

    return (
        <div className="quanly-container qlct-container">
            <div className='quanly-title qlct-title'>
                <h2><PiHouseFill style={{ marginRight: "0.3rem" }} />Quản Lý Phòng Ban</h2>
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

            <div className='quanly-header qlct-header'>
                <div className='quanly-header-title qlct-header-title'>
                    <h3>Tổng số phòng ban:<h3>10</h3></h3>
                    {/* {lastPickedHead && (
                        <div className="chon-tp-badge">
                            Trưởng phòng vừa chọn: <b>{lastPickedHead.ten}</b> ({lastPickedHead.id})
                        </div>
                    )} */}
                </div>
                <div className='quanly-them qlct-them'>
                    <button className='button-chontp' onClick={openPickHead}>Chọn trưởng phòng</button>
                    <button className='button-them' onClick={openAdd}>Thêm phòng ban</button>
                </div>
            </div>

            <div className='quanly-body qlct-body'>
                <div className='table-container'>
                    <table className='quanly-table'>
                        <thead className='quanly-thead qlct-thead'>
                            <tr>
                                <th>STT</th>
                                <th>Mã phòng ban</th>
                                <th>Tên phòng ban</th>
                                <th>Trưởng phòng</th>
                                <th>Công ty</th>
                                <th>SL nhân viên</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='quanly-tbody qlct-tbody' ref={tbodyRef}>
                            <tr>
                                <td>1</td><td>PB01</td><td>Phòng ban 01</td><td>Nguyễn Văn A</td><td>Công ty 01</td><td>10</td>
                                <td>
                                    <button className='button-xem quanly-button-xem' onClick={openView}><FaRegEye /></button>
                                    <button className='button-sua quanly-button-sua' onClick={openEdit}><FiEdit2 /></button>
                                    <button className='button-xoa quanly-button-xoa'><MdDeleteOutline /></button>
                                </td>
                            </tr>
                            {/* thêm các dòng khác... */}
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

            {/* Modal Overlay dùng chung cho Add/View/Edit/Chọn Trưởng Phòng */}
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
                                <ImCancelCircle style={{color: 'red'}} />
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
