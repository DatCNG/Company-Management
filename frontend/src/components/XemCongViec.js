import React, { useMemo, useState, useEffect, useRef } from 'react'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../styles/style.css";

const XemCongViec = () => {
  return (
    <div className="quanly-container qlct-container">
      <div className='chitiet chitiet-pb'>
        <div className='form-gr  under-line'>
          <div className="form-gr-content">
            <strong>Mã công việc:<p>CV01</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Tên công việc:<p>Công việc 01</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Phòng ban:<p>Phòng ban 01</p></strong>
          </div>
        </div>

        <div className='form-gr under-line'>
          <div className="form-gr-content">
            <strong>Ngày bắt đầu:<p>01-11-2025</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Ngày kết thúc:<p>05-11-2025</p></strong>
          </div>
        </div>

        <div className='form-gr under-line'>
          <div className="form-gr-content">
            <strong>Trưởng dự án:<p>Nguyễn Văn A</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Nhân viên phụ trách:<p>Nguyễn Văn B</p></strong>
          </div>
        </div>

        <div className='form-gr under-line'>
          <div className="form-gr-content">
            <strong style={{ display: "block" }}>
              Mô tả công việc:
              <p>
                Phòng Ban là đơn vị chuyên trách trong công ty, chịu trách nhiệm lập kế hoạch, tổ chức và triển khai các nhiệm vụ thuộc lĩnh vực được giao.
                Dưới sự điều hành của Trưởng phòng, bộ phận phối hợp chặt chẽ với các phòng ban khác để đạt mục tiêu chung, đảm bảo tiến độ và chất lượng công việc.
                Phòng thường xây dựng quy trình, theo dõi KPI, báo cáo định kỳ và đề xuất cải tiến nhằm nâng cao hiệu quả hoạt động.
                Môi trường làm việc đề cao tính kỷ luật, hợp tác và tinh thần chủ động của mỗi thành viên.
              </p>
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default XemCongViec
