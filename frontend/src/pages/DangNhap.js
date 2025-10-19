import React from 'react'
import "../styles/style.css";
import "../styles/Logs.css";
import br_qlct from "../imgs/br-qlct.jpg";

const DangNhap = () => {
    return (
        <div className="logs-container">
            <img src={br_qlct} alt="Background" className="background-image" />
            <div className="overlay" />
            <div className="logs-form-wrapper">
                <div className="vienmo">
                    <div className="logs-form">
                        <h2 className="title">HỆ THỐNG QUẢN LÝ CÔNG TY</h2>
                        <h3 className="subtitle">ĐĂNG NHẬP</h3>
                        <form className="form">
                            <div className="form-group">
                                <label className="label">Tài khoản:</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    className="input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Mật khẩu:</label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className="input"
                                />
                            </div>
                            <button type="submit" className="logs-button">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DangNhap