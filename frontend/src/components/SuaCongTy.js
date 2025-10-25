import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "../styles/style.css";
import { FiEdit2 } from "react-icons/fi";

const SuaCongTy = ({ data, onClose, onUpdated }) => {
  const [tenCT, setTenCT] = useState("");
  const [moTa, setMoTa] = useState("");
  const [anhFile, setAnhFile] = useState(null);
  const [anhCu, setAnhCu] = useState(null);

  // ✅ Lấy thông tin công ty ban đầu để hiển thị
  useEffect(() => {
    if (data) {
      setTenCT(data.TenCT || "");
      setMoTa(data.MoTa || "");
      setAnhCu(data.Anh || null);
    }
  }, [data]);

  // ✅ Chọn ảnh mới (tùy chọn)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAnhFile(file);
  };

  // ✅ Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("TenCT", tenCT);
      formData.append("MoTa", moTa);
      if (anhFile) formData.append("Anh", anhFile);

      await axios.put(
        `http://localhost:5000/api/companies/${data.MaCT}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Cập nhật công ty thành công!");
      onClose();
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi cập nhật công ty!");
    }
  };

  return (
    <div className="quanly-container qlct-container">
      <div className="them-body themct-body">
        <form className="form themct-form" onSubmit={handleSubmit}>
          <div className="form-gr">
            <div className="form-gr-content">
              <label className="label">Mã công ty:</label>
              <input
                type="text"
                className="input"
                value={data?.MaCT || ""}
                disabled
              />
            </div>
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

          {/* ✅ Ảnh hiện tại */}
          {anhCu && !anhFile && (
            <div className="image-preview-container">
              <div className="image-preview-item">
                <img
                  src={`http://localhost:5000/uploads/${anhCu}`}
                  alt="Ảnh cũ"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  }}
                />
                <p style={{ textAlign: "center" }}>Ảnh hiện tại</p>
              </div>
            </div>
          )}

          {/* ✅ Ảnh mới (nếu chọn) */}
          {anhFile && (
            <div className="image-preview-container">
              <div className="image-preview-item">
                <img
                  src={URL.createObjectURL(anhFile)}
                  alt="Ảnh mới"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  }}
                />
                <p style={{ textAlign: "center" }}>Ảnh mới</p>
              </div>
            </div>
          )}

          <div className="button-group">
            <button type="button" className="button-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="button-add">
              <FiEdit2 style={{ marginRight: "5px" }} /> Sửa công ty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuaCongTy;
