import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const ThemPhongBan = ({ onClose = () => { }, onAdded = () => { } }) => {
  const [tenPB, setTenPB] = useState("");
  const [moTa, setMoTa] = useState("<p>Mô tả phòng ban...</p>");
  const [maCT, setMaCT] = useState("");


  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form">
          {/* === Tên phòng ban === */}
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Tên phòng ban:</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên phòng ban..."
                required
              />
            </div>
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
            <button type="submit" className="button-them">
              <IoAddCircle style={{ marginRight: ".3rem" }} /> Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemPhongBan;
