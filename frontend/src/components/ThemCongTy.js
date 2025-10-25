import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const ThemCongTy = ({ onClose, onAdded }) => {
  const navigate = useNavigate();
  const [tenCT, setTenCT] = useState("");
  const [moTa, setMoTa] = useState("<p>Mô tả công ty...</p>");
  const [anhFile, setAnhFile] = useState(null);

  // ✅ Xử lý chọn 1 ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAnhFile(file);
  };

  // ✅ Gửi dữ liệu về server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("TenCT", tenCT);
      formData.append("MoTa", moTa);
      if (anhFile) formData.append("Anh", anhFile);

      await axios.post("http://localhost:5000/api/companies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Thêm công ty thành công!");
      onClose(); // đóng modal
      onAdded?.(); // reload danh sách
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm công ty!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Tên công ty:</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên công ty"
                value={tenCT}
                onChange={(e) => setTenCT(e.target.value)}
                required
              />
            </div>
          </div>

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

          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Ảnh công ty:</label>
              <input
                type="file"
                className="input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* ✅ Xem trước ảnh */}
          {anhFile && (
            <div className="image-preview-container">
              <div className="image-preview-item">
                <img
                  src={URL.createObjectURL(anhFile)}
                  alt="Xem trước"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          )}

          <div className="button-group">
            <button type="button" className="button-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="button-add">
              <IoAddCircle style={{ marginRight: "5px" }} /> Thêm công ty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemCongTy;
