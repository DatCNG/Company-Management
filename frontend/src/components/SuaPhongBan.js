import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "../styles/style.css";
import { FiEdit2 } from "react-icons/fi";

const SuaPhongBan = ({ data, onClose = () => {}, onUpdated = () => {} }) => {
  const [tenPB, setTenPB] = useState("");
  const [moTa, setMoTa] = useState("");
  const [maCT, setMaCT] = useState("");
  const [truongPhong, setTruongPhong] = useState("");

  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);

  const API_URL = "http://localhost:5000/api/departments";

  // 🧭 Lấy dữ liệu khi mở form
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Lấy danh sách công ty + nhân viên
        const [ctRes, nvRes] = await Promise.all([
          axios.get("http://localhost:5000/api/companies"),
          axios.get("http://localhost:5000/api/employees"),
        ]);
        setCompanies(ctRes.data);
        setEmployees(nvRes.data);

        // 2️⃣ Lấy chi tiết phòng ban
        if (data?.MaPB) {
          const res = await axios.get(`${API_URL}/${data.MaPB}`);
          const pb = res.data;
          setTenPB(pb.TenPB || "");
          setMoTa(pb.MoTa || "");
          setMaCT(pb.MaCT || "");
          setTruongPhong(pb.TruongPhong || "");
        }
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu:", err);
      }
    };
    fetchData();
  }, [data]);

  // 🧩 Cập nhật phòng ban
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenPB.trim() || !maCT) {
      alert("⚠️ Vui lòng nhập tên phòng ban và chọn công ty!");
      return;
    }

    try {
      // ✅ Cập nhật thông tin phòng ban (trừ trưởng phòng)
      await axios.put(`${API_URL}/${data.MaPB}`, {
        TenPB: tenPB.trim(),
        MoTa: moTa,
        MaCT: maCT,
        TruongPhong: truongPhong || null,
      });

      // ✅ Nếu chọn trưởng phòng mới → gọi API chuyên dụng để cập nhật chức vụ
      if (truongPhong) {
        await axios.put(`${API_URL}/${data.MaPB}/truongphong`, {
          MaNV: truongPhong,
        });
      }

      alert("✅ Cập nhật phòng ban thành công!");
      onUpdated();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật phòng ban:", err);
      alert("Không thể cập nhật phòng ban!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          {/* Mã & tên phòng ban */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Mã phòng ban:</label>
              <input
                type="text"
                className="input"
                value={data?.MaPB || ""}
                disabled
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Tên phòng ban:</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên phòng ban..."
                value={tenPB}
                onChange={(e) => setTenPB(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Thuộc công ty */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Thuộc công ty:</label>
              <select
                className="select"
                value={maCT}
                onChange={(e) => setMaCT(e.target.value)}
                required
              >
                <option value="">-- Chọn công ty --</option>
                {companies.map((ct) => (
                  <option key={ct.MaCT} value={ct.MaCT}>
                    {ct.TenCT}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Trưởng phòng */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Trưởng phòng:</label>
              <select
                className="select"
                value={truongPhong}
                onChange={(e) => setTruongPhong(e.target.value)}
              >
                <option value="">-- Chưa chọn --</option>
                {employees.map((nv) => (
                  <option key={nv.MaNV} value={nv.MaNV}>
                    {nv.TenNV}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mô tả */}
          <div className="form-gr">
            <div
              className="form-gr-content"
              style={{ flexDirection: "column" }}
            >
              <label className="label">Mô tả:</label>
              <CKEditor
                editor={ClassicEditor}
                data={moTa}
                onChange={(_, editor) => setMoTa(editor.getData())}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "|",
                    "insertTable",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="button-group">
            <button type="button" className="button-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="button-add">
              <FiEdit2 style={{ marginRight: "5px" }} /> Sửa phòng ban
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaPhongBan;
