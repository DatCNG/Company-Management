// src/components/ThemTaiKhoan.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import "../styles/Logs.css";
import br_themtaikhoan from "../imgs/br-qlct2.jpg";

const DoiMK = ({ onClose = () => { } }) => {

    return (
        <div
            className="quanly-container qlct-container"
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                padding: 0
            }}
        >
            {/* Ảnh nền full */}
            <div
                className="br-themtaikhoan"
                style={{ position: 'relative', zIndex: 0, width: '100%', height: '100%' }}
            >
                <img
                    src={br_themtaikhoan}
                    alt="Background"
                    className="img-themtaikhoan"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </div>

            {/* Form BÊN PHẢI 50% */}
            <div
                className="them-body themct-body col-5"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,          // quan trọng: dính cạnh phải
                    height: '100%',    // phủ theo chiều cao ảnh
                    width: '50%',      // chiếm 50% bên phải
                    zIndex: 1,         // nằm trên ảnh
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {/* Nút đóng trong form */}
                <button
                    type="button"
                    aria-label="Đóng"
                    onClick={onClose}
                    className="form-close-in"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '12px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '20px',
                        lineHeight: 1,
                        cursor: 'pointer',
                        color: '#111',
                    }}
                >
                    ×
                </button>

                <h3 className="subtitle">ĐỔI MẬT KHẨU</h3>
                <form className="form themct-form">
                    <div className="form-gr">
                        <div className="form-gr-content">
                            <label className="label">Mật khẩu cũ:</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Nhập mật khẩu..."
                            />
                        </div>
                    </div>
                    <div className="form-gr">
                        <div className="form-gr-content">
                            <label className="label">Mật khẩu mới:</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Nhập mật khẩu mới..."
                            />
                        </div>
                    </div>

                    <div className="form-gr">
                        <div className="form-gr-content">
                            <label className="label">Xác nhận mật khẩu mới:</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Nhập lại mật khẩu mới..."
                            />
                        </div>
                    </div>

                    <div className="logs-button-gr" style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            className="logs-button"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoiMK