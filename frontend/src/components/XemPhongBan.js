import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import { TfiBackLeft } from "react-icons/tfi";
import { TfiBackRight } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

const XemPhongBan = () => {
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 5;
    const tbodyRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    // Tính tổng trang dựa trên số <tr> có trong DOM (gán cứng)
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));
    }, [totalRows]);

    // Ẩn/hiện hàng theo trang hiện tại
    const applyPagination = () => {
        const tbody = tbodyRef.current;
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        rows.forEach((tr, idx) => {
            if (idx >= start && idx < end) {
                tr.style.display = ''; // hiện
            } else {
                tr.style.display = 'none'; // ẩn
            }
        });
    };

    // Lần đầu mount và mỗi khi currentPage đổi -> áp dụng phân trang
    useEffect(() => {
        const tbody = tbodyRef.current;
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        setTotalRows(rows.length);
    }, []);

    useEffect(() => {
        applyPagination();
    }, [currentPage, totalRows]);

    // Nếu sau này bạn thêm/bớt <tr> thủ công, có thể gọi hàm này để cập nhật lại.
    const refreshRowCount = () => {
        const tbody = tbodyRef.current;
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        setTotalRows(rows.length);
        // đảm bảo currentPage không vượt quá totalPages mới
        setCurrentPage((p) => {
            const newTotalPages = Math.max(1, Math.ceil(rows.length / ITEMS_PER_PAGE));
            return Math.min(p, newTotalPages);
        });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="quanly-container qlct-container">
            <div className='chitiet chitiet-pb'>
                <div className='form-gr  under-line'>
                    <div className="form-gr-content">
                        <strong>Mã phòng ban:<p>PB01</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong>Tên phòng ban:<p>Phòng ban 01</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong>Tên công ty:<p>Công ty 01</p></strong>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong>Trưởng phòng ban:<p>Nguyễn Văn A</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong>Ngày tạo:<p>11/11/2025</p></strong>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong style={{ display: "block" }}>Mô tả phòng ban:<p>Phòng Ban là đơn vị chuyên trách trong công ty,
                            chịu trách nhiệm lập kế hoạch, tổ chức và triển khai các nhiệm vụ thuộc lĩnh vực được giao.
                            Dưới sự điều hành của Trưởng phòng, bộ phận phối hợp chặt chẽ với các phòng ban khác để đạt mục tiêu chung,
                            đảm bảo tiến độ và chất lượng công việc. Phòng thường xây dựng quy trình, theo dõi KPI, báo cáo định kỳ và đề xuất cải tiến nhằm nâng cao hiệu quả hoạt động.
                            Môi trường làm việc đề cao tính kỷ luật, hợp tác và tinh thần chủ động của mỗi thành viên.</p>
                        </strong>
                    </div>
                </div>
            </div>
            <div className='quanly-header qlct-header'>
                <div className='quanly-header-title qlct-header-title'>
                    <h3>Tổng số nhân viên phòng ban:<h3>10</h3></h3>
                </div>
                <div className='timvaloc'>
                    <div className='tim' style={{ margin: 0, width: '500px' }}>
                        <input type="text" className='tim-input' placeholder='Tìm theo mã, tên nhân viên,...' />
                    </div>
                </div>
                <div className='quanly-them qlct-them'>
                    <button className='button-them'>Thêm nhân viên</button>
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
                        <tbody className='quanly-tbody qlct-tbody' ref={tbodyRef}>
                            <tr>
                                <td>1</td>
                                <td>NV01</td>
                                <td>Nguyễn Văn A</td>
                                <td>Nhân viên</td>
                                <td>
                                    <button class='button-xem quanly-button-xem'><FaRegEye /></button>
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
        </div>
    )
}

export default XemPhongBan