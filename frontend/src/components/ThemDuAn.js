import React, { useState } from 'react';
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";
import { FaRegEye, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImCancelCircle } from "react-icons/im";

// Import nội dung trong overlay
import ThemCongViec from './ThemCongViec';
import XemCongViec from './XemCongViec';
import SuaCongViec from './SuaCongViec';
import SuaMotCongViec from './SuaMotCongViec';
import XemNhanVien from './XemNhanVien';

const ThemDuAn = () => {
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
        ) : modalType === "view_nv" ? (
            <div className='quanly-title qlct-title'>
                <h2>
                    <FaEye style={{ marginRight: "0.3rem" }} /> Chi tiết nhân viên:
                </h2>
                <h2>Nguyễn Văn A</h2>
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
            case "view_nv":
                return <XemNhanVien onClose={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                {/* === FORM DỰ ÁN === */}
                <form className='form themct-form'>
                    <div className='them-body-title'>
                        <h2 style={{ margin: 0 }}>Dự Án:</h2>
                    </div>
                    <div className='them-body-border'>
                        <div className='form-gr'>
                            <div className='form-gr-content'>
                                <label className='label'>Tên dự án:</label>
                                <input type="text" className='input' placeholder='Nhập tên dự án...' />
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
                                    config={{
                                        toolbar: [
                                            "heading", "|",
                                            "bold", "italic", "underline", "link", "|",
                                            "bulletedList", "numberedList", "blockQuote", "|",
                                            "insertTable", "undo", "redo"
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        <div className='form-gr'>
                            <div className='form-gr-content' style={{ flexDirection: "column" }}>
                                <label className='label'>Thành viên dự án:</label>
                            </div>
                        </div>
                        <div className='quanly-body qlct-body'>
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
                                                <button class='button-xem quanly-button-xem' type='button' onClick={() => openModal('view_nv')}><FaRegEye /></button>
                                                <button class='button-xoa quanly-button-xoa' type='button'><MdDeleteOutline /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='button-group'>
                            <button className='button-add-da' type='button'>Thêm thành viên dự án</button>
                        </div>
                    </div>
                    {/* === BẢNG CÔNG VIỆC === */}
                    <div className='them-body-title'>
                        <h2 style={{ margin: 0 }}>Công việc:</h2>
                    </div>
                    <div className='them-body-border'>
                        <div className='form-gr'>
                            <div className='form-gr-content' style={{ flexDirection: "column" }}>
                                <label className='label'>Danh sách công việc:</label>
                            </div>
                        </div>
                        <div className='quanly-body qlct-body'>
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
                                                <button className='button-xem quanly-button-xem' type='button' onClick={() => openModal('view')}>
                                                    <FaRegEye />
                                                </button>
                                                <button className='button-sua quanly-button-sua' type='button' onClick={() => openModal('edit_one')}>
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
                        </div>

                        <div className='button-group'>
                            <button
                                className='button-add-sua'
                                type='button'
                                onClick={() => openModal('edit')}
                            >
                                Sửa công việc
                            </button>
                            <button
                                className='button-add-da'
                                type='button'
                                onClick={() => openModal('add')}
                            >
                                Thêm công việc
                            </button>
                        </div>
                    </div>
                </form>
                <div className='button-group'>
                    <button className='button-cancel'>Hủy</button>
                    <button className='button-add'>Thêm dự án</button>
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

export default ThemDuAn;
