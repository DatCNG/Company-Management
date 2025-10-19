import React, { useEffect, useMemo, useRef, useState } from 'react';
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const SuaNhanVien = () => {
    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                <form className='form themct-form'>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Chọn ảnh:</label>
                            <input type="file" className='input' />
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Mã nhân viên:</label>
                            <input type="email" className='input'/>
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Họ và tên:</label>
                            <input type="text" className='input'/>
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Email:</label>
                            <input type="email" className='input'/>
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Số điện thoại:</label>
                            <input type="text" className='input'/>
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Giới tính:</label>
                            <select className='select' >
                                <option value="">-- Chọn giới tính --</option>
                                <option value="">Nam</option>
                                <option value="">Nữ</option>
                            </select>
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Ngày sinh:</label>
                            <input type="date" className='input' />
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>CCCD:</label>
                            <input type="text" className='input'/>
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Ngày cấp:</label>
                            <input type="date" className='input' />
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Ngày vào làm:</label>
                            <input type="date" className='input' />
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Chức vụ:</label>
                            <select className='select' >
                                <option value="">-- Chọn chức vụ --</option>
                            </select>
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Vai trò:</label>
                            <select className='select' >
                                <option value="">-- Chọn vai trò --</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Địa chỉ:</label>
                            <textarea className='textarea'/>
                        </div>
                    </div>
                </form>
                <div className='button-group'>
                    <button className='button-cancel'>Hủy</button>
                    <button className='button-add'>Sửa nhân viên</button>
                </div>
            </div>
        </div>
    )
}

export default SuaNhanVien