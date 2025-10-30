import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from "react-dom";
import "../styles/style.css";
import { TfiBackLeft } from "react-icons/tfi";
import { TfiBackRight } from "react-icons/tfi";
import { FiEdit2 } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

import ThemTaiKhoan from '../components/ThemTaiKhoan';
import SuaTaiKhoan from '../components/SuaTaiKhoan';


const QLTaiKhoan = () => {
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 5;
    const tbodyRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    // Modal state
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
    const openEdit = (data = null) => {
        setModalType("edit");
        setModalData(data);
        setShowModal(true);
    };

    // Chọn component cho modal
    const renderModalContent = () => {
        if (modalType === "add") return <ThemTaiKhoan onClose={() => setShowModal(false)} />;
        if (modalType === "edit") return <SuaTaiKhoan onClose={() => setShowModal(false)} />;
        return null;
    };

    // Tiêu đề modal theo loại
    const modalTitle =
        modalType === "add" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Tài Khoản
                </h2>
            </div>
        ) : modalType === "edit" ? (
            <div className='quanly-title qlct-title'>
                <h2><FiEdit2 style={{ marginRight: "0.3rem" }} />Sửa Tài Khoản:</h2>
                <h2>
                    {modalData?.ten || "Tải khoản 01"}
                </h2>
            </div>
        ) : (
            ""
        );

    return (
        <div className='quanly-content'>
            <div className="quanly-container qlct-container">
                <div className='quanly-title qlct-title'>
                    <h2><MdAccountCircle style={{ marginRight: "0.3rem" }} />Tài Khoản</h2>
                </div>
                <div className='timvaloc timvaloc-border' style={{ display: "flex", width: "100%" }}>
                    <div className='tim' style={{ width: '50%', marginRight: '0.5rem', marginBottom: 0 }}>
                        <input type="text" className='tim-input' placeholder='Tìm theo mã, tên, role,...' />
                    </div>
                    <div className='loc' style={{ width: '50%', marginLeft: '0.5rem' }}>
                        <select className='loc-select' style={{ margin: 0 }}>
                            <option value="">-- Lọc theo role --</option>
                        </select>
                    </div>
                </div>
                <div className='quanly-header qlct-header'>
                    <div className='quanly-header-title qlct-header-title'>
                        <h3>Danh sách tài khoản</h3>
                    </div>
                    <div className='quanly-them qlct-them'>
                        <button className='button-them' onClick={openAdd}><IoAddCircle />
                            <div>Thêm</div>
                        </button>
                    </div>
                </div>
                <div className='quanly-body qlct-body'>
                    <div className='table-container'>
                        <table className='quanly-table'>
                            <thead className='quanly-thead qlct-thead'>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã tài khoản</th>
                                    <th>Tên tài khoản</th>
                                    <th>Role</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className='quanly-tbody qlct-tbody' ref={tbodyRef}>
                                <tr>
                                    <td>1</td>
                                    <td>TK01</td>
                                    <td>admin123</td>
                                    <td>Admin</td>
                                    <td>
                                        <button class='button-sua quanly-button-sua' onClick={openEdit}><FiEdit2 /></button>
                                        <button class='button-xoa quanly-button-xoa'><MdDeleteOutline /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                {/* Modal Overlay dùng chung cho Add/View/Edit */}
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
                            <div className="overlay-content" style={{ maxWidth: '1350px', overflow: 'none' }}>
                                {modalType !== "add" && modalType !== "edit" && (
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
                                )}
                                <div className="overlay-body" style={{ padding: 0, margin: 0 }}>{renderModalContent()}</div>
                            </div>
                        </div>,
                        document.body
                    )
                }
            </div>
        </div>
    )
}

export default QLTaiKhoan