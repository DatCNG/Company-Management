import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";
import { FiEdit2 } from "react-icons/fi";

const SuaPhongBan = ({ data, onClose = () => {}, onUpdated = () => {} }) => {
  const [tenPB, setTenPB] = useState("");
  const [moTa, setMoTa] = useState("");
  const [maCT, setMaCT] = useState("");
  const [truongPhong, setTruongPhong] = useState("");


  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form">
          {/* Mã & tên phòng ban */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Mã phòng ban:</label>
              <input
                type="text"
                className="input"
                disabled
              />
            </div>
            <div className="form-gr-content">
              <label className="label">Tên phòng ban:</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên phòng ban..."
                required
              />
            </div>
          </div>

          {/* Thuộc công ty */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Công ty:</label>
              <select
                className="select"
                required
              >
                <option value="">-- Chọn công ty --</option>
              </select>
            </div>
          </div>

          {/* Trưởng phòng */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Trưởng phòng:</label>
              <select
                className="select"
              >
                <option value="">-- Chọn trưởng phòng --</option>
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
            <button type="submit" className="button-them">
              <FiEdit2 style={{ marginRight: "5px" }} /> Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaPhongBan;
