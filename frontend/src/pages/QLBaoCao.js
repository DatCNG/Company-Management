import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import { TfiBackLeft } from "react-icons/tfi";
import { TfiBackRight } from "react-icons/tfi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GrDocumentLocked } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { TbFileReport } from "react-icons/tb";

import ThemCongViec from '../components/ThemCongViec';
import SuaCongViec from "../components/SuaCongViec";
import XemCongViec from '../components/XemCongTy';
import SuaMotCongViec from '../components/SuaMotCongViec';
import ThemBaoCao from '../components/ThemBaoCao';
import XemBaoCao from '../components/XemBaoCao';
import SuaBaoCao from '../components/SuaBaoCao';

const QLBaoCao = () => {
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
        if (modalType === "add") return <ThemBaoCao onClose={() => setShowModal(false)} />;
        if (modalType === "view")
            return (
                // Có thể truyền props dữ liệu sau (modalData)
                <XemBaoCao />
            );
        if (modalType === "edit")
            return (
                // Có thể truyền props dữ liệu sau (modalData)
                <SuaBaoCao />
            );
        return null;
    };

    // Tiêu đề modal theo loại
    const modalTitle =
        modalType === "add" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Báo Cáo
                </h2>
            </div>
        ) : modalType === "view" ? (
            <div className="quanly-title qlct-title">
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} />
                    Chi Tiết Báo Cáo:
                </h2>
                <h2>
                    -
                </h2>
            </div>
        ) : modalType === "edit" ? (
            <div className='quanly-title qlct-title'>
                <h2><FiEdit2 style={{ marginRight: "0.3rem" }} />Sửa Báo Cáo:</h2>
                <h2>
                    -
                </h2>
            </div>
        ) : (
            ""
        );
    return (
        <div className='quanly-content'>
            <div className="quanly-container qlct-container">
                <div className='quanly-title qlct-title'>
                    <h2><TbFileReport style={{ marginRight: "0.3rem" }} />Báo Cáo</h2>
                </div>
                <div className="quanly-title-sub">
                    <div className="ct-tong">
                        <div className="quanly-title-sub-content">
                            <h3>Tổng báo cáo:<span className="tong">10</span></h3>
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
                <div className='timvaloc timvaloc-border'>
                    <div className='tim'>
                        <input type="text" className='tim-input' placeholder='Tìm theo mã, tên công việc, tên dự án,...' />
                    </div>
                    <div className='loc'>
                        <select className='loc-select' >
                            <option value="">-- Lọc theo báo cáo --</option>
                        </select>
                        <select className='loc-select' >
                            <option value="">-- Lọc theo công việc --</option>
                        </select>
                        <select className='loc-select' >
                            <option value="">-- Lọc theo dự án --</option>
                        </select>
                        <select className='loc-select' >
                            <option value="">-- Lọc theo trạng thái --</option>
                        </select>
                    </div>
                </div>
                <div className='quanly-header qlct-header'>
                    <div className='quanly-header-title qlct-header-title'>
                        <h3>Danh sách báo cáo</h3>
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
                                    <th>Mã báo cáo</th>
                                    <th>Tên báo cáo</th>
                                    <th>Công việc</th>
                                    <th>Dự án</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Ngày nộp</th>
                                    <th>Tiến độ</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className='quanly-tbody qlct-tbody' ref={tbodyRef}>
                                <tr>
                                    <td>1</td>
                                    <td>BC01</td>
                                    <td>Báo Cáo 01</td>
                                    <td>Công việc 01</td>
                                    <td>Dự án 01</td>
                                    <td>1-1-2025</td>
                                    <td>1-3-2025</td>
                                    <td>1-2-2025</td>
                                    <td>-</td>
                                    <td>Đã hoàn thành</td>
                                    <td>
                                        <button className='button-xem quanly-button-xem' onClick={openView}><FaRegEye /></button>
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
        </div>
    )
}

export default QLBaoCao