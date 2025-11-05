import React, { useEffect, useMemo, useRef, useState } from 'react';
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaRegEye, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";

import ThemCongViec from './ThemCongViec';
import XemCongViec from './XemCongViec';
import SuaCongViec from './SuaCongViec';
import SuaMotCongViec from './SuaMotCongViec';

const SuaDuAn = () => {
    const [moTa, setMoTa] = useState("<p>Mô tả dự án...</p>");
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

    // Tiêu đề động kiểu bạn muốn
    const modalTitle =
        modalType === "add" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm Công Việc
                </h2>
            </div>
        ) : modalType === "view" ? (
            <div className="quanly-title qlct-title">
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} /> Chi Tiết Công Việc:
                </h2>
                <h2>Công việc 01</h2>
            </div>
        ) : modalType === "edit" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Công Việc Dự Án:
                </h2>
                <h2>Dự Án 01</h2>
            </div>
        ) : modalType === "edit_one" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FiEdit2 style={{ marginRight: "0.3rem" }} /> Sửa Công Việc:
                </h2>
                <h2>Công việc 01</h2>
            </div>
        ) : (
            ""
        );

    // Hàm render nội dung trong overlay
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
            default:
                return null;
        }
    };
    //Phân trang
    const ITEMS_PER_PAGE = 5;
    const tbodyRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                {/* === FORM DỰ ÁN === */}
                <form className='form themct-form'>
                    <div className='chitiet-content'>
                        <h3>Dự Án</h3>
                        <div className='form-gr'>
                            <div className='form-gr-content'>
                                <label className='label'>Tên dự án:</label>
                                <input type="text" />
                            </div>
                            <div className='form-gr-content'>
                                <label className='label'>Trưởng dự án:</label>
                                <select className='select'>
                                    <option value=''>-- Chọn trưởng dự án --</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-gr'>
                            <div className='form-gr-content'>
                                <label className='label'>Ngày bắt đầu:</label>
                                <input type="date" className='input' />
                            </div>
                            <div className='form-gr-content'>
                                <label className='label'>Ngày kết thúc:</label>
                                <input type="date" className='input' />
                            </div>
                        </div>

                        <div className='form-gr'>
                            <div className='form-gr-content' style={{ flexDirection: "column" }}>
                                <label className='label'>Mô tả:</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={moTa}
                                    onChange={(_, editor) => setMoTa(editor.getData())}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='chitiet-content'>
                        <h3>Thành Viên Dự Án</h3>
                        <div className='form-gr'>
                            <div className='form-gr-content' style={{ flexDirection: "column" }}>
                                <label className='label'>Tống số thành viên dự án:</label>
                            </div>
                        </div>
                        <div className='quanly-body qlct-body' ref={tbodyRef}>
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
                                                <button class='button-xem quanly-button-xem' type='button'><FaRegEye /></button>
                                                <button class='button-xoa quanly-button-xoa' type='button'><MdDeleteOutline /></button>
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
                        </div>
                        <div className='button-group'>
                            <button className='button-add-da' type='button'>Thêm thành viên dự án</button>
                        </div>
                    </div>
                </form>
                <div className='button-group'>
                    <button className='button-cancel'>Hủy</button>
                    <button className='button-them'><FiEdit2 style={{ marginRight: "5px" }} />Sửa</button>
                </div>
            </div>
            {/* === OVERLAY === */}
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
                                ×
                            </button>
                        </div>
                        <div className="overlay-body">{renderModalContent()}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuaDuAn