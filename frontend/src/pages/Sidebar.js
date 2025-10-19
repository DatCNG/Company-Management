import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBookmark, FaBookOpen, FaFileCircleQuestion, FaWarehouse
} from "react-icons/fa6";
import { PiHouseFill } from "react-icons/pi";
import { MdAccountCircle, MdManageAccounts } from "react-icons/md";
import { GrDocumentLocked } from "react-icons/gr";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbLockPassword } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import "../styles/Sidebar.css";
import "../styles/style.css";

const Sidebar = ({ show = true, toggle = () => {} }) => {
  const linkClass = ({ isActive }) => `menu-link ${isActive ? "active" : ""}`;

  return (
    <aside className={show ? "sidenav expanded" : "sidenav collapsed"}>
      <div className="toggle-btn" onClick={toggle} aria-label="Mở/đóng menu">
        <GiHamburgerMenu />
      </div>

      <ul className="menu">
        <li>
          <NavLink to="/quanlycongty" className={linkClass} title="Công ty">
            <FaWarehouse className="icon" />
            <span className="label">Công Ty</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlyphongban" className={linkClass} title="Phòng ban">
            <PiHouseFill className="icon" />
            <span className="label">Phòng Ban</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/lanhdao" className={linkClass}>
            <LiaChalkboardTeacherSolid className="icon" />
            <span className="label">Lãnh Đạo</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlynhanvien" className={linkClass}>
            <IoIosPeople  className="icon" />
            <span className="label">Nhân Viên</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlyduan" className={linkClass}>
            <MdManageAccounts className="icon" />
            <span className="label">Dự Án</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlycongviec" className={linkClass}>
            <GrDocumentLocked className="icon" />
            <span className="label">Công Việc</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlybaocao" className={linkClass}>
            <FaFileCircleQuestion className="icon" />
            <span className="label">Báo Cáo</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlyluong" className={linkClass}>
            <FaFileCircleQuestion className="icon" />
            <span className="label">Lương</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/quanlytaikhoan" className={linkClass}>
            <MdAccountCircle className="icon" />
            <span className="label">Tài Khoản</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/doimatkhau" className={linkClass}>
            <TbLockPassword className="icon" />
            <span className="label">Đổi Mật Khẩu</span>
          </NavLink>
        </li>
        <li>
          <a href="#logout" className="menu-link" onClick={(e)=>e.preventDefault()}>
            <CiLogout className="icon" />
            <span className="label">Đăng Xuất</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
