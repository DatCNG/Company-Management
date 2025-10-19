import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";

const ThemPhongBan = ({ onClose = () => {}}) => {
    const navigate = useNavigate();
    const [moTa, setMoTa] = useState("<p>Mô tả phòng ban...</p>");
    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                <form className='form themct-form'>
                    <div className='form-gr'>
                        <div className='form-gr-content'>
                            <label className='label'>Tên phòng ban:</label>
                            <input type="text" className='input' placeholder='Nhập tên phòng ban...'/>
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
                </form>
                <div className='button-group'>
                    <button className='button-cancel' onClick={onClose}>Hủy</button>
                    <button className='button-add'>Thêm phòng ban</button>
                </div>
            </div>
        </div>
    )
}

export default ThemPhongBan