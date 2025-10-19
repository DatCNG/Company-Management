import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";

const SuaCongTy = () => {
    const [moTa, setMoTa] = useState([]);
    const [anhFiles, setAnhFiles] = useState([]);
    // xử lý chọn nhiều ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setAnhFiles(files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        })));
    };
    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                <form className='form themct-form'>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Mã công ty:</label>
                            <input type="text" className='input' />
                        </div>
                        <div className='form-gr-content'>
                            <label className='label'>Tên công ty:</label>
                            <input type="text" className='input' />
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Địa chỉ:</label>
                            <textarea className='textarea'/>
                        </div>
                    </div>
                    <div className='form-gr'>
                        <div className='form-gr-content' style={{ flexDirection: "column" }}>
                            <label className='label'>Mô tả:</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={moTa}
                                onChange={(_, editor) => setMoTa(editor.getData())}
                                config={{
                                    toolbar: [
                                        "heading", "|",
                                        "bold", "italic", "underline", "link", "|",
                                        "bulletedList", "numberedList", "blockQuote", "|",
                                        "insertTable", "undo", "redo"
                                    ]
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-gr">
                        <div className="form-gr-content">
                            <label className="label">Ảnh cho công ty:</label>
                            <input
                                type="file"
                                className="input"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Vùng preview ảnh */}
                    {anhFiles.length > 0 && (
                        <div className="image-preview-container">
                            {anhFiles.map((img, index) => (
                                <div key={index} className="image-preview-item">
                                    <img src={img.preview} alt={`Ảnh ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </form>
                <div className='button-group'>
                    <button className='button-cancel'>Hủy</button>
                    <button className='button-add'>Sửa công ty</button>
                </div>
            </div>
        </div>
    )
}

export default SuaCongTy