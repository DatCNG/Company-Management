import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const ThemPhongBan = ({ onClose = () => {}, onAdded = () => {} }) => {
  const [tenPB, setTenPB] = useState("");
  const [moTa, setMoTa] = useState("<p>Mô tả phòng ban...</p>");
  const [maCT, setMaCT] = useState("");

  const [companies, setCompanies] = useState([]);

  const API_URL = "http://localhost:5000/api/departments";

  // 🧭 Lấy danh sách công ty để chọn
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải danh sách công ty:", err);
      }
    };
    fetchData();
  }, []);

  // 🧩 Gửi form thêm phòng ban
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenPB.trim() || !maCT) {
      alert("⚠️ Vui lòng nhập tên phòng ban và chọn công ty!");
      return;
    }

    try {
      await axios.post(API_URL, {
        TenPB: tenPB.trim(),
        MoTa: moTa,
        MaCT: maCT,
        TruongPhong: null, // 🚫 Không chọn trưởng phòng ban đầu
      });

      alert("✅ Thêm phòng ban thành công!");
      onAdded();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi thêm phòng ban:", err);
      alert("Không thể thêm phòng ban!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          {/* === Tên phòng ban === */}
          <div className="form-gr">
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

          {/* === Thuộc công ty === */}
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

          {/* === Mô tả === */}
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

          {/* === Buttons === */}
          <div className="button-group">
            <button type="button" className="button-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="button-add">
              <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm phòng ban
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemPhongBan;
