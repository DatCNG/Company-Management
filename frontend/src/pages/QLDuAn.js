import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import { TfiBackLeft } from "react-icons/tfi";
import { TfiBackRight } from "react-icons/tfi";
import { ImCancelCircle } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { FaProjectDiagram } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

import ThemDuAn from '../components/ThemDuAn';
import SuaDuAn from "../components/SuaDuAn";
import XemCongTy from '../components/XemCongTy';

const QLDuAn = () => {
    const navigate = useNavigate();
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
    const openAdd_cv = () => {
        setModalType("add_cv");
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
        if (modalType === "add") return <ThemDuAn onClose={() => setShowModal(false)} />;
        // if (modalType === "view")
        //     return (
        //         // Có thể truyền props dữ liệu sau (modalData)
        //         <XemNhanVien />
        //     );
        if (modalType === "edit")
            return (
                // Có thể truyền props dữ liệu sau (modalData)
                <SuaDuAn />
            );
        if (modalType === "add_cv")
            return (
                // Có thể truyền props dữ liệu sau (modalData)
                <XemCongTy />
            );
        return null;
    };

    // Tiêu đề modal theo loại
    const modalTitle =
        modalType === "add" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Dự Án
                </h2>
            </div>
        ) : modalType === "view" ? (
            <div className="quanly-title qlct-title">
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} />
                    Chi Tiết Dự Án:
                </h2>
                <h2>
                    {modalData?.ten || "Dự Án 1"}
                </h2>
            </div>
        ) : modalType === "edit" ? (
            <div className='quanly-title qlct-title'>
                <h2><FiEdit2 style={{ marginRight: "0.3rem" }} />Sửa Dự Án:</h2>
                <h2>
                    {modalData?.ten || "Dự Án 1"}
                </h2>
            </div>
        ) : (
            ""
        );
    return (
        <div className="quanly-container qlct-container">
            <div className='quanly-title qlct-title'>
                <h2><FaProjectDiagram style={{ marginRight: "0.3rem" }} />Quản Lý Dự Án</h2>
            </div>
            <div className='timvaloc timvaloc-border'>
                <div className='tim'>
                    <input type="text" className='tim-input' placeholder='Tìm theo mã, tên, trưởng phòng, công ty,...' />
                </div>
                <div className='loc'>
                    <select className='loc-select' >
                        <option value="">--Lọc theo dự án--</option>
                    </select>
                    <select className='loc-select' >
                        <option value="">--Lọc theo trưởng dự án--</option>
                    </select>
                    <select className='loc-select' >
                        <option value="">--Lọc theo trạng thái--</option>
                    </select>
                </div>
            </div>
            <div className='quanly-header qlct-header'>
                <div className='quanly-header-title qlct-header-title'>
                    <h3>Tổng số dự án:<h3>10</h3></h3>
                </div>
                <div className='quanly-them qlct-them'>
                    <button className='button-them' onClick={openAdd}>Thêm dự án</button>
                </div>
            </div>
            <div className='quanly-body qlct-body'>
                <div className='table-container'>
                    <table className='quanly-table'>
                        <thead className='quanly-thead qlct-thead'>
                            <tr>
                                <th>STT</th>
                                <th>Mã dự án</th>
                                <th>Tên dự án</th>
                                <th>Trưởng dự án</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='quanly-tbody qlct-tbody' ref={tbodyRef}>
                            <tr>
                                <td onClick={openAdd_cv}>1</td>
                                <td onClick={openAdd_cv}>DA01</td>
                                <td onClick={openAdd_cv}>Dự án 01</td>
                                <td onClick={openAdd_cv}>Nguyễn Văn A</td>
                                <td onClick={openAdd_cv}>1-1-2025</td>
                                <td onClick={openAdd_cv}>1-3-2025</td>
                                <td onClick={openAdd_cv}>Đã xong</td>
                                <td>
                                    <button className='button-xem quanly-button-xem'><FaRegEye /></button>
                                    <button className='button-sua quanly-button-sua' onClick={openEdit}><FiEdit2 /></button>
                                    <button className='button-xoa quanly-button-xoa'><MdDeleteOutline /></button>
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
        </div>
    )
}

export default QLDuAn