import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";

import { IoAddCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import '../styles/style.css';
import '../styles/Navbar.css';

import DoiMK from './DoiMK'
import XemTTCN from '../components/XemTTCN';

const Navbar = () => {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'view' | 'edit'
  const [modalData, setModalData] = useState(null); // có thể truyền dữ liệu CT sau này

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
  const openChange = () => {
    setModalType("change");
    setModalData(null);
    setShowModal(true);
  };

  const openProfile = () => {
    setModalType("profile");
    setModalData(null);
    setShowModal(true);
  };

  // Chọn component cho modal
  const renderModalContent = () => {
    if (modalType === "change") return <DoiMK onClose={() => setShowModal(false)} />;
    if (modalType === "profile") return <XemTTCN onClose={() => setShowModal(false)} />;
    return null;
  };

  // Tiêu đề modal theo loại
  const modalTitle =
    modalType === "change" ? (
      <div className='quanly-title qlct-title'>
        <h2>
          <IoAddCircle style={{ marginRight: ".3rem" }} /> Đổi Mật Khẩu
        </h2>
      </div>
    ) : modalType === "profile" ? (
      <div className='quanly-title qlct-title'>
        <h2>
          <FaEye style={{ marginRight: ".3rem" }} />Thông Tin Cá Nhân
        </h2>
      </div>
    ) : (
      ""
    );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown nếu click bên ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <h1>HỆ THỐNG QUẢN LÝ CÔNG TY</h1>
      <div className="account" ref={dropdownRef} onClick={() => setOpen(!open)}>
        <span>Admin</span>
        <button className="account-button">
          <img className="account-img" />
        </button>

        {open && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={openProfile}>
              <RiAccountCircleFill style={{marginRight: '0.3rem'}}/>
              <div>
                Xem thông tin
              </div>
            </button>
            <button className="dropdown-item" onClick={openChange}>
              <RiLockPasswordFill style={{marginRight: '0.3rem'}}/>
              <div>
                Đổi mật khẩu
              </div>
            </button>
            <button className="dropdown-item">
              <CiLogout style={{marginRight: '0.3rem'}}/>
              <div>
                Đăng xuất
              </div>
            </button>
          </div>
        )}
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
            <div className="overlay-content" style={{ maxWidth: '1350px', overflow: 'none' }}>
              {modalType !== "change" && (
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
              )}
              <div className="overlay-body" style={{ padding: 0, margin: 0 }}>{renderModalContent()}</div>
            </div>
          </div>,
          document.body
        )
      }
    </div>

  );
};

export default Navbar;
