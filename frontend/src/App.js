import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
//Pages
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
import DangNhap from './pages/DangNhap';
import DoiMK from './pages/DoiMK';
import QLCongTy from './pages/QLCongTy';
import QLPhongBan from './pages/QLPhongBan';
import QLNhanVien from './pages/QLNhanVien';
import QLTaiKhoan from './pages/QLTaiKhoan';
import QLDuAn from "./pages/QLDuAn";
import QLCongViec from "./pages/QLCongViec";
import QLBaoCao from "./pages/QLBaoCao";

//Components
import ThemCongTy from './components/ThemCongTy';
import XemCongTy from "./components/XemCongTy";
import SuaCongTy from "./components/SuaCongTy";
import ThemPhongBan from './components/ThemPhongBan';
import XemPhongBan from './components/XemPhongBan';
import SuaPhongBan from './components/SuaPhongBan';
import ThemNhanVien from './components/ThemNhanVien';
import SuaNhanVien from "./components/SuaNhanVien";
import ThemTaiKhoan from "./components/ThemTaiKhoan";
import SuaTaiKhoan from "./components/SuaTaiKhoan";
import ThemDuAn from "./components/ThemDuAn";
import SuaDuAn from "./components/SuaDuAn";
import ThemCongViec from "./components/ThemCongViec";
import XemCongViec from "./components/XemCongViec";
import SuaCongViec from "./components/SuaCongViec";
import SuaMotCongViec from "./components/SuaMotCongViec";

function App() {
  const [show, setShow] = useState(true);

  return (
    <BrowserRouter>
      <Sidebar show={show} toggle={() => setShow(s => !s)} />
      {/* Nếu có vùng nội dung thì đặt thêm <main> ở đây */}
      <main className={`main ${show ? "shifted" : ""}`}>
        <Navbar />
        <Routes>
          {/* Đăng nhập / Đăng ký*/}
          <Route path="/dangnhap" element={<DangNhap />} />
          {/* Công Ty */}
          <Route path="/quanlycongty" element={<QLCongTy />} />
          <Route path="/xemcongty" element={<XemCongTy />} />
          <Route path="/themcongty" element={<ThemCongTy />} />
          <Route path="/suacongty" element={<SuaCongTy />} />
          {/* Phòng Ban */}
          <Route path="/quanlyphongban" element={<QLPhongBan />} />
          <Route path="/themphongban" element={<ThemPhongBan />} />
          <Route path="/xemphongban" element={<XemPhongBan />} />
          <Route path="/suaphongban" element={<SuaPhongBan />} />
          {/* Nhân Viên */}
          <Route path="/quanlynhanvien" element={<QLNhanVien />} />
          <Route path="/themnhanvien" element={<ThemNhanVien />} />
          <Route path="/suanhanvien" element={<SuaNhanVien />} />
          {/* Lãnh Đạo */}

          {/* Nhân Viên */}

          {/* Dự Án */}
          <Route path="/quanlyduan" element={<QLDuAn />} />
          <Route path="/themduan" element={<ThemDuAn />} />
          <Route path="/suaduan" element={<SuaDuAn />} />
          {/* Công Việc */}
          <Route path="/quanlycongviec" element={<QLCongViec />} />
          <Route path="/themcongviec" element={<ThemCongViec />} />
          <Route path="/xemcongviec" element={<XemCongViec />} />
          <Route path="/suacongviec" element={<SuaCongViec />} />
          <Route path="/suamotcongviec" element={<SuaMotCongViec />} />
          {/* Báo Cáo */}
          <Route path="/quanlybaocao" element={<QLBaoCao />} />
          {/* Lương */}

          {/* Tài Khoản */}
          <Route path="/quanlytaikhoan" element={<QLTaiKhoan />} />
          <Route path="/themtaikhoan" element={<ThemTaiKhoan />} />
          <Route path="/suataikhoan" element={<SuaTaiKhoan />} />
          {/* Đổi Mật Khẩu */}
          <Route path="/doimatkhau" element={<DoiMK />} />
          {/* Đăng Xuất */}

        </Routes>
      </main>
    </BrowserRouter>
  );
  // return (
  //   // <DangNhap />
  //   //<DoiMK />
  //   //<QLCongTy />
  //   //<QLPhongBan />
  //   //<XemPhongBan />
  //   //<ThemCongTy />
  //   //<ThemPhongBan />
  //   //<ThemNhanVien />
  //   //<QLTaiKhoan />
  //   <Sidebar />
  // );
}

export default App;
