import React, { useEffect, useMemo, useRef, useState } from "react";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye, FaEye } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import "../styles/style.css";

import XemNhanVien from "./XemNhanVien";

const XemBaoCao = () => {

  return (
    <div className="quanly-container qlct-container">
      {/* ===== Thông tin công ty ===== */}
      <div className="chitiet chitiet-pb">
        <div className="chitiet-content">
          <h3>Báo Cáo</h3>
          <div className="form-gr under-line">
            <div className="form-gr-content">
              <strong>Mã báo cáo:<p>-</p></strong>
            </div>
            <div className="form-gr-content">
              <strong>Tên báo cáo:<p>-</p></strong>
            </div>
          </div>
          <div className="form-gr under-line">
            <div className="form-gr-content">
              <strong>Công việc:<p>-</p></strong>
            </div>
            <div className="form-gr-content">
              <strong>Dự án:<p>-</p></strong>
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
              <strong>Nhân viên phụ trách:<p>-</p></strong>
            </div>
          </div>
          <div className="form-gr under-line">
            <div className="form-gr-content">
              <strong style={{ display: "block" }}>Ghi chú:<p>-</p></strong>
            </div>
          </div>
          <div className="form-gr">
            <div className="form-gr-content">
              <strong>File báo cáo:</strong>
            </div>
          </div>
          <div className="chitiet-content">
            <div className="form-gr under-line">
              <div className="form-gr-content">
                <strong>Tên file:<p>-</p></strong>
              </div>
              <div className="form-gr-content">
                <strong>Ngày nộp:<p>-</p></strong>
              </div>
            </div>
          </div>
        </div>
        <div className="chitiet-content">
          <h3>Mức độ hoàn thành</h3>
        </div>
      </div>
    </div>
  );
};

export default XemBaoCao;
