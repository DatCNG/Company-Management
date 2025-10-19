import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";

const XemNhanVien = () => {
    return (
        <div className="quanly-container qlct-container">
            <div className='chitiet chitiet-pb'>
                <div className='form-gr'>
                    <div className='avatar'>
                        <img className='avatar-img'/>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong>Mã nhân viên:<p>NV02</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong>Tên nhân viên:<p>Nguyễn Văn A</p></strong>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong>Số điện thoại:<p>0949566519</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong>Email:<p>nva@gmail.com</p></strong>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong >Giới tính:<p>Nam</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong >Ngày sinh:<p>03-03-2000</p></strong>
                    </div>
                </div>
                <div className='form-gr under-line'>
                    <div className="form-gr-content">
                        <strong >Ngày vào làm:<p>01-01-2024</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong >Chức vụ:<p>Nhân viên</p></strong>
                    </div>
                    <div className="form-gr-content">
                        <strong >Vài trò:<p>Nhân viên</p></strong>
                    </div>
                </div>
                <div className='form-gr'>
                    <div className="form-gr-content">
                        <strong >Địa chỉ:<p>123 Liên tổ 12-20, An Khánh, Ninh Kiều, Cần Thơ</p></strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default XemNhanVien