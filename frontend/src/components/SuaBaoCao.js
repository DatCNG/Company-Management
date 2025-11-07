import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const SuaBaoCao = ({ onClose, onAdded }) => {
    const navigate = useNavigate();
    const [tenCT, setTenCT] = useState("");
    const [moTa, setMoTa] = useState("<p>Ghi chú..</p>");
    const [anhFile, setAnhFile] = useState(null);

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
                            <label className="label">Công việc:</label>
                            <select className="select">
                                <option value="">-- Chọn công việc --</option>
                            </select>
                        </div>
                        <div className="form-gr-content">
                            <label className="label">Dự án:</label>
                            <select className="select" disabled>
                                <option value="">-- Chọn dự án --</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-gr">
                        <div className="form-gr-content">
                            <label className="label">File báo cáo:</label>
                            <input
                                type="file"
                                className="input"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                            />
                        </div>
                    </div>

                    <div className="form-gr">
                        <div
                            className="form-gr-content"
                            style={{ flexDirection: "column" }}
                        >
                            <label className="label">Ghi chú:</label>
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

                    <div className="button-group">
                        <button type="button" className="button-cancel" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="button-them">
                            <IoAddCircle style={{ marginRight: "5px" }} /> Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SuaBaoCao;
