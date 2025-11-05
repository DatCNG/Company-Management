import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";
import { FiEdit2 } from "react-icons/fi";

const SuaCongTy = ({ data, onClose, onUpdated }) => {
  const [tenCT, setTenCT] = useState("");
  const [moTa, setMoTa] = useState("");
  const [anhFile, setAnhFile] = useState(null);
  const [anhCu, setAnhCu] = useState(null);


  // ✅ Xử lý chọn 1 ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAnhFile(file);
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form">
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Mã công ty:</label>
              <input
                type="text"
                className="input"
                disabled
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Tên công ty:</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên công ty..."
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
            <button type="submit" className="button-them">
              <FiEdit2 style={{ marginRight: "5px" }} /> Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaCongTy;
